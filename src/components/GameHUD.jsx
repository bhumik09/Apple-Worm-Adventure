import React from "react";
import { GAME_NAME } from "../config/gameConfig";

export function TopBar({
  currentLevel,
  totalLevels,
  world,
  totalStars,
  coins = 150,
  sfxEnabled,
  musicEnabled,
  themeMode,
  themeModes = [],
  onToggleSfx,
  onToggleMusic,
  onCycleTheme,
  onOpenLevelPicker,
  onOpenSkins,
  onOpenWallet,
  onOpenRewardCenter,
  onOpenLeaderboard,
  onOpenAuth,
}) {
  const currentTheme = themeModes.find((t) => t.id === themeMode) || {
    name: "World Colors",
    icon: "🎨",
  };
  return (
    <header className="game-topbar">
      <div className="topbar-brand">
        <div className="brand-mascot" aria-hidden="true">
          🐛
        </div>
        <div className="brand-text">
          <span className="brand-tag">ARCADE PUZZLE ADVENTURE</span>
          <h1 className="brand-title">{GAME_NAME}</h1>
        </div>
      </div>

      <div className="topbar-actions">
        {/* World & Level Badge */}
        <div className="topbar-level-badge">
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
          <span>💰</span>
          <strong>{coins.toLocaleString()}</strong>
        </button>

        {/* Total Stars Pill */}
        <div className="topbar-stars-pill" title="Total Stars Earned">
          <span>⭐</span>
          <strong>{totalStars}</strong>
        </div>

        {/* Rewards Center Shortcut */}
        <button
          type="button"
          className="icon-btn rewards-quick-btn"
          onClick={onOpenRewardCenter}
          title="Reward Center & Free Daily Ads"
          aria-label="Reward Center"
        >
          🎁
        </button>

        {/* Leaderboard Shortcut */}
        <button
          type="button"
          className="icon-btn"
          onClick={onOpenLeaderboard}
          title="Global Hall of Fame Leaderboard"
          aria-label="Leaderboard"
        >
          🏆
        </button>

        {/* Audio Toggles */}
        <button
          type="button"
          className={`icon-btn ${sfxEnabled ? "active" : "muted"}`}
          onClick={onToggleSfx}
          title={sfxEnabled ? "Mute Sound Effects" : "Unmute Sound Effects"}
          aria-label="Toggle SFX"
        >
          {sfxEnabled ? "🔊" : "🔇"}
        </button>

        <button
          type="button"
          className={`icon-btn ${musicEnabled ? "active" : "muted"}`}
          onClick={onToggleMusic}
          title={musicEnabled ? "Mute Music" : "Play Music"}
          aria-label="Toggle Music"
        >
          {musicEnabled ? "🎵" : "🎶"}
        </button>

        {/* Background Theme Switcher */}
        <button
          type="button"
          className="icon-btn theme-btn"
          onClick={onCycleTheme}
          title={`Theme: ${currentTheme.name} (Click to switch colors)`}
          aria-label="Switch Background Theme"
        >
          {currentTheme.icon}
        </button>

        {/* Skins Wardrobe */}
        <button
          type="button"
          className="topbar-btn skins-btn"
          onClick={onOpenSkins}
          title="Open Worm Wardrobe"
        >
          <span>👕</span> Wardrobe
        </button>

        {/* Choose Level */}
        <button
          type="button"
          className="topbar-btn level-select-btn"
          onClick={onOpenLevelPicker}
        >
          <span>▦</span> Levels
        </button>

        {/* Player Profile / Auth */}
        <button
          type="button"
          className="icon-btn auth-profile-btn"
          onClick={onOpenAuth}
          title="Player Account / Login"
          aria-label="Account"
        >
          👤
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

  // Star threshold info
  const par3 = level.parMoves?.star3 || 25;
  const par2 = level.parMoves?.star2 || 35;
  let currentEstimatedStars = 1;
  if (moves <= par3) currentEstimatedStars = 3;
  else if (moves <= par2) currentEstimatedStars = 2;

  return (
    <section className="arcade-hud-card" aria-label="Game HUD">
      {/* Time Left */}
      <div className={`hud-pill ${isTimeCritical ? "time-danger" : ""}`}>
        <span className="hud-icon">⏱️</span>
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
        <span className="hud-icon">🍎</span>
        <div className="hud-metric">
          <small>APPLES</small>
          <strong>
            {totalApples - applesLeft} / {totalApples}
          </strong>
        </div>
      </div>

      {/* Golden Apple Indicator (if level has golden apples) */}
      {(level.goldenApples || []).length > 0 && (
        <div className="hud-pill gold-pill">
          <span className="hud-icon">🌟</span>
          <div className="hud-metric">
            <small>BONUS</small>
            <strong>{goldenApplesLeft} left</strong>
          </div>
        </div>
      )}

      {/* Moves & Star Target */}
      <div className="hud-pill">
        <span className="hud-icon">👣</span>
        <div className="hud-metric">
          <small>MOVES ({"★".repeat(currentEstimatedStars)})</small>
          <strong>{moves}</strong>
        </div>
      </div>

      {/* Score */}
      <div className="hud-pill">
        <span className="hud-icon">⭐</span>
        <div className="hud-metric">
          <small>SCORE</small>
          <strong>{score}</strong>
        </div>
      </div>

      {/* Keys Indicator (if level has keys) */}
      {(level.keys || []).length > 0 && (
        <div className="hud-pill keys-pill">
          <span className="hud-icon">🗝️</span>
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
        className="dock-action-btn undo-btn"
        disabled={!canUndo}
        onClick={onUndo}
        title="Undo previous move (shortcut: Z or U)"
      >
        <span className="dock-icon">↶</span>
        <strong>Undo</strong>
        <small className="dock-key-hint">Z</small>
      </button>

      <button
        type="button"
        className="dock-action-btn restart-btn"
        onClick={onRestart}
        title="Restart current level (shortcut: R)"
      >
        <span className="dock-icon">↻</span>
        <strong>Restart</strong>
        <small className="dock-key-hint">R</small>
      </button>

      <button
        type="button"
        className="dock-action-btn hint-btn"
        onClick={onHint}
        title="Get a helpful tactical hint (shortcut: H)"
      >
        <span className="dock-icon">💡</span>
        <strong>Hint</strong>
        <small className="dock-key-hint">H</small>
      </button>

      <button
        type="button"
        className="dock-action-btn skins-dock-btn"
        onClick={onOpenSkins}
        title="Worm Wardrobe"
      >
        <span className="dock-icon">👕</span>
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
        className="dpad-btn dpad-up"
        onClick={() => onMove(0, -1)}
        aria-label="Move Up"
      >
        ▲
      </button>
      <div className="dpad-horizontal-row">
        <button
          type="button"
          className="dpad-btn dpad-left"
          onClick={() => onMove(-1, 0)}
          aria-label="Move Left"
        >
          ◀
        </button>
        <div className="dpad-center-hub" aria-hidden="true" />
        <button
          type="button"
          className="dpad-btn dpad-right"
          onClick={() => onMove(1, 0)}
          aria-label="Move Right"
        >
          ▶
        </button>
      </div>
      <button
        type="button"
        className="dpad-btn dpad-down"
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
        <span>⏸️</span>
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
          <span className="badge-icon">🍎</span>
          <strong>{totalApples - applesLeft}/{totalApples}</strong>
          {goldenApplesLeft > 0 && <span className="golden-badge-dot">🌟</span>}
        </div>

        {/* Live Star Par Meter */}
        <div className="h-stat-badge star-badge" title={`Moves: ${moves} (Par 3★: ≤${par3})`}>
          <div className="stars-micro-meter">
            <span className={`micro-star ${currentStars >= 1 ? "lit" : "dim"}`}>★</span>
            <span className={`micro-star ${currentStars >= 2 ? "lit" : "dim"}`}>★</span>
            <span className={`micro-star ${currentStars >= 3 ? "lit" : "dim"}`}>★</span>
          </div>
          <small>{moves}</small>
        </div>

        {/* Timer */}
        <div className={`h-stat-badge timer-badge ${isTimeCritical ? "time-danger" : ""}`}>
          <span className="badge-icon">⏱️</span>
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
          <span>{currentTheme?.icon || "🎨"}</span>
        </button>
        <button
          type="button"
          className={`mobile-h-btn sfx-h-btn tactile-btn ${sfxEnabled ? "" : "muted"}`}
          onClick={onToggleSfx}
          title={sfxEnabled ? "Mute Sound" : "Play Sound"}
          aria-label="Toggle Sound"
        >
          <span>{sfxEnabled ? "🔊" : "🔇"}</span>
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
          aria-label="Undo"
          title="Undo move (Z)"
        >
          <span className="btn-icon">↶</span>
          <span className="btn-label">Undo</span>
        </button>

        <button
          type="button"
          className="cockpit-round-btn hint-btn tactile-btn"
          onClick={onHint}
          aria-label="Hint"
          title="Hint (H)"
        >
          <span className="btn-icon">💡</span>
          <span className="btn-label">Hint</span>
        </button>
      </div>

      {/* Center Ergonomic 4-Way D-Pad */}
      <div className="cockpit-center-dpad">
        <div className="arcade-dpad-chassis">
          <button
            type="button"
            className="arcade-dpad-btn btn-up"
            onClick={() => onMove(0, -1)}
            aria-label="Up"
          >
            ▲
          </button>
          <div className="arcade-dpad-mid">
            <button
              type="button"
              className="arcade-dpad-btn btn-left"
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
              className="arcade-dpad-btn btn-right"
              onClick={() => onMove(1, 0)}
              aria-label="Right"
            >
              ▶
            </button>
          </div>
          <button
            type="button"
            className="arcade-dpad-btn btn-down"
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
          aria-label="Restart"
          title="Restart level (R)"
        >
          <span className="btn-icon">↻</span>
          <span className="btn-label">Retry</span>
        </button>

        <button
          type="button"
          className="cockpit-round-btn skins-btn tactile-btn"
          onClick={onOpenSkins}
          aria-label="Wardrobe"
          title="Skins Wardrobe"
        >
          <span className="btn-icon">👕</span>
          <span className="btn-label">Skins</span>
        </button>
      </div>
    </footer>
  );
}
