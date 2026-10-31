import React from "react";
import { audio } from "../utils/audioEngine";

export default function RewardCenterModal({
  _coins,
  dailyAdsWatched = 0,
  maxDailyAds = 15,
  onWatchAd,
  onClose,
}) {
  const offers = [
    {
      id: "DAILY_REWARD",
      title: "Daily Login Gift",
      icon: "🎁",
      reward: "+50 Coins",
      desc: "Daily token from the VELoop community garden.",
      isFree: true,
    },
    {
      id: "DOUBLE_COINS",
      title: "Double Coins Boost",
      icon: "💰",
      reward: "+50 Bonus Coins",
      desc: "Watch a short partner video to earn instant bonus coins.",
      isFree: false,
    },
    {
      id: "EXTRA_MOVES",
      title: "Tactical Move Surge",
      icon: "🎯",
      reward: "+5 Moves in Current Level",
      desc: "Extra strategic moves to solve tricky labyrinth puzzles.",
      isFree: false,
    },
    {
      id: "HINT",
      title: "Free Strategic Hint",
      icon: "💡",
      reward: "1 Free Path Hint",
      desc: "Reveals key items, secret gates, or target apples.",
      isFree: false,
    },
  ];

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-card reward-center-card">
        <div className="card-top-header">
          <div className="header-title-group">
            <span className="card-badge">VELoop REWARD CENTER</span>
            <h2>Earn Free Rewards</h2>
          </div>
          <button type="button" className="modal-close-icon-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Daily Cap Meter */}
        <div className="reward-daily-cap-box">
          <div className="cap-meta-row">
            <span>Daily Ad Opportunities</span>
            <strong>
              {dailyAdsWatched} / {maxDailyAds} Watched
            </strong>
          </div>
          <div className="cap-progress-bar">
            <div
              className="cap-progress-fill"
              style={{ width: `${Math.min(100, (dailyAdsWatched / maxDailyAds) * 100)}%` }}
            />
          </div>
          <small>Rewards are server-validated & capped for a sustainable player economy.</small>
        </div>

        {/* Offers List */}
        <div className="reward-offers-grid">
          {offers.map((offer) => (
            <div key={offer.id} className="reward-offer-item">
              <span className="offer-icon">{offer.icon}</span>
              <div className="offer-info">
                <strong>{offer.title}</strong>
                <span className="offer-reward-tag">{offer.reward}</span>
                <p>{offer.desc}</p>
              </div>
              <button
                type="button"
                className="btn-watch-reward tactile-btn"
                onClick={() => {
                  audio.playClick();
                  onWatchAd(offer.id);
                }}
              >
                {offer.isFree ? "Claim Gift" : "📺 Watch Ad"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
