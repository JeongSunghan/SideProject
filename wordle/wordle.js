let answer = "";
let attempts = 0;
const maxAttempts = 5;
let startTime, endTime; // 타이머용 변수

// 랜덤 워드 API에서 단어를 가져오는 함수
function fetchNewWord() {
    fetch("https://random-word-api.herokuapp.com/word?number=1&length=5")
        .then((response) => response.json())
        .then((data) => {
            answer = data[0].toLowerCase();
            console.log("오늘의 단어: " + answer); // 콘솔에 정답 출력 (디버깅용)
        })
        .catch((error) => {
            console.error("단어를 불러오는 중 오류:", error);
            alert("단어를 불러오는 데 실패했습니다. 다시 시도해주세요.");
        });
}

// 게임 초기화 함수 (정답과 입력 필드 모두 초기화)
function resetGame() {
    // 게임 종료 시 이전 시도 기록 초기화
    document.querySelector("#previousAttemptsContainer").innerHTML = "<h3>이전 시도:</h3>";

    // 입력 필드 초기화
    const inputs = document.querySelectorAll(".input");
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = "";          // 입력 필드 값 초기화
        inputs[i].style.background = ""; // 입력 필드 배경색 초기화
    }

    // 시도 횟수 및 타이머 초기화
    attempts = 0;
    startTime = null;

    // 새 단어 불러오기
    fetchNewWord();

    // 게임 UI 초기화
    document.getElementById("gameContainer").style.display = "none"; // 게임 화면 숨기기
    document.getElementById("playerForm").style.display = "block";   // 닉네임 입력 폼 다시 표시
    document.getElementById("nickname").value = "";                 // 닉네임 입력 필드 초기화
}

// 페이지가 로드될 때 첫 단어를 가져옴
fetchNewWord();

// 닉네임을 입력받아 게임을 시작
document.getElementById("playerForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const nickname = document.getElementById("nickname").value;
    if (!nickname) {
        alert("닉네임을 입력해주세요.");
        return;
    }

    // 닉네임 중복 체크
    if (!isNicknameUnique(nickname)) {
        alert("닉네임이 이미 사용 중입니다. 다른 닉네임을 입력하세요.");
        return;
    }

    // 게임 시작
    document.getElementById("gameContainer").style.display = "block";
    startTime = new Date(); // 시작 시간 기록
    document.getElementById("playerForm").style.display = "none"; // 닉네임 입력 숨기기
});

// 닉네임 중복 확인 함수
function isNicknameUnique(nickname) {
    const results = JSON.parse(localStorage.getItem("results")) || [];
    return !results.some(result => result.nickname === nickname);
}

// 제출 버튼 클릭 시 실행
document.querySelector("#submitBtn").addEventListener("click", function () {
    const inputs = document.querySelectorAll(".input");
    let userGuess = "";
  
    // 사용자 입력 값을 저장
    for (let i = 0; i < inputs.length; i++) {
      userGuess += inputs[i].value.toLowerCase();
    }
  
    const previousAttempt = document.createElement('div');
    previousAttempt.classList.add('attempt-row');
  
    // 각 칸을 비교하여 시각적 피드백 제공
    let correctGuessCount = 0; // 정답 맞춘 칸 수
  
    for (let i = 0; i < answer.length; i++) {
      const resultBox = document.createElement('input');
      resultBox.disabled = true;  // 입력 불가
  
      if (inputs[i].value.toLowerCase() === answer[i]) {
        resultBox.style.background = "green"; // 정답 위치
        correctGuessCount++; // 맞춘 칸 수 증가
      } else if (answer.includes(inputs[i].value.toLowerCase())) {
        resultBox.style.background = "yellow"; // 정답 포함, 위치 다름
      } else {
        resultBox.style.background = "lightgrey"; // 정답 아님
      }
  
      resultBox.value = inputs[i].value.toLowerCase();
      resultBox.classList.add("input");
      previousAttempt.appendChild(resultBox);
    }
  
    // 이전 시도 기록을 추가
    document.querySelector("#previousAttemptsContainer").appendChild(previousAttempt);
  
    // 모든 칸이 정답인 경우 게임 종료
    if (correctGuessCount === answer.length) {
      endTime = new Date();
      const timeTaken = (endTime - startTime) / 1000;
      saveResult(timeTaken, attempts + 1); // 시도 횟수 +1
      alert("정답! 경과 시간: " + timeTaken + "초");
      resetGame(); // 정답을 맞추면 즉시 게임 종료
      return; // 종료 후 더 이상 진행하지 않음
    }
  
    // 시도 횟수 증가
    attempts++;
  
    // 게임 종료 조건: 시도 횟수 초과
    if (attempts >= maxAttempts) {
      alert("게임 종료! 정답은: " + answer);
      resetGame(); // 시도 횟수를 모두 소진하면 게임 종료
      return;
    } else {
      // 새로운 입력을 위해 기존 필드 초기화
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
        inputs[i].style.background = "";
      }
      inputs[0].focus();
    }
  });

// 결과 저장 함수 (로컬 스토리지)
function saveResult(timeTaken, attempts) {
    const nickname = document.getElementById("nickname").value;
    const result = { nickname, attempts, timeTaken };
    let results = JSON.parse(localStorage.getItem("results")) || [];
    results.push(result);
    localStorage.setItem("results", JSON.stringify(results));
}

// 리더보드 표시 함수
function displayLeaderboard() {
    let results = JSON.parse(localStorage.getItem("results")) || [];

    // 시도 횟수가 적고, 시간이 빠른 순으로 정렬
    results.sort((a, b) => {
        if (a.attempts === b.attempts) {
            return a.timeTaken - b.timeTaken; // 시도가 같다면 시간 기준으로 비교
        }
        return a.attempts - b.attempts; // 시도 횟수 기준으로 정렬
    });

    let leaderboardHtml = '<ul>';
    results.forEach((result, index) => {
        leaderboardHtml += `<li>${index + 1}. ${result.nickname} - ${result.attempts}회 시도, ${result.timeTaken}초 소요</li>`;
    });
    leaderboardHtml += '</ul>';

    document.getElementById("leaderboard").innerHTML = leaderboardHtml;
}

// 페이지 로드 시 리더보드 갱신
window.onload = function () {
    displayLeaderboard();
};

// 조작
// 각 입력 필드에 대해 자동으로 다음 필드로 이동 + 백스페이스 누르면 이전 필드로 이동
document.querySelectorAll('.input').forEach((input, index, array) => {
    // 입력했을 때 다음 필드로 이동
    input.addEventListener('input', function () {
      if (this.value.length === 1 && index < array.length - 1) {
        array[index + 1].focus(); // 현재 입력이 완료되면 다음 필드로 포커스 이동
      }
    });
  
    // 백스페이스를 눌렀을 때 이전 필드로 이동
    input.addEventListener('keydown', function (event) {
      if (event.key === "Backspace" && this.value === "" && index > 0) {
        array[index - 1].focus(); // 이전 필드로 포커스 이동
      }
    });

    input.addEventListener('enter', function(event) {
        if(event.key === "Enter" && this.value === "" && index > 0) { 
            
        }
    })
  });

  // ㅇ
  