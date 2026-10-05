# THE해커톤 · 버튼 3개 프로젝트

GitHub 협업 실습용 템플릿입니다. 팀원 3명이 버튼 하나씩 맡아 기능을 만들고, PR로 합쳐서 웹사이트를 완성합니다.

## 역할 분담

| 버튼 | 브랜치 | 수정할 파일 | 결과 영역 |
|---|---|---|---|
| 01 공룡 게임 | `feat/dino` | `features/dino.js` | `#dino-area` |
| 02 저녁 메뉴 룰렛 | `feat/dinner` | `features/dinner.js` | `#dinner-area` |
| 03 가위바위보 | `feat/rps` | `features/rps.js` | `#rps-area` |

> **자기 파일만 수정하세요.** 각자 다른 파일을 고치면 충돌 없이 합칠 수 있습니다.

## 폴더 구조

```
├── index.html        버튼 3개와 결과 영역 (공통, 수정 금지)
├── style.css         공통 스타일 (수정 금지)
├── assets/logo.png
└── features/
    ├── dino.js       공룡 게임
    ├── dinner.js     저녁 메뉴 룰렛
    └── rps.js        가위바위보
```

## 실습 순서

### 1. 레포 만들기 (팀장)

이 템플릿에서 **Use this template → Create a new repository** → Owner를 팀 Organization으로 선택 → Create

### 2. 가져와서 브랜치 만들기 (전원)

```bash
git clone <팀 레포 주소>
cd <레포 이름>
git switch -c feat/dino      # 내가 맡은 기능 이름으로
```

### 3. AI로 기능 개발

프롬프트 예시:

> features/dino.js만 수정해서, 공룡 게임 버튼을 누르면 dino-area에 크롬 공룡 같은 점프 게임이 나오게 만들어줘. 다른 파일은 건드리지 마.

`index.html`을 브라우저로 열어서 버튼이 잘 동작하는지 확인합니다.

### 4. 커밋 & 푸시

```bash
git add .
git commit -m "feat: 공룡 게임 추가"
git push -u origin feat/dino
```

### 5. PR → 리뷰 → 머지

1. GitHub 레포 페이지 → **Compare & pull request** → Create pull request
2. 다른 팀원이 **Files changed** 확인 → **Review changes → Approve**
3. 작성자가 **Merge pull request**

### 6. 최신 main 받기

```bash
git switch main
git pull
```

버튼 3개가 모두 동작하면 완성입니다.

## 보너스 미션: 충돌 해결

1. `git switch main` → `git pull` → `git switch -c feat/name-내이름`
2. `index.html`의 `<h1>THE해커톤</h1>` 줄 끝에 내 이름 추가 (예: `<h1>THE해커톤 - 김고대</h1>`)
3. 커밋 → 푸시 → PR
4. 첫 PR은 바로 머지되고, 나머지 PR에는 **This branch has conflicts**가 뜹니다
5. **Resolve conflicts** → 세 이름을 모두 남기고 `<<<<<<<`, `=======`, `>>>>>>>` 줄 삭제 → **Mark as resolved** → Merge

## 자주 쓰는 명령어

| 명령어 | 하는 일 |
|---|---|
| `git status` | 지금 상태 확인 (막히면 일단 이것) |
| `git pull` | GitHub 최신 내용 받기 |
| `git switch -c 브랜치` | 새 브랜치 만들고 이동 |
| `git switch main` | main으로 이동 |
| `git add .` | 바뀐 파일 전부 담기 |
| `git commit -m "메시지"` | 커밋 |
| `git push` | GitHub에 올리기 |
| `git log --oneline` | 커밋 기록 보기 |
