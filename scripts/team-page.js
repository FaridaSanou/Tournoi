function getTeamFromUrl() {
  const currentPage = window.location.pathname.split("/").pop();
  const teamNumber = currentPage.replace("equipe", "").replace(".html", "");
  return parseInt(teamNumber) - 1; // Index dans le tableau (0-based)
}

function generateTeamPage() {
  const teamIndex = getTeamFromUrl();

  if (
    !window.TEAMS_INFO ||
    teamIndex < 0 ||
    teamIndex >= window.TEAMS_INFO.length
  ) {
    console.error("Équipe non trouvée");
    return;
  }

  const team = window.TEAMS_INFO[teamIndex];

  // Mettre à jour le titre de la page
  document.title = `${team.name} - Tournament`;

  // Mettre à jour le nom de l'équipe
  const teamNameElement = document.getElementById("team-name");
  if (teamNameElement) {
    teamNameElement.textContent = team.name;
  }

  // Mettre à jour le nom de l'entraîneur
  const coachNameElement = document.getElementById("coach-name");
  if (coachNameElement) {
    coachNameElement.textContent = team.coach;
  }

  // Générer la liste des joueurs
  generatePlayersList(team.players);

  console.log(`✅ Page générée pour ${team.name}`);
}

function generatePlayersList(players) {
  const playersContainer = document.getElementById("players-list");
  if (!playersContainer || !players) return;

  let html = "";

  players.forEach((player, index) => {
    html += `
            <div class="player-card">
                <div class="player-number">${index + 1}</div>
                <div class="player-name">${player}</div>
            </div>
        `;
  });

  playersContainer.innerHTML = html;
}

// Initialiser la page au chargement
document.addEventListener("DOMContentLoaded", function () {
  generateTeamPage();
});
