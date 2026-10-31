import React from "react";
import { audio } from "../utils/audioEngine";

export default function AchievementsModal({ achievements = [], onClaim, onClose }) {
  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-card achievements-card">
        <div className="card-top-header">
          <div className="header-title-group">
            <span className="card-badge">MILESTONES & BADGES</span>
            <h2>Worm Achievements</h2>
          </div>
          <button type="button" className="modal-close-icon-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Progress summary */}
        <div className="achievements-summary-bar">
          <div className="summary-left">
            <span>UNLOCKED</span>
            <strong>
              {unlockedCount} / {achievements.length} Badges
            </strong>
          </div>
          <div className="ach-progress-outer">
            <div
              className="ach-progress-inner"
              style={{ width: `${(unlockedCount / Math.max(1, achievements.length)) * 100}%` }}
            />
          </div>
        </div>

        {/* List */}
        <div className="achievements-grid">
          {achievements.map((ach) => (
            <div key={ach.id} className={`achievement-item ${ach.unlocked ? "unlocked" : "locked"}`}>
              <div className="ach-icon-box">{ach.unlocked ? ach.icon : "🔒"}</div>
              <div className="ach-details">
                <strong>{ach.name}</strong>
                <p>{ach.desc}</p>
                <span className="ach-reward-tag">+{ach.rewardCoins} Coins</span>
              </div>
              <div className="ach-action">
                {ach.unlocked ? (
                  <span className="ach-unlocked-badge">✓ Claimed</span>
                ) : (
                  <button
                    type="button"
                    className="btn-ach-claim"
                    onClick={() => {
                      audio.playClick();
                      onClaim(ach.id);
                    }}
                  >
                    Check
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
