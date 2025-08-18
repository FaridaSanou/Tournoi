let TOURNAMENT_DATA = null;

function initializeTournament() {
  try {
    if (typeof window.TOURNAMENT_CONFIG === "undefined") {
      throw new Error("Configuration du tournoi non trouvée");
    }

    TOURNAMENT_DATA = window.TOURNAMENT_CONFIG;
    console.log("✅ Configuration chargée:", TOURNAMENT_DATA);
    renderTeamsOverviewSection();
    generateAllBrackets();
  } catch (error) {
    console.error("❌ Erreur lors de l'initialisation:", error);
    showError(error.message);
  }
}

/**
 * Génère automatiquement la section d'affichage des équipes
 * Utilise les données des équipes pour créer des cartes cliquables
 */
function renderTeamsOverviewSection() {
  const teamsDisplayContainer = document.querySelector('.equipe-nom');
  if (!teamsDisplayContainer || !window.TEAMS_INFO) {
    console.warn('⚠️ Impossible de générer la section équipes : conteneur ou données manquants');
    return;
  }

  const teamsCardsHtml = window.TEAMS_INFO.map(teamInfo => {
    return `
      <div class="team-card" onclick="navigateToTeamPage('${teamInfo.link}')">
        <h3>${teamInfo.name}</h3>
        <p>Entraîneur: ${teamInfo.coach}</p>
      </div>
    `;
  }).join('');

  teamsDisplayContainer.innerHTML = teamsCardsHtml;
  console.log('✅ Section équipes générée avec succès');
}

/**
 * Navigue vers la page d'une équipe spécifique
 * @param {string} teamPageUrl - URL de la page de l'équipe
 */
function navigateToTeamPage(teamPageUrl) {
  if (teamPageUrl) {
    window.location.href = teamPageUrl;
  }
}

function applyTheme(tournament) {
  return `
                .tournament-${tournament.id} {
                    --accent-color: ${tournament.theme.accent_color};
                    --bg-color: ${tournament.theme.bg_color};
                    --match-bg: ${tournament.theme.match_bg};
                    --match-border: ${tournament.theme.match_border};
                    --text-color: ${tournament.theme.text_color};
                    --winner-text: ${tournament.theme.winner_text};
                    --winner-bg-1: ${tournament.theme.winner_bg_1};
                    --winner-bg-2: ${tournament.theme.winner_bg_2};
                    --seed-bg: ${tournament.theme.seed_bg};
                    --tbd-color: ${tournament.theme.tbd_color};
                }
            `;
}

function calculateBracketStructure(tournament) {
  const teamCount = Object.keys(tournament.teams).length;
  const rounds = Math.ceil(Math.log2(teamCount));
  const structure = [];

  for (let round = 0; round < rounds; round++) {
    const matchesInRound = Math.pow(2, rounds - 1 - round);
    structure.push({
      name: getRoundName(round, rounds, tournament),
      matchCount: matchesInRound,
    });
  }

  return structure;
}

function getRoundName(roundIndex, totalRounds, tournament) {
  const names = tournament.rounds || {};

  if (names[roundIndex]) {
    return names[roundIndex];
  }

  if (roundIndex === totalRounds - 1) return "Finale";
  if (roundIndex === totalRounds - 2) return "Demi-finales";
  if (roundIndex === totalRounds - 3) return "Quarts de finale";

  return `Tour ${roundIndex + 1}`;
}

function getMatchWinner(matchData) {
  if (!matchData || matchData.score1 === null || matchData.score2 === null) {
    return null;
  }
  return matchData.score1 > matchData.score2
    ? matchData.team1
    : matchData.team2;
}

function createTeamElement(
  teamKey,
  score,
  isWinner,
  isTbd = false,
  tournament
) {
  if (isTbd) {
    return `
                    <div class="team tbd">
                        <div class="seed">-</div>
                        <div class="team-name">À déterminer</div>
                        <div class="score">-</div>
                    </div>
                `;
  }

  const team = tournament.teams[teamKey];
  if (!team) {
    return createTeamElement(null, "-", false, true, tournament);
  }

  return `
                <div class="team ${isWinner ? "winner" : ""}">
                    <div class="seed">${team.seed || "?"}</div>
                    <div class="team-name">${team.name}</div>
                    <div class="score">${
                      score !== null && score !== undefined ? score : "-"
                    }</div>
                </div>
            `;
}

function createMatchElement(matchKey, tournament) {
  const match = tournament.matches[matchKey];

  if (!match) {
    return `
                    <div class="match">
                        ${createTeamElement(
                          null,
                          null,
                          false,
                          true,
                          tournament
                        )}
                        ${createTeamElement(
                          null,
                          null,
                          false,
                          true,
                          tournament
                        )}
                    </div>
                `;
  }

  const winner = getMatchWinner(match);

  return `
                <div class="match">
                    ${createTeamElement(
                      match.team1,
                      match.score1,
                      winner === match.team1,
                      false,
                      tournament
                    )}
                    ${createTeamElement(
                      match.team2,
                      match.score2,
                      winner === match.team2,
                      false,
                      tournament
                    )}
                </div>
            `;
}

