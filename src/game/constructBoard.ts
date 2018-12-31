import { Board } from './board';
import Cell from './Cell';
import ConstrainedSet from './constrainedSet';

function arrayOfConstrainedSets(n:number) {
    return Array(n).fill('').map(() => new ConstrainedSet)
}

function constructBoard(board: Board) {

    board.cells = Array(81).fill('').map((x, i) => new Cell(undefined, undefined, i));

    board.rows = arrayOfConstrainedSets(9) 
    board.columns = arrayOfConstrainedSets(9) 
    board.blocks = arrayOfConstrainedSets(9)

    board.cells.forEach((cell, i) => {
        
        const rowNum = Math.floor(i / 9);
        const colNum = i % 9;
        const blkNum = Math.floor(rowNum / 3) * 3 + Math.floor(colNum / 3);

        board.rows[rowNum].cells.push(cell);
        board.columns[colNum].cells.push(cell);
        board.blocks[blkNum].cells.push(cell);

    });
}

export default constructBoard