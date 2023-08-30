

const game_board = document.getElementById("gameboard");
const game_info = document.getElementById("info");

const start_cells = ['', '', '', '', '', '', '', '', ''];
let first = 'cross';
game_info.textContent = 'cross goes first';

function createcells() {
    start_cells.forEach((_cell, index) => {
        const cell_element = document.createElement('div');
        cell_element.classList.add('square');
        cell_element.id = index;
        cell_element.addEventListener('click', addGo);
        game_board.appendChild(cell_element);
    })
}

createcells();


function addGo(e) {
    const display = document.createElement('div')
    display.classList.add(first)
    e.target.appendChild(display);
    first = first === 'cross' ? 'circle' : 'cross';
    game_info.textContent = 'It is now ' + first + '\'s turn';
    e.target.removeEventListener('click', addGo);
    checkWinner();
}

function checkWinner() {
    const squares = document.querySelectorAll('.square');
    const winning_combinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    winning_combinations.forEach(array => {
        const circleWins = array.every(cell => squares[cell].firstChild?.classList.contains('cicle'));
        if (circleWins) {
            game_info.textContent = 'Circle wins!'
            squares.forEach(square => square.replaceWith(square.cloneNode(true)));
            return
        }
        const crossWins = array.every(cell => squares[cell].firstChild?.classList.contains('cross'));
        if (crossWins) {
            game_info.textContent = 'Cross wins!';
            squares.forEach(square => square.replaceWith(square.cloneNode(true)));
            return;
        }
    });
}
