import React from "react";
import { GAME_NAME } from "../config/gameConfig";

/* =========================================================================
   CUSTOM VECTOR SVG ICONS (Crisp, High-Quality Arcade Visuals)
   ========================================================================= */

export function AppleSvgIcon({ className = "hud-svg-icon" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M12 4.5C10 2.5 7.5 3 6.5 4.5C4.5 7 5 12 7 16C8.5 19 10 21 12 21C14 21 15.5 19 17 16C19 12 19.5 7 17.5 4.5C16.5 3 14 2.5 12 4.5Z"
        fill="url(#appleSvgGrad)"
        stroke="#991b1b"
        strokeWidth="1.2"
      />
      <path d="M12 4.5Q12.5 2 15 1.5" stroke="#78350f" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M13 3C15 2.5 17 3.5 17 3.5C17 3.5 16 5 14 4.5" fill="#4ade80" stroke="#16a34a" strokeWidth="0.8" />
      <ellipse cx="9" cy="8" rx="2.2" ry="3.5" transform="rotate(-25 9 8)" fill="white" opacity="0.6" />
      <defs>
        <radialGradient id="appleSvgGrad" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#f87171" />
          <stop offset="45%" stopColor="#ef4444" />
          <stop offset="90%" stopColor="#b91c1c" />
          <stop offset="100%" stopColor="#7f1d1d" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export function StarSvgIcon({ className = "hud-svg-icon", filled = true }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M12 2.5L14.9 8.6L21.6 9.5L16.7 14.2L17.9 20.8L12 17.6L6.1 20.8L7.3 14.2L2.4 9.5L9.1 8.6L12 2.5Z"
        fill={filled ? "url(#starSvgGrad)" : "#cbd5e1"}
        stroke={filled ? "#ca8a04" : "#94a3b8"}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {filled && (
        <path
          d="M12 4.5L14.2 9.2L19.3 9.9L15.6 13.5L16.5 18.5L12 16.1V4.5Z"
          fill="#fef08a"
          opacity="0.45"
        />
      )}
      <defs>
        <linearGradient id="starSvgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="40%" stopColor="#facc15" />
          <stop offset="100%" stopColor="#eab308" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function TimerSvgIcon({ className = "hud-svg-icon" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="12" cy="13" r="8.5" fill="#f8fafc" stroke="#0284c7" strokeWidth="1.8" />
      <path d="M12 2.5V4.5M10 2.5H14" stroke="#0284c7" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 13V8.5" stroke="#0369a1" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 13L15.5 15.5" stroke="#0284c7" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="13" r="1.5" fill="#0369a1" />
    </svg>
  );
}

export function CoinSvgIcon({ className = "hud-svg-icon" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" fill="url(#coinSvgGrad)" stroke="#ca8a04" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="7.5" stroke="#fef08a" strokeWidth="0.8" strokeDasharray="2 1.5" />
      <text
        x="12"
        y="15.5"
        textAnchor="middle"
        fontSize="10"
        fontWeight="900"
        fill="#713f12"
        fontFamily="sans-serif"
      >
        ¢
      </text>
      <defs>
        <radialGradient id="coinSvgGrad" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="55%" stopColor="#facc15" />
          <stop offset="100%" stopColor="#d97706" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export function PauseSvgIcon({ className = "hud-svg-icon" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="6" y="5" width="4" height="14" rx="2" fill="currentColor" />
      <rect x="14" y="5" width="4" height="14" rx="2" fill="currentColor" />
    </svg>
  );
}

export function SoundSvgIcon({ enabled = true, className = "hud-svg-icon" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M3 9.5H7L12 5.5V18.5L7 14.5H3V9.5Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {enabled ? (
        <path
          d="M15.5 8.5C16.8 9.8 17.5 11 17.5 12C17.5 13 16.8 14.2 15.5 15.5M18.5 6C20.5 7.8 21.5 9.8 21.5 12C21.5 14.2 20.5 16.2 18.5 18"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      ) : (
        <path d="M16 9L21 14M21 9L16 14" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
      )}
    </svg>
  );
}

export function PaletteSvgIcon({ className = "hud-svg-icon" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M12 3C7 3 3 7 3 12C3 17 7 21 12 21C13.5 21 14.5 19.8 14.5 18.5C14.5 17.8 14.2 17.2 13.8 16.7C13.4 16.2 13.2 15.7 13.2 15C13.2 13.6 14.3 12.5 15.7 12.5H17.5C19.7 12.5 21.5 10.7 21.5 8.5C21.5 5.5 17.2 3 12 3Z"
        fill="url(#paletteGrad)"
        stroke="#9333ea"
        strokeWidth="1.2"
      />
      <circle cx="7.5" cy="10" r="1.5" fill="#ef4444" />
      <circle cx="10.5" cy="6.5" r="1.5" fill="#facc15" />
      <circle cx="15.5" cy="7.5" r="1.5" fill="#22c55e" />
      <circle cx="17.5" cy="11" r="1.5" fill="#38bdf8" />
      <defs>
        <linearGradient id="paletteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f3e8ff" />
          <stop offset="100%" stopColor="#e9d5ff" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function UndoSvgIcon({ className = "hud-svg-icon" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M4.5 10H14.5C17.5 10 20 12.5 20 15.5C20 18.5 17.5 21 14.5 21H9"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 6L4.5 10L8.5 14"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function RetrySvgIcon({ className = "hud-svg-icon" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M19.5 12C19.5 16.14 16.14 19.5 12 19.5C8.35 19.5 5.3 16.9 4.63 13.4"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M4.5 12C4.5 7.86 7.86 4.5 12 4.5C15.22 4.5 17.98 6.53 19.05 9.38"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <polyline points="19.5,4.5 19.5,9.5 14.5,9.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function HintSvgIcon({ className = "hud-svg-icon" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M9 18H15M10 21H14M12 3C8.13 3 5 6.13 5 10C5 12.38 6.19 14.47 8 15.74V17C8 17.55 8.45 18 9 18H15C15.55 18 16 17.55 16 17V15.74C17.81 14.47 19 12.38 19 10C19 6.13 15.87 3 12 3Z"
        fill="url(#hintGrad)"
        stroke="#ca8a04"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.5" fill="#fef08a" />
      <defs>
        <linearGradient id="hintGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fef9c3" />
          <stop offset="100%" stopColor="#fde047" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function WardrobeSvgIcon({ className = "hud-svg-icon" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M5 6L9 3H15L19 6L17 10L14 8V21H10V8L7 10L5 6Z"
        fill="url(#skinGrad)"
        stroke="#7c3aed"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M12 3V7" stroke="#6d28d9" strokeWidth="1.2" />
      <defs>
        <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ddd6fe" />
          <stop offset="100%" stopColor="#c4b5fd" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function GiftSvgIcon({ className = "hud-svg-icon" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="3" y="10" width="18" height="11" rx="2" fill="#ec4899" stroke="#be185d" strokeWidth="1.2" />
      <rect x="2" y="6" width="20" height="4" rx="1.5" fill="#f43f5e" stroke="#9f1239" strokeWidth="1.2" />
      <rect x="10.5" y="6" width="3" height="15" fill="#fde047" stroke="#ca8a04" strokeWidth="0.8" />
      <path d="M12 6C10 3 6 4 7.5 6H12ZM12 6C14 3 18 4 16.5 6H12Z" fill="#fde047" stroke="#ca8a04" strokeWidth="1" />
    </svg>
  );
}

export function TrophySvgIcon({ className = "hud-svg-icon" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M6 4H18V10C18 13.3 15.3 16 12 16C8.7 16 6 13.3 6 10V4Z"
        fill="url(#trophyGrad)"
        stroke="#b45309"
        strokeWidth="1.3"
      />
      <path d="M6 6H3C3 8.5 4.5 10.5 7 10.5" stroke="#d97706" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M18 6H21C21 8.5 19.5 10.5 17 10.5" stroke="#d97706" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M12 16V19M8 21H16" stroke="#b45309" strokeWidth="1.8" strokeLinecap="round" />
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
   COMPONENTS
   ========================================================================= */

export function TopBar({
  currentLevel,
  totalLevels,
  world,
  totalStars,
  coins = 150,
  sfxEnabled,
  themeMode,
  themeModes = [],
  onToggleSfx,
  onCycleTheme,
  onOpenLevelPicker,
  onOpenSkins,
  onOpenWallet,
  onOpenRewardCenter,
  onOpenLeaderboard,
}) {
  const currentTheme = themeModes.find((t) => t.id === themeMode) || {
    name: "World Colors",
  };

  return (
    <header className="game-topbar">
      <div className="topbar-brand">
        <div className="brand-mascot" aria-hidden="true">
          <AppleSvgIcon className="brand-svg-apple" />
        </div>
        <div className="brand-text">
          <span className="brand-tag">ARCADE PUZZLE ADVENTURE</span>
          <h1 className="brand-title">{GAME_NAME}</h1>
        </div>
      </div>

      <div className="topbar-actions">
        {/* World & Level Badge */}
        <div
          className="topbar-level-badge tactile-btn"
          onClick={onOpenLevelPicker}
          role="button"
          tabIndex={0}
          title="Open Level Selection"
        >
          <span className="level-world-name">{world.icon} {world.name}</span>
          <div className="level-numbers">
            <strong>LEVEL {String(currentLevel).padStart(2, "0")}</strong>
            <small>/ {totalLevels}</small>
          </div>
        </div>

        {/* Live Coins Wallet Pill */}
        <button
          type="button"
          className="topbar-coins-pill tactile-btn"
          onClick={onOpenWallet}
          title="Open Player Wallet & Transaction Ledger"
        >
          <CoinSvgIcon className="pill-coin-icon" />
          <strong>{coins.toLocaleString()}</strong>
        </button>

        {/* Total Stars Pill */}
        <div className="topbar-stars-pill" title="Total Stars Earned">
          <StarSvgIcon className="pill-star-icon" />
          <strong>{totalStars}</strong>
        </div>

        {/* Rewards Center Shortcut */}
        <button
          type="button"
          className="icon-btn rewards-quick-btn tactile-btn"
          onClick={onOpenRewardCenter}
          title="Reward Center & Free Daily Ads"
          aria-label="Reward Center"
        >
          <GiftSvgIcon className="icon-btn-svg" />
        </button>

        {/* Leaderboard Shortcut */}
        <button
          type="button"
          className="icon-btn tactile-btn"
          onClick={onOpenLeaderboard}
          title="Global Hall of Fame Leaderboard"
          aria-label="Leaderboard"
        >
          <TrophySvgIcon className="icon-btn-svg" />
        </button>

        {/* Audio Toggles */}
        <button
          type="button"
          className={`icon-btn tactile-btn ${sfxEnabled ? "active" : "muted"}`}
          onClick={onToggleSfx}
          title={sfxEnabled ? "Mute Sound Effects" : "Unmute Sound Effects"}
          aria-label="Toggle SFX"
        >
          <SoundSvgIcon enabled={sfxEnabled} className="icon-btn-svg" />
        </button>

        {/* Theme Cycle */}
        <button
          type="button"
          className="icon-btn theme-cycle-btn tactile-btn"
          onClick={onCycleTheme}
          title={`Cycle Theme: ${currentTheme.name}`}
          aria-label="Cycle Theme"
        >
          <PaletteSvgIcon className="icon-btn-svg" />
        </button>

        {/* Worm Skins Wardrobe */}
        <button
          type="button"
          className="btn-skins-quick tactile-btn"
          onClick={onOpenSkins}
          title="Worm Skins Wardrobe"
        >
          <WardrobeSvgIcon className="skin-btn-svg" />
          <span>Skins</span>
        </button>
      </div>
    </header>
  );
}

export function ArcadeHUD({
  level,
  applesLeft,
  totalApples,
  goldenApplesLeft = 0,
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
    <section className="arcade-hud-card" aria-label="Game HUD">
      {/* Time Left */}
      <div className={`hud-pill ${isTimeCritical ? "time-danger" : ""}`}>
        <TimerSvgIcon className="hud-metric-icon" />
        <div className="hud-metric">
          <small>TIME</small>
          <strong>
            {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
            {String(timeLeft % 60).padStart(2, "0")}
          </strong>
        </div>
      </div>

      {/* Apples Left */}
      <div className="hud-pill">
        <AppleSvgIcon className="hud-metric-icon" />
        <div className="hud-metric">
          <small>APPLES</small>
          <strong>
            {totalApples - applesLeft} / {totalApples}
          </strong>
        </div>
      </div>

      {/* Golden Apple Indicator */}
      {(level.goldenApples || []).length > 0 && (
        <div className="hud-pill gold-pill">
          <StarSvgIcon className="hud-metric-icon" />
          <div className="hud-metric">
            <small>BONUS</small>
            <strong>{goldenApplesLeft} left</strong>
          </div>
        </div>
      )}

      {/* Moves & Star Target */}
      <div className="hud-pill">
        <span className="hud-stars-mini">
          <StarSvgIcon className="micro-star" filled={currentEstimatedStars >= 1} />
          <StarSvgIcon className="micro-star" filled={currentEstimatedStars >= 2} />
          <StarSvgIcon className="micro-star" filled={currentEstimatedStars >= 3} />
        </span>
        <div className="hud-metric">
          <small>MOVES (Par {par3})</small>
          <strong>{moves}</strong>
        </div>
      </div>

      {/* Score */}
      <div className="hud-pill">
        <TrophySvgIcon className="hud-metric-icon" />
        <div className="hud-metric">
          <small>SCORE</small>
          <strong>{score}</strong>
        </div>
      </div>

      {/* Keys Indicator (if level has keys) */}
      {(level.keys || []).length > 0 && (
        <div className="hud-pill keys-pill">
          <span className="hud-metric-icon">🗝️</span>
          <div className="hud-metric">
            <small>KEYS</small>
            <strong>{collectedKeys.length} / {level.keys.length}</strong>
          </div>
        </div>
      )}

      {/* Objective Status Banner */}
      <div className={`hud-status-badge status-${status} ${isPortalUnlocked ? "portal-ready" : ""}`}>
        <span className="status-indicator-dot" />
        {status === "won"
          ? "VICTORY!"
          : status === "failed"
          ? "TRY AGAIN"
          : isPortalUnlocked
          ? "PORTAL OPEN!"
          : "FEED THE WORM"}
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
    <div className="game-action-dock" role="toolbar" aria-label="Game Actions">
      <button
        type="button"
        className="dock-action-btn undo-btn tactile-btn"
        disabled={!canUndo}
        onClick={onUndo}
        title="Undo previous move (shortcut: Z)"
      >
        <UndoSvgIcon className="dock-svg-icon" />
        <strong>Undo</strong>
        <small className="dock-key-hint">Z</small>
      </button>

      <button
        type="button"
        className="dock-action-btn restart-btn tactile-btn"
        onClick={onRestart}
        title="Restart current level (shortcut: R)"
      >
        <RetrySvgIcon className="dock-svg-icon" />
        <strong>Restart</strong>
        <small className="dock-key-hint">R</small>
      </button>

      <button
        type="button"
        className="dock-action-btn hint-btn tactile-btn"
        onClick={onHint}
        title="Get a tactical hint (shortcut: H)"
      >
        <HintSvgIcon className="dock-svg-icon" />
        <strong>Hint</strong>
        <small className="dock-key-hint">H</small>
      </button>

      <button
        type="button"
        className="dock-action-btn skins-dock-btn tactile-btn"
        onClick={onOpenSkins}
        title="Worm Wardrobe"
      >
        <WardrobeSvgIcon className="dock-svg-icon" />
        <strong>Skins</strong>
      </button>
    </div>
  );
}

export function TouchDPad({ onMove }) {
  return (
    <div className="touch-dpad-cluster" aria-label="Virtual Gamepad">
      <button
        type="button"
        className="dpad-btn dpad-up tactile-btn"
        onClick={() => onMove(0, -1)}
        aria-label="Move Up"
      >
        ▲
      </button>
      <div className="dpad-horizontal-row">
        <button
          type="button"
          className="dpad-btn dpad-left tactile-btn"
          onClick={() => onMove(-1, 0)}
          aria-label="Move Left"
        >
          ◀
        </button>
        <div className="dpad-center-hub" aria-hidden="true">
          <div className="hub-core" />
        </div>
        <button
          type="button"
          className="dpad-btn dpad-right tactile-btn"
          onClick={() => onMove(1, 0)}
          aria-label="Move Right"
        >
          ▶
        </button>
      </div>
      <button
        type="button"
        className="dpad-btn dpad-down tactile-btn"
        onClick={() => onMove(0, 1)}
        aria-label="Move Down"
      >
        ▼
      </button>
    </div>
  );
}

export function MobileGameHeader({
  level,
  world,
  applesLeft,
  totalApples,
  goldenApplesLeft = 0,
  moves,
  timeLeft,
  onOpenPause,
  onCycleTheme,
  currentTheme,
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
    <header className="mobile-game-header" aria-label="Game Status Bar">
      {/* Left: Pause / Menu Button */}
      <button
        type="button"
        className="mobile-h-btn pause-h-btn tactile-btn"
        onClick={onOpenPause}
        title="Pause Game / Level Info"
        aria-label="Pause"
      >
        <PauseSvgIcon className="h-svg-icon" />
      </button>

      {/* Level Info Pill */}
      <div className="mobile-h-level" onClick={onOpenPause} role="button" tabIndex={0}>
        <span className="h-world-icon">{world.icon}</span>
        <div className="h-level-meta">
          <small>LVL {level.id}</small>
          <strong>{level.name}</strong>
        </div>
      </div>

      {/* Central Stats Group */}
      <div className="mobile-h-stats">
        {/* Apple Counter */}
        <div className="h-stat-badge apple-badge" title={`${applesLeft} apple(s) left`}>
          <AppleSvgIcon className="badge-svg-icon" />
          <strong>
            {totalApples - applesLeft}/{totalApples}
          </strong>
          {goldenApplesLeft > 0 && <span className="golden-badge-dot">★</span>}
        </div>

        {/* Live Star Par Meter */}
        <div className="h-stat-badge star-badge" title={`Moves: ${moves} (Par 3★: ≤${par3})`}>
          <div className="stars-micro-meter">
            <StarSvgIcon className="micro-star" filled={currentStars >= 1} />
            <StarSvgIcon className="micro-star" filled={currentStars >= 2} />
            <StarSvgIcon className="micro-star" filled={currentStars >= 3} />
          </div>
          <small>{moves}</small>
        </div>

        {/* Timer */}
        <div className={`h-stat-badge timer-badge ${isTimeCritical ? "time-danger" : ""}`}>
          <TimerSvgIcon className="badge-svg-icon" />
          <strong>
            {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:{String(timeLeft % 60).padStart(2, "0")}
          </strong>
        </div>
      </div>

      {/* Right: Quick Controls */}
      <div className="mobile-h-actions">
        <button
          type="button"
          className="mobile-h-btn theme-h-btn tactile-btn"
          onClick={onCycleTheme}
          title={`Theme: ${currentTheme?.name || "Colors"}`}
          aria-label="Switch Theme"
        >
          <PaletteSvgIcon className="h-svg-icon" />
        </button>
        <button
          type="button"
          className={`mobile-h-btn sfx-h-btn tactile-btn ${sfxEnabled ? "" : "muted"}`}
          onClick={onToggleSfx}
          title={sfxEnabled ? "Mute Sound" : "Play Sound"}
          aria-label="Toggle Sound"
        >
          <SoundSvgIcon enabled={sfxEnabled} className="h-svg-icon" />
        </button>
      </div>
    </header>
  );
}

export function MobileControlCockpit({
  canUndo,
  onUndo,
  onRestart,
  onHint,
  onOpenSkins,
  onMove,
}) {
  return (
    <footer className="mobile-control-cockpit" aria-label="Game Controller">
      {/* Left Wing (Undo & Hint) */}
      <div className="cockpit-wing left-wing">
        <button
          type="button"
          className="cockpit-round-btn undo-btn tactile-btn"
          disabled={!canUndo}
          onClick={onUndo}
          aria-label="Undo Move"
          title="Undo (Z)"
        >
          <UndoSvgIcon className="cockpit-svg-icon" />
          <span className="cockpit-btn-label">Undo</span>
        </button>

        <button
          type="button"
          className="cockpit-round-btn hint-btn tactile-btn"
          onClick={onHint}
          aria-label="Tactical Hint"
          title="Hint (H)"
        >
          <HintSvgIcon className="cockpit-svg-icon" />
          <span className="cockpit-btn-label">Hint</span>
        </button>
      </div>

      {/* Center Handheld D-Pad */}
      <div className="cockpit-center-dpad">
        <div className="arcade-dpad-chassis">
          <button
            type="button"
            className="arcade-dpad-btn btn-up tactile-btn"
            onClick={() => onMove(0, -1)}
            aria-label="Up"
          >
            ▲
          </button>
          <div className="arcade-dpad-mid">
            <button
              type="button"
              className="arcade-dpad-btn btn-left tactile-btn"
              onClick={() => onMove(-1, 0)}
              aria-label="Left"
            >
              ◀
            </button>
            <div className="arcade-dpad-hub" aria-hidden="true">
              <div className="hub-core" />
            </div>
            <button
              type="button"
              className="arcade-dpad-btn btn-right tactile-btn"
              onClick={() => onMove(1, 0)}
              aria-label="Right"
            >
              ▶
            </button>
          </div>
          <button
            type="button"
            className="arcade-dpad-btn btn-down tactile-btn"
            onClick={() => onMove(0, 1)}
            aria-label="Down"
          >
            ▼
          </button>
        </div>
      </div>

      {/* Right Wing (Retry & Skins) */}
      <div className="cockpit-wing right-wing">
        <button
          type="button"
          className="cockpit-round-btn restart-btn tactile-btn"
          onClick={onRestart}
          aria-label="Restart Level"
          title="Restart (R)"
        >
          <RetrySvgIcon className="cockpit-svg-icon" />
          <span className="cockpit-btn-label">Retry</span>
        </button>

        <button
          type="button"
          className="cockpit-round-btn wardrobe-btn tactile-btn"
          onClick={onOpenSkins}
          aria-label="Worm Skins"
          title="Skins"
        >
          <WardrobeSvgIcon className="cockpit-svg-icon" />
          <span className="cockpit-btn-label">Skins</span>
        </button>
      </div>
    </footer>
  );
}
