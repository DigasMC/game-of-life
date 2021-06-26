// GAME OF LIFE

const sqSize = 20, sqSpace = 2
const cols = 40, rows = 40
const frameRate = 2 //fps
var gameItvl

const canvas = document.getElementById('canvas')
canvas.height = rows * sqSize
canvas.width = cols * sqSize

const ctx = canvas.getContext('2d')

let board = createBoard(cols, rows)


function createBoard(cols = 10, rows = 10) {
  let board = new Array(cols)
  for(let col = 0; col<cols; col++) {
    board[col] = new Array(rows)
  }
  return resetBoard(board)
}

function resetBoard(board) {
  for(let x = 0; x < board.length; x++) {
    for(let y = 0; y < board[x].length; y++) {
      board[x][y] = false
    }
  }
  return board
}

function randomizeBoard(board) {
  for(let x = 0; x < board.length; x++) {
    for(let y = 0; y < board[x].length; y++) {
      board[x][y] = Math.floor(Math.random() * 2) == 1
    }
  }
  return board
}

function drawBoard(board) {
  ctx.clearRect(0, 0, rows * sqSize, cols * sqSize)
  for(let x = 0; x < board.length; x++) {
    for(let y = 0; y < board[x].length; y++) {
      if(board[x][y]) {
        ctx.fillRect(x * sqSize, y * sqSize, sqSize, sqSize)
      }
    }
  }
}

function nextStep(board) {
  let secBoard = createBoard(cols, rows)
  for(let x = 0; x < board.length; x++) {
    for(let y = 0; y < board[x].length; y++) {
      let neig = countNeighbours(board, x, y)
      if(board[x][y] && (neig < 2 || neig > 3)) {
        secBoard[x][y] = false
      } else if(!board[x][y] && neig == 3) {
        secBoard[x][y] = true
      } else {
        secBoard[x][y] = board[x][y]
      }
    }
  }

  return secBoard
}

function countNeighbours(board, i, j) {
  let sum = 0
  
  for(let x = Math.max(0, i - 1); x <= Math.min(i + 1, cols - 1); x++) {
    for(let y = Math.max(0, j - 1); y <= Math.min(j + 1, rows - 1); y++) {
      if(board[x][y] && (x != i || y != j)) {
        sum = sum + 1
      }
    }
  }
    
  return sum

}

//Mouse drawing function
function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  
  return {
    x: Math.min(Math.floor((evt.clientX - rect.left) / sqSize), cols - 1),
    y: Math.min(Math.floor((evt.clientY - rect.top) / sqSize), rows - 1)
  };
}

canvas.addEventListener('click', function(evt) {
  var mousePos = getMousePos(canvas, evt);
  console.log(mousePos)
  board[mousePos.x][mousePos.y] = !board[mousePos.x][mousePos.y]
  drawBoard(board)
}, false);

function play() {
  gameItvl = setInterval(function() {
    drawBoard(board = nextStep(board))
  }, 200)
}

function pause() {
 clearInterval(gameItvl)
}

function stop() {
  pause()
  board = createBoard(cols, rows)
}


