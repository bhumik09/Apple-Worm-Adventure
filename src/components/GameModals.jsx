import React, { useEffect, useState } from "react";
import { audio } from "../utils/audioEngine";

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

      {/* Cinematic Hero Badge */}
      <div className="hero-mascot-container">
        <div className="hero-portal-aura" aria-hidden="true" />
        <div className="hero-giant-apple">
          <span className="giant-apple-emoji">🍎</span>
        </div>
        <div className="hero-mascot-worm-wrapper">
          <span className="hero-mascot-worm">🐛</span>
        </div>
        <span className="hero-floating-star s1">⭐</span>
        <span className="hero-floating-star s2">✨</span>
        <span className="hero-floating-star s3">🌟</span>
      </div>

      <span className="start-eyebrow">ARCADE PUZZLE ADVENTURE</span>
      <h2 className="start-title">
        <span className="title-gradient">Apple Worm</span>
        <span className="title-sub">ADVENTURE</span>
      </h2>
      <p className="start-description">
        Munch sweet apples, dodge deadly spikes, discover secret keys, and enter the mystic cosmic portal!
      </p>

      {/* Quick Access Badges Bar */}
      <div className="start-quick-badges-bar">
        <button type="button" className="quick-badge-btn" onClick={onOpenRewardCenter}>
          <span>🎁</span> Reward Center
        </button>
        <button type="button" className="quick-badge-btn" onClick={onOpenLeaderboard}>
          <span>🏆</span> Hall of Fame
        </button>
        <button type="button" className="quick-badge-btn" onClick={onOpenAchievements}>
          <span>🎖️</span> Badges
        </button>
        <button type="button" className="quick-badge-btn admin-quick-btn" onClick={onOpenAdmin}>
          <span>⚙️</span> Economy Admin
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
                className={`diff-pill-btn ${isSelected ? "selected" : ""}`}
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

      {/* Primary Action Buttons */}
      <div className="start-actions-group">
        <button
          type="button"
          className="btn-start-adventure tactile-btn"
          onClick={onStartGame}
        >
          <span className="btn-shine" />
          <span className="play-icon">▶</span> START ADVENTURE
        </button>

        <div className="start-sub-actions">
          <button
            type="button"
            className="btn-secondary-action tactile-btn"
            onClick={onOpenLevelPicker}
          >
            <span>▦</span> Choose Level
          </button>
          <button
            type="button"
            className="btn-secondary-action tactile-btn"
            onClick={onOpenSkins}
          >
            <span>👕</span> Worm Wardrobe
          </button>
        </div>
      </div>

      {/* Control Tips */}
      <div className="start-controls-guide">
        <div className="guide-item">
          <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> or <kbd>↑</kbd><kbd>←</kbd><kbd>↓</kbd><kbd>→</kbd>
          <span>Move</span>
        </div>
        <div className="guide-item">
          <kbd>Z</kbd><span>Undo move</span>
        </div>
        <div className="guide-item">
          <kbd>📱</kbd><span>Swipe screen to slither</span>
        </div>
      </div>
    </section>
  );
}

