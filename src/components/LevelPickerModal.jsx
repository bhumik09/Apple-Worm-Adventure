import React, { useState } from "react";
import { WORLDS, LEVELS } from "../data/levels";
import { StarSvgIcon } from "./GameHUD";

function LockSvgIcon({ className = "card-lock-svg" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="5" y="10" width="14" height="11" rx="2.5" fill="#64748b" stroke="#334155" strokeWidth="1.5" />
      <path d="M8 10V7C8 4.79 9.79 3 12 3C14.21 3 16 4.79 16 7V10" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="15" r="1.5" fill="#e2e8f0" />
      <path d="M12 16.5V18.5" stroke="#e2e8f0" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function LevelPickerModal({
  currentLevel,
  unlockedLevel,
  levelStars = {},
  levelScores = {},
  onSelectLevel,
  onClose,
}) {
  const [selectedWorldId, setSelectedWorldId] = useState(() => {
    const currentWorld = WORLDS.find(
      (w) => currentLevel >= w.levelRange[0] && currentLevel <= w.levelRange[1]
    );
    return currentWorld ? currentWorld.id : 1;
  });

  const activeWorld = WORLDS.find((w) => w.id === selectedWorldId) || WORLDS[0];
  const worldLevels = LEVELS.filter(
    (lvl) =>
      lvl.id >= activeWorld.levelRange[0] && lvl.id <= activeWorld.levelRange[1]
  );

  // Calculate world stats
  const worldTotalStars = worldLevels.reduce(
    (sum, lvl) => sum + (levelStars[lvl.id] || 0),
    0
  );
  const maxWorldStars = worldLevels.length * 3;
  const worldPercent = Math.round((worldTotalStars / (maxWorldStars || 1)) * 100);

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Select Level">
      <div className="modal-card level-picker-modal">
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="modal-eyebrow">WORLD MAP & CHAPTERS</span>
            <h2>Select Adventure Level</h2>
          </div>
          <button
            type="button"
            className="modal-close-btn tactile-btn"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* World Tabs */}
        <div className="world-tabs-list" role="tablist">
          {WORLDS.map((w) => {
            const isUnlocked = unlockedLevel >= w.levelRange[0];
            const isCurrent = selectedWorldId === w.id;

            return (
              <button
                key={w.id}
                type="button"
                role="tab"
                aria-selected={isCurrent}
                className={`world-tab-btn tactile-btn ${isCurrent ? "active" : ""} ${
                  !isUnlocked ? "locked" : ""
                }`}
                onClick={() => setSelectedWorldId(w.id)}
              >
                <span className="world-tab-icon">{w.icon}</span>
                <div className="world-tab-info">
                  <strong>{w.name}</strong>
                  <small>Lv. {w.levelRange[0]}–{w.levelRange[1]}</small>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active World Banner with Progress Bar */}
        <div className="world-banner" style={{ borderColor: activeWorld.color }}>
          <div className="world-banner-text">
            <h3>{activeWorld.icon} {activeWorld.name}</h3>
            <p>{activeWorld.description}</p>
          </div>
          <div className="world-banner-progress">
            <div className="world-stars-badge">
              <StarSvgIcon className="world-star-icon" />
              <strong>{worldTotalStars} / {maxWorldStars}</strong>
              <small>({worldPercent}%)</small>
            </div>
            <div className="world-progress-bar-track">
              <div
                className="world-progress-bar-fill"
                style={{ width: `${worldPercent}%`, backgroundColor: activeWorld.color }}
              />
            </div>
          </div>
        </div>

        {/* Level Grid */}
        <div className="world-level-grid">
          {worldLevels.map((lvl) => {
            const isLocked = lvl.id > unlockedLevel;
            const isCurrent = lvl.id === currentLevel;
            const stars = levelStars[lvl.id] || 0;
            const bestScore = levelScores[lvl.id];

            return (
              <button
                key={lvl.id}
                type="button"
                disabled={isLocked}
                className={`world-level-card tactile-btn ${isCurrent ? "current" : ""} ${
                  isLocked ? "locked" : "unlocked"
                }`}
                onClick={() => {
                  onSelectLevel(lvl.id);
                  onClose();
                }}
              >
                <div className="card-top-row">
                  <span className="card-level-num">#{lvl.id}</span>
                  {isLocked ? (
                    <LockSvgIcon className="card-lock-svg" />
                  ) : stars > 0 ? (
                    <span className="card-cleared-tag">✓</span>
                  ) : null}
                </div>

                <strong className="card-level-name">{lvl.name}</strong>

                {!isLocked && (
                  <div className="card-stars-row">
                    {[1, 2, 3].map((s) => (
                      <StarSvgIcon
                        key={s}
                        filled={s <= stars}
                        className={`picker-star-svg ${s <= stars ? "lit" : "dim"}`}
                      />
                    ))}
                  </div>
                )}

                {!isLocked && bestScore !== undefined && (
                  <small className="card-best-score">Best: {bestScore} pts</small>
                )}

                {isLocked && (
                  <small className="card-lock-hint">Unlock at Lv. {lvl.id - 1}</small>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="modal-footer-info">
          <span>Earn up to 3 stars per level by beating the par moves!</span>
        </div>
      </div>
    </div>
  );
}
