// 🍜 저녁 메뉴 룰렛
// 담당: (여기에 이름)
// 브랜치: feat/dinner
//
// 만들 것: 버튼을 누르면 룰렛이 돌아가며 오늘 저녁 메뉴를 골라주는 프로그램
//
// 규칙
//  - 이 파일만 수정하세요. index.html, style.css, 다른 기능 파일은 건드리지 않습니다.
//  - 결과는 dinner-area 안에만 그립니다.
//  - 버튼을 누를 때마다 startDinner()이 호출됩니다.

function startDinner() {
  const area = document.getElementById('dinner-area');

  // 아래 안내 문구를 지우고 기능을 만들어 주세요
  area.innerHTML = `
    <div class="placeholder">
      <strong>🍜 저녁 메뉴 룰렛</strong>
      <span>아직 개발 중입니다</span>
      <code>features/dinner.js</code>
    </div>
  `;
}
