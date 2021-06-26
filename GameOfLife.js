// GAME OF LIFE

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






//GAME LOOP
const sqSize = 20
const sqSpace = 2
const cols = 40, rows = 40
const canvas = document.getElementById('canvas')
canvas.height = rows * sqSize
canvas.width = cols * sqSize
const ctx = canvas.getContext('2d')

let board = createBoard(cols, rows)


function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  
  return {
    x: Math.floor((evt.clientX - rect.left) / sqSize),
    y: Math.floor((evt.clientY - rect.top) / sqSize)
  };
}
canvas.addEventListener('click', function(evt) {
  var mousePos = getMousePos(canvas, evt);
  board[mousePos.x][mousePos.y] = !board[mousePos.x][mousePos.y]
  drawBoard(board)
}, false);