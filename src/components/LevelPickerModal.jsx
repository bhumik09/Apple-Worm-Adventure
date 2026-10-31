import React, { useState } from "react";
import { WORLDS, LEVELS } from "../data/levels";

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
            className="modal-close-btn"
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
                className={`world-tab-btn ${isCurrent ? "active" : ""} ${
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

        {/* Active World Banner */}
        <div className="world-banner" style={{ borderColor: activeWorld.color }}>
          <div className="world-banner-text">
            <h3>{activeWorld.icon} {activeWorld.name}</h3>
            <p>{activeWorld.description}</p>
          </div>
          <div className="world-stars-badge">
            <span>⭐ {worldTotalStars} / {maxWorldStars}</span>
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
                className={`world-level-card ${isCurrent ? "current" : ""} ${
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
                    <span className="card-lock-icon">🔒</span>
                  ) : stars > 0 ? (
                    <span className="card-cleared-tag">✓</span>
                  ) : null}
                </div>

                <strong className="card-level-name">{lvl.name}</strong>

                {!isLocked && (
                  <div className="card-stars-row">
                    {[1, 2, 3].map((s) => (
                      <span key={s} className={`star-icon ${s <= stars ? "lit" : "dim"}`}>
                        ★
                      </span>
                    ))}
                  </div>
                )}

                {!isLocked && bestScore !== undefined && (
                  <small className="card-best-score">Best: {bestScore} pts</small>
                )}

                {isLocked && (
                  <small className="card-lock-hint">Beat Lv. {lvl.id - 1}</small>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="modal-footer-info">
          <span>Earn up to 3 stars per level by solving within par moves!</span>
        </div>
      </div>
    </div>
  );
}
