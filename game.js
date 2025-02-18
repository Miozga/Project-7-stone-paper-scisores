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
}

function aiChoice() {
  return hands[Math.floor(Math.random() * 3)].dataset.option;
}

//sprawdzamy wniki gracza i komputera
function checkResult(player, ai) {
  if (player === ai) {
    console.log("remis");
  } else if (
    (player === "papier" && ai === "kamień") ||
    (player === "kamień" && ai === "nożyczki") ||
    (player === "nożyczki" && ai === "papier")
  ) {
    console.log("wygrałeś");
  } else {
    console.log("przegrałeś");
  }
}

//funkcja sterująca
function startGame() {
  if (!game.playerHand) {
    return alert("Wybierz dłoń");
  }

  game.aiHand = aiChoice();
  const gameResult = checkResult(game.playerHand, game.aiHand);
}

hands.forEach((hand) => hand.addEventListener("click", handSelection));

document.querySelector(".start").addEventListener("click", startGame);
