document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const message = document.getElementById("message");
    const resetButton = document.getElementById("reset");
    let currentPlayer = "X";
    let board = Array(9).fill(null);

    const checkWinner = (board) => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], 
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6]             
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return null;
    };

    const isBoardFull = (board) => {
        return board.every(cell => cell);
    };

    const handleClick = (e) => {
        const index = e.target.getAttribute("data-index");

        if (board[index] || checkWinner(board)) {
            return;
        }

        board[index] = currentPlayer;
        e.target.textContent = currentPlayer;

        const winner = checkWinner(board);
        if (winner) {
            message.textContent = `Player ${winner} wins!`;
        } else if (isBoardFull(board)) {
            message.textContent = "It's a tie!";
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    };

    const resetGame = () => {
        board.fill(null);
        cells.forEach(cell => cell.textContent = "");
        currentPlayer = "X";
        message.textContent = "";
    };

    cells.forEach(cell => cell.addEventListener("click", handleClick));
    resetButton.addEventListener("click", resetGame);
});
