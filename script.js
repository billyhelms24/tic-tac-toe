const GameBoard = (() => {
    let board = [];

    const Player = (name, symbol, color) => {
        const getName = () => name;
        const getSymbol = () => symbol;
        const getColor = () => color;
        return { getName, getSymbol, getColor };
    };

    playerX = Player("Player 1", "X", "#000000");
    playerO = Player("Player 2", "O", "#000000");

    const Game = (() => {
        let currentPlayer = playerX;
        let gameOver = false;

        const setGameOver = (bool) => {
            gameOver = bool;
        };

        const getGameOver = () => {
            return gameOver;
        };

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

        const resetCurrentPlayer = () => {
            currentPlayer = playerX;
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
                [2, 4, 6],
            ];
            for (let i = 0; i < winScenarios.length; i++) {
                const [a, b, c] = winScenarios[i];
                if (
                    board[a] &&
                    board[a] === board[b] &&
                    board[a] === board[c]
                ) {
                    setGameOver(true);
                }
            }
        };

        const squareClick = (e, square) => {
            if (!e.target.innerHTML && !gameOver) {
                const squareIndex = parseInt(square.value);
                square.innerHTML = currentPlayer.getSymbol();
                board[squareIndex] = square.innerHTML;
                checkWinner();
                if (!gameOver) {
                    changeCurrentPlayer();
                }
                DisplayController.updateDisplay();
            }
        };

        return {
            getCurrentPlayer,
            resetCurrentPlayer,
            changeCurrentPlayer,
            squareClick,
            setGameOver,
            getGameOver,
        };
    })();

    const DisplayController = (() => {
        const legend = document.querySelector("h2");
        const turnCounter = document.querySelector("h3");

        const updateDisplay = () => {
            legend.innerHTML = `${playerX.getName()} : ${playerX.getSymbol()} <br> ${playerO.getName()} : ${playerO.getSymbol()}`;
            if (!Game.getGameOver()) {
                turnCounter.innerHTML = `${Game.getCurrentPlayer().getName()}'s Turn - ${Game.getCurrentPlayer().getSymbol()}`;
            } else {
                turnCounter.innerHTML = `${Game.getCurrentPlayer().getName()} is the Winner!`;
            }
        };

        updateDisplay();

        return { updateDisplay };
    })();

    const resetBtn = document.querySelector("#resetBtn");
    resetBtn.addEventListener("click", () => {
        board = [];
        Game.setGameOver(false);
        Game.resetCurrentPlayer();
        const squares = document.querySelectorAll(".square");
        squares.forEach((i) => {
            i.innerHTML = "";
        });
        DisplayController.updateDisplay();
    });

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
