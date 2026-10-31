import React from "react";
import { SKINS } from "../data/skins";
import { WormHead, WormBody } from "./GamePieces";

export default function SkinsModal({
  currentSkinId,
  totalStars,
  onSelectSkin,
  onClose,
}) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Worm Wardrobe">
      <div className="modal-card skins-modal">
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="modal-eyebrow">CUSTOMIZATION CLOSET</span>
            <h2>Worm Wardrobe</h2>
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

        <div className="skins-stars-summary">
          <span>⭐ Your Total Stars: <strong>{totalStars}</strong></span>
          <small>Earn stars by clearing levels with optimal moves to unlock new skins!</small>
        </div>

        {/* Skins Grid */}
        <div className="skins-list">
          {SKINS.map((skin) => {
            const isUnlocked = totalStars >= skin.requiredStars;
            const isSelected = currentSkinId === skin.id;

            return (
              <div
                key={skin.id}
                className={`skin-card ${isSelected ? "selected" : ""} ${
                  !isUnlocked ? "locked" : ""
                }`}
              >
                {/* Character Mini Preview */}
                <div className="skin-preview-stage">
                  <div className="worm-mini-preview">
                    <WormHead skin={skin} facing="right" />
                    <WormBody skin={skin} index={1} totalLength={3} />
                    <WormBody skin={skin} index={2} totalLength={3} />
                  </div>
                </div>

                <div className="skin-details">
                  <div className="skin-title-row">
                    <strong>{skin.name}</strong>
                    {isSelected && <span className="equipped-badge">EQUIPPED</span>}
                  </div>
                  <p className="skin-tagline">{skin.tagline}</p>

                  <div className="skin-action-row">
                    {isUnlocked ? (
                      <button
                        type="button"
                        className={`skin-equip-btn ${isSelected ? "active" : ""}`}
                        onClick={() => {
                          onSelectSkin(skin.id);
                        }}
                      >
                        {isSelected ? "Equipped ✓" : "Wear Skin"}
                      </button>
                    ) : (
                      <div className="skin-lock-badge">
                        <span>🔒 Requires {skin.requiredStars} ⭐</span>
                        <small>({skin.requiredStars - totalStars} more needed)</small>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
