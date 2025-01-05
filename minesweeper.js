const state = {
    settings: {
        rows: 5,
        columns: 5,
        mines: 5
    },
    status: 'stopped',
    timer: 0,
    flagsCount: 0,
    board: []
};

const printBoard = () => {
    for (let x = 0; x < state.settings.rows; x++) {
        for (let y = 0; y < state.settings.columns; y++) {
            process.stdout.write(state.board[x][y].value.toString() ?? '0');
        }
        process.stdout.write('\n');

    }
}

const CELL_STATUS = {
    HIDDEN: 0,
    REVEALED: 1,
    FLAG: 2,
    QUESTION: 3,
    EXPLODED: 4
};

const createBoard = () => {
    const board = [];
    for (let y = 0; y < state.settings.rows; y++) {
        const row = [];
        for (let x = 0; x < state.settings.columns; x++) {
            row.push({
                value: 0,
                state: CELL_STATUS.HIDDEN
            })
        }
        board.push(row);
    }
    state.board = board;
}

const placeMines = (initialX, initialY) => {
    for (let placedMinesCount = 0; placedMinesCount <= state.settings.mines;) {
        const x = Math.floor(Math.random() * (state.settings.columns));
        const y = Math.floor(Math.random() * (state.settings.rows));

        if (
            (initialX !== x && initialY !== y) &&
            (state.board[x][y].value !== '*')
        ) {
            state.board[y][x].value = '*';
            placedMinesCount++;
        }
    }
}

const getSurroundingCells = (x, y) => {
    const surroundingCells = [];
    for (let offsetY = -1; offsetY <= 1; offsetY++) {
        for (let offsetX = -1; offsetX <= 1; offsetX++) {
            surroundingCellX = x + offsetX;
            surroundingCellY = y + offsetY;

            if (
                (surroundingCellX === x && surroundingCellY === y) ||
                (surroundingCellX < 0 || surroundingCellX >= state.settings.rows) ||
                (surroundingCellY < 0 || surroundingCellY >= state.settings.columns)
            ) {
                continue;
            }

            surroundingCells.push({
                x: surroundingCellX,
                y: surroundingCellY
            })
        }
    }

    return surroundingCells;
}

const placeHints = () => {
    for (let x = 0; x < state.settings.rows; x++) {
        for (let y = 0; y < state.settings.columns; y++) {
            if (state.board[x][y].value === '*') {
                continue;
            }

            let surroundingMines = 0;

            getSurroundingCells(x, y).forEach(({x: surroundingX, y: surroundingY}) => {
                if (state.board[surroundingX][surroundingY].value === '*') {
                    surroundingMines++;
                }
            })

            state.board[x][y].value = surroundingMines;
        }
    }
}

createBoard();
placeMines();
placeHints();
printBoard();
