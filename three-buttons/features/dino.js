// 🦖 공룡 게임
// 담당: (여기에 이름)
// 브랜치: feat/dino
//
// 만들 것: 스페이스바로 점프해서 선인장을 피하는 크롬 공룡 스타일 게임
//
// 규칙
//  - 이 파일만 수정하세요. index.html, style.css, 다른 기능 파일은 건드리지 않습니다.
//  - 결과는 dino-area 안에만 그립니다.
//  - 버튼을 누를 때마다 startDino()이 호출됩니다.

const DINO_W = 800;
const DINO_H = 240;
const DINO_GROUND = 200;
const DINO_X = 60;
const DINO_SIZE = { w: 40, h: 44 };
const DINO_GRAVITY = 2400;
const DINO_JUMP = 820;

let dinoFrame = null;
let dinoKeyHandler = null;
let dinoBest = 0;

function startDino() {
  const area = document.getElementById('dino-area');

  // Re-clicking the tab re-renders, so tear down the previous game first
  if (dinoFrame) cancelAnimationFrame(dinoFrame);
  dinoFrame = null;
  if (dinoKeyHandler) document.removeEventListener('keydown', dinoKeyHandler);

  // The 01 button keeps focus after the click; Space on it would restart the game
  document.activeElement?.blur();

  area.innerHTML = `
    <div style="display:flex;flex-direction:column;align-items:center;gap:12px;">
      <strong style="font-size:20px;">🦖 공룡 게임</strong>
      <canvas id="dino-canvas" width="${DINO_W}" height="${DINO_H}"
              style="display:block;width:100%;height:auto;border-radius:6px;background:#170a0e;
                     cursor:pointer;touch-action:manipulation;"></canvas>
      <p style="color:var(--sub);font-size:14px;">스페이스바 · ↑ 키 · 화면 터치로 점프</p>
    </div>
  `;

  const canvas = area.querySelector('#dino-canvas');
  const ctx = canvas.getContext('2d');
  const game = { mode: 'ready', y: 0, vy: 0, obstacles: [], speed: 0, untilNext: 0, score: 0 };
  let last = 0;

  const reset = () => {
    Object.assign(game, { mode: 'running', y: 0, vy: 0, obstacles: [], speed: 360, untilNext: 300, score: 0 });
  };

  const hit = (o) => {
    const inset = 6;
    const dinoTop = DINO_GROUND - game.y - DINO_SIZE.h;
    return (
      DINO_X + inset < o.x + o.w &&
      DINO_X + DINO_SIZE.w - inset > o.x &&
      dinoTop + inset < DINO_GROUND &&
      DINO_GROUND - game.y - inset > DINO_GROUND - o.h
    );
  };

  const tick = (now) => {
    // Stop quietly when another tab's area is shown
    if (!area.classList.contains('show')) {
      dinoFrame = null;
      game.mode = 'ready';
      drawDino(ctx, game);
      return;
    }

    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;

    game.vy -= DINO_GRAVITY * dt;
    game.y = Math.max(0, game.y + game.vy * dt);
    if (game.y === 0) game.vy = 0;

    game.speed = Math.min(game.speed + 12 * dt, 900);
    game.score += (game.speed * dt) / 40;

    game.obstacles.forEach((o) => (o.x -= game.speed * dt));
    game.obstacles = game.obstacles.filter((o) => o.x + o.w > 0);

    game.untilNext -= game.speed * dt;
    if (game.untilNext <= 0) {
      game.obstacles.push({ x: DINO_W, w: 18 + Math.random() * 16, h: 30 + Math.random() * 26 });
      // Gap grows with speed so a landing always leaves room for the next jump
      game.untilNext = 300 + game.speed * 0.4 + Math.random() * 260;
    }

    if (game.obstacles.some(hit)) {
      game.mode = 'over';
      dinoBest = Math.max(dinoBest, Math.floor(game.score));
      dinoFrame = null;
      drawDino(ctx, game);
      return;
    }

    drawDino(ctx, game);
    dinoFrame = requestAnimationFrame(tick);
  };

  const press = () => {
    if (game.mode === 'running') {
      if (game.y === 0) game.vy = DINO_JUMP;
      return;
    }
    reset();
    last = performance.now();
    dinoFrame = requestAnimationFrame(tick);
  };

  dinoKeyHandler = (e) => {
    if (e.code !== 'Space' && e.code !== 'ArrowUp') return;
    if (!area.classList.contains('show')) return;
    e.preventDefault();
    if (!e.repeat) press();
  };
  document.addEventListener('keydown', dinoKeyHandler);

  canvas.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    press();
  });

  drawDino(ctx, game);
}

function drawDino(ctx, game) {
  ctx.clearRect(0, 0, DINO_W, DINO_H);

  // Ground
  ctx.fillStyle = '#b9a3aa';
  ctx.fillRect(0, DINO_GROUND, DINO_W, 2);

  // Dino: body, head, eye, legs
  const top = DINO_GROUND - game.y - DINO_SIZE.h;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(DINO_X, top + 14, 30, 22);
  ctx.fillRect(DINO_X + 18, top, 22, 16);
  ctx.fillRect(DINO_X - 8, top + 16, 10, 8);
  ctx.fillRect(DINO_X + 4, top + 36, 7, 8);
  ctx.fillRect(DINO_X + 19, top + 36, 7, 8);
  ctx.fillStyle = '#170a0e';
  ctx.fillRect(DINO_X + 30, top + 4, 4, 4);

  // Cacti with a small arm on each side
  ctx.fillStyle = '#ff3b6b';
  game.obstacles.forEach((o) => {
    const t = DINO_GROUND - o.h;
    ctx.fillRect(o.x, t, o.w, o.h);
    ctx.fillRect(o.x - 6, t + o.h * 0.35, 6, 12);
    ctx.fillRect(o.x + o.w, t + o.h * 0.2, 6, 12);
  });

  // Score
  ctx.fillStyle = '#d9c8cd';
  ctx.font = "700 18px 'Noto Sans KR', sans-serif";
  ctx.textAlign = 'right';
  ctx.textBaseline = 'top';
  ctx.fillText(`최고 ${String(dinoBest).padStart(5, '0')}   점수 ${String(Math.floor(game.score)).padStart(5, '0')}`, DINO_W - 20, 16);

  if (game.mode === 'running') return;

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#ffffff';
  ctx.font = "700 26px 'Noto Sans KR', sans-serif";
  ctx.fillText(game.mode === 'over' ? 'GAME OVER' : '준비됐나요?', DINO_W / 2, 90);
  ctx.fillStyle = '#ff3b6b';
  ctx.font = "700 16px 'Noto Sans KR', sans-serif";
  ctx.fillText(game.mode === 'over' ? '스페이스바를 눌러 다시 시작' : '스페이스바를 눌러 시작', DINO_W / 2, 126);
}
