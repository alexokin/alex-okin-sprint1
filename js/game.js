'use strict'


// Step1 – the seed app:
// 1. Create a 4x4 gBoard Matrix containing Objects. Place 2 mines manually when each cell’s isShown set to true.
// 2. Present the mines using renderBoard() function.

// gBoard – A Matrix containing cell objects: Each cell: { minesAroundCount: 4, isShown: false, isMine: false, isMarked: true }

const MINE = '💣'
const FLAG = '🚩'

var gBoard = []

var gLevel = [
    {size: 4, mines: 2 , life: 2},
    {size: 8, mines: 14, life: 3},
    {size: 12, mines: 32, life: 3},
]

var easyLvl = gLevel[0];
var mediumLvl = gLevel[1];
var hardLvl = gLevel[2]
var gChosenLevel = easyLvl

var gGame = { 
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    lifeCount: gChosenLevel.life,
    secsPassed: 0
}

var gTimerInterval

var hour = 0;
var minute = 0;
var second = 0;
var millisecond = 0;



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
    clearInterval(gTimerInterval)
    
    gGame = { 
        isOn: false,
        shownCount: 0,
        markedCount: 0,
        lifeCount: gChosenLevel.life,
        secsPassed: 0
    }
    gGame.isOn = true
    resetTimer()
    gBoard = buildBoard(gChosenLevel.size)
    mineGenerator(gBoard)
    setMinesNegsCount(gBoard)
    showLifeLeft()
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

    // for (var i = 0; i < gChosenLevel.mines; i++) {
    //     var mineCount = 0
    //     var cellI = getRandomIntInclusive(0, gChosenLevel.size - 1)
    //     var cellJ = getRandomIntInclusive(0, gChosenLevel.size - 1)
    //     var cell = board[cellI][cellJ]
    //     cell.isMine = true 
    //     mineCount++
    // }
    // console.log('mineCount', mineCount)
    return board
}

function renderBoard(mat, selector) {
    
    var strHTML = '<table border="0" class=`table`><tbody>'
    for (var i = 0; i < mat.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < mat[0].length; j++) {
            // var mine = (mat[i][j].isShown && mat[i][j].isMine)? MINE : ``;

            // var mineImg = (mat[i][j].isMine) ? '<img src="img/mine2.png">' : '';
            const cell = ''
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}" onclick="cellClicked(this, ${i}, ${j})" oncontextmenu='markCell(this, event, ${i}, ${j})'>${cell}</td>`
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
    var mineCount = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
      if (i < 0 || i >= board.length) continue;
      for (var j = cellJ - 1; j <= cellJ + 1; j++) {
        if (j < 0 || j >= board[i].length) continue;
        if (i === cellI && j === cellJ) continue;
        if (board[i][j].isMine === true) mineCount++; // Change this line accordingly.
      }
    }
    return mineCount;
}

// Called when a cell (td) is clicked
function cellClicked(elCell, i, j) {
    if(!gGame.isOn) return
    if(!gGame.markedCount > gChosenLevel.mines) return
    startTimer()
    var cell = gBoard[i][j]
    if (cell.isMarked) return
    if (cell.isShown === false) {
        cell.isShown = true
        gGame.shownCount++
        console.log('gGame.shownCount', gGame.shownCount)
        if(!cell.isMine){
            elCell.innerText = cell.minesAroundCount
        }
        if(cell.isMine) {
            elCell.innerText = MINE
            // showAllMines()
            // clearInterval(gTimerInterval)
            gGame.lifeCount--
            showLifeLeft()
            console.log(`You stepped on a mine. ${gGame.lifeCount} lives left.`)
        }
        if(cell.minesAroundCount === 0 && !cell.isMine) {
            console.log('hello')
            console.log('cell', cell)
            showCellsAround(gBoard, i, j)
        }
    }
    checkGameOver()

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
function returnData(input) {
    return input > 10 ? input : `0${input}`
}
function resetTimer() {
    hour = 0;
    minute = 0;
    second = 0;
    millisecond = 0;

    document.getElementById('hour').innerText = returnData(hour);
    document.getElementById('minute').innerText = returnData(minute);
    document.getElementById('second').innerText = returnData(second);
    document.getElementById('millisecond').innerText = returnData(millisecond);
}

function showCellsAround(board ,cellI ,cellJ) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= board[i].length) continue;
            if (i === cellI && j === cellJ) continue;
            if (board[i][j].isShown === false) {
                board[i][j].isShown = true;
                gGame.shownCount++
                var elCell = document.querySelector(`.cell-${i}-${j}`);
                elCell.innerText = board[i][j].minesAroundCount;
            }; // Change this line accordingly.
        }
    }
}

function markCell(elCell, event, i, j) {
    event.preventDefault();
    var cell = gBoard[i][j]
    if(cell.isShown) return;
    if(!cell.isMarked){
        cell.isMarked = true;
        gGame.markedCount++
        console.log('markedCount', gGame.markedCount)
        elCell.innerText = FLAG
    } else {
        cell.isMarked = false;
        elCell.innerText = ''
        gGame.markedCount--
    }
}

function showAllMines(gBoard) {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            var cell = gBoard[i][j];
            if(cell.isMine && !cell.isShown){
                cell.isShown = true
                var elCell = document.querySelector(`.cell-${i}-${j}`)
                elCell.innerText = MINE
            }
        }
        
    }
}
function gameOverLost() {
    gGame.isOn = false;
    console.log('YOU LOSE, GAME OVER')
    showAllMines(gBoard)
    // renderBoard(gBoard, '.board-container')
    clearInterval(gTimerInterval)
}

function gameOver() {
    gGame.isOn = false;
    // showAllMines()
    console.log('GAMEOVER');
    renderBoard(gBoard, '.board-container')
    clearInterval(gTimerInterval)
}

function checkGameOver() {
    if (gGame.lifeCount <= 0) {
        console.log('YOU LOST!');
        gameOverLost()
    } else if (gGame.shownCount + gGame.markedCount === gBoard.length ** 2) {
        console.log('WINNER');
        gameOver()
    }
}

function showLifeLeft() {
    var elLifeDiv = document.querySelector('.lifeleft')
    elLifeDiv.innerText = `${gGame.lifeCount} LIVES LEFT`
}

function mineGenerator(gBoard) {
    var mineCount = 0
    for (var i = 0; i < gChosenLevel.mines; i++) {
        var cellI = getRandomIntInclusive(0, gChosenLevel.size - 1)
        var cellJ = getRandomIntInclusive(0, gChosenLevel.size - 1)
        var cell = gBoard[cellI][cellJ]
        cell.isMine = true 
        mineCount++
    }
    console.log('mineCount', mineCount)
}

