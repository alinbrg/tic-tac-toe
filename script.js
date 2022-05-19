const board = document.getElementById("board"),
	cells = document.querySelectorAll("[data-cell]"),
	winningMessage = document.getElementById("winningMessage"),
	winningTextBox = document.querySelector("[data-winning-message-text]"),
	restartBtn = document.getElementById("restartButton"),
	X_CLASS = "x",
	CIRCLE_CLASS = "circle",
	WINNING_COMBINATIONS = [
		[0, 1, 2],
		[0, 3, 6],
		[0, 4, 8],
		[1, 4, 7],
		[2, 5, 8],
		[2, 4, 6],
		[3, 4, 5],
		[6, 7, 8],
	];

let xTurn;

startGame();

restartBtn.addEventListener("click", startGame);

function startGame() {
	xTurn = true;
	board.classList.add("x");

	cells.forEach((cell) => {
		cell.classList.remove(X_CLASS, CIRCLE_CLASS);
		cell.removeEventListener("click", handleClick);
		cell.addEventListener("click", handleClick, { once: true });
	});
	changeBoardClass();
	winningMessage.classList.remove("show");
}

function handleClick(e) {
	const cell = e.target;
	const currentClass = xTurn ? X_CLASS : CIRCLE_CLASS;

	placeMark(cell, currentClass);

	if (checkWin(currentClass)) {
		endGame(false);
	} else if (isDraw()) {
		endGame(true);
	} else {
		swapClasses();
		changeBoardClass();
	}
}

function endGame(draw) {
	if (draw) {
		winningTextBox.innerText = `Draw`;
	} else {
		winningTextBox.innerText = `${xTurn ? "X's" : "O's"} Wins!`;
	}
	winningMessage.classList.add("show");
}

function placeMark(cell, currentClass) {
	cell.classList.add(currentClass);
}

function swapClasses() {
	xTurn = !xTurn;
}

function changeBoardClass() {
	board.classList.remove(X_CLASS);
	board.classList.remove(CIRCLE_CLASS);
	xTurn ? board.classList.add(X_CLASS) : board.classList.add(CIRCLE_CLASS);
}

function checkWin(currentClass) {
	return WINNING_COMBINATIONS.some((combination) => {
		return combination.every((index) => {
			return cells[index].classList.contains(currentClass);
		});
	});
}

function isDraw() {
	return [...cells].every((cell) => {
		return (
			cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
		);
	});
}

// function changePlayers(cell) {
// 	xTurn
// 		? (cell.classList.add(X_CLASS),
// 		  board.classList.remove(X_CLASS),
// 		  board.classList.add(CIRCLE_CLASS),
// 		  (xTurn = false))
// 		: (cell.classList.add(CIRCLE_CLASS),
// 		  board.classList.remove(CIRCLE_CLASS),
// 		  board.classList.add(X_CLASS),
// 		  (xTurn = true));
// }
