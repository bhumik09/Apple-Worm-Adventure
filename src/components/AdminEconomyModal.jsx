import React, { useState } from "react";
import { audio } from "../utils/audioEngine";

export default function AdminEconomyModal({ stats, onSaveConfig, onClose }) {
  const [levelReward, setLevelReward] = useState(
    stats?.currentEconomyConfig?.levelCompletionCoins || 25
  );
  const [doubleCoinsMul, setDoubleCoinsMul] = useState(
    stats?.currentEconomyConfig?.rewardedAd?.doubleCoinsMultiplier || 2
  );
  const [doubleScoreMul, setDoubleScoreMul] = useState(
    stats?.currentEconomyConfig?.rewardedAd?.doubleScoreMultiplier || 2
  );
  const [extraMovesCount, setExtraMovesCount] = useState(
    stats?.currentEconomyConfig?.rewardedAd?.extraMoves || 5
  );
  const [dailyCap, setDailyCap] = useState(
    stats?.currentEconomyConfig?.rewardedAd?.maxRewardedAdsPerDay || 15
  );

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    audio.playClick();
    onSaveConfig({
      levelCompletionCoins: Number(levelReward),
      rewardedAd: {
        ...stats?.currentEconomyConfig?.rewardedAd,
        doubleCoinsMultiplier: Number(doubleCoinsMul),
        doubleScoreMultiplier: Number(doubleScoreMul),
        extraMoves: Number(extraMovesCount),
        maxRewardedAdsPerDay: Number(dailyCap),
      },
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-card admin-economy-card">
        <div className="card-top-header">
          <div className="header-title-group">
            <span className="card-badge admin-badge">VELoop ECONOMY CONTROL PANEL</span>
            <h2>Admin Economy & Monetization</h2>
          </div>
          <button type="button" className="modal-close-icon-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Real-time Metrics Grid */}
        <div className="admin-stats-grid">
          <div className="stat-card">
            <small>AD OPPORTUNITIES</small>
            <strong>{stats?.todayAdOpportunities || 0}</strong>
          </div>
          <div className="stat-card">
            <small>COMPLETED ADS</small>
            <strong>{stats?.todayCompletedRewardedAds || 0}</strong>
          </div>
          <div className="stat-card highlight">
            <small>COMPLETION RATE</small>
            <strong>{stats?.rewardedAdCompletionRate || "100%"}</strong>
          </div>
          <div className="stat-card">
            <small>COINS GRANTED</small>
            <strong>{stats?.todayCoinsGranted || 0} 💰</strong>
          </div>
          <div className="stat-card">
            <small>COINS SPENT</small>
            <strong>{stats?.todayCoinsSpent || 0} 🛒</strong>
          </div>
          <div className="stat-card">
            <small>AVG ADS / USER</small>
            <strong>{stats?.averageAdsPerUser || "1.5"}</strong>
          </div>
        </div>

        {/* Remote Economy Tuning Controls */}
        <div className="economy-config-editor">
          <h3>Runtime Economy Parameters (No Rebuild Required)</h3>
          <div className="config-inputs-grid">
            <div className="input-group">
              <label>Level Completion Coins:</label>
              <input
                type="number"
                value={levelReward}
                onChange={(e) => setLevelReward(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Double Coins Multiplier (Ad):</label>
              <input
                type="number"
                value={doubleCoinsMul}
                onChange={(e) => setDoubleCoinsMul(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Double Score Multiplier (Ad):</label>
              <input
                type="number"
                value={doubleScoreMul}
                onChange={(e) => setDoubleScoreMul(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Extra Moves Granted (Ad):</label>
              <input
                type="number"
                value={extraMovesCount}
                onChange={(e) => setExtraMovesCount(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Daily Rewarded Ad Cap:</label>
              <input
                type="number"
                value={dailyCap}
                onChange={(e) => setDailyCap(e.target.value)}
              />
            </div>
          </div>

          <div className="config-action-row">
            <button type="button" className="btn-save-economy tactile-btn" onClick={handleSave}>
              💾 Update Economy Runtime Config
            </button>
            {savedSuccess && <span className="save-success-tag">✓ Saved to server!</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
