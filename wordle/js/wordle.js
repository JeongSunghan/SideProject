// F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U 방지
document.addEventListener("keydown", (e) => {
  if (
    e.key === "F12" || 
    (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J")) ||
    (e.ctrlKey && e.key === "U")
  ) {
    e.preventDefault();
    alert("개발자 도구 사용이 금지되었습니다.");
  }
});

// 우클릭 방지
document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  alert("우클릭은 금지되어 있습니다.");
});

let answer = "";
let attempts = 0;
const maxAttempts = 6;  // 단어 맞추는 최대 횟수
let startTime, endTime;
let hintUsage = 0; // 힌트 사용 횟수
const maxHints = 2; // 힌트 사용 가능 횟수

// 단어를 가져오는 함수
function fetchWord() {
  const primaryApiUrl = "https://random-word-api.herokuapp.com/word?length=5";
  const fallbackApiUrl = "https://random-word-api.herokuapp.com/all";

  fetch(primaryApiUrl)
    .then((response) => {
      if (!response.ok) throw new Error("Primary API failed");
      return response.json();
    })
    .then((data) => {
      if (data.length > 0) {
        answer = data[0].toLowerCase(); // 첫 번째 단어 선택
        console.log("5글자 단어 가져오기 성공 (기본 API):", answer);
      } else {
        throw new Error("Primary API returned no data");
      }
    })
    .catch(() => {
      console.warn("기본 API 실패, 대체 API 호출 중...");
      fetch(fallbackApiUrl)
        .then((response) => response.json())
        .then((allWords) => {
          const fiveLetterWords = allWords.filter(word => word.length === 5);
          if (fiveLetterWords.length > 0) {
            answer = fiveLetterWords[Math.floor(Math.random() * fiveLetterWords.length)].toLowerCase();
            console.log("5글자 단어 가져오기 성공 (대체 API):", answer);
          } else {
            console.error("5글자 단어를 찾을 수 없습니다.");
          }
        })
        .catch((error) => {
          console.error("대체 API도 실패했습니다.", error);
          alert("단어를 가져오는 데 실패했습니다. 다시 시도해주세요.");
        });
    });
}
fetchWord();

// 게임 초기화 함수
function resetGame() {
  document.querySelector("#previousAttemptsContainer").innerHTML = "<h3>이전 시도:</h3>";

  const inputs = document.querySelectorAll(".input");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
    inputs[i].style.background = "";
  }

  attempts = 0;
  hintUsage = 0; // 힌트 사용 횟수 초기화
  startTime = null;
  fetchWord(); // 단어 재설정

  document.getElementById("gameContainer").style.display = "none";
  document.getElementById("playerForm").style.display = "block";
  document.getElementById("nickname").value = "";
}

// 닉네임 확인 후 게임 시작
document.getElementById("playerForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const nickname = document.getElementById("nickname").value;
  if (!nickname) {
    alert("닉네임을 입력해주세요.");
    return;
  }

  if (!isNicknameUnique(nickname)) {
    alert("닉네임이 이미 사용 중입니다. 다른 닉네임을 입력하세요.");
    return;
  }

  document.getElementById("gameContainer").style.display = "block";
  startTime = new Date(); // 시작 시간 기록
  document.getElementById("playerForm").style.display = "none"; // 닉네임 입력 숨기기
});

// 닉네임 중복 확인 함수
function isNicknameUnique(nickname) {
  const results = getResults();
  return !results.some(result => result.nickname === nickname);
}

// 게임 종료 확인 함수
function checkGameOver(correctGuessCount) {
  if (correctGuessCount === answer.length) {
    endTime = new Date();
    const timeTaken = (endTime - startTime) / 1000;
    saveResult(timeTaken, attempts + 1);
    alert("정답! 경과 시간: " + timeTaken + "초");
    resetGame();
    return true;
  }

  if (attempts >= maxAttempts) {
    alert("게임 종료! 정답은: " + answer);
    resetGame();
    return true;
  }

  return false;
}

// 결과 저장 함수
function saveResult(timeTaken, attempts) {
  const nickname = document.getElementById("nickname").value;
  const result = { nickname, attempts, timeTaken };
  const results = getResults();
  results.push(result);
  localStorage.setItem("results", JSON.stringify(results));
}

