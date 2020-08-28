const formInfo = document.getElementById("form-info");
const submitBtn = document.getElementById("submit-btn");
const first = document.getElementById("first-player");
const second = document.getElementById("second-player");
const header = document.getElementById("card-header");
const body = document.getElementById("card-body");
const resetBtn = document.getElementById("reset-btn");

const win1 = document.getElementById("win1");
const win2 = document.getElementById("win2");
const lose1 = document.getElementById("lose1");
const lose2 = document.getElementById("lose2");
const match1 = document.getElementById("match1");
const match2 = document.getElementById("match2");

let firstWin = 0;
let secondWin = 0;

let firstLoss = 0;
let secondLoss = 0;

const box1 = document.getElementById("box-1");
const box2 = document.getElementById("box-2");
const box3 = document.getElementById("box-3");
const box4 = document.getElementById("box-4");
const box5 = document.getElementById("box-5");
const box6 = document.getElementById("box-6");
const box7 = document.getElementById("box-7");
const box8 = document.getElementById("box-8");
const box9 = document.getElementById("box-9");

const name1 = document.getElementById("name1");
const name2 = document.getElementById("name2");

const info = document.getElementById("info");
const board = document.getElementById("board");

let winner = "";
let count = 0;
let draw = false;
let winnerIndex = [];

let checkNewList = [];
let currentChoice = true;

let gameState = ["", "", "", "", "", "", "", "", ""];

let firstPlayerCombo = "";
let secondPlayerCombo = "";

let firstPlayer = "";
let secondPlayer = "";
let error = "Both players name are required";

let roundWin = false;

const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const handlerTitle = (player) => {
  header.innerHTML = `<span class="text-success">${capitalize(
    player
  )}</span>'s first turn!`;
};

const handlerForm = () => {
  firstPlayer = first.value;
  secondPlayer = second.value;

  if (firstPlayer === "" || secondPlayer === "") {
    info.classList.remove("d-none");
    board.classList.add("d-none");
  } else {
    info.classList.add("d-none");
    board.classList.remove("d-none");
    name1.innerHTML = `<span class="text-success">${capitalize(
      firstPlayer
    )}</span>`;
    header;
    name2.innerHTML = `<span class="text-danger">${capitalize(
      secondPlayer
    )}</span>`;
    handlerTitle(firstPlayer);
    event.preventDefault();
  }

  first.value = "";
  second.value = "";
};

const handlerCheck = () => {
  const checkList = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i <= checkList.length - 1; i++) {
    checkNewList = checkList[i].sort();
    let a = gameState[checkNewList[0]];
    let b = gameState[checkNewList[1]];
    let c = gameState[checkNewList[2]];
    if (a === "" && b === "" && c === "") {
      continue;
    } else if (a === b && b === c) {
      winnerIndex = [...checkNewList];
      handlerBody();
      winner = a;
      roundWin = true;
      handlerResult(a);
      break;
    }
  }
  const resetList = [box1, box2, box3, box4, box5, box6, box7, box8, box9];
  if (roundWin) {
    for (let i = 0; i <= resetList.length - 1; i++) {
      resetList[i].classList.add("disabled");
      for (let j = 0; j <= 2; j++) {
        if (i === checkNewList[j]) {
          resetList[i].classList.add("text-primary");
        }
      }
    }
  }
};

const handlerResult = (e) => {
  if (roundWin) {
    if (e === "x") {
      firstWin++;
      secondLoss++;
      win1.innerHTML = `${firstWin}`;
      lose2.innerHTML = `${secondLoss}`;
    } else if (e === "o") {
      secondWin++;
      firstLoss++;
      win2.innerHTML = `${secondWin}`;
      lose1.innerHTML = `${firstLoss}`;
    }
    match1.innerHTML = `${firstWin + secondWin}`;
  }
};

const getTikTacToe = (e) => {
  count++;
  if (currentChoice) {
    e.innerHTML = `<span class="material-icons-outlined">clear</span>`;
    e.classList.add("disabled");
    gameState[e.value - 1] = "x";
  } else {
    e.innerHTML = `<span class="material-icons-outlined">fiber_manual_record</span>`;
    e.classList.add("disabled");
    gameState[e.value - 1] = "o";
  }
  if(count === 7) {
    draw = true;
  }
  handlerCheck();
  handlerBody();
  currentChoice = !currentChoice;
};

const handlerBody = () => {
  if (!roundWin) {
    if (!draw) {
      if (currentChoice) {
        header.innerHTML = `<span class="text-danger">${capitalize(
          secondPlayer
        )}</span>'s turn`;
      } else {
        header.innerHTML = `<span class="text-success">${capitalize(
          firstPlayer
        )}</span>'s turn`;
      }
    } else {
      header.innerHTML = `<span class="text-primary">DRAW !!!</span>`;
    }
  } else {
    if (winner === "x") {
      header.innerHTML = `<span class="text-success">${firstPlayer.toUpperCase()} IS WINNER !!!</span>`;
    } else {
      header.innerHTML = `<span class="text-danger">${secondPlayer.toUpperCase()} IS WINNER !!!</span>`;
    }
  }
};

const handlerReset = () => {
  draw = false;
  count = 0;
  roundWin = false;
  const resetList = [box1, box2, box3, box4, box5, box6, box7, box8, box9];
  for (let i = 0; i <= resetList.length - 1; i++) {
    resetList[i].classList.remove("disabled");
    resetList[
      i
    ].innerHTML = `<span class="material-icons text-light">check_box_outline_blank</span>`;
    gameState[i] = "";
    winner = "";
    draw = false;
    const changeIndex = [...checkNewList];
    for (let j = 0; j <= 2; j++) {
      if (i === changeIndex[j]) {
        resetList[i].classList.remove("text-primary");
      }
    }
  }
};

submitBtn.addEventListener("click", handlerForm);
resetBtn.addEventListener("click", handlerReset);
box1.addEventListener("click", () => getTikTacToe(box1));
box2.addEventListener("click", () => getTikTacToe(box2));
box3.addEventListener("click", () => getTikTacToe(box3));
box4.addEventListener("click", () => getTikTacToe(box4));
box5.addEventListener("click", () => getTikTacToe(box5));
box6.addEventListener("click", () => getTikTacToe(box6));
box7.addEventListener("click", () => getTikTacToe(box7));
box8.addEventListener("click", () => getTikTacToe(box8));
box9.addEventListener("click", () => getTikTacToe(box9));
