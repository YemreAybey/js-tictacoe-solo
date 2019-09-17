const cells = document.querySelectorAll('.item');
const modal = document.querySelector('.modal-window')
const msg = document.querySelector('.msg');
const closing = document.querySelector('.closing');
const replay = document.getElementById('reset');

closing.addEventListener('click', () => {
  modal.classList.toggle('d-none');
  modal.classList.toggle('show-modal');
})
const Player = (name, sign) => {
  const theMoves = [];
  const play = (index, board) => {
    theMoves.push(parseInt(index));
    board.addSign(parseInt(index), this.sign);
  };
  return {name, sign, play, theMoves};
};

let player1 = Player('player1', 'X');
let player2 = Player('player2', 'O');

const Board = () => {
  const moves = new Array(9).fill(0);
  const winMoves = [
   [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8],
   [0, 3, 6],
   [1, 4, 7],
   [2, 5, 8],
   [2, 4, 6],
   [0, 4, 8]
  ];
  const addSign = (index, sign) => {
    moves[index] = sign;
  }

  const isFull = () => {
    return !moves.some(cell => cell == '0')
  }

  const checkWinner = playerMoves =>
    winMoves.some(trio => trio.every(move => playerMoves.includes(move)));
 return {moves, winMoves, addSign, isFull, checkWinner};
};

const uEx = (() => {
  const setName = () => {
    const name1 = document.getElementById('player-one-name');
    player1.name = name1.value === '' ? player1.name : name1.value;

    const name2 = document.getElementById('player-two-name');
    player2.name = name2.value === '' ? player2.name : name2.value;

    name1.disabled = true;
    name2.disabled = true;
  };

  const avName = () => {
    const name1 = document.getElementById('player-one-name');
    const name2 = document.getElementById('player-two-name');
    name1.value = '';
    name2.value = '';
    name1.disabled = false;
    name2.disabled = false;
  }

  const winMsg = player => {
    msg.innerHTML = `The winner is ${player.name}`;
    modal.classList.toggle('show-modal');
    modal.classList.toggle('d-none');
  };

  const tieMsg = () => {
    msg.innerHTML = 'It is a TIE!';
    modal.classList.toggle('show-modal');
    modal.classList.toggle('d-none');
  };

  const restart = () => {
    cells.forEach(cell => {
      cell.innerHTML = "";
      cell.disabled = false;
    })
  };

  const gameOver = () => {
    cells.forEach(cell => {cell.disabled = true;});
  }

  return {setName, avName, winMsg, tieMsg, restart, gameOver};

})();

let newBoard = Board();
cells.forEach(cell => {
  cell.addEventListener('click', () => {
    const player = newBoard.moves.filter(n => n === 0).length % 2 === 1
      ? player1 : player2;
    if (!cell.disabled) {
    cell.disabled = true;
    cell.innerHTML = player.sign;
    uEx.setName();
    player.play(cell.id, newBoard);
    if (newBoard.checkWinner(player.theMoves)) {
      uEx.gameOver();
      uEx.winMsg(player);
    } else if (newBoard.isFull()) {
      uEx.gameOver();
      uEx.tieMsg();
    }
  }
  })
});

replay.addEventListener('click', () => {
  newBoard = Board();
  player1 = Player('Player 1', 'X');
  player2 = Player('Player 2', 'O');
  uEx.avName();
  uEx.restart();
})