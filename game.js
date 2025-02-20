const gameSummary = {
  numbers: 0,
  wins: 0,
  losses: 0,
  draws: 0,
};

const game = {
  playerHand: "",
  aiHand: "",
};

const hands = [...document.querySelectorAll(".select img")];

function handSelection() {
  game.playerHand = this.dataset.option; // przypisujemy do const game
  console.log(game.playerHand);

  hands.forEach((hand) => (hand.style.boxShadow = ""));
  this.style.boxShadow = "0 0 0 4px blue";
  return game.playerHand;
}

function aiChoice() {
  const randomIndex = Math.floor(Math.random() * hands.length);
  return hands[randomIndex].dataset.option;
}

//sprawdzamy wniki gracza i komputera
function checkResult(player, ai) {
  if (player === ai) {
    return "draw";
  } else if (
    (player === "papier" && ai === "kamień") ||
    (player === "kamień" && ai === "nożyczki") ||
    (player === "nożyczki" && ai === "papier")
  ) {
    return "win";
  } else {
    return "loss";
  }
}

function endGame() {
  document.querySelector(`[data-option="${game.playerHand}"]`).style.boxShadow =
    "";
  game.playerHand = "";
}
//pokaz wyniku
//funkcja sterująca
function publishResult(player, ai, result) {
  document.querySelector('[data-summary="your-choice"]').textContent = player;
  document.querySelector('[data-summary="ai-choice"]').textContent = ai;

  gameSummary.numbers++;
  document.querySelector("p.numbers span").textContent = gameSummary.numbers;

  if (result === "win") {
    gameSummary.wins++;
    document.querySelector("p.wins span").textContent = gameSummary.wins;
    document.querySelector('[data-summary="who-win"]').textContent =
      "Ty wygrałeś!";
  } else if (result === "loss") {
    gameSummary.losses++;
    document.querySelector("p.losses span").textContent = gameSummary.losses;
    document.querySelector('[data-summary="who-win"]').textContent =
      "Komputer wygrał...";
  } else {
    gameSummary.draws++;
    document.querySelector("p.draws span").textContent = gameSummary.draws;
    document.querySelector('[data-summary="who-win"]').textContent = "Remis";
  }
}

function startGame() {
  if (!game.playerHand) {
    return alert("Wybierz dłoń");
  }

  game.aiHand = aiChoice();
  const gameResult = checkResult(game.playerHand, game.aiHand);
  publishResult(game.playerHand, game.aiHand, gameResult);
  endGame();
}

hands.forEach((hand) => hand.addEventListener("click", handSelection));

document.querySelector(".start").addEventListener("click", startGame);
