const board = document.getElementById("board");
const statusText = document.getElementById("status");

let cells = [];
let currentPlayer = "X";
let gameState = Array(9).fill("");
let gameActive = true;
let mode = "pvp"; 

const winConditions = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];


function createBoard() {
    board.innerHTML = "";
    cells = [];

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;

        cell.addEventListener("click", handleClick);

        board.appendChild(cell);
        cells.push(cell);
    }
}


function handleClick(e) {
    const index = e.target.dataset.index;

    if (gameState[index] !== "" || !gameActive) return;

    makeMove(index, currentPlayer);

    if (mode === "ai" && gameActive && currentPlayer === "O") {
        setTimeout(aiMove, 500);
    }
}


function makeMove(index, player) {
    gameState[index] = player;
    cells[index].textContent = player;

    if (checkWinner()) {
        statusText.textContent = `Player ${player} Wins!`;
        gameActive = false;
        return;
    }

    if (!gameState.includes("")) {
        statusText.textContent = "Draw!";
        gameActive = false;
        return;
    }

    currentPlayer = player === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

// Check winner
function checkWinner() {
    return winConditions.some(condition => {
        const [a, b, c] = condition;
        return (
            gameState[a] &&
            gameState[a] === gameState[b] &&
            gameState[a] === gameState[c]
        );
    });
}

// AI Move (random)
function aiMove() {
    let emptyCells = gameState
        .map((val, index) => val === "" ? index : null)
        .filter(val => val !== null);

    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    makeMove(randomIndex, "O");
}

// Reset game
function resetGame() {
    gameState = Array(9).fill("");
    gameActive = true;
    currentPlayer = "X";
    statusText.textContent = "Player X's Turn";
    createBoard();
}


function setMode(selectedMode) {
    mode = selectedMode;
    resetGame();
}

createBoard();