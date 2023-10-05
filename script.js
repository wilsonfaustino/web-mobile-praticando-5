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

const buildHeroCard = (hero, status) => {
  const card = document.createElement("div");
  card.classList.add("superhero-card");
  card.classList.add(status);
  card.innerHTML = `
<div class="header">
  <img src="${hero.image.url}" alt="${hero.name}">
</div>
<div class="info">
  <h2>${hero.name}</h2>
  <div class="stats">
    <div class="stat">
      <strong>Inteligência:</strong> ${hero.powerstats.intelligence}
      <div class="bar"></div>
    </div>
    <div class="stat">
      <strong>Força:</strong> ${hero.powerstats.strength}
      <div class="bar"></div>
    </div>
    <div class="stat">
      <strong>Velocidade:</strong> ${hero.powerstats.speed}
      <div class="bar"></div>
    </div>
    <div class="stat">
      <strong>Durabilidade:</strong> ${hero.powerstats.durability}
      <div class="bar"></div>
    </div>
    <div class="stat">
      <strong>Poder:</strong> ${hero.powerstats.power}
      <div class="bar"></div>
    </div>
    <div class="stat">
      <strong>Combate:</strong> ${hero.powerstats.combat}
      <div class="bar"></div>
    </div>
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
    hero1Total += hero1.powerstats[stat] || 0
      ? parseInt(hero1.powerstats[stat], 10)
      : 0;
    hero2Total += hero2.powerstats[stat] || 0
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
    tied = {hero1, hero2}
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
