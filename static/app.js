const $wordForm = $(".word-form");
const $wordInput = $(".word");
const $wordBtn = $("#word-btn");
const $scoreBoard = $(".score-board");

// display current score as 0 at start of game
$scoreBoard.append(`SCORE = ${0}`);
// current score set to 0 at start of game
sessionStorage.setItem("current-score", 0);

gameTimer();

$wordForm.on("submit", handleWordSubmit);

async function handleWordSubmit(evt) {
  evt.preventDefault();
  word = $wordInput.val();
  const res = await axios.get("/word-check", { params: { word: word } });
  result = res.data.result;
  $wordInput.val("");

  // Check word validity
  if (result === "OK") {
    showMsg(result);
    handleSessionScore(word);
  } else if (result === "NOT ON BOARD") {
    showMsg(result);
  } else if (result === "NOT A WORD") {
    showMsg(result);
  }
}

async function showMsg(result) {
  const $msgPara = $(".word-msg");
  $msgPara.empty();
  $msgPara.append(result);
}

async function handleSessionScore(word) {
  let currentScore = parseInt(sessionStorage.getItem("current-score"));
  wordScore = word.length;
  currentScore += wordScore;
  sessionStorage.setItem("current-score", currentScore);
  $scoreBoard.empty();
  $scoreBoard.append(`SCORE = ${currentScore}`);
  checkHighScore(currentScore);
}

function gameTimer() {
  let sec = 60;
  $gameTimer = $(".game-timer");
  timer = setInterval(() => {
    $gameTimer.empty();
    $gameTimer.append(`TIMER = ${sec} second(s)`);
    sec--;

    if (sec === -1) {
      $wordInput.prop("disabled", true);
      clearInterval(timer);
    }
  }, 1000);
}

function checkHighScore(currentScore) {
  if (localStorage.getItem("high-score") === null) {
    localStorage.setItem("high-score", currentScore);
  } else if (currentScore > localStorage.getItem("high-score")) {
    localStorage.setItem("high-score", currentScore);
  }
}
