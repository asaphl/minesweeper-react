export function createBoard(boardSettings) {
  // initialize board
  // the board is an array of tiles containing the number of mines around it, or -1 if it is a bomb
  const { rows, cols } = boardSettings;
  const boardSize = rows * cols;
  let board = new Array(boardSize).fill(0);
  let bombs = boardSettings.bombs;
  while (bombs > 0) {
    const bombIndex = Math.floor(Math.random() * boardSize);
    if (board[bombIndex] !== -1) {
      board[bombIndex] = -1;
      bombs--;
      const neighbors = getNeighbors(bombIndex, boardSettings);
      neighbors.forEach((neighborTileIndex) => {
        if (board[neighborTileIndex] !== -1) board[neighborTileIndex] += 1;
      });
    }
  }
  return board;
}

export function getNeighbors(tileIndex, boardSettings) {
  const { rows, cols } = boardSettings;
  const row = calculateTileRow(tileIndex, cols), col = calculateTileCol(tileIndex, cols);
  let neighbors = [];
  const topNeighborLimit = row > 0 ? -1 : 0,
        bottomNeighborLimit = row < rows - 1 ? 1 : 0,
        leftNeighborLimit = col > 0 ? -1 : 0,
        rightNeighborLimit = col < cols - 1 ? 1 : 0;

  for (let rowShift = topNeighborLimit; rowShift <= bottomNeighborLimit; rowShift++) {
    for (let colShift = leftNeighborLimit; colShift <= rightNeighborLimit; colShift++) {
      const neighborRow = row + rowShift;
      const neighborCol = col + colShift;
      const neighborTileIndex = calculateTileIndex(neighborRow, neighborCol, cols);
      neighbors.push(neighborTileIndex);
    }
  }
  return neighbors;
}

export function recursivelyFindAllNeighboringEmptyTiles(startingTileIndex, boardSettings, board, shouldReveal=[]) {
  const neighbors = getNeighbors(startingTileIndex, boardSettings);
  neighbors.forEach((neighborIndex) => {
    if (shouldReveal.includes(neighborIndex)) return;
    shouldReveal.push(neighborIndex);
    if (board[neighborIndex] === 0) recursivelyFindAllNeighboringEmptyTiles(neighborIndex, boardSettings, board, shouldReveal);
  });
  return shouldReveal;
}

export function reveal(tileIndex, board, boardSettings) {
  let revealArray = [];
  if (board[tileIndex] === 0) revealArray = recursivelyFindAllNeighboringEmptyTiles(tileIndex, boardSettings, board, [tileIndex]);
  if (board[tileIndex] > 0) revealArray = [tileIndex];
  return revealArray;
}

export function getNumberOfTilesWithoutBombs(boardSettings) {
  const { rows, cols, bombs } = boardSettings;
  return ((rows * cols) - bombs);
}

export function calculateTileIndex(row, col, numOfCols) {
  return (row * numOfCols) + col;
}

export function calculateTileRow(tileIndex, numOfCols) {
  return Math.floor(tileIndex / numOfCols);
}

export function calculateTileCol(tileIndex, numOfCols) {
  return tileIndex % numOfCols;
}

const BoardFunctions = {
  createBoard, getNeighbors
}

export default BoardFunctions;
