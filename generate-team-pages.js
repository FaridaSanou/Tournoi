// Script pour générer toutes les pages d'équipes
const fs = require('fs');

const teamPageTemplate = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{TEAM_NAME}} - Tournament</title>
    <link rel="stylesheet" href="./styles/style.css">
    <link rel="stylesheet" href="./styles/team-page.css">
</head>
<body>
    <header>
        <div class="block">
            <nav>
                <a href="index.html" class="back-btn">← Retour au tournoi</a>
            </nav>
        </div>
    </header>

    <main>
        <section>
            <div class="block team-header">
                <h1 id="team-name">{{TEAM_NAME}}</h1>
                <div class="coach-info">
                    <h2>Entraîneur</h2>
                    <p id="coach-name">{{COACH_NAME}}</p>
                </div>
            </div>
        </section>

        <section>
            <div class="block">
                <h2>Effectif de l'équipe</h2>
                <div class="players-grid" id="players-list">
                    <!-- Les joueurs seront générés automatiquement -->
                </div>
            </div>
        </section>
    </main>

    <footer>
        <div class="block">
            <div class="team-actions">
                <a href="index.html" class="btn-primary">Voir le tournoi</a>
            </div>
        </div>
    </footer>

    <script src="./scripts/data.js"></script>
    <script src="./scripts/team-page.js"></script>
</body>
</html>`;

// Données des équipes (copié depuis data.js)
const teams = [
    { name: "Equipe 1", coach: "Jean Dupont" },
    { name: "Equipe 2", coach: "Marie Martin" },
    { name: "Equipe 3", coach: "Pierre Durand" },
    { name: "Equipe 4", coach: "Sophie Bernard" },
    { name: "Equipe 5", coach: "Luc Moreau" },
    { name: "Equipe 6", coach: "Anne Petit" },
    { name: "Equipe 7", coach: "Paul Roux" },
    { name: "Equipe 8", coach: "Julie Blanc" }
];

// Générer toutes les pages
teams.forEach((team, index) => {
    const teamNumber = index + 1;
    const fileName = \`equipe\${teamNumber}.html\`;
    
    const pageContent = teamPageTemplate
        .replace(/{{TEAM_NAME}}/g, team.name)
        .replace(/{{COACH_NAME}}/g, team.coach);
    
    fs.writeFileSync(fileName, pageContent);
    console.log(\`✅ Page créée: \${fileName}\`);
});

console.log('🎉 Toutes les pages d\'équipes ont été générées !');