import React, { useEffect, useState } from "react";
import { audio } from "../utils/audioEngine";
import {
  AppleSvgIcon,
  StarSvgIcon,
  TrophySvgIcon,
  GiftSvgIcon,
  SoundSvgIcon,
  UndoSvgIcon,
  RetrySvgIcon,
} from "./GameHUD";

export function StartScreen({
  currentLevel,
  unlockedLevel,
  totalLevels,
  levelName,
  difficulty,
  difficulties,
  onSelectDifficulty,
  onStartGame,
  onOpenLevelPicker,
  onOpenSkins,
  onOpenRewardCenter,
  onOpenLeaderboard,
  onOpenAchievements,
  onOpenAdmin,
}) {
  return (
    <section className="start-screen-card" aria-label="Game Start Screen">
      {/* Background Animated Rays / Sunburst */}
      <div className="start-screen-sunburst" aria-hidden="true" />

      {/* Hero Mascot: 3D Golden Apple & Cartoon Worm Mascot */}
      <div className="hero-mascot-container">
        <div className="hero-portal-aura" aria-hidden="true" />
        <div className="hero-giant-apple-wrapper">
          <AppleSvgIcon className="hero-giant-apple-svg" />
        </div>
        <div className="hero-worm-mascot-badge" aria-hidden="true">
          <svg viewBox="0 0 48 48" className="hero-worm-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="18" fill="url(#heroWormGrad)" stroke="#15803d" strokeWidth="2" />
            <circle cx="18" cy="20" r="4.5" fill="white" />
            <circle cx="18" cy="20" r="2.2" fill="#0f172a" />
            <circle cx="17" cy="18.5" r="1" fill="white" />
            <circle cx="30" cy="20" r="4.5" fill="white" />
            <circle cx="30" cy="20" r="2.2" fill="#0f172a" />
            <circle cx="29" cy="18.5" r="1" fill="white" />
            <ellipse cx="14" cy="25" rx="2.5" ry="1.5" fill="#f43f5e" opacity="0.5" />
            <ellipse cx="34" cy="25" rx="2.5" ry="1.5" fill="#f43f5e" opacity="0.5" />
            <path d="M20 27C21.5 29.5 26.5 29.5 28 27" stroke="#14532d" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M18 10C16 6 12 7 13 10M30 10C32 6 36 7 35 10" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
            <circle cx="12.5" cy="7.5" r="2.5" fill="#4ade80" />
            <circle cx="35.5" cy="7.5" r="2.5" fill="#4ade80" />
            <defs>
              <radialGradient id="heroWormGrad" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#86efac" />
                <stop offset="60%" stopColor="#22c55e" />
                <stop offset="100%" stopColor="#15803d" />
              </radialGradient>
            </defs>
          </svg>
        </div>
        <span className="hero-sparkle-dot sp-1" />
        <span className="hero-sparkle-dot sp-2" />
        <span className="hero-sparkle-dot sp-3" />
      </div>

      <span className="start-eyebrow">ARCADE PUZZLE ADVENTURE</span>
      <h2 className="start-title">
        <span className="title-gradient">Apple Worm</span>
        <span className="title-sub">ADVENTURE</span>
      </h2>
      <p className="start-description">
        Munch crisp apples, navigate crafty traps, collect keys, and slide safely into the cosmic portal!
      </p>

      {/* Quick Access Badges Bar */}
      <div className="start-quick-badges-bar">
        <button type="button" className="quick-badge-btn tactile-btn" onClick={onOpenRewardCenter}>
          <GiftSvgIcon className="quick-badge-icon" />
          <span>Reward Center</span>
        </button>
        <button type="button" className="quick-badge-btn tactile-btn" onClick={onOpenLeaderboard}>
          <TrophySvgIcon className="quick-badge-icon" />
          <span>Hall of Fame</span>
        </button>
        <button type="button" className="quick-badge-btn tactile-btn" onClick={onOpenAchievements}>
          <StarSvgIcon className="quick-badge-icon" />
          <span>Badges</span>
        </button>
        <button type="button" className="quick-badge-btn admin-quick-btn tactile-btn" onClick={onOpenAdmin}>
          <span>⚙️</span>
          <span>Economy</span>
        </button>
      </div>

      {/* Difficulty Selection */}
      <div className="difficulty-selection-box">
        <span className="section-label">CHOOSE DIFFICULTY</span>
        <div className="difficulty-pills-row">
          {Object.entries(difficulties).map(([name, config]) => {
            const isSelected = difficulty === name;
            return (
              <button
                key={name}
                type="button"
                className={`diff-pill-btn tactile-btn ${isSelected ? "selected" : ""}`}
                onClick={() => {
                  audio.playClick();
                  onSelectDifficulty(name);
                }}
              >
                <span className="diff-icon">{config.icon}</span>
                <strong>{name}</strong>
                <small>{config.time}s • {config.bonus}</small>
              </button>
            );
          })}
        </div>
      </div>

      {/* Level Info Bar */}
      <div className="start-level-meta">
        <div className="meta-item">
          <span>CURRENT MISSION</span>
          <strong>Level {currentLevel}: {levelName}</strong>
        </div>
        <div className="meta-item">
          <span>ADVENTURE PROGRESS</span>
          <strong>{unlockedLevel} / {totalLevels} Unlocked</strong>
        </div>
      </div>

      {/* Big Juicy Start Button */}
      <button
        type="button"
        className="btn-start-adventure tactile-btn"
        onClick={onStartGame}
      >
        <span className="btn-shine" />
        <span className="btn-text">PLAY ADVENTURE</span>
        <span className="btn-play-arrow">▶</span>
      </button>

      {/* Secondary Bottom Navigation Row */}
      <div className="start-footer-actions">
        <button
          type="button"
          className="btn-footer-sub tactile-btn"
          onClick={onOpenLevelPicker}
        >
          <span>🗺️</span>
          <span>World Map ({unlockedLevel}/{totalLevels})</span>
        </button>
        <button
          type="button"
          className="btn-footer-sub tactile-btn"
          onClick={onOpenSkins}
        >
          <span>🎨</span>
          <span>Worm Wardrobe</span>
        </button>
      </div>

      {/* Controls Hint */}
      <div className="start-controls-hint">
        <div className="control-tag">
          <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> or <kbd>Arrows</kbd> to slither
        </div>
        <div className="control-tag">
          <kbd>📱</kbd> Swipe screen or tap D-Pad on mobile
        </div>
      </div>
    </section>
  );
}

export function WinModal({
  levelNumber,
  moves,
  score,
  earnedStars,
  isMaxLevel,
  coinsEarned = 25,
  hasDoubled = false,
  onNextLevel,
  onReplay,
  onOpenLevelPicker,
  onWatchAdDoubleReward,
}) {
  const [animatedStars, setAnimatedStars] = useState(0);

  useEffect(() => {
    const timers = [];
    for (let i = 1; i <= earnedStars; i++) {
      timers.push(
        setTimeout(() => {
          setAnimatedStars(i);
          audio.playStar(i);
        }, i * 300)
      );
    }
    return () => timers.forEach(clearTimeout);
  }, [earnedStars]);

  return (
    <div className="modal-backdrop celebration-backdrop" role="dialog" aria-modal="true">
      {/* Rotating Sunburst Rays */}
      <div className="celebration-sunburst-rays" aria-hidden="true" />

      {/* Confetti Explosion */}
      <div className="confetti-particles" aria-hidden="true">
        {Array.from({ length: 50 }, (_, i) => (
          <span
            key={i}
            className="confetti-dot"
            style={{
              left: `${(i * 19) % 100}%`,
              backgroundColor: [
                "#22c55e",
                "#38bdf8",
                "#facc15",
                "#ec4899",
                "#a855f7",
                "#f97316",
              ][i % 6],
              animationDelay: `${(i % 10) * 0.12}s`,
              animationDuration: `${2.2 + (i % 5) * 0.3}s`,
            }}
          />
        ))}
      </div>

      <div className="modal-card win-modal-card">
        {/* Golden Trophy Crest */}
        <div className="trophy-wrapper">
          <div className="trophy-ambient-glow" aria-hidden="true" />
          <TrophySvgIcon className="win-trophy-svg" />
        </div>

        <span className="modal-eyebrow">MISSION ACCOMPLISHED</span>
        <h2>{isMaxLevel ? "Grand Master Worm!" : `Level ${levelNumber} Cleared!`}</h2>
        <p className="win-subtitle">
          {isMaxLevel
            ? "Legendary! You have conquered all 50 levels of the Apple Worm Adventure!"
            : "Superb slither skills! Ready for the next challenge?"}
        </p>

        {/* 3 Stars Award Animation */}
        <div className="win-stars-display" aria-label={`${earnedStars} stars earned`}>
          {[1, 2, 3].map((starNum) => {
            const isEarned = starNum <= animatedStars;
            return (
              <span
                key={starNum}
                className={`celebration-star ${isEarned ? "earned star-bounce" : "unearned"}`}
              >
                <StarSvgIcon filled={isEarned} className="star-svg-large" />
              </span>
            );
          })}
        </div>

        {/* Stats & Economy Rewards Grid */}
        <div className="win-stats-grid">
          <div className="stat-pill">
            <small>MOVES</small>
            <strong>{moves}</strong>
          </div>
          <div className="stat-pill">
            <small>COINS EARNED</small>
            <strong className="coin-text">
              +{hasDoubled ? coinsEarned * 2 : coinsEarned} ¢
            </strong>
          </div>
          <div className="stat-pill highlight">
            <small>TOTAL SCORE</small>
            <strong>+{hasDoubled ? score * 2 : score} pts</strong>
          </div>
        </div>

        {/* Double Reward Rewarded-Ad Callout */}
        {!hasDoubled && onWatchAdDoubleReward && (
          <div className="ad-double-reward-banner">
            <div className="double-banner-content">
              <span className="double-badge">⭐ VELoop 2X MULTIPLIER</span>
              <strong>Watch 1 video to Double Coins & Score!</strong>
            </div>
            <button
              type="button"
              className="btn-double-reward tactile-btn"
              onClick={onWatchAdDoubleReward}
            >
              <span className="btn-shine" />
              <span>🎬 2X Double Reward</span>
            </button>
          </div>
        )}

        {/* Modal Primary Action Buttons */}
        <div className="modal-actions-column">
          {!isMaxLevel ? (
            <button
              type="button"
              className="btn-next-level tactile-btn"
              onClick={onNextLevel}
            >
              <span className="btn-shine" />
              <span className="btn-label">NEXT LEVEL</span>
              <span className="btn-arrow">▶</span>
            </button>
          ) : (
            <button
              type="button"
              className="btn-next-level tactile-btn"
              onClick={onOpenLevelPicker}
            >
              <span className="btn-shine" />
              <span>Explore All Worlds ★</span>
            </button>
          )}

          <div className="secondary-actions-row">
            <button
              type="button"
              className="btn-modal-sub tactile-btn"
              onClick={onReplay}
            >
              <RetrySvgIcon className="btn-sub-svg" />
              <span>Replay</span>
            </button>
            <button
              type="button"
              className="btn-modal-sub tactile-btn"
              onClick={onOpenLevelPicker}
            >
              <span>🗺️</span>
              <span>Levels</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FailModal({
  reason,
  canUndo,
  canRevive = true,
  onUndo,
  onRestart,
  onOpenLevelPicker,
  onWatchAdRevive,
  onWatchAdExtraMoves,
}) {
  return (
    <div className="modal-backdrop fail-backdrop" role="dialog" aria-modal="true">
      <div className="modal-card fail-modal-card">
        {/* Comic Dizzy Worm Icon */}
        <div className="fail-mascot-wrapper">
          <svg viewBox="0 0 64 64" className="fail-mascot-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="32" r="26" fill="url(#failWormGrad)" stroke="#b91c1c" strokeWidth="2.5" />
            {/* Dizzy X Eyes */}
            <path d="M20 23L28 31M28 23L20 31" stroke="#450a0a" strokeWidth="3" strokeLinecap="round" />
            <path d="M36 23L44 31M44 23L36 31" stroke="#450a0a" strokeWidth="3" strokeLinecap="round" />
            {/* Wavy unhappy mouth */}
            <path d="M22 44C26 40 30 46 34 40C38 46 42 40 44 42" stroke="#450a0a" strokeWidth="2.5" strokeLinecap="round" />
            {/* Comic star above head */}
            <path d="M32 6L33.5 10L37.5 11.5L33.5 13L32 17L30.5 13L26.5 11.5L30.5 10L32 6Z" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
            <defs>
              <radialGradient id="failWormGrad" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#fca5a5" />
                <stop offset="60%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#991b1b" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        <span className="modal-eyebrow">OUCH! TRY AGAIN</span>
        <h2>Not Quite This Time</h2>
        <p className="fail-reason-text">{reason || "Watch out for obstacles and plan your path!"}</p>

        {/* VELoop Economy: Revive via Rewarded Ad */}
        {canRevive && onWatchAdRevive && (
          <div className="revive-ad-offer-box">
            <div className="revive-offer-meta">
              <span className="revive-tag">❤️ SECOND CHANCE</span>
              <strong>Watch a short video to revive at safe state!</strong>
            </div>
            <button
              type="button"
              className="btn-watch-ad-revive tactile-btn"
              onClick={onWatchAdRevive}
            >
              <span className="btn-shine" />
              <span>📺 Watch Ad & Revive</span>
            </button>
          </div>
        )}

        <div className="fail-actions-group">
          {onWatchAdExtraMoves && (
            <button
              type="button"
              className="btn-extra-moves-ad tactile-btn"
              onClick={onWatchAdExtraMoves}
            >
              <span>🎯 +5 Extra Moves (Ad)</span>
            </button>
          )}

          {canUndo && (
            <button
              type="button"
              className="btn-undo-move tactile-btn"
              onClick={onUndo}
            >
              <UndoSvgIcon className="btn-action-svg" />
              <span>Undo Last Move</span>
            </button>
          )}

          <button
            type="button"
            className="btn-restart-level tactile-btn"
            onClick={onRestart}
          >
            <RetrySvgIcon className="btn-action-svg" />
            <span>Restart Level</span>
          </button>

          <button
            type="button"
            className="btn-choose-level-sub tactile-btn"
            onClick={onOpenLevelPicker}
          >
            <span>🗺️</span>
            <span>Choose Level</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export function PauseModal({
  level,
  levelNumber,
  world,
  applesLeft,
  sfxEnabled,
  musicEnabled,
  onToggleSfx,
  onToggleMusic,
  onResume,
  onRestart,
  onOpenLevelPicker,
  onOpenSkins,
}) {
  return (
    <div className="modal-backdrop pause-backdrop" role="dialog" aria-modal="true">
      <div className="modal-card pause-modal-card">
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="modal-eyebrow">GAME PAUSED</span>
            <h2>Level {levelNumber}: {level.name}</h2>
          </div>
          <button
            type="button"
            className="modal-close-btn tactile-btn"
            onClick={onResume}
            aria-label="Resume"
          >
            ✕
          </button>
        </div>

        {/* Mission Objectives Summary */}
        <div className="pause-mission-status">
          <div className="mission-item">
            <span className="mission-label">World</span>
            <strong>{world.icon} {world.name}</strong>
          </div>
          <div className="mission-item">
            <span className="mission-label">Apples Remaining</span>
            <strong>{applesLeft} / {level.apples.length}</strong>
          </div>
          <div className="mission-item">
            <span className="mission-label">Target Par</span>
            <strong>≤{level.parMoves?.star3 || 25} Moves (3★)</strong>
          </div>
        </div>

        {/* Audio Controls */}
        <div className="pause-audio-controls">
          <button
            type="button"
            className={`pause-audio-btn tactile-btn ${sfxEnabled ? "active" : ""}`}
            onClick={onToggleSfx}
          >
            <SoundSvgIcon enabled={sfxEnabled} className="btn-audio-svg" />
            <span>Sound Effects: {sfxEnabled ? "ON" : "OFF"}</span>
          </button>
          <button
            type="button"
            className={`pause-audio-btn tactile-btn ${musicEnabled ? "active" : ""}`}
            onClick={onToggleMusic}
          >
            <span>🎵 Music: {musicEnabled ? "ON" : "OFF"}</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="pause-actions-list">
          <button
            type="button"
            className="btn-resume-game tactile-btn"
            onClick={onResume}
          >
            <span className="btn-shine" />
            <span>RESUME PLAYING</span>
          </button>
          <button
            type="button"
            className="btn-pause-sub tactile-btn"
            onClick={onRestart}
          >
            <RetrySvgIcon className="btn-sub-svg" />
            <span>Restart Level</span>
          </button>
          <button
            type="button"
            className="btn-pause-sub tactile-btn"
            onClick={onOpenLevelPicker}
          >
            <span>🗺️</span>
            <span>Choose Level</span>
          </button>
          <button
            type="button"
            className="btn-pause-sub tactile-btn"
            onClick={onOpenSkins}
          >
            <span>🎨</span>
            <span>Worm Wardrobe</span>
          </button>
        </div>
      </div>
    </div>
  );
}
