import React from "react";
import { GAME_NAME } from "../config/gameConfig";

/* =========================================================================
   MODERN ARCADE VECTOR SVG ICONS (Glossy Candy Game Aesthetics)
   ========================================================================= */

export function AppleSvgIcon({ className = "game-svg-icon" }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* 3D Apple Body with Specular Highlight */}
      <path
        d="M16 6C13.5 3.5 9.5 4 8 6C5 10 5.5 17 8.5 22C10.5 26 13 28 16 28C19 28 21.5 26 23.5 22C26.5 17 27 10 24 6C22.5 4 18.5 3.5 16 6Z"
        fill="url(#candyAppleGrad)"
        stroke="#991b1b"
        strokeWidth="1.6"
      />
      {/* Curved Stem */}
      <path d="M16 6Q16.5 2.5 20 1.5" stroke="#78350f" strokeWidth="2.2" strokeLinecap="round" />
      {/* Juicy Green Leaf */}
      <path
        d="M17.5 4C20.5 3 23 4.5 23 4.5C23 4.5 22 7 19 6.5"
        fill="url(#candyLeafGrad)"
        stroke="#15803d"
        strokeWidth="1"
      />
      {/* Glossy Curved Highlight */}
      <ellipse cx="11.5" cy="11.5" rx="3.5" ry="5.5" transform="rotate(-30 11.5 11.5)" fill="white" opacity="0.65" />
      <circle cx="10" cy="9" r="1.5" fill="white" opacity="0.85" />
      <defs>
        <radialGradient id="candyAppleGrad" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#ff6b6b" />
          <stop offset="40%" stopColor="#ef4444" />
          <stop offset="85%" stopColor="#b91c1c" />
          <stop offset="100%" stopColor="#7f1d1d" />
        </radialGradient>
        <linearGradient id="candyLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#86efac" />
          <stop offset="100%" stopColor="#22c55e" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function StarSvgIcon({ className = "game-svg-icon", filled = true }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M16 2.5L19.8 11.2L29.2 12.1L22.1 18.3L24.1 27.5L16 22.8L7.9 27.5L9.9 18.3L2.8 12.1L12.2 11.2L16 2.5Z"
        fill={filled ? "url(#candyStarGrad)" : "#94a3b8"}
        stroke={filled ? "#b45309" : "#64748b"}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {filled && (
        <>
          <path
            d="M16 5.5L18.8 11.8L25.8 12.5L20.5 17.1L22 24L16 20.5V5.5Z"
            fill="#fef08a"
            opacity="0.55"
          />
          <circle cx="16" cy="14" r="3" fill="#ffffff" opacity="0.75" />
        </>
      )}
      <defs>
        <linearGradient id="candyStarGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fffbeb" />
          <stop offset="25%" stopColor="#fef08a" />
          <stop offset="65%" stopColor="#facc15" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function CoinSvgIcon({ className = "game-svg-icon" }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="16" cy="16" r="13" fill="url(#candyCoinGrad)" stroke="#b45309" strokeWidth="2" />
      <circle cx="16" cy="16" r="10" stroke="#fef08a" strokeWidth="1" strokeDasharray="3 2" />
      <text
        x="16"
        y="21"
        textAnchor="middle"
        fontSize="15"
        fontWeight="900"
        fill="#78350f"
        fontFamily="sans-serif"
      >
        ¢
      </text>
      <ellipse cx="12" cy="11" rx="3" ry="1.5" transform="rotate(-30 12 11)" fill="white" opacity="0.65" />
      <defs>
        <radialGradient id="candyCoinGrad" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#fef9c3" />
          <stop offset="45%" stopColor="#facc15" />
          <stop offset="85%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#b45309" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export function PauseSvgIcon({ className = "game-svg-icon" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="5.5" y="4" width="4" height="16" rx="2" fill="currentColor" />
      <rect x="14.5" y="4" width="4" height="16" rx="2" fill="currentColor" />
    </svg>
  );
}

export function TimerSvgIcon({ className = "game-svg-icon" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="12" cy="13" r="8.5" fill="#f8fafc" stroke="#0ea5e9" strokeWidth="2" />
      <path d="M12 2V4.5M10 2.5H14" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 13V8.5" stroke="#0284c7" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M12 13L15.5 15.5" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="13" r="1.8" fill="#0284c7" />
    </svg>
  );
}

export function SoundSvgIcon({ enabled = true, className = "game-svg-icon" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M3 9.5H7L12 5V19L7 14.5H3V9.5Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      {enabled ? (
        <path
          d="M15.5 8C17 9.5 17.5 11 17.5 12C17.5 13 17 14.5 15.5 16M18.5 5.5C21 8 21.5 10.5 21.5 12C21.5 13.5 21 16 18.5 18.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      ) : (
        <path d="M16 8.5L21.5 15.5M21.5 8.5L16 15.5" stroke="#ef4444" strokeWidth="2.4" strokeLinecap="round" />
      )}
    </svg>
  );
}

export function UndoSvgIcon({ className = "game-svg-icon" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M5 9.5H14C17.5 9.5 20 12 20 15.5C20 19 17.5 21.5 14 21.5H9"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 5L4.5 9.5L9 14"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function RetrySvgIcon({ className = "game-svg-icon" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M20 12C20 16.4 16.4 20 12 20C7.6 20 4 16.4 4 12C4 8.2 6.7 5 10.3 4.2"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <polyline points="20,4 20,9.5 14.5,9.5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function HintSvgIcon({ className = "game-svg-icon" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M9 18H15M10 21H14M12 3C8 3 5 6 5 10C5 12.5 6.2 14.5 8 16V17C8 17.5 8.5 18 9 18H15C15.5 18 16 17.5 16 17V16C17.8 14.5 19 12.5 19 10C19 6 16 3 12 3Z"
        fill="url(#hintBulbGrad)"
        stroke="#d97706"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.5" fill="#fef08a" />
      <defs>
        <linearGradient id="hintBulbGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fef9c3" />
          <stop offset="100%" stopColor="#fde047" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function WardrobeSvgIcon({ className = "game-svg-icon" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M5 6L9 3H15L19 6L17 10L14 8.5V21H10V8.5L7 10L5 6Z"
        fill="url(#wardrobeGrad)"
        stroke="#7c3aed"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="wardrobeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ddd6fe" />
          <stop offset="100%" stopColor="#c4b5fd" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function GiftSvgIcon({ className = "game-svg-icon" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="3" y="10" width="18" height="11" rx="2" fill="#ec4899" stroke="#be185d" strokeWidth="1.4" />
      <rect x="2" y="6" width="20" height="4" rx="1.5" fill="#f43f5e" stroke="#9f1239" strokeWidth="1.4" />
      <rect x="10.5" y="6" width="3" height="15" fill="#fde047" stroke="#ca8a04" strokeWidth="0.8" />
      <path d="M12 6C10 3 6 4 7.5 6H12ZM12 6C14 3 18 4 16.5 6H12Z" fill="#fde047" stroke="#ca8a04" strokeWidth="1" />
    </svg>
  );
}

export function TrophySvgIcon({ className = "game-svg-icon" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M6 4H18V10C18 13.5 15.3 16 12 16C8.7 16 6 13.5 6 10V4Z"
        fill="url(#trophyGrad)"
        stroke="#b45309"
        strokeWidth="1.5"
      />
      <path d="M6 6H3C3 8.5 4.5 10.5 7 10.5" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18 6H21C21 8.5 19.5 10.5 17 10.5" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 16V19M8 21H16" stroke="#b45309" strokeWidth="2" strokeLinecap="round" />
      <defs>
        <linearGradient id="trophyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#facc15" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* =========================================================================
   TOP FLOATING ARCADE HUD (Modern Mobile Game Style)
   ========================================================================= */

export function MobileGameHeader({
  level,
  world,
  applesLeft,
  totalApples,
  goldenApplesLeft = 0,
  moves,
  timeLeft,
  onOpenPause,
  _onCycleTheme,
  sfxEnabled,
  onToggleSfx,
}) {
  const isTimeCritical = timeLeft <= 15;
  const par3 = level.parMoves?.star3 || 25;
  const par2 = level.parMoves?.star2 || 35;
  let currentStars = 1;
  if (moves <= par3) currentStars = 3;
  else if (moves <= par2) currentStars = 2;

  return (
    <header className="mobile-game-header modern-floating-hud" aria-label="Game Status Bar">
      {/* Left: Round Candy Pause Button */}
      <button
        type="button"
        className="game-candy-btn pause-candy-btn"
        onClick={onOpenPause}
        title="Pause / Settings"
        aria-label="Pause"
      >
        <PauseSvgIcon className="candy-btn-icon" />
      </button>

      {/* Center: 3D Level Plaque & Stars */}
      <div className="hud-center-plaque" onClick={onOpenPause} role="button" tabIndex={0}>
        <div className="plaque-ribbon">
          <span className="plaque-world-icon">{world.icon}</span>
          <span className="plaque-level-text">LEVEL {level.id}</span>
        </div>
        <div className="plaque-stars-row">
          <StarSvgIcon className="micro-star-icon" filled={currentStars >= 1} />
          <StarSvgIcon className="micro-star-icon" filled={currentStars >= 2} />
          <StarSvgIcon className="micro-star-icon" filled={currentStars >= 3} />
          <span className="plaque-moves-tag">{moves} moves</span>
        </div>
      </div>

      {/* Right: Apples Counter & Timer / Sound */}
      <div className="hud-right-group">
        {/* Apple Target Badge */}
        <div className="candy-badge apple-candy-badge" title={`${applesLeft} apple(s) left`}>
          <AppleSvgIcon className="badge-apple-icon" />
          <span className="badge-count">
            {totalApples - applesLeft}<strong>/{totalApples}</strong>
          </span>
          {goldenApplesLeft > 0 && <span className="golden-dot-sparkle">★</span>}
        </div>

        {/* Timer Badge */}
        <div className={`candy-badge timer-candy-badge ${isTimeCritical ? "danger-flash" : ""}`}>
          <TimerSvgIcon className="badge-timer-icon" />
          <span className="badge-count">
            {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:{String(timeLeft % 60).padStart(2, "0")}
          </span>
        </div>

        {/* Quick Audio Toggle */}
        <button
          type="button"
          className={`game-candy-btn mini-candy-btn ${sfxEnabled ? "" : "muted"}`}
          onClick={onToggleSfx}
          title={sfxEnabled ? "Mute" : "Unmute"}
          aria-label="Toggle Sound"
        >
          <SoundSvgIcon enabled={sfxEnabled} className="candy-btn-icon" />
        </button>
      </div>
    </header>
  );
}

/* =========================================================================
   BOTTOM MOBILE GAME CONTROLS (Candy Wings & Modern Gamepad Pad)
   ========================================================================= */

export function MobileControlCockpit({
  canUndo,
  onUndo,
  onRestart,
  onHint,
  onOpenSkins,
  onMove,
}) {
  return (
    <footer className="modern-mobile-controls" aria-label="Game Controller">
      {/* Left Candy Action Buttons */}
      <div className="controls-wing-group left-wing">
        <button
          type="button"
          className="candy-action-btn undo-action-btn"
          disabled={!canUndo}
          onClick={onUndo}
          aria-label="Undo Move"
          title="Undo"
        >
          <div className="candy-btn-face">
            <UndoSvgIcon className="action-svg-icon" />
            <span className="action-btn-text">Undo</span>
          </div>
        </button>

        <button
          type="button"
          className="candy-action-btn hint-action-btn"
          onClick={onHint}
          aria-label="Hint"
          title="Hint"
        >
          <div className="candy-btn-face">
            <HintSvgIcon className="action-svg-icon" />
            <span className="action-btn-text">Hint</span>
          </div>
        </button>
      </div>

      {/* Center Modern Cross / Diamond Thumb Controller */}
      <div className="modern-thumb-controller">
        <div className="thumbpad-outer-ring">
          <button
            type="button"
            className="thumbpad-arrow-btn arrow-up"
            onClick={() => onMove(0, -1)}
            aria-label="Up"
          >
            <span className="arrow-glyph">▲</span>
          </button>

          <div className="thumbpad-middle-row">
            <button
              type="button"
              className="thumbpad-arrow-btn arrow-left"
              onClick={() => onMove(-1, 0)}
              aria-label="Left"
            >
              <span className="arrow-glyph">◀</span>
            </button>

            <div className="thumbpad-center-jewel" aria-hidden="true">
              <span className="jewel-core" />
            </div>

            <button
              type="button"
              className="thumbpad-arrow-btn arrow-right"
              onClick={() => onMove(1, 0)}
              aria-label="Right"
            >
              <span className="arrow-glyph">▶</span>
            </button>
          </div>

          <button
            type="button"
            className="thumbpad-arrow-btn arrow-down"
            onClick={() => onMove(0, 1)}
            aria-label="Down"
          >
            <span className="arrow-glyph">▼</span>
          </button>
        </div>
      </div>

      {/* Right Candy Action Buttons */}
      <div className="controls-wing-group right-wing">
        <button
          type="button"
          className="candy-action-btn retry-action-btn"
          onClick={onRestart}
          aria-label="Restart Level"
          title="Restart"
        >
          <div className="candy-btn-face">
            <RetrySvgIcon className="action-svg-icon" />
            <span className="action-btn-text">Retry</span>
          </div>
        </button>

        <button
          type="button"
          className="candy-action-btn skins-action-btn"
          onClick={onOpenSkins}
          aria-label="Worm Skins"
          title="Skins"
        >
          <div className="candy-btn-face">
            <WardrobeSvgIcon className="action-svg-icon" />
            <span className="action-btn-text">Skins</span>
          </div>
        </button>
      </div>
    </footer>
  );
}

/* =========================================================================
   DESKTOP TOPBAR & SIDEBAR HUD (Clean & Modern)
   ========================================================================= */

export function TopBar({
  currentLevel,
  _totalLevels,
  world,
  totalStars,
  coins = 150,
  sfxEnabled,
  onToggleSfx,
  _onCycleTheme,
  onOpenLevelPicker,
  onOpenSkins,
  onOpenWallet,
  onOpenRewardCenter,
  onOpenLeaderboard,
}) {
  return (
    <header className="game-topbar modern-desktop-topbar">
      <div className="topbar-brand">
        <AppleSvgIcon className="brand-logo-apple" />
        <div className="brand-titles">
          <span className="brand-subtitle">ARCADE PUZZLE</span>
          <h1 className="brand-main-title">{GAME_NAME}</h1>
        </div>
      </div>

      <div className="topbar-center-pill" onClick={onOpenLevelPicker} role="button" tabIndex={0}>
        <span className="world-emblem">{world.icon}</span>
        <div className="world-text-meta">
          <strong>LEVEL {String(currentLevel).padStart(2, "0")}</strong>
          <small>{world.name}</small>
        </div>
      </div>

      <div className="topbar-right-controls">
        {/* Coins Purse */}
        <button type="button" className="candy-badge coin-badge" onClick={onOpenWallet}>
          <CoinSvgIcon className="badge-coin-icon" />
          <strong>{coins.toLocaleString()}</strong>
        </button>

        {/* Stars */}
        <div className="candy-badge star-badge">
          <StarSvgIcon className="badge-star-icon" />
          <strong>{totalStars}</strong>
        </div>

        {/* Shortcuts */}
        <button type="button" className="game-candy-btn mini-candy-btn" onClick={onOpenRewardCenter} title="Rewards">
          <GiftSvgIcon className="candy-btn-icon" />
        </button>
        <button type="button" className="game-candy-btn mini-candy-btn" onClick={onOpenLeaderboard} title="Leaderboard">
          <TrophySvgIcon className="candy-btn-icon" />
        </button>
        <button type="button" className="game-candy-btn mini-candy-btn" onClick={onOpenSkins} title="Wardrobe">
          <WardrobeSvgIcon className="candy-btn-icon" />
        </button>
        <button type="button" className="game-candy-btn mini-candy-btn" onClick={onToggleSfx} title="Sound">
          <SoundSvgIcon enabled={sfxEnabled} className="candy-btn-icon" />
        </button>
      </div>
    </header>
  );
}

export function ArcadeHUD({
  level,
  applesLeft,
  totalApples,
  _goldenApplesLeft = 0,
  moves,
  score,
  timeLeft,
  status,
  collectedKeys = [],
}) {
  const isTimeCritical = timeLeft <= 15;
  const isPortalUnlocked = applesLeft === 0;

  const par3 = level.parMoves?.star3 || 25;
  const par2 = level.parMoves?.star2 || 35;
  let currentEstimatedStars = 1;
  if (moves <= par3) currentEstimatedStars = 3;
  else if (moves <= par2) currentEstimatedStars = 2;

  return (
    <section className="arcade-sidebar-hud" aria-label="Game HUD">
      <div className="hud-metric-row">
        <div className={`metric-box ${isTimeCritical ? "time-danger" : ""}`}>
          <TimerSvgIcon className="metric-box-icon" />
          <div className="metric-box-text">
            <small>TIME</small>
            <strong>
              {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:{String(timeLeft % 60).padStart(2, "0")}
            </strong>
          </div>
        </div>

        <div className="metric-box">
          <AppleSvgIcon className="metric-box-icon" />
          <div className="metric-box-text">
            <small>APPLES</small>
            <strong>{totalApples - applesLeft} / {totalApples}</strong>
          </div>
        </div>
      </div>

      <div className="hud-metric-row">
        <div className="metric-box">
          <div className="stars-micro-meter">
            <StarSvgIcon className="micro-star" filled={currentEstimatedStars >= 1} />
            <StarSvgIcon className="micro-star" filled={currentEstimatedStars >= 2} />
            <StarSvgIcon className="micro-star" filled={currentEstimatedStars >= 3} />
          </div>
          <div className="metric-box-text">
            <small>MOVES (Par {par3})</small>
            <strong>{moves}</strong>
          </div>
        </div>

        <div className="metric-box">
          <TrophySvgIcon className="metric-box-icon" />
          <div className="metric-box-text">
            <small>SCORE</small>
            <strong>{score}</strong>
          </div>
        </div>
      </div>

      {/* Keys Indicator */}
      {(level.keys || []).length > 0 && (
        <div className="metric-box full-width">
          <span className="metric-emoji">🗝️</span>
          <div className="metric-box-text">
            <small>KEYS COLLECTED</small>
            <strong>{collectedKeys.length} / {level.keys.length}</strong>
          </div>
        </div>
      )}

      {/* Status Banner */}
      <div className={`hud-portal-status-card status-${status} ${isPortalUnlocked ? "portal-open" : ""}`}>
        <span className="status-orb" />
        <strong>
          {status === "won"
            ? "VICTORY ACHIEVED!"
            : status === "failed"
            ? "TRY AGAIN!"
            : isPortalUnlocked
            ? "PORTAL UNLOCKED! ENTER NOW!"
            : "EAT ALL APPLES TO UNLOCK PORTAL"}
        </strong>
      </div>
    </section>
  );
}

export function ActionDock({
  canUndo,
  onUndo,
  onRestart,
  onHint,
  onOpenSkins,
}) {
  return (
    <div className="desktop-action-dock" role="toolbar" aria-label="Game Actions">
      <button
        type="button"
        className="candy-action-btn undo-action-btn"
        disabled={!canUndo}
        onClick={onUndo}
        title="Undo (Z)"
      >
        <div className="candy-btn-face">
          <UndoSvgIcon className="action-svg-icon" />
          <span className="action-btn-text">Undo</span>
        </div>
      </button>

      <button
        type="button"
        className="candy-action-btn retry-action-btn"
        onClick={onRestart}
        title="Restart (R)"
      >
        <div className="candy-btn-face">
          <RetrySvgIcon className="action-svg-icon" />
          <span className="action-btn-text">Restart</span>
        </div>
      </button>

      <button
        type="button"
        className="candy-action-btn hint-action-btn"
        onClick={onHint}
        title="Hint (H)"
      >
        <div className="candy-btn-face">
          <HintSvgIcon className="action-svg-icon" />
          <span className="action-btn-text">Hint</span>
        </div>
      </button>

      <button
        type="button"
        className="candy-action-btn skins-action-btn"
        onClick={onOpenSkins}
        title="Skins"
      >
        <div className="candy-btn-face">
          <WardrobeSvgIcon className="action-svg-icon" />
          <span className="action-btn-text">Skins</span>
        </div>
      </button>
    </div>
  );
}

export function TouchDPad({ onMove }) {
  return (
    <div className="desktop-dpad-wrapper">
      <div className="modern-thumb-controller">
        <div className="thumbpad-outer-ring">
          <button
            type="button"
            className="thumbpad-arrow-btn arrow-up"
            onClick={() => onMove(0, -1)}
            aria-label="Up"
          >
            <span className="arrow-glyph">▲</span>
          </button>

          <div className="thumbpad-middle-row">
            <button
              type="button"
              className="thumbpad-arrow-btn arrow-left"
              onClick={() => onMove(-1, 0)}
              aria-label="Left"
            >
              <span className="arrow-glyph">◀</span>
            </button>

            <div className="thumbpad-center-jewel" aria-hidden="true">
              <span className="jewel-core" />
            </div>

            <button
              type="button"
              className="thumbpad-arrow-btn arrow-right"
              onClick={() => onMove(1, 0)}
              aria-label="Right"
            >
              <span className="arrow-glyph">▶</span>
            </button>
          </div>

          <button
            type="button"
            className="thumbpad-arrow-btn arrow-down"
            onClick={() => onMove(0, 1)}
            aria-label="Down"
          >
            <span className="arrow-glyph">▼</span>
          </button>
        </div>
      </div>
    </div>
  );
}
