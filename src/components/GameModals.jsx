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
  WardrobeSvgIcon,
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
  onOpenAchievements: _onOpenAchievements,
  onOpenAdmin: _onOpenAdmin,
}) {
  return (
    <section className="adventure-start-screen" aria-label="Game Title Screen">
      {/* Cartoon Floating Logo Crest */}
      <div className="adventure-title-crest">
        <div className="crest-mascot-cluster">
          <div className="crest-apple-wrap">
            <AppleSvgIcon className="crest-apple-svg" />
          </div>
          <div className="crest-worm-peeking" aria-hidden="true">
            <svg viewBox="0 0 64 64" className="crest-worm-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="32" cy="32" r="22" fill="url(#heroMascotGrad2)" stroke="#166534" strokeWidth="2.5" />
              <ellipse cx="23" cy="27" rx="5.5" ry="7" fill="white" />
              <circle cx="24" cy="27" r="3.2" fill="#0f172a" />
              <circle cx="22" cy="25" r="1.4" fill="white" />
              <ellipse cx="41" cy="27" rx="5.5" ry="7" fill="white" />
              <circle cx="40" cy="27" r="3.2" fill="#0f172a" />
              <circle cx="38" cy="25" r="1.4" fill="white" />
              <ellipse cx="17" cy="34" rx="3.5" ry="2" fill="#f43f5e" opacity="0.6" />
              <ellipse cx="47" cy="34" rx="3.5" ry="2" fill="#f43f5e" opacity="0.6" />
              <path d="M26 36C28 40 36 40 38 36" stroke="#14532d" strokeWidth="2.6" strokeLinecap="round" />
              <path d="M23 13C21 8 16 9 17 13M41 13C43 8 48 9 47 13" stroke="#15803d" strokeWidth="2.6" strokeLinecap="round" />
              <circle cx="16" cy="8" r="3" fill="#4ade80" />
              <circle cx="48" cy="8" r="3" fill="#4ade80" />
              <defs>
                <radialGradient id="heroMascotGrad2" cx="35%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#86efac" />
                  <stop offset="55%" stopColor="#22c55e" />
                  <stop offset="100%" stopColor="#15803d" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Parchment Title Sign */}
        <div className="adventure-parchment-sign">
          <span className="sign-subtitle">SNAKE PUZZLE</span>
          <h1 className="sign-main-title">APPLE WORM</h1>
          <div className="sign-ribbon">
            <span>ADVENTURE</span>
          </div>
        </div>
      </div>

      {/* Big 3D Emerald PLAY Button */}
      <button
        type="button"
        className="adventure-play-btn"
        onClick={onStartGame}
        aria-label="Play Game"
      >
        <span className="play-shine" />
        <span className="play-icon">▶</span>
        <span className="play-text">PLAY LEVEL {currentLevel}</span>
      </button>

      {/* Difficulty Selector Pills */}
      <div className="adventure-diff-row">
        {Object.entries(difficulties).map(([name, config]) => {
          const isSelected = difficulty === name;
          return (
            <button
              key={name}
              type="button"
              className={`adventure-diff-pill ${isSelected ? "active" : ""}`}
              onClick={() => {
                audio.playClick();
                onSelectDifficulty(name);
              }}
            >
              <span>{config.icon}</span>
              <span>{name}</span>
            </button>
          );
        })}
      </div>

      {/* Level & Progress Info */}
      <div className="adventure-start-meta">
        <span>Level {currentLevel}: <strong>{levelName}</strong></span>
        <span className="meta-sep">•</span>
        <span>{unlockedLevel} / {totalLevels} Cleared</span>
      </div>

      {/* Floating Slate Action Bar (Matching Reference Game Buttons) */}
      <div className="adventure-start-dock">
        <button
          type="button"
          className="start-slate-btn"
          onClick={onOpenLevelPicker}
          title="World Map / Levels"
        >
          <span className="start-btn-emoji">🗺️</span>
          <span className="start-btn-text">Worlds</span>
        </button>

        <button
          type="button"
          className="start-slate-btn"
          onClick={onOpenSkins}
          title="Worm Wardrobe"
        >
          <WardrobeSvgIcon className="start-btn-svg" />
          <span className="start-btn-text">Skins</span>
        </button>

        <button
          type="button"
          className="start-slate-btn"
          onClick={onOpenRewardCenter}
          title="Daily Gifts & Coins"
        >
          <GiftSvgIcon className="start-btn-svg" />
          <span className="start-btn-text">Rewards</span>
        </button>

        <button
          type="button"
          className="start-slate-btn"
          onClick={onOpenLeaderboard}
          title="Leaderboard Rankings"
        >
          <TrophySvgIcon className="start-btn-svg" />
          <span className="start-btn-text">Ranks</span>
        </button>
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
        }, i * 280)
      );
    }
    return () => timers.forEach(clearTimeout);
  }, [earnedStars]);

  return (
    <div className="modal-backdrop celebration-backdrop" role="dialog" aria-modal="true">
      <div className="celebration-sunburst-rays" aria-hidden="true" />

      {/* Confetti Explosion */}
      <div className="confetti-particles" aria-hidden="true">
        {Array.from({ length: 45 }, (_, i) => (
          <span
            key={i}
            className="confetti-dot"
            style={{
              left: `${(i * 19) % 100}%`,
              backgroundColor: ["#22c55e", "#38bdf8", "#facc15", "#ec4899", "#a855f7", "#f97316"][i % 6],
              animationDelay: `${(i % 8) * 0.12}s`,
              animationDuration: `${2.2 + (i % 5) * 0.25}s`,
            }}
          />
        ))}
      </div>

      <div className="modal-card modern-game-modal win-card">
        {/* Golden Trophy Crest */}
        <div className="modal-trophy-crest">
          <TrophySvgIcon className="trophy-crest-svg" />
        </div>

        <span className="modal-arcade-tag">VICTORY!</span>
        <h2 className="modal-arcade-title">{isMaxLevel ? "Grand Master Worm!" : `Level ${levelNumber} Cleared!`}</h2>

        {/* 3 Giant Slamming Stars */}
        <div className="modal-stars-row" aria-label={`${earnedStars} stars earned`}>
          {[1, 2, 3].map((starNum) => {
            const isEarned = starNum <= animatedStars;
            return (
              <div
                key={starNum}
                className={`slam-star-wrapper ${isEarned ? "slam-active" : "slam-unearned"}`}
              >
                <StarSvgIcon filled={isEarned} className="slam-star-svg" />
              </div>
            );
          })}
        </div>

        {/* Stats Pill Card */}
        <div className="modal-stats-pill-grid">
          <div className="stat-pill-box">
            <small>MOVES</small>
            <strong>{moves}</strong>
          </div>
          <div className="stat-pill-box">
            <small>COINS</small>
            <strong className="coin-text">+{hasDoubled ? coinsEarned * 2 : coinsEarned} ¢</strong>
          </div>
          <div className="stat-pill-box highlight">
            <small>SCORE</small>
            <strong>+{hasDoubled ? score * 2 : score}</strong>
          </div>
        </div>

        {/* Double Reward Callout */}
        {!hasDoubled && onWatchAdDoubleReward && (
          <div className="double-reward-ad-card">
            <div className="double-card-info">
              <span>⭐ VELoop 2X BOOSTER</span>
              <strong>Double Coins & Score with 1 short video!</strong>
            </div>
            <button
              type="button"
              className="btn-double-candy"
              onClick={onWatchAdDoubleReward}
            >
              <span>🎬 2X Double Reward</span>
            </button>
          </div>
        )}

        {/* Primary Action Button */}
        <div className="modal-bottom-actions">
          {!isMaxLevel ? (
            <button
              type="button"
              className="btn-modal-primary-candy"
              onClick={onNextLevel}
            >
              <span className="btn-shine-streak" />
              <span>NEXT LEVEL ▶</span>
            </button>
          ) : (
            <button
              type="button"
              className="btn-modal-primary-candy"
              onClick={onOpenLevelPicker}
            >
              <span>ALL WORLDS ★</span>
            </button>
          )}

          <div className="modal-secondary-buttons">
            <button type="button" className="btn-modal-sub-candy" onClick={onReplay}>
              <RetrySvgIcon className="btn-sub-svg" />
              <span>Replay</span>
            </button>
            <button type="button" className="btn-modal-sub-candy" onClick={onOpenLevelPicker}>
              <span>🗺️ Levels</span>
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
      <div className="modal-card modern-game-modal fail-card">
        {/* Comic Dizzy Mascot */}
        <div className="modal-fail-mascot">
          <svg viewBox="0 0 64 64" className="fail-mascot-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="32" r="24" fill="url(#failFaceGrad)" stroke="#b91c1c" strokeWidth="2.5" />
            <path d="M20 24L28 32M28 24L20 32" stroke="#450a0a" strokeWidth="3" strokeLinecap="round" />
            <path d="M36 24L44 32M44 24L36 32" stroke="#450a0a" strokeWidth="3" strokeLinecap="round" />
            <path d="M22 44C26 39 30 46 34 40C38 46 42 39 44 42" stroke="#450a0a" strokeWidth="2.6" strokeLinecap="round" />
            <defs>
              <radialGradient id="failFaceGrad" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#fca5a5" />
                <stop offset="55%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#991b1b" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        <span className="modal-arcade-tag fail-tag">OUCH!</span>
        <h2 className="modal-arcade-title">Try Again!</h2>
        <p className="fail-modal-subtitle">{reason || "Watch out for obstacles and navigate wisely!"}</p>

        {/* Second Chance Revive Button */}
        {canRevive && onWatchAdRevive && (
          <div className="revive-candy-offer">
            <div className="revive-info">
              <span>❤️ SECOND CHANCE</span>
              <strong>Revive safely to continue your progress!</strong>
            </div>
            <button
              type="button"
              className="btn-revive-candy"
              onClick={onWatchAdRevive}
            >
              <span className="btn-shine-streak" />
              <span>📺 Watch Ad & Revive</span>
            </button>
          </div>
        )}

        <div className="fail-buttons-column">
          {onWatchAdExtraMoves && (
            <button
              type="button"
              className="btn-extra-moves-candy"
              onClick={onWatchAdExtraMoves}
            >
              <span>🎯 +5 Extra Moves (Ad)</span>
            </button>
          )}

          {canUndo && (
            <button type="button" className="btn-modal-sub-candy full" onClick={onUndo}>
              <UndoSvgIcon className="btn-sub-svg" />
              <span>Undo Last Move</span>
            </button>
          )}

          <button
            type="button"
            className="btn-modal-primary-candy restart-theme"
            onClick={onRestart}
          >
            <span className="btn-shine-streak" />
            <span>TRY AGAIN ↻</span>
          </button>

          <button
            type="button"
            className="btn-modal-sub-candy full"
            onClick={onOpenLevelPicker}
          >
            <span>🗺️ Choose Level</span>
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
      <div className="modal-card modern-game-modal pause-card">
        <div className="modal-header-simple">
          <span className="modal-arcade-tag">PAUSED</span>
          <h2 className="modal-arcade-title">Level {levelNumber}: {level.name}</h2>
          <button type="button" className="modal-close-round" onClick={onResume} aria-label="Close">
            ✕
          </button>
        </div>

        {/* Mission Status */}
        <div className="pause-mission-status-box">
          <div className="mission-stat">
            <small>WORLD</small>
            <strong>{world.icon} {world.name}</strong>
          </div>
          <div className="mission-stat">
            <small>APPLES LEFT</small>
            <strong>{applesLeft} / {level.apples.length}</strong>
          </div>
          <div className="mission-stat">
            <small>3★ PAR TARGET</small>
            <strong>≤{level.parMoves?.star3 || 25} Moves</strong>
          </div>
        </div>

        {/* Audio Toggles */}
        <div className="pause-audio-row">
          <button
            type="button"
            className={`pause-toggle-pill ${sfxEnabled ? "active" : ""}`}
            onClick={onToggleSfx}
          >
            <SoundSvgIcon enabled={sfxEnabled} className="pill-audio-svg" />
            <span>SFX: {sfxEnabled ? "ON" : "OFF"}</span>
          </button>
          <button
            type="button"
            className={`pause-toggle-pill ${musicEnabled ? "active" : ""}`}
            onClick={onToggleMusic}
          >
            <span>🎵 Music: {musicEnabled ? "ON" : "OFF"}</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="pause-actions-stack">
          <button type="button" className="btn-modal-primary-candy" onClick={onResume}>
            <span className="btn-shine-streak" />
            <span>RESUME PLAYING ▶</span>
          </button>

          <div className="modal-secondary-buttons">
            <button type="button" className="btn-modal-sub-candy" onClick={onRestart}>
              <RetrySvgIcon className="btn-sub-svg" />
              <span>Restart</span>
            </button>
            <button type="button" className="btn-modal-sub-candy" onClick={onOpenLevelPicker}>
              <span>🗺️ Levels</span>
            </button>
            <button type="button" className="btn-modal-sub-candy" onClick={onOpenSkins}>
              <span>🎨 Skins</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
