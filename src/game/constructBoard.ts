import Board from './board';
import Cell from './Cell';
import ConstrainedSet from './constrainedSet';

// LEVEL 1
// Exported Function: Contruct Board
function constructBoard(board: Board) {
    constructCells(board)
    constructConstrainedSets(board)
    constructNeighbours(board)
}

// LEVEL 2
// Component Functions
function constructCells(board:Board) {
    board.cells = Array(81).fill('').map((x, i) => new Cell(undefined, undefined, i));
}

function constructConstrainedSets(board:Board) {
    board.rows = arrayOfConstrainedSets(9) 
    board.columns = arrayOfConstrainedSets(9) 
    board.blocks = arrayOfConstrainedSets(9)

    board.cells.forEach((cell, i) => {
        
        const rowNum = Math.floor(i / 9);
        const colNum = i % 9;
        const blkNum = Math.floor(rowNum / 3) * 3 + Math.floor(colNum / 3);

        cell.row = rowNum
        cell.column = colNum
        cell.block = blkNum

        board.rows[rowNum].cells.push(cell);
        board.columns[colNum].cells.push(cell);
        board.blocks[blkNum].cells.push(cell);

    });
}



function constructNeighbours(board: Board) {
    board.cells.forEach(cell => {
        cell.neighbours = cellNeighbours(cell,board)
    })
}

// LEVEL 3
// Helper functions
function arrayOfConstrainedSets(n:number) {
    return Array(n).fill('').map(() => new ConstrainedSet)
}

function cellNeighbours(cell:Cell, board:Board): Cell[] {
    if (typeof(cell.row) === 'number' && typeof(cell.column) === 'number' && typeof(cell.block) === 'number') {
        const merge = [
            ...board.rows[cell.row].cells,
            ...board.columns[cell.column].cells,
            ...board.blocks[cell.block].cells,
        ]
        const removeMe = merge.filter(x => x !== cell)
        const deduped = removeMe.filter((x,i,a) => a.indexOf(x) === i)
        return deduped
    } else {
        return [];
    }
}

export default constructBoard