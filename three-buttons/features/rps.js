// ✊ 가위바위보
// 담당: (여기에 이름)
// 브랜치: feat/rps
//
// 만들 것: 컴퓨터와 가위바위보 대결, 승·무·패 전적까지 보여주는 게임
//
// 규칙
//  - 이 파일만 수정하세요. index.html, style.css, 다른 기능 파일은 건드리지 않습니다.
//  - 결과는 rps-area 안에만 그립니다.
//  - 버튼을 누를 때마다 startRps()이 호출됩니다.

const RPS_HANDS = [
  { id: 'rock', emoji: '✊', name: '바위' },
  { id: 'scissors', emoji: '✌️', name: '가위' },
  { id: 'paper', emoji: '🖐️', name: '보' },
];
const RPS_BEATS = { rock: 'scissors', scissors: 'paper', paper: 'rock' };

// Kept outside startRps so the record survives switching tabs
const rpsRecord = { win: 0, draw: 0, lose: 0 };
let rpsTimer = null;

function startRps() {
  const area = document.getElementById('rps-area');

  if (rpsTimer) clearInterval(rpsTimer);
  rpsTimer = null;

  const handBtnStyle = `display:flex;flex-direction:column;align-items:center;gap:6px;padding:14px 22px;
    background:var(--box);color:var(--text);border:1px solid transparent;border-radius:6px;
    font:inherit;font-weight:700;cursor:pointer;`;

  area.innerHTML = `
    <div style="display:flex;flex-direction:column;align-items:center;gap:20px;text-align:center;">
      <strong style="font-size:20px;">✊ 컴퓨터와 가위바위보</strong>

      <div style="display:flex;align-items:center;justify-content:center;gap:28px;">
        <div><div id="rps-me" style="font-size:64px;line-height:1.2;">❔</div><span style="color:var(--sub);font-size:14px;">나</span></div>
        <span style="color:var(--pink);font-weight:700;">VS</span>
        <div><div id="rps-com" style="font-size:64px;line-height:1.2;">❔</div><span style="color:var(--sub);font-size:14px;">컴퓨터</span></div>
      </div>

      <p id="rps-result" style="min-height:1.6em;font-size:22px;font-weight:700;">아래에서 하나를 골라보세요</p>

      <div id="rps-hands" style="display:flex;flex-wrap:wrap;justify-content:center;gap:12px;">
        ${RPS_HANDS.map((h) => `
          <button data-hand="${h.id}" style="${handBtnStyle}">
            <span style="font-size:32px;">${h.emoji}</span>${h.name}
          </button>`).join('')}
      </div>

      <div style="display:flex;align-items:center;gap:16px;color:var(--sub);font-size:15px;">
        <span id="rps-record"></span>
        <button id="rps-reset" style="padding:6px 12px;background:transparent;color:var(--muted);
                border:1px solid var(--muted);border-radius:6px;font:inherit;font-size:13px;cursor:pointer;">전적 초기화</button>
      </div>
    </div>
  `;

  const meEl = area.querySelector('#rps-me');
  const comEl = area.querySelector('#rps-com');
  const resultEl = area.querySelector('#rps-result');
  const recordEl = area.querySelector('#rps-record');
  const handBtns = area.querySelectorAll('#rps-hands button');

  const renderRecord = () => {
    const { win, draw, lose } = rpsRecord;
    const total = win + draw + lose;
    const rate = total ? Math.round((win / total) * 100) : 0;
    recordEl.innerHTML = `<b style="color:var(--text);">${win}</b>승 <b style="color:var(--text);">${draw}</b>무 <b style="color:var(--text);">${lose}</b>패 · 승률 ${rate}%`;
  };

  const play = (myId) => {
    const me = RPS_HANDS.find((h) => h.id === myId);
    const com = RPS_HANDS[Math.floor(Math.random() * RPS_HANDS.length)];

    handBtns.forEach((b) => {
      b.disabled = true;
      b.style.borderColor = b.dataset.hand === myId ? 'var(--pink)' : 'transparent';
    });
    meEl.textContent = me.emoji;
    resultEl.textContent = '가위, 바위, 보!';
    resultEl.style.color = 'var(--text)';

    // Shuffle the computer's hand briefly before revealing it
    let i = 0;
    rpsTimer = setInterval(() => {
      comEl.textContent = RPS_HANDS[i++ % RPS_HANDS.length].emoji;
    }, 80);

    setTimeout(() => {
      clearInterval(rpsTimer);
      rpsTimer = null;
      comEl.textContent = com.emoji;

      let outcome = 'draw';
      if (RPS_BEATS[me.id] === com.id) outcome = 'win';
      else if (RPS_BEATS[com.id] === me.id) outcome = 'lose';
      rpsRecord[outcome]++;

      const text = { win: '이겼다! 🎉', draw: '비겼다! 🤝', lose: '졌다... 😢' };
      const color = { win: 'var(--pink)', draw: 'var(--text)', lose: 'var(--muted)' };
      resultEl.textContent = text[outcome];
      resultEl.style.color = color[outcome];

      renderRecord();
      handBtns.forEach((b) => (b.disabled = false));
    }, 700);
  };

  handBtns.forEach((b) => b.addEventListener('click', () => play(b.dataset.hand)));

  area.querySelector('#rps-reset').addEventListener('click', () => {
    Object.assign(rpsRecord, { win: 0, draw: 0, lose: 0 });
    renderRecord();
  });

  renderRecord();
}
