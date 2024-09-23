// 게임에 사용할 카드 배열
const cards = ['1', '2', '3', '4', 'JOKER', '6', '7'];
let isGameOver = false;

// 게임 시작 시 카드를 섞는 함수
function shuffleCards(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
}

// 섞인 카드를 게임 보드에 추가하는 함수
function renderCards() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = ''; // 기존의 카드를 초기화

    // 카드 요소들 생성
    const cardElements = shuffleCards(cards).map((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card', 'hidden');
        cardElement.setAttribute('data-card', card);
        cardElement.innerText = '?'; // 카드가 숨겨진 상태
        cardElement.style.transform = `translate(${index * 110}px, 0)`; // 처음에 고정 위치
        cardElement.addEventListener('click', () => revealCard(cardElement, card));
        return cardElement;
    });

    // 카드들을 게임 보드에 추가
    cardElements.forEach(card => gameBoard.appendChild(card));

    // 카드 섞기 애니메이션 실행
    setTimeout(() => {
        cardElements.forEach((card, index) => {
            card.classList.add('shuffle');
        });
    }, 100);

    // 섞는 애니메이션이 끝난 후 원래 자리로 돌아오기
    setTimeout(() => {
        cardElements.forEach((card, index) => {
            card.classList.remove('shuffle');
            card.style.transform = `translate(${index * 110}px, 0)`;
            card.style.opacity = 1;
        });
    }, 1500); // 애니메이션이 끝나는 시간(1.5초) 후 원래 자리로
}

// 카드 클릭 시 호출되는 함수
function revealCard(cardElement, card) {
    if (isGameOver || !cardElement.classList.contains('hidden')) return; // 이미 끝났거나 뒤집힌 카드 무시

    cardElement.classList.remove('hidden');
    cardElement.innerText = card;

    if (card === 'JOKER') {
        document.getElementById('message').innerText = '조커를 뽑았습니다! 게임 오버!';
        isGameOver = true;
    } else {
        document.getElementById('message').innerText = `${card}을(를) 뽑았습니다! 계속하세요!`;
    }
}

// 게임 초기화
function initGame() {
    isGameOver = false;
    document.getElementById('message').innerText = '카드를 선택하세요!';
    renderCards();
}

// 게임 시작
initGame();
