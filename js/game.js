'use strict'


// Step1 – the seed app:
// 1. Create a 4x4 gBoard Matrix containing Objects. Place 2 mines manually when each cell’s isShown set to true.
// 2. Present the mines using renderBoard() function.

// gBoard – A Matrix containing cell objects: Each cell: { minesAroundCount: 4, isShown: false, isMine: false, isMarked: true }

const MINE = '💣'


var gGame = { 
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}
var gTimerInterval
var gBoard
var gLevel = [
    {size: 4, mines: 2},
    {size: 8, mines: 14},
    {size: 12, mines: 32},
]

var easyLvl = gLevel[0];
var mediumLvl = gLevel[1];
var hardLvl = gLevel[2]

var gChosenLevel

function startEasy() {
    gGame.isOn = false;
    gChosenLevel = easyLvl;
    onInit()
}

function startMedium() {
    gGame.isOn = false;
    gChosenLevel = mediumLvl;
    onInit()
}

function startHard() {
    gGame.isOn = false;
    gChosenLevel = hardLvl;
    onInit()
}

function onInit() {
    gBoard = buildBoard(gChosenLevel.size)
    setMinesNegsCount(gBoard)
    renderBoard(gBoard, '.board-container')
    console.log('gBoard', gBoard)
    
}

function buildBoard(size) {
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            var cellData = {
                minesAroundCount: 0,
                isShown: false, 
                isMine: false, 
                isMarked: false
            }
            board[i][j] = cellData
        }
    }
    for (var i = 0; i < gChosenLevel.mines; i++) {
        var cellI = getRandomIntInclusive(0, gChosenLevel.size - 1)
        var cellJ = getRandomIntInclusive(0, gChosenLevel.size - 1)
        var cell = board[cellI][cellJ]
        cell.isMine = true 
    }
    return board
}

function renderBoard(mat, selector) {
    
    var strHTML = '<table border="0"><tbody>'
    for (var i = 0; i < mat.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < mat[0].length; j++) {
            // var mine = (mat[i][j].isShown && mat[i][j].isMine)? MINE : ``;

            // var mineImg = (mat[i][j].isMine) ? '<img src="img/mine2.png">' : '';
            const cell = ''
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}" onclick="cellClicked(this, ${i}, ${j})">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    const elTable = document.querySelector(selector)
    elTable.innerHTML = strHTML
}


function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            var cell = board[i][j];
            cell.minesAroundCount = countMinesAround(i, j, board)
        }
        
    }
}

function countMinesAround(cellI, cellJ, board) {
    var neighborsCount = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
      if (i < 0 || i >= board.length) continue;
      for (var j = cellJ - 1; j <= cellJ + 1; j++) {
        if (j < 0 || j >= board[i].length) continue;
        if (i === cellI && j === cellJ) continue;
        if (board[i][j].isMine === true) neighborsCount++; // Change this line accordingly.
      }
    }
    return neighborsCount;
}

// Called when a cell (td) is clicked
function cellClicked(elCell, i, j) {
    var cell = gBoard[i][j]
    if(cell.isShown === false) {
        cell.isShown = true
        if(!cell.isMine){
            elCell.innerText = cell.minesAroundCount
        } else {
            elCell.innerText = MINE
        }
    }

}
// timer functions taken from the internet.
function startTimer() {
    pauseTimer();
    gTimerInterval = setInterval(() => { timer(); }, 10);
}
  
function pauseTimer() {
    clearInterval(gTimerInterval);
}

function timer() {
    if ((millisecond += 10) == 1000) {
      millisecond = 0;
      second++;
    }
    if (second == 60) {
      second = 0;
      minute++;
    }
    if (minute == 60) {
      minute = 0;
      hour++;
    }
    document.getElementById('hour').innerText = returnData(hour);
    document.getElementById('minute').innerText = returnData(minute);
    document.getElementById('second').innerText = returnData(second);
    document.getElementById('millisecond').innerText = returnData(millisecond);
}

function mineGenerator(board, numberOfMines) {
    
}



