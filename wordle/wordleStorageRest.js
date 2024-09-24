// 초기화 버튼 클릭 시 실행되는 함수
document.querySelector("#clearDataBtn").addEventListener("click", function () {
    // 비밀번호 입력창 표시
    const password = prompt("비밀번호를 입력하세요:");
  
    if (password === "2683") {
      localStorage.removeItem("results");
      alert("기록이 초기화되었습니다.");
      displayLeaderboard(); // 리더보드 갱신
    } else {
      alert("비밀번호가 틀렸습니다. 기록을 초기화할 수 없습니다.");
    }
  });
  
  
  
  