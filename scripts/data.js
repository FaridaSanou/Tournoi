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
      r1_m0: { team1: "a", team2: "d", score1: 2, score2: 1 },
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
