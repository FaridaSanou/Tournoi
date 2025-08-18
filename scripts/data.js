// Configuration des équipes avec leurs entraîneurs et joueurs
window.TEAMS_INFO = [
  { 
    name: "Equipe 1", 
    coach: "Jean Dupont", 
    link: "equipe/equipe1.html",
    players: ["Lucas Martin", "Thomas Dubois", "Antoine Leroy", "Maxime Petit", "Nicolas Bernard", "Alexandre Moreau", "Julien Roux", "Kevin Blanc", "Sébastien Girard", "Florian Faure", "Damien Lefebvre"]
  },
  { 
    name: "Equipe 2", 
    coach: "Marie Martin", 
    link: "equipe/equipe2.html",
    players: ["Pierre Durand", "Paul Simon", "Marc Robert", "Olivier Richard", "Christophe Petit", "Laurent Durand", "Stéphane Leroy", "Fabien Martin", "Vincent Moreau", "Thierry Bernard", "Frédéric Dubois"]
  },
  { 
    name: "Equipe 3", 
    coach: "Pierre Durand", 
    link: "equipe/equipe3.html",
    players: ["Mathieu Rousseau", "Jérôme Garnier", "Cédric Clement", "Romain Mercier", "Yann Lefebvre", "Arnaud Girard", "Mickael Faure", "Sylvain Blanc", "Lionel Roux", "Hervé Moreau", "Patrice Bernard"]
  },
  { 
    name: "Equipe 4", 
    coach: "Sophie Bernard", 
    link: "equipe/equipe4.html",
    players: ["Guillaume Petit", "Benjamin Richard", "Aurélien Robert", "Raphaël Simon", "Loïc Durand", "Gaël Martin", "Quentin Leroy", "Adrien Dubois", "Valentin Moreau", "Corentin Bernard", "Bastien Roux"]
  },
  { 
    name: "Equipe 5", 
    coach: "Luc Moreau", 
    link: "equipe/equipe5.html",
    players: ["Jonathan Blanc", "Rémi Girard", "Cyril Faure", "Franck Lefebvre", "Ludovic Rousseau", "Grégory Garnier", "Éric Clement", "Pascal Mercier", "Bruno Richard", "Alain Robert", "Daniel Simon"]
  },
  { 
    name: "Equipe 6", 
    coach: "Anne Petit", 
    link: "equipe/equipe6.html",
    players: ["Michaël Durand", "Christophe Martin", "Philippe Leroy", "Didier Dubois", "Jean-Luc Moreau", "François Bernard", "Gilles Roux", "Henri Blanc", "Claude Girard", "André Faure", "Roger Lefebvre"]
  },
  { 
    name: "Equipe 7", 
    coach: "Paul Roux", 
    link: "equipe/equipe7.html",
    players: ["Sébastien Rousseau", "Fabrice Garnier", "Yves Clement", "Michel Mercier", "Jean-Pierre Richard", "Patrick Robert", "Christian Simon", "Serge Durand", "Bernard Martin", "Georges Leroy", "Marcel Dubois"]
  },
  { 
    name: "Equipe 8", 
    coach: "Julie Blanc", 
    link: "equipe/equipe8.html",
    players: ["Emmanuel Moreau", "Dominique Bernard", "Jean-Claude Roux", "Pierre-Alain Blanc", "Jean-François Girard", "Jean-Marie Faure", "Louis Lefebvre", "Robert Rousseau", "Jacques Garnier", "Maurice Clement", "Raymond Mercier"]
  }
];

window.TOURNAMENT_CONFIG = [
  {
    id: "tournament1",
    name: "Poule A",
    theme: {
      accent_color: "#03d9ce",
      bg_color: "#0e1217",
      match_bg: "#182026",
      match_border: "#232c36",
      text_color: "#6b798c",
      winner_text: "#e3e8ef",
      winner_bg_1: "#232c36",
      winner_bg_2: "#2a3540",
      seed_bg: "#36404e",
      tbd_color: "#404854",
    },
    teams: {
      a: { name: "Equipe 1", seed: 1 },
      b: { name: "Equipe 2", seed: 2 },
      c: { name: "Equipe 3", seed: 3 },
      d: { name: "Equipe 4", seed: 4 },
    },
    rounds: {
      0: " ",
      1: " ",
    },
    matches: {
      r0_m0: { team1: "a", team2: "b", score1: 3, score2: 1 },
      r0_m1: { team1: "c", team2: "d", score1: 0, score2: 1 },
      r1_m0: { team1: "a", team2: "d", score1: 2, score2: 4 },
    },
  },
  {
    id: "tournament2",
    name: "Poule B",
    theme: {
      accent_color: "#ff6f61",
      bg_color: "#1a1a2e",
      match_bg: "#2a2a3e",
      match_border: "#3a3a4e",
      text_color: "#7a8a9c",
      winner_text: "#f3e8ef",
      winner_bg_1: "#3a3a4e",
      winner_bg_2: "#4a4a5e",
      seed_bg: "#5a5a6e",
      tbd_color: "#505060",
    },
    teams: {
      e: { name: "Equipe 1", seed: 1 },
      f: { name: "Equipe 2", seed: 2 },
      g: { name: "Equipe 3", seed: 3 },
      h: { name: "Equipe 4", seed: 4 },
    },
    rounds: {
      0: " ",
      1: " ",
    },
    matches: {
      r0_m0: { team1: "e", team2: "f", score1: 2, score2: 0 },
      r0_m1: { team1: "g", team2: "h", score1: 1, score2: 3 },
      r1_m0: { team1: "e", team2: "h", score1: 5, score2: 8 },
    },
  },
];
