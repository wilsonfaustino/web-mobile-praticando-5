const baseUrl = "https://www.superheroapi.com/api.php/";
const apiKey = "10160120335689822";

const randomHeroId = () => Math.floor(Math.random() * 731) + 1;

const getSuperHero = async (id) => {
  const url = `${baseUrl}/${apiKey}/${id}/`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

function buildStats(stats) {
  const statsTranslate = {
    intelligence: "Inteligência",
    strength: "Força",
    speed: "Velocidade",
    durability: "Durabilidade",
    power: "Poder",
    combat: "Combate",
  };
  const output = Object.entries(stats).reduce((acc, [key, value]) => {
    const template = `
  <div class="stat">
    <strong>${statsTranslate[key]}:</strong> ${value === "null" ? "?" : value}
    <div class="bar" style="width: ${value}%"></div>
  </div>
  `.trim();
    return acc + template;
  }, "");

  return output;
}

const buildHeroCard = (hero, status) => {
  const card = document.createElement("div");
  card.classList.add("superhero-card");
  card.classList.add(status);
  card.innerHTML = `
<div class="header">
  <img src="${hero.image.url}" alt="${hero.name}" class="hero-image" />
</div>
<div class="info">
  <h2>${hero.name}</h2>
  <div class="stats">
    ${buildStats(hero.powerstats)}
  </div>
</div>
  `;

  document.body.appendChild(card);
};

function compareHeroes(hero1, hero2) {
  const stats = [
    "intelligence",
    "strength",
    "speed",
    "durability",
    "power",
    "combat",
  ];
  let hero1Total = 0;
  let hero2Total = 0;

  // Calculate total points for each hero
  stats.forEach((stat) => {
    hero1Total +=
      hero1.powerstats[stat] !== "null"
        ? parseInt(hero1.powerstats[stat], 10)
        : 0;
    hero2Total +=
      hero2.powerstats[stat] !== "null"
        ? parseInt(hero2.powerstats[stat], 10)
        : 0;
  });

  // Determine the winner and loser
  let winner, loser, tied;
  if (hero1Total > hero2Total) {
    winner = hero1;
    loser = hero2;
  } else if (hero1Total < hero2Total) {
    winner = hero2;
    loser = hero1;
  } else {
    // In case of a tie
    tied = { hero1, hero2 };
  }

  return { winner, loser, tied };
}

const prepareFight = async () => {
  const hero1 = await getSuperHero(randomHeroId());
  const hero2 = await getSuperHero(randomHeroId());
  // console.log({ hero1, hero2 });

  const { winner, loser, tied } = compareHeroes(hero1, hero2);
  console.log(winner, loser, tied);

  if (tied) {
    buildHeroCard(tied.hero1, "tied");
    buildHeroCard(tied.hero2, "tied");
  } else {
    buildHeroCard(winner, "winner");
    buildHeroCard(loser, "loser");
  }
};

prepareFight();
