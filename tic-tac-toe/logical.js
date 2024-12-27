let board = [];
let activePlayer = 0;

function startGame() {
    board = Array.from({ length: 3 }, () => Array(3).fill(''));
    activePlayer = Math.random() < 0.5 ? 0 : 1;
    renderBoard(board);
}

function click(row, col) {
    if (board[row][col] !== '') return;

    board[row][col] = activePlayer === 0 ? 'X' : 'O';
    renderBoard(board);

    if (checkWinCondition(activePlayer)) {
        showWinner(activePlayer);
        return;
    }

    if (isBoardFilled()) {
        const header = modalEl.querySelector('h2');
        header.textContent = 'Ничья';
        modalEl.classList.remove('hidden');
        return;
    }

    activePlayer = activePlayer === 0 ? 1 : 0;
}

function checkWinCondition(player) {
    const symbol = player === 0 ? 'X' : 'O';
    const winPatterns = [
        [board[0][0], board[0][1], board[0][2]],
        [board[1][0], board[1][1], board[1][2]],
        [board[2][0], board[2][1], board[2][2]],

        [board[0][0], board[1][0], board[2][0]],
        [board[0][1], board[1][1], board[2][1]],
        [board[0][2], board[1][2], board[2][2]],
        
        [board[0][0], board[1][1], board[2][2]],
        [board[0][2], board[1][1], board[2][0]]
    ];

    return winPatterns.some(pattern => pattern.every(cell => cell === symbol));
}

function isBoardFilled() {
    return board.flat().every(cell => cell !== '');
}
