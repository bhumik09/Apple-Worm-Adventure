import React, { useState, useEffect, useRef } from "react";
import { audio } from "../utils/audioEngine";

export default function RewardedAdPlayerModal({
  placement,
  duration = 5,
  onAdCompleted,
  onClose,
}) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [showSkipWarning, setShowSkipWarning] = useState(false);
  const completedRef = useRef(false);

  // Derive verifying state from timeLeft instead of separate state
  const isVerifying = timeLeft <= 0;

  useEffect(() => {
    if (timeLeft <= 0) {
      if (completedRef.current) return;
      completedRef.current = true;
      const timer = setTimeout(() => {
        const adEventId =
          "ad_evt_" + Date.now().toString(36) + "_" + Math.floor(Math.random() * 1e6).toString(36);
        audio.playStar(3);
        onAdCompleted({ adEventId, adProvider: "VELoop_AdNetwork_Simulator", placement });
      }, 700);
      return () => clearTimeout(timer);
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onAdCompleted, placement]);

  const handleAttemptClose = () => {
    if (timeLeft > 0) {
      setShowSkipWarning(true);
    } else {
      onClose();
    }
  };

  const progressPercent = Math.min(100, Math.round(((duration - timeLeft) / duration) * 100));

  const sponsor =
    placement === "REVIVE"
      ? { title: "Golden Elixir Revive", tag: "GAME SPONSOR", icon: "❤️", desc: "Never lose your puzzle journey." }
      : placement === "DOUBLE_SCORE"
      ? { title: "Cosmic Star Multiplier", tag: "BOOST PARTNER", icon: "⭐", desc: "Double your leaderboard victory points." }
      : placement === "DOUBLE_COINS"
      ? { title: "VELoop Royal Treasury", tag: "REWARDS PARTNER", icon: "💰", desc: "Earn double coins for every solved puzzle." }
      : { title: "Orchard Fruit Boosters", tag: "SPONSORED REWARD", icon: "🍎", desc: "Sweet energy to power your apple slither." };

  return (
    <div className="modal-backdrop ad-player-backdrop" role="dialog" aria-modal="true">
      <div className="ad-player-card">
        {/* Ad Video Simulation Frame */}
        <div className="ad-video-header">
          <div className="ad-sponsor-badge">
            <span className="ad-badge-tag">{sponsor.tag}</span>
            <strong>{sponsor.title}</strong>
          </div>
          <button
            type="button"
            className="ad-close-btn"
            onClick={handleAttemptClose}
            title={timeLeft > 0 ? "Skip Ad (No Reward)" : "Close Ad"}
          >
            {timeLeft > 0 ? `✕ ${timeLeft}s` : "✕"}
          </button>
        </div>

        <div className="ad-video-screen">
          <div className="ad-visual-showcase">
            <div className="ad-visual-orb" />
            <span className="ad-giant-icon">{sponsor.icon}</span>
            <h3>{sponsor.title}</h3>
            <p>{sponsor.desc}</p>
            <div className="ad-interactive-badge">
              <span>Opt-in Rewarded Partner • VELoop Verified</span>
            </div>
          </div>

          {/* Verification Spinner */}
          {isVerifying && (
            <div className="ad-verifying-overlay">
              <div className="ad-spinner" />
              <strong>Verifying Reward with VELoop Economy Server...</strong>
              <small>Securing transaction idempotency</small>
            </div>
          )}
        </div>

        {/* Ad Progress Bar */}
        <div className="ad-progress-container">
          <div className="ad-progress-bar" style={{ width: `${progressPercent}%` }} />
        </div>

        <div className="ad-footer-row">
          <span>
            {timeLeft > 0
              ? `Reward will be granted in ${timeLeft}s`
              : "✓ Ad Completed! Granting your reward..."}
          </span>
          <small>VELoop Ad Architecture</small>
        </div>

        {/* Skip Warning Modal */}
        {showSkipWarning && (
          <div className="ad-skip-dialog">
            <h4>Forfeit Reward?</h4>
            <p>If you close the ad before the timer finishes, you will not receive your reward.</p>
            <div className="skip-actions">
              <button
                type="button"
                className="btn-resume-ad"
                onClick={() => setShowSkipWarning(false)}
              >
                Resume Ad ({timeLeft}s left)
              </button>
              <button
                type="button"
                className="btn-forfeit-ad"
                onClick={() => {
                  audio.playClick();
                  onClose();
                }}
              >
                Close & Forfeit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