// 로컬 스토리지에서 결과 가져오기
function getResults() {
  return JSON.parse(localStorage.getItem("results")) || [];
}

// 제출 버튼 클릭 시 실행
document.querySelector("#submitBtn").addEventListener("click", function () {
  const inputs = document.querySelectorAll(".input");
  let userGuess = "";

  for (let i = 0; i < inputs.length; i++) {
    userGuess += inputs[i].value.toLowerCase();
  }

  const previousAttempt = document.createElement("div");
  previousAttempt.classList.add("attempt-row");

  let correctGuessCount = 0;

  for (let i = 0; i < answer.length; i++) {
    const resultBox = document.createElement("div");
    resultBox.classList.add("input-box");

    if (inputs[i].value.trim() === "") {
      resultBox.classList.add("grey");
    } else if (inputs[i].value.toLowerCase() === answer[i]) {
      resultBox.classList.add("green");
      correctGuessCount++;
    } else if (answer.includes(inputs[i].value.toLowerCase())) {
      resultBox.classList.add("yellow");
    } else {
      resultBox.classList.add("grey");
    }

    resultBox.textContent = inputs[i].value.toLowerCase() || "_";
    previousAttempt.appendChild(resultBox);
  }

  document.querySelector("#previousAttemptsContainer").appendChild(previousAttempt);

  attempts++;
  if (checkGameOver(correctGuessCount)) return;

  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
    inputs[i].style.background = "";
  }
  inputs[0].focus();
});

// 힌트 제공
document.getElementById("hintBtn").addEventListener("click", function () {
  if (hintUsage >= maxHints) {
    alert("더 이상 힌트를 사용할 수 없습니다.");
    return;
  }

  const hintIndex = parseInt(prompt("몇 번째 글자의 힌트를 받으시겠습니까? (1~5 사이의 숫자를 입력하세요)"), 10);

  if (isNaN(hintIndex) || hintIndex < 1 || hintIndex > 5) {
    alert("유효한 숫자를 입력하세요 (1~5).");
    return;
  }

  const adjustedIndex = hintIndex - 1;
  const input = document.querySelectorAll(".input")[adjustedIndex];
  if (input.value.toLowerCase() === answer[adjustedIndex]) {
    alert("이미 맞춘 글자입니다! 다른 글자의 힌트를 선택해주세요.");
    return;
  }

  alert("힌트: 정답의 " + hintIndex + "번째 글자는 '" + answer[adjustedIndex].toUpperCase() + "' 입니다.");
  hintUsage++;
});

// 리더보드 표시
const leaderboardIcon = document.getElementById("leaderboardIcon");
const leaderboardPopup = document.getElementById("leaderboardPopup");
const closePopup = document.querySelector(".popup .close");

leaderboardIcon.addEventListener("click", function () {
  leaderboardPopup.style.display = "block";
  displayLeaderboard();
});

closePopup.addEventListener("click", function () {
  leaderboardPopup.style.display = "none";
});

window.addEventListener("click", function (event) {
  if (event.target === leaderboardPopup) {
    leaderboardPopup.style.display = "none";
  }
});

function displayLeaderboard() {
  const results = getResults();
  const leaderboardList = document.getElementById("leaderboardList");
  leaderboardList.innerHTML = "";

  if (results.length === 0) {
    const noRecordItem = document.createElement("li");
    noRecordItem.textContent = "아직 기록이 정해지지 않았어요!";
    leaderboardList.appendChild(noRecordItem);
  } else {
    results.forEach((result, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${index + 1}. ${result.nickname} - ${result.attempts}회 시도, ${result.timeTaken}초 소요`;
      leaderboardList.appendChild(listItem);
    });
  }
}

// 입력 필드 이동 처리
document.querySelectorAll(".input").forEach((input, index, array) => {
  input.addEventListener("input", function () {
    if (this.value.length === 1 && index < array.length - 1) {
      setTimeout(() => array[index + 1].focus(), 50);
    }
  });

  input.addEventListener("keydown", function (event) {
    if (event.key === "Backspace" && this.value === "" && index > 0) {
      array[index - 1].focus();
    }
  });
});
