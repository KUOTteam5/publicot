// 🍜 저녁 메뉴 룰렛
// 담당: 김경범
// 브랜치: feat/dinner

function startDinner() {
  const area = document.getElementById('dinner-area');
  if (!area) return;

  // 다시 누르면 이전 룰렛을 멈추고 새로 시작
  clearTimeout(startDinner.timer);

  const menus = [
    { name: '치킨', emoji: '🍗' },
    { name: '피자', emoji: '🍕' },
    { name: '햄버거', emoji: '🍔' },
    { name: '초밥', emoji: '🍣' },
    { name: '라멘', emoji: '🍜' },
    { name: '삼겹살', emoji: '🥓' },
    { name: '파스타', emoji: '🍝' },
    { name: '김치찌개', emoji: '🥘' },
    { name: '비빔밥', emoji: '🍚' },
    { name: '떡볶이', emoji: '🌶️' },
    { name: '돈가스', emoji: '🍱' },
    { name: '샌드위치', emoji: '🥪' }
  ];

  // 결과 화면은 dinner-area 안에만 생성
  area.innerHTML = `
    <div style="
      padding: 28px 20px;
      border: 2px solid #fed7aa;
      border-radius: 20px;
      background: #fff7ed;
      color: #431407;
      text-align: center;
      font-family: inherit;
    ">
      <h3 style="margin: 0 0 20px;">🍜 오늘 저녁은?</h3>

      <div data-dinner-emoji aria-hidden="true"
        style="font-size: 72px; line-height: 1.4;">🎲</div>

      <div data-dinner-name style="
        margin-top: 12px;
        font-size: 28px;
        font-weight: 800;
      ">메뉴 고르는 중</div>

      <p data-dinner-status role="status" style="
        margin: 16px 0 0;
        font-size: 15px;
        color: #9a3412;
      ">두근두근… 어떤 메뉴가 나올까요?</p>
    </div>
  `;

  const emoji = area.querySelector('[data-dinner-emoji]');
  const name = area.querySelector('[data-dinner-name]');
  const status = area.querySelector('[data-dinner-status]');

  // 최종 메뉴는 모든 메뉴가 같은 확률로 선택되도록 미리 결정
  const winner = Math.floor(Math.random() * menus.length);
  let current = Math.floor(Math.random() * menus.length);
  let step = 0;
  const totalSteps = 28;

  function showMenu(index) {
    emoji.textContent = menus[index].emoji;
    name.textContent = menus[index].name;
  }

  function spin() {
    // 다른 화면으로 바뀌었다면 중단
    if (!area.contains(name)) return;

    step++;

    if (step >= totalSteps) {
      showMenu(winner);
      status.textContent = '🎉 오늘 저녁 메뉴 확정! 맛있게 드세요!';
      name.style.color = '#ea580c';
      startDinner.timer = null;
      return;
    }

    current = (current + 1) % menus.length;
    showMenu(current);

    // 처음에는 빠르게, 마지막에는 천천히
    const progress = step / totalSteps;
    const delay = 45 + 280 * progress ** 3;

    startDinner.timer = setTimeout(spin, delay);
  }

  spin();
}