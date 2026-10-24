import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

import { GAME_NAME } from "./config/gameConfig";

const SIZE = 10;

const START_WORM = [
  { x: 1, y: 8 },
  { x: 0, y: 8 },
];

// 50 deterministic levels: har level par apples, portal aur walls ki positions badalti hain.
const LEVEL_COUNT = 50;
const LEVEL_NAMES = [
  "First Steps", "Garden Trail", "Rocky Road", "Apple Maze", "Portal Quest",
  "Forest Path", "Winding Woods", "Tiny Turns", "Stone Garden", "Apple Chase",
  "Green Valley", "Hidden Grove", "Clever Crawl", "Rocky Corners", "Orchard Run",
  "Twisty Trail", "Mossy Maze", "Worm Way", "Apple Alley", "Portal Path",
  "Forest Fork", "Bramble Bend", "Stone Steps", "Clover Crossing", "Deep Grove",
  "Maze Runner", "Golden Orchard", "Worm's Journey", "Tricky Track", "Wild Woods",
  "Crisp Canyon", "Leafy Loop", "Boulder Run", "Secret Garden", "Curvy Course",
  "Apple Valley", "Misty Maze", "Emerald Path", "Rocky Retreat", "Worm's Quest",
  "Orchard Odyssey", "Hidden Portal", "Forest Puzzle", "Clever Corners", "Apple Sprint",
  "Mighty Maze", "Final Forest", "Portal Puzzle", "Grand Adventure", "Master Worm",
];

function buildLevel(levelNumber) {
  const reserved = new Set();
  const key = (cell) => `${cell.x},${cell.y}`;
  const addReserved = (cell) => reserved.add(key(cell));
  const startCells = [{ x: 1, y: 8 }, { x: 0, y: 8 }];
  startCells.forEach(addReserved);

  // Portal ki position level ke saath badalti hai, start se door rehti hai.
  const portal = {
    x: 7 + (levelNumber % 3),
    y: 1 + (levelNumber % 2),
  };
  addReserved(portal);

  // Apples deterministic pattern se select hote hain, so refresh par same layout rahega.
  const appleCount = 3 + (levelNumber % 3);
  const apples = [];
  let cursor = levelNumber * 17 + 11;
  while (apples.length < appleCount && cursor < 3000) {
    const cell = {
      x: (cursor * 7 + levelNumber * 3) % SIZE,
      y: (cursor * 5 + levelNumber * 2) % SIZE,
    };
    if (!reserved.has(key(cell))) {
      apples.push(cell);
      addReserved(cell);
    }
    cursor += 1;
  }

  // Walls board par spread hote hain; worm, apples aur portal par wall nahi rakhi jaati.
  const walls = [];
  const wallCount = 4 + (levelNumber % 5);
  cursor = levelNumber * 23 + 7;
  while (walls.length < wallCount && cursor < 5000) {
    const cell = {
      x: (cursor * 3 + levelNumber) % SIZE,
      y: (cursor * 7 + levelNumber * 4) % SIZE,
    };
    if (!reserved.has(key(cell))) {
      walls.push(cell);
      addReserved(cell);
    }
    cursor += 1;
  }

  return {
    name: LEVEL_NAMES[levelNumber - 1] || `Adventure ${levelNumber}`,
    apples,
    portal,
    walls,
  };
}

const LEVELS = Array.from({ length: LEVEL_COUNT }, (_, index) => buildLevel(index + 1));

function getLevel(levelNumber) {
  return LEVELS[Math.min(Math.max(levelNumber, 1), LEVELS.length) - 1];
}

function createGame(levelNumber = 1) {
  const level = getLevel(levelNumber);
  return {
    worm: START_WORM.map((cell) => ({ ...cell })),
    apples: level.apples.map((cell) => ({ ...cell })),
    moves: 0,
    score: 0,
    status: "playing",
    message: `Level ${levelNumber}: collect all ${level.apples.length} apples, then reach the portal!`,
  };
}

function sameCell(a, b) {
  return a.x === b.x && a.y === b.y;
}

export default function App() {
  const [currentLevel, setCurrentLevel] = useState(() => {
    const saved = Number(localStorage.getItem("appleWormCurrentLevel")) || 1;
    return Math.min(Math.max(saved, 1), LEVELS.length);
  });
  const [unlockedLevel, setUnlockedLevel] = useState(() => {
    const saved = Number(localStorage.getItem("appleWormUnlockedLevel")) || 1;
    return Math.min(Math.max(saved, 1), LEVELS.length);
  });
  const [game, setGame] = useState(() => createGame(currentLevel));
  const [timeLeft, setTimeLeft] = useState(90);
const [totalTime, setTotalTime] = useState(90);
const [difficulty, setDifficulty] = useState("Medium");

const difficultyTimes = {
  Easy: 120,
  Medium: 90,
  Hard: 60,
};

const [levelStars, setLevelStars] = useState(() => {
  try {
    return JSON.parse(localStorage.getItem("appleWormStars")) || {};
  } catch {
    return {};
  }
});
  const level = getLevel(currentLevel);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showLevels, setShowLevels] = useState(false);
  useEffect(() => {
  if (game.status !== "playing") return;

  const timer = setInterval(() => {
    setTimeLeft((previous) => {
      if (previous <= 1) {
        clearInterval(timer);

        setGame((current) => {
          if (current.status !== "playing") return current;

          return {
            ...current,
            status: "failed",
            message: "Time's up! Restart and try again.",
          };
        });

        return 0;
      }

      return previous - 1;
    });
  }, 1000);

  return () => clearInterval(timer);
}, [game.status, currentLevel]);
  const audioContextRef = useRef(null);
  const musicRef = useRef({
  timer: null,
  noteIndex: 0,
});

useEffect(() => {
  if (!soundEnabled || game.status !== "playing") {
    if (musicRef.current.timer) {
      clearInterval(musicRef.current.timer);
      musicRef.current.timer = null;
    }
    return;
  }

  const notes = [
    523.25, 659.25, 783.99, 659.25,
    587.33, 698.46, 880.00, 698.46,
    523.25, 659.25, 783.99, 1046.50,
    880.00, 783.99, 659.25, 587.33,
  ];

  let context;

  const playMusicNote = () => {
    try {
      const Audio = window.AudioContext || window.webkitAudioContext;
      if (!Audio) return;

      if (!audioContextRef.current) {
        audioContextRef.current = new Audio();
      }

      context = audioContextRef.current;

      if (context.state === "suspended") {
        context.resume();
      }

      const frequency =
        notes[musicRef.current.noteIndex % notes.length];

      musicRef.current.noteIndex += 1;

      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const now = context.currentTime;

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(frequency, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.025, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);

      oscillator.connect(gain);
      gain.connect(context.destination);

      oscillator.start(now);
      oscillator.stop(now + 0.3);
    } catch {
      // Music is optional; gameplay should continue normally.
    }
  };

  playMusicNote();
  musicRef.current.timer = setInterval(playMusicNote, 350);

  return () => {
    if (musicRef.current.timer) {
      clearInterval(musicRef.current.timer);
      musicRef.current.timer = null;
    }
  };
}, [soundEnabled, game.status]);
  const playTone = useCallback((frequency, duration = 0.12, type = "sine") => {
    if (!soundEnabled) return;
    try {
      const Audio = window.AudioContext || window.webkitAudioContext;
      if (!Audio) return;
      // Reuse one audio context instead of creating a new one for every sound.
      if (!audioContextRef.current) audioContextRef.current = new Audio();
      const context = audioContextRef.current;
      if (context.state === "suspended") context.resume();
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const now = context.currentTime;
      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, now);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.12, now + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(now);
      oscillator.stop(now + duration + 0.01);
    } catch { /* Sound is optional; gameplay still works without it. */ }
  }, [soundEnabled]);

useEffect(() => {
  if (game.status !== "won") return;

  let earnedStars = 1;

  if (timeLeft >= totalTime * 0.6 && game.moves <= 25) {
    earnedStars = 3;
  } else if (timeLeft >= totalTime * 0.3 && game.moves <= 40) {
    earnedStars = 2;
  }

  setLevelStars((previous) => {
    const oldStars = previous[currentLevel] || 0;
    const bestStars = Math.max(oldStars, earnedStars);

    const updatedStars = {
      ...previous,
      [currentLevel]: bestStars,
    };

    localStorage.setItem(
      "appleWormStars",
      JSON.stringify(updatedStars)
    );

    return updatedStars;
  });
}, [game.status, game.moves, currentLevel, timeLeft, totalTime]);


  const moveWorm = useCallback((dx, dy) => {
    // Trigger audio directly from the key/button interaction to avoid render/effect delay.
    if (game.status === "playing") {
      const head = game.worm[0];
      const next = { x: head.x + dx, y: head.y + dy };
      const eating = game.apples.some((apple) => sameCell(apple, next));
      const applesLeft = game.apples.length - (eating ? 1 : 0);
      if (eating) playTone(740, 0.13, "triangle");
      if (sameCell(next, level.portal) && applesLeft === 0) {
        playTone(523, 0.15);
        window.setTimeout(() => playTone(659, 0.15), 130);
        window.setTimeout(() => playTone(784, 0.22), 260);
      }
    }
    setGame((current) => {
      if (current.status !== "playing") return current;

      const head = current.worm[0];
      const next = { x: head.x + dx, y: head.y + dy };
      const outside = next.x < 0 || next.y < 0 || next.x >= SIZE || next.y >= SIZE;

      if (outside || level.walls.some((wall) => sameCell(wall, next))) {
        return { ...current, status: "failed", message: "Obstacle se takra gaye. Restart karke try karo." };
      }

      const eating = current.apples.some((apple) => sameCell(apple, next));
      const bodyToCheck = eating ? current.worm : current.worm.slice(0, -1);
      if (bodyToCheck.some((part) => sameCell(part, next))) {
        return { ...current, status: "failed", message: "Worm apni body se takra gaya. Dobara try karo!" };
      }

      const nextWorm = [next, ...current.worm];
      if (!eating) nextWorm.pop();
      const nextApples = eating
        ? current.apples.filter((apple) => !sameCell(apple, next))
        : current.apples;
      const nextScore = current.score + (eating ? 10 : 0);
      const nextMoves = current.moves + 1;
      const reachedPortal = sameCell(next, level.portal);

      if (reachedPortal && nextApples.length === 0) {
        return { ...current, worm: nextWorm, apples: nextApples, score: nextScore, moves: nextMoves, status: "won", message: `Level ${currentLevel} complete! Great job!` };
      }
      if (reachedPortal && nextApples.length > 0) {
        return { ...current, worm: nextWorm, apples: nextApples, score: nextScore, moves: nextMoves, message: `Portal locked! ${nextApples.length} apple(s) left.` };
      }
      return {
        ...current,
        worm: nextWorm,
        apples: nextApples,
        score: nextScore,
        moves: nextMoves,
        message: eating
          ? "Apple collected! Worm grow ho gaya."
          : nextApples.length === 0
            ? "All apples collected! Portal tak jao."
            : "Keep going — collect every apple!",
      };
    });
  }, [currentLevel, game, level, playTone]);

  useEffect(() => {
    function handleKeyDown(event) {
      const keys = {
        ArrowUp: [0, -1], w: [0, -1], W: [0, -1],
        ArrowDown: [0, 1], s: [0, 1], S: [0, 1],
        ArrowLeft: [-1, 0], a: [-1, 0], A: [-1, 0],
        ArrowRight: [1, 0], d: [1, 0], D: [1, 0],
      };
      const direction = keys[event.key];
      if (direction) {
        event.preventDefault();
        moveWorm(direction[0], direction[1]);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [moveWorm]);

  //const restart = () => setGame(createGame(currentLevel));

const restart = () => {
  const selectedTime = difficultyTimes[difficulty];

  setTimeLeft(selectedTime);
  setTotalTime(selectedTime);
  setGame(createGame(currentLevel));
};

  
const openLevel = (levelNumber) => {
  if (levelNumber < 1 || levelNumber > unlockedLevel) return;

  setCurrentLevel(levelNumber);
  localStorage.setItem("appleWormCurrentLevel", String(levelNumber));

  const selectedTime = difficultyTimes[difficulty];
  setTimeLeft(selectedTime);
  setTotalTime(selectedTime);

  setGame(createGame(levelNumber));
};


  const goToNextLevel = () => {
    if (game.status !== "won" || currentLevel >= LEVELS.length) return;
    const nextLevel = currentLevel + 1;
    const highest = Math.max(unlockedLevel, nextLevel);
    setCurrentLevel(nextLevel);
    setUnlockedLevel(highest);
    localStorage.setItem("appleWormUnlockedLevel", String(highest));
    localStorage.setItem("appleWormCurrentLevel", String(nextLevel));
    const selectedTime = difficultyTimes[difficulty];
setTimeLeft(selectedTime);
setTotalTime(selectedTime);
    setGame(createGame(nextLevel));
  };

  const showHint = () => {
    setGame((current) => {
      if (current.status !== "playing") return current;
      const target = current.apples[0];
      return {
        ...current,
        message: target
          ? `Hint: next apple ki position row ${target.y + 1}, column ${target.x + 1} hai.`
          : `Hint: portal row ${level.portal.y + 1}, column ${level.portal.x + 1} par hai.`,
      };
    });
  };

  function getCellContent(x, y) {
    const cell = { x, y };
    if (game.worm.some((part) => sameCell(part, cell))) {
      return sameCell(game.worm[0], cell) ? (
      <span className="game-object worm-face">🐛</span>
    ) : (
      <span className="game-object worm-body">🟢</span>
    );
    }
    if (game.apples.some((apple) => sameCell(apple, cell))) return <span className="game-object apple-object">🍎</span>;
    if (sameCell(level.portal, cell)) {return game.apples.length > 0 ? (
      <span className="game-object portal-locked">🔒</span>
    ) : (
      <span className="game-object portal-object">🌀</span>
    );}
    if (level.walls.some((wall) => sameCell(wall, cell))) {return <span className="game-object wall-object">🪨</span>;}
    return "";
  }

  return (
    <main className="app">
      <header className="topbar">
        <div className="brand-lockup">
          <div className="brand-mark" aria-hidden="true">🐛</div>
          <div className="game-heading">
            <p className="eyebrow">ARCADE PUZZLE • ADVENTURE MODE</p>
            <h1>{GAME_NAME}</h1>
            <p className="subtitle">Collect every apple. Find the portal. Outsmart the maze.</p>
          </div>
        </div>
        <div className="header-actions">
          <div className="level-badge">
            <span className="level-label">PLAYING LEVEL</span>
            <span className="level-number">{String(currentLevel).padStart(2, "0")}<small> / {LEVEL_COUNT}</small></span>
          </div>
          <button className="choose-level-trigger" onClick={() => setShowLevels((show) => !show)} aria-expanded={showLevels}>
            ▦ {showLevels ? "Hide levels" : "Choose level"}
          </button>
        </div>
      </header>

      {showLevels && (
        <section className="level-picker" aria-label="Choose an unlocked level">
          <div className="level-picker-heading">
            <h2>Choose your adventure</h2>
            <span>{unlockedLevel} / {LEVEL_COUNT} unlocked</span>
          </div>
          <div className="level-grid">
            {LEVELS.map((item, index) => {
              const levelNumber = index + 1;
              const isLocked = levelNumber > unlockedLevel;
              return (
                
<button
  key={item.name}
  type="button"
  className={`level-select-button ${currentLevel === levelNumber ? "active" : ""}`}
  disabled={isLocked}
  onClick={() => {
    openLevel(levelNumber);
    setShowLevels(false);
  }}
  title={isLocked ? `Complete Level ${levelNumber - 1} to unlock` : item.name}
>
  {isLocked ? (
    <span>🔒</span>
  ) : (
    <>
      <span>
        {levelStars[levelNumber] ? "✅ " : ""}
        {levelNumber}
      </span>
      <small className="level-name">{item.name}</small>
      {levelStars[levelNumber] > 0 && (
        <small className="level-stars">
          {"⭐".repeat(levelStars[levelNumber])}
        </small>
      )}
    </>
  )}
</button>

              );
            })}
          </div>
          <p className="level-picker-help">Finish a level to unlock the next challenge.</p>
        </section>
      )}

<section className="game-layout">
        <div className="board-panel">
          <div className="board-heading">
            <div><span className="board-kicker">CURRENT MISSION</span><strong>{level.name}</strong></div>
            <span className="board-level-chip">LEVEL {String(currentLevel).padStart(2, "0")}</span>
          </div>
          <div className="board-stage">
          <div className={`board ${game.status === "won" ? "board-won" : ""}`} role="grid" aria-label="Game board">
            {Array.from({ length: SIZE * SIZE }, (_, index) => {
              const x = index % SIZE;
              const y = Math.floor(index / SIZE);
              return (
                <div key={`${x}-${y}`}
                  className={`cell ${game.worm.some((part) => sameCell(part, { x, y })) ? "worm-cell" : ""} ${sameCell(game.worm[0], { x, y }) ? "worm-head" : ""}`}
                  role="gridcell" aria-label={`Row ${y + 1}, column ${x + 1}`}>
                  {getCellContent(x, y)}
                </div>
              );
            })}
          </div>
          {game.status !== "playing" && <div className={`game-result-overlay ${game.status}`} role="dialog" aria-live="assertive" aria-label={game.status === "won" ? "Level won" : "Game over"}>
            {game.status === "won" && (
  <div className="confetti-layer" aria-hidden="true">
    {Array.from({ length: 60 }, (_, i) => (
      <span
        key={i}
        className="confetti-piece"
        style={{
          left: `${(i * 37) % 100}%`,
          backgroundColor: [
            "#ff6b6b",
            "#ffd93d",
            "#6bcb77",
            "#4d96ff",
            "#c77dff",
            "#ff922b",
          ][i % 6],
          animationDelay: `${(i % 15) * 0.12}s`,
          animationDuration: `${2 + (i % 10) * 0.15}s`,
        }}
      />
    ))}
  </div>
)}
            <div className="game-result-modal">
              <div className="result-hero-icon">{game.status === "won" ? "🏆" : "🐛"}</div>
              <span className="result-kicker">{game.status === "won" ? "LEVEL WON!" : "TRY AGAIN"}</span>
              <h2>{game.status === "won" ? (currentLevel === LEVELS.length ? "Master Worm!" : `Level ${currentLevel} cleared!`) : "Oops! Not this time"}</h2>
              <p>{game.status === "won" ? (currentLevel === LEVELS.length ? "You conquered all 50 levels. Amazing work!" : "Amazing! Ready for the next challenge?") : game.message}</p>
              <div className="result-stats"><span><strong>{game.score}</strong><small>Score</small></span><span><strong>{game.moves}</strong><small>Moves</small></span></div>
              
{game.status === "won" && (
  <div className="result-stars">
    {[1, 2, 3].map((star) => (
      <span key={star} className="result-star">
        {star <= (levelStars[currentLevel] || 1) ? "⭐" : "☆"}
      </span>
    ))}
  </div>
)}

              <div className="result-modal-actions">
                {game.status === "won" && currentLevel < LEVELS.length ? <button className="primary-button" onClick={goToNextLevel}>Next Level <span>→</span></button> : null}
                {game.status === "won" && currentLevel === LEVELS.length ? <button className="primary-button" onClick={() => openLevel(1)}>Play Again <span>↻</span></button> : null}
                {game.status === "failed" ? <button className="primary-button" onClick={restart}>Restart Level <span>↻</span></button> : null}
              </div>
            </div>
          </div>}
          </div>
          <p className="game-message" aria-live="polite"><span className="message-sparkle">✦</span>{game.message}</p>

          <div className="board-bottom-row">
            <div className="keyboard-tip"><span className="keycap">↑</span><span className="keycap">←</span><span className="keycap">↓</span><span className="keycap">→</span><span>or WASD to move</span></div>
            <div className="controls" aria-label="Movement controls">
              <button onClick={() => moveWorm(0, -1)} aria-label="Move up">↑</button>
              <div className="horizontal-controls">
                <button onClick={() => moveWorm(-1, 0)} aria-label="Move left">←</button>
                <button onClick={() => moveWorm(0, 1)} aria-label="Move down">↓</button>
                <button onClick={() => moveWorm(1, 0)} aria-label="Move right">→</button>
              </div>
            </div>
          </div>

          <div className="action-dock">
            <button className="dock-button restart-action" onClick={restart}><span>↻</span><small>Restart</small></button>
            <button className="dock-button" onClick={showHint}><span>✦</span><small>Hint</small></button>
            <button className="dock-button" onClick={() => setSoundEnabled((enabled) => !enabled)}><span>{soundEnabled ? "♫" : "♩"}</span><small>Sound {soundEnabled ? "On" : "Off"}</small></button>
          </div>
        </div>

        <aside className="sidebar">
          <div className="difficulty-selector">
            <p className="difficulty-title">CHOOSE YOUR DIFFICULTY</p>
          
            <div className="difficulty-options">
              {Object.entries(difficultyTimes).map(([name, seconds]) => (
                <button
                  key={name}
                  type="button"
                  className={`difficulty-btn ${difficulty === name ? "active" : ""}`}
                  onClick={() => {
                    setDifficulty(name);
                    setTimeLeft(seconds);
                    setTotalTime(seconds);
                    setGame(createGame(currentLevel));
                  }}
                >
                  <span>
                    {name === "Easy" ? "🌱" : name === "Medium" ? "⚡" : "🔥"}
                  </span>
                  <strong>{name}</strong>
                  <small>
                    {String(Math.floor(seconds / 60)).padStart(2, "0")}:
                    {String(seconds % 60).padStart(2, "0")}
                  </small>
                </button>
              ))}
            </div>
          </div>
          
                <section className="arcade-hud" aria-label="Game status">
          
            <div className={`hud-item ${timeLeft <= 15 ? "timer-warning" : ""}`}>
              <span className="hud-icon">⏱️</span>
              <div>
                <small>TIME LEFT</small>
                <strong>
                  {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
                  {String(timeLeft % 60).padStart(2, "0")}
                </strong>
              </div>
            </div>
                  <div className="hud-item"><span className="hud-icon">🍎</span><div><small>APPLES LEFT</small><strong>{game.apples.length}<em> / {level.apples.length}</em></strong></div></div>
                  <div className="hud-item"><span className="hud-icon">⭐</span><div><small>YOUR SCORE</small><strong>{game.score}</strong></div></div>
                  <div className="hud-item"><span className="hud-icon">👣</span><div><small>MOVES</small><strong>{game.moves}</strong></div></div>
                  <div className={`hud-status ${game.status}`}><span className="status-dot" />{game.status === "won" ? "LEVEL CLEARED" : game.status === "failed" ? "TRY AGAIN" : game.apples.length === 0 ? "PORTAL OPEN" : "ADVENTURE ON"}</div>
                </section>

          <div className="mission-card">
            <div className="mission-card-top"><span className="mission-icon">🎯</span><span className="mission-label">YOUR OBJECTIVE</span></div>
            <h2>Ready, worm?</h2>
            <ul className="mission-list">
              <li className={game.apples.length === 0 ? "complete" : ""}><span>{game.apples.length === 0 ? "✓" : "1"}</span><div><strong>Collect the apples</strong><small>{game.apples.length === 0 ? "All apples collected!" : `${game.apples.length} left to find`}</small></div></li>
              <li className={game.apples.length === 0 ? "portal-ready" : ""}><span>{game.apples.length === 0 ? "✓" : "2"}</span><div><strong>Reach the portal</strong><small>{game.apples.length === 0 ? "Portal is unlocked" : "Unlock it by collecting apples"}</small></div></li>
              <li><span>3</span><div><strong>Avoid the rocks</strong><small>Plan each move carefully</small></div></li>
            </ul>
          </div>
{/* 
          <div className="progress-card">
            <div className="progress-heading"><span>ADVENTURE PROGRESS</span><strong>{Math.round((unlockedLevel / LEVEL_COUNT) * 100)}%</strong></div>
            <div className="progress-track"><span style={{ width: `${(unlockedLevel / LEVEL_COUNT) * 100}%` }} /></div>
            <div className="progress-foot"><span>Level {unlockedLevel} unlocked</span><span>{LEVEL_COUNT} levels</span></div>
          </div> */}

<div className="progress-card">
  <div className="progress-heading">
    <span>🏆 ADVENTURE PROGRESS</span>
    <strong>
      {Math.round((unlockedLevel / LEVEL_COUNT) * 100)}%
    </strong>
  </div>

  <div className="progress-track">
    <span
      style={{
        width: `${(unlockedLevel / LEVEL_COUNT) * 100}%`,
      }}
    />
  </div>

  <div className="progress-foot">
    <span>Level {unlockedLevel} unlocked</span>
    <span>{LEVEL_COUNT} levels</span>
  </div>

  <div className="trophy-stats">
    <div className="trophy-stat">
      <span>🎯</span>
      <strong>{Math.max(0, unlockedLevel - 1)}</strong>
      <small>Levels Completed</small>
    </div>

    <div className="trophy-stat">
      <span>⭐</span>
      <strong>
        {Object.values(levelStars).reduce(
          (total, stars) => total + stars,
          0
        )}
      </strong>
      <small>Total Stars</small>
    </div>

    <div className="trophy-stat">
      <span>🏆</span>
      <strong>
        {Object.values(levelStars).filter(
          (stars) => stars > 0
        ).length}
      </strong>
      <small>Levels Starred</small>
    </div>
  </div>
</div>

          <div className="tip-card"><span>💡 QUICK TIP</span><p>{game.apples.length > 0 ? "Think a few steps ahead. The worm grows every time it eats an apple!" : "The portal is open! Find a clear route and finish the level."}</p></div>
        </aside>
      </section>
      <footer><span>🐛 APPLE WORM ADVENTURE</span><span>50 levels · Progress saved on this device</span></footer>
    </main>
  );
}