export function WinModal({
  _level,
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
        }, i * 320)
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
        {Array.from({ length: 60 }, (_, i) => (
          <span
            key={i}
            className="confetti-dot"
            style={{
              left: `${(i * 17) % 100}%`,
              backgroundColor: [
                "#22c55e",
                "#38bdf8",
                "#facc15",
                "#ec4899",
                "#a855f7",
                "#f97316",
              ][i % 6],
              animationDelay: `${(i % 12) * 0.1}s`,
              animationDuration: `${2.2 + (i % 6) * 0.25}s`,
            }}
          />
        ))}
      </div>

      <div className="modal-card win-modal-card">
        {/* Glowing Trophy */}
        <div className="trophy-wrapper">
          <div className="trophy-ambient-glow" aria-hidden="true" />
          <div className="win-trophy-icon">🏆</div>
        </div>

        <span className="modal-eyebrow">MISSION ACCOMPLISHED</span>
        <h2>{isMaxLevel ? "Grand Master Worm!" : `Level ${levelNumber} Cleared!`}</h2>
        <p className="win-subtitle">
          {isMaxLevel
            ? "Legendary! You have conquered all 50 levels of the Apple Worm Adventure!"
            : "Brilliant puzzle solving! Ready for the next challenge?"}
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
                ★
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
            <strong className="coin-text">+{hasDoubled ? coinsEarned * 2 : coinsEarned} 💰</strong>
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
              <span>⭐ VELoop SPONSORED MULTIPLIER</span>
              <strong>Watch 1 ad to double both Score & Coins!</strong>
            </div>
            <button
              type="button"
              className="btn-double-reward tactile-btn"
              onClick={onWatchAdDoubleReward}
            >
              <span className="btn-shine" />
              📺 Watch Ad → 2X Reward
            </button>
          </div>
        )}

        {/* Modal Actions */}
        <div className="win-modal-actions">
          {!isMaxLevel ? (
            <button
              type="button"
              className="btn-next-level tactile-btn"
              onClick={onNextLevel}
            >
              <span className="btn-shine" />
              Next Level <span>→</span>
            </button>
          ) : (
            <button
              type="button"
              className="btn-next-level tactile-btn"
              onClick={() => onOpenLevelPicker()}
            >
              <span className="btn-shine" />
              Explore All Worlds <span>★</span>
            </button>
          )}

          <div className="secondary-actions-row">
            <button
              type="button"
              className="btn-modal-sub tactile-btn"
              onClick={onReplay}
            >
              <span>↻</span> Replay
            </button>
            <button
              type="button"
              className="btn-modal-sub tactile-btn"
              onClick={onOpenLevelPicker}
            >
              <span>▦</span> Levels
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
        <div className="fail-mascot-wrapper">
          <div className="fail-mascot-icon">🐛💥</div>
        </div>
        <span className="modal-eyebrow">OUCH! TRY AGAIN</span>
        <h2>Not quite this time</h2>
        <p className="fail-reason-text">{reason}</p>

        {/* VELoop Economy: Revive via Rewarded Ad */}
        {canRevive && onWatchAdRevive && (
          <div className="revive-ad-offer-box">
            <div className="revive-offer-meta">
              <span>❤️ SECOND CHANCE</span>
              <strong>Watch a short ad to continue from safe state!</strong>
            </div>
            <button
              type="button"
              className="btn-watch-ad-revive tactile-btn"
              onClick={onWatchAdRevive}
            >
              <span className="btn-shine" />
              📺 Watch Ad & Revive
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
              🎯 Get +5 Extra Moves (Ad)
            </button>
          )}

          {canUndo && (
            <button
              type="button"
              className="btn-undo-move tactile-btn"
              onClick={onUndo}
            >
              <span>↶</span> Undo Last Move
            </button>
          )}

          <button
            type="button"
            className="btn-restart-level tactile-btn"
            onClick={onRestart}
          >
            <span>↻</span> Restart Level
          </button>

          <button
            type="button"
            className="btn-choose-level-sub"
            onClick={onOpenLevelPicker}
          >
            <span>▦</span> Choose Level
          </button>
        </div>
      </div>
    </div>
  );
}

export function PauseModal({
  level,
  levelNumber,
  _world,
  applesLeft,
  sfxEnabled,
  musicEnabled,
  onToggleSfx,
  onToggleMusic,
  onResume,
  onRestart,
  onOpenLevelPicker,
  onOpenSkins,
  onOpenRewardCenter,
  onCycleTheme,
  currentTheme,
}) {
  return (
    <div className="modal-backdrop pause-backdrop" role="dialog" aria-modal="true">
      <div className="modal-card pause-modal-card">
        <div className="pause-mascot-wrapper">
          <div className="pause-mascot-icon">🐛⏸️</div>
        </div>
        <span className="modal-eyebrow">GAME PAUSED</span>
        <h2>Level {levelNumber}: {level.name}</h2>
        <p className="pause-objective-reminder">
          {applesLeft > 0
            ? `${applesLeft} apple(s) left to collect before the portal unlocks.`
            : "Portal is open! Guide your worm into the portal to complete the level."}
        </p>

        {/* Audio & Visual Toggles */}
        <div className="pause-toggles-row">
          <button
            type="button"
            className={`pause-toggle-btn ${sfxEnabled ? "active" : ""}`}
            onClick={onToggleSfx}
          >
            {sfxEnabled ? "🔊 Sound ON" : "🔇 Sound OFF"}
          </button>
          <button
            type="button"
            className={`pause-toggle-btn ${musicEnabled ? "active" : ""}`}
            onClick={onToggleMusic}
          >
            {musicEnabled ? "🎵 Music ON" : "🎶 Music OFF"}
          </button>
          <button
            type="button"
            className="pause-toggle-btn theme-toggle-btn"
            onClick={onCycleTheme}
          >
            {currentTheme?.icon} Theme: {currentTheme?.name}
          </button>
        </div>

        {/* Actions */}
        <div className="pause-actions-group">
          <button
            type="button"
            className="btn-resume-game tactile-btn"
            onClick={onResume}
          >
            <span className="btn-shine" />
            ▶ Resume Adventure
          </button>

          <button
            type="button"
            className="btn-pause-secondary tactile-btn"
            onClick={onOpenRewardCenter}
          >
            🎁 Free Rewards & Boosts
          </button>

          <div className="pause-sub-row">
            <button
              type="button"
              className="btn-modal-sub tactile-btn"
              onClick={onRestart}
            >
              <span>↻</span> Restart
            </button>
            <button
              type="button"
              className="btn-modal-sub tactile-btn"
              onClick={onOpenSkins}
            >
              <span>👕</span> Wardrobe
            </button>
            <button
              type="button"
              className="btn-modal-sub tactile-btn"
              onClick={onOpenLevelPicker}
            >
              <span>▦</span> Levels
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
