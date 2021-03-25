const GameBoard = (() => {
    let board = [];
    const grid = document.querySelector(".grid");
    const getBoard = () => {};
    const createBoard = (() => {
        for (let i = 0; i < 9; i++) {
            const square = document.createElement("div");
            square.classList.add("square");
            grid.appendChild(square);
        }
    })();
    return { getBoard };
})();

const Player = (name) => {
    const getName = () => name;
    return { getName };
};
