const cells = document.querySelectorAll(".cell");
const statusDiv = document.getElementById("status");
const restartBtn = document.getElementById("restart-btn");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // cols
  [0, 4, 8],
  [2, 4, 6], // diagonals
];

function handleCellClick(e) {
  const idx = e.target.getAttribute("data-index");
  if (board[idx] !== "" || !gameActive) return;

  board[idx] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin()) {
    statusDiv.textContent = `Player ${currentPlayer} wins! 🎉`;
    gameActive = false;
    return;
  }

  if (board.every((cell) => cell !== "")) {
    statusDiv.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDiv.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
  return winPatterns.some((pattern) =>
    pattern.every((idx) => board[idx] === currentPlayer)
  );
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  cells.forEach((cell) => (cell.textContent = ""));
  statusDiv.textContent = `Player ${currentPlayer}'s turn`;
}

cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
restartBtn.addEventListener("click", restartGame);

// Initial status
statusDiv.textContent = `Player ${currentPlayer}'s turn`;