function createChampionElement(tournament) {
  const structure = calculateBracketStructure(tournament);
  const finalRoundIndex = structure.length - 1;
  const finalMatchKey = `r${finalRoundIndex}_m0`;
  const finalMatch = tournament.matches[finalMatchKey];

  if (!finalMatch || finalMatch.score1 === null || finalMatch.score2 === null) {
    return `
                    <div class="round">
                        <div class="round-title">Champion</div>
                        <div class="matches">
                            <div class="champion tbd">
                                <div class="champion-team">
                                    <div class="seed">-</div>
                                    <div class="team-name">À déterminer</div>
                                    <div class="trophy">🏆</div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
  }

  const winner = getMatchWinner(finalMatch);
  const champion = tournament.teams[winner];

  return `
                <div class="round">
                    <div class="round-title">Champion</div>
                    <div class="matches">
                        <div class="champion">
                            <div class="champion-team">
                                <div class="seed">${champion.seed}</div>
                                <div class="team-name">${champion.name}</div>
                                <div class="trophy">🏆</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
}

function generateDynamicBracket(tournament) {
  const structure = calculateBracketStructure(tournament);
  let html = `
                <div class="tournament-wrapper tournament-${tournament.id}">
                    <h2 class="tournament-title">${tournament.name}</h2>
                    <div class="bracket-container">
                        <div class="bracket">
            `;

  structure.forEach((round, roundIndex) => {
    html += `
                    <div class="round">
                        <div class="round-title">${round.name}</div>
                        <div class="matches">
                `;

    for (let i = 0; i < round.matchCount; i++) {
      const matchKey = `r${roundIndex}_m${i}`;
      html += createMatchElement(matchKey, tournament);
    }

    html += `
                        </div>
                    </div>
                `;
  });

  html += createChampionElement(tournament);
  html += `
                        </div>
                    </div>
                </div>
            `;
  return html;
}

function generateAllBrackets() {
  const container = document.getElementById("tournaments-container");
  let html = "";
  let css = "";

  TOURNAMENT_DATA.forEach((tournament) => {
    css += applyTheme(tournament);
    html += generateDynamicBracket(tournament);
  });

  // Injecter les styles dynamiques
  const styleElement = document.createElement("style");
  styleElement.textContent = css;
  document.head.appendChild(styleElement);

  container.innerHTML = html;
  
  // Mettre à jour la section finale automatiquement
  updateFinalSection();
}

function updateFinalSection() {
  const finalSection = document.querySelector('.final');
  if (!finalSection) return;

  // Chercher les gagnants de chaque poule
  const winners = [];
  
  TOURNAMENT_DATA.forEach((tournament) => {
    const structure = calculateBracketStructure(tournament);
    const finalRoundIndex = structure.length - 1;
    const finalMatchKey = `r${finalRoundIndex}_m0`;
    const finalMatch = tournament.matches[finalMatchKey];
    
    if (finalMatch && finalMatch.score1 !== null && finalMatch.score2 !== null) {
      const winner = getMatchWinner(finalMatch);
      const winnerTeam = tournament.teams[winner];
      const winnerScore = winner === finalMatch.team1 ? finalMatch.score1 : finalMatch.score2;
      
      if (winnerTeam) {
        winners.push({
          name: winnerTeam.name,
          score: winnerScore,
          poolName: tournament.name
        });
      }
    }
  });

  // Si on a exactement 2 gagnants (finale possible)
  if (winners.length === 2) {
    // Déterminer le gagnant final (celui avec le meilleur score)
    const team1 = winners[0];
    const team2 = winners[1];
    
    finalSection.innerHTML = `
      <div>
        <h3>${team1.name}</h3>
        <h4>${team1.score}</h4>
      </div>
      <div>
        <img src="./images/vs.png" alt="versus" />
      </div>
      <div>
        <h3>${team2.name}</h3>
        <h4>${team2.score}</h4>
      </div>
    `;
    
    // Afficher la section finale
    finalSection.style.display = 'flex';
    console.log(`🏆 Finale mise à jour: ${team1.name} (${team1.score}) vs ${team2.name} (${team2.score})`);
  } else {
    // Masquer la section finale si pas encore prête
    finalSection.style.display = 'none';
    console.log(`⏳ Finale pas encore disponible (${winners.length}/2 gagnants)`);
  }
}

function showError(message) {
  document.getElementById("tournaments-container").innerHTML = `
                <div class="error">
                    ❌ Erreur: ${message}<br>
                    Vérifiez votre fichier data.js
                </div>
            `;
}

function updateMatch(tournamentId, matchKey, score1, score2) {
  if (TOURNAMENT_DATA) {
    const tournament = TOURNAMENT_DATA.find((t) => t.id === tournamentId);
    if (tournament && tournament.matches[matchKey]) {
      tournament.matches[matchKey].score1 = score1;
      tournament.matches[matchKey].score2 = score2;
      generateAllBrackets();
      console.log(
        `✅ Match ${matchKey} mis à jour dans ${tournamentId}: ${score1}-${score2}`
      );
    }
  }
}

function regenerateBracket(tournamentId) {
  if (TOURNAMENT_DATA) {
    generateAllBrackets();
    console.log(`🔄 Bracket régénéré pour ${tournamentId}`);
  }
}

window.updateMatch = updateMatch;
window.regenerateBracket = regenerateBracket;

// INITIALISATION
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(initializeTournament, 200);
});
