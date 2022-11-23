'use strict'
function renderBoard(mat, selector) {

  var strHTML = '<table border="0"><tbody>'
  for (var i = 0; i < mat.length; i++) {

      strHTML += '<tr>'
      for (var j = 0; j < mat[0].length; j++) {

          const cell = mat[i][j]
          const className = `cell cell-${i}-${j}`

          strHTML += `<td class="${className}">${cell}</td>`
      }
      strHTML += '</tr>'
  }
  strHTML += '</tbody></table>'

  const elContainer = document.querySelector(selector)
  elContainer.innerHTML = strHTML
}
// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}
// function which receives rows and cols as params, the output is array of arrays. can be used to get a matrix.
function createMat(ROWS, COLS) {
    const mat = []
    for (var i = 0; i < ROWS; i++) {
        const row = []
        for (var j = 0; j < COLS; j++) {
            row.push('')
        }
        mat.push(row)
    }
    return mat
}
// returns a random number between the given mix and max.
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
  }
// receives index I, index J of a cell, and the board, returns the count of neighboring cells.
function countNeighbors(cellI, cellJ, board) {
    var neighborsCount = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
      if (i < 0 || i >= board.length) continue;
      for (var j = cellJ - 1; j <= cellJ + 1; j++) {
        if (j < 0 || j >= board[i].length) continue;
        if (i === cellI && j === cellJ) continue;
        if (board[i][j].gameElement === BALL) neighborsCount++; // Change this line accordingly.
      }
    }
    return neighborsCount;
  }
// output is an array of objects containing empty indexes on board.
function getEmptyCells() {
    const emptyCells = []
    for (var i = 0; i < gBoard.length; i++) {
      for (var j = 0; j < gBoard[0].length; j++) {
        if (gBoard[i][j].type !== WALL && !gBoard[i][j].gameElement) { // change this line accordingly.
          emptyCells.push({ i, j })
        }
      }
    }
    return emptyCells
  }
// output is a color code to apply for css.
function getRandomColor() {
    const letters = '0123456789ABCDEF'
    var color = '#'
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}
// Gets a string such as:  'cell-2-7' and returns {i:2, j:7}
function getCellCoord(strCellId) {
    var coord = {}
    var parts = strCellId.split('-')
    coord.i = +parts[1]
    coord.j = +parts[2]
    return coord
}
// Loops through the board, checking for empty cells, pushes them to a new array "emptyCellsPos". output is a SINGLE empty cell.
function getEmptyCell() {
    var emptyCellsPos = []
    var emptyCell
    for (var i = 1; i < gBoard.length - 1; i++) {
        for (var j = 1; j < gBoard[i].length - 1; j++) {
            var currCell = gBoard[i][j];
            if(currCell.gameElement === null) { //change this like accordingly
                var emptyCellPos = {i: i, j: j}
                emptyCellsPos.push(emptyCellPos)
            }
        }
    }
    var shuffleCells = shuffle(emptyCellsPos)
    emptyCell = shuffleCells.pop()
    return emptyCell

}
// accepts array as parameter, returns a shuffled array.
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
    while (currentIndex != 0) {

    // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

    // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
  }

  return array;
}
// draws a num from gNums array created by the function below.
function drawNum() {
    var num = gNums.pop()
    return num
}
// returns an array of numbers 
function getNums(firstnum, num) {
    var nums = []
    for (var i = firstnum; i <= num; i++){
        nums.push(i)
    }
    return nums
}