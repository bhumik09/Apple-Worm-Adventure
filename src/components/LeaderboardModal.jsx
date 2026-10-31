import React from "react";

export default function LeaderboardModal({ leaderboard = [], personalRank, onClose }) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-card leaderboard-card">
        <div className="card-top-header">
          <div className="header-title-group">
            <span className="card-badge">GLOBAL RANKINGS</span>
            <h2>Worm Hall of Fame</h2>
          </div>
          <button type="button" className="modal-close-icon-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Personal Rank Highlight */}
        {personalRank && (
          <div className="personal-rank-badge">
            <div className="personal-rank-number">#{personalRank.rank}</div>
            <div className="personal-rank-meta">
              <span>YOUR STANDING</span>
              <strong>{personalRank.username}</strong>
            </div>
            <div className="personal-rank-score">
              <span>⭐ {personalRank.totalStars} Stars</span>
              <strong>{personalRank.totalScore?.toLocaleString()} pts</strong>
            </div>
          </div>
        )}

        {/* Leaderboard Table */}
        <div className="leaderboard-list">
          {leaderboard.length === 0 ? (
            <div className="empty-state">Loading rankings...</div>
          ) : (
            leaderboard.map((player) => (
              <div
                key={player.userId || player.rank}
                className={`leaderboard-row ${personalRank?.userId === player.userId ? "is-self" : ""}`}
              >
                <div className={`rank-pill rank-${player.rank}`}>
                  {player.rank === 1 ? "🥇" : player.rank === 2 ? "🥈" : player.rank === 3 ? "🥉" : `#${player.rank}`}
                </div>
                <div className="player-avatar">🐛</div>
                <div className="player-info">
                  <strong>{player.username}</strong>
                  <small>Lvl {player.completedLevels + 1} • ⭐ {player.totalStars}</small>
                </div>
                <div className="player-score">
                  <strong>{player.totalScore?.toLocaleString()}</strong>
                  <small>SCORE</small>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
