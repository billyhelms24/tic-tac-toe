const GameBoard = (() => {
    let board = [];

    const Player = (symbol) => {
        const getSymbol = () => symbol;
        return { getSymbol };
    };

    playerX = Player("X");
    playerO = Player("O");

    const Game = (() => {
        let currentPlayer = playerX;
        let gameOver = false;
        const getCurrentPlayer = () => {
            return currentPlayer;
        };
        const changeCurrentPlayer = () => {
            if (currentPlayer === playerX) {
                currentPlayer = playerO;
            } else {
                currentPlayer = playerX;
            }
        };
        const checkWinner = () => {
            const winScenarios = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [6, 4, 3],
            ];
            for (let i = 0; i < winScenarios.length; i++) {
                const squares = document.querySelectorAll(".square");
                const [a, b, c] = winScenarios[i];
                if (
                    squares[a].innerHTML &&
                    squares[a].innerHTML === squares[b].innerHTML &&
                    squares[a].innerHTML === squares[c].innerHTML
                ) {
                    gameEnd();
                }
            }
        };
        const gameEnd = () => {
            gameOver = true;
        };
        const squareClick = (e, square) => {
            if (!e.target.innerHTML && !gameOver) {
                const squareIndex = parseInt(square.value);
                square.innerHTML = currentPlayer.getSymbol();
                board[squareIndex] = square.innerHTML;
                checkWinner();
                changeCurrentPlayer();
            }
        };
        return { getCurrentPlayer, changeCurrentPlayer, squareClick };
    })();

    const grid = document.querySelector(".grid");
    const render = (() => {
        for (let i = 0; i < 9; i++) {
            const square = document.createElement("div");
            square.classList.add("square");
            square.value = i;
            square.addEventListener("click", (e) => {
                Game.squareClick(e, square);
            });
            grid.appendChild(square);
        }
    })();
})();
