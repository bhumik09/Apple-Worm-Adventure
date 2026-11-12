import React from "react";

/* =========================================================================
   CARTOON ADVENTURE VECTOR SVG ICONS (Reference Game Fidelity)
   ========================================================================= */

export function AppleSvgIcon({ className = "game-svg-icon" }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M16 6C13.5 3.5 9.5 4 8 6C5 10 5.5 17 8.5 22C10.5 26 13 28 16 28C19 28 21.5 26 23.5 22C26.5 17 27 10 24 6C22.5 4 18.5 3.5 16 6Z"
        fill="url(#candyAppleGrad)"
        stroke="#991b1b"
        strokeWidth="1.6"
      />
      <path d="M16 6Q16.5 2.5 20 1.5" stroke="#78350f" strokeWidth="2.2" strokeLinecap="round" />
      <path
        d="M17.5 4C20.5 3 23 4.5 23 4.5C23 4.5 22 7 19 6.5"
        fill="url(#candyLeafGrad)"
        stroke="#15803d"
        strokeWidth="1"
      />
      <ellipse cx="11.5" cy="11.5" rx="3.5" ry="5.5" transform="rotate(-30 11.5 11.5)" fill="white" opacity="0.65" />
      <circle cx="10" cy="9" r="1.5" fill="white" opacity="0.85" />
      <defs>
        <radialGradient id="candyAppleGrad" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#ff6b6b" />
          <stop offset="40%" stopColor="#ef4444" />
          <stop offset="85%" stopColor="#b91c1c" />
          <stop offset="100%" stopColor="#7f1d1d" />
        </radialGradient>
        <linearGradient id="candyLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#86efac" />
          <stop offset="100%" stopColor="#22c55e" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function StarSvgIcon({ className = "game-svg-icon", filled = true }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M16 2.5L19.8 11.2L29.2 12.1L22.1 18.3L24.1 27.5L16 22.8L7.9 27.5L9.9 18.3L2.8 12.1L12.2 11.2L16 2.5Z"
        fill={filled ? "url(#hudStarGrad)" : "#475569"}
        stroke={filled ? "#b45309" : "#1e293b"}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {filled && (
        <>
          <path d="M16 5.5L18.8 11.8L25.8 12.5L20.5 17.1L22 24L16 20.5V5.5Z" fill="#fef08a" opacity="0.55" />
          <circle cx="16" cy="14" r="3" fill="#ffffff" opacity="0.75" />
        </>
      )}
      <defs>
        <linearGradient id="hudStarGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fffbeb" />
          <stop offset="25%" stopColor="#fef08a" />
          <stop offset="65%" stopColor="#facc15" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function EnergyBoltIcon({ className = "game-svg-icon" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
        fill="url(#energyBoltGrad)"
        stroke="#ca8a04"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M12 4L5 13H12L11.2 19L18 11H12.5L12 4Z" fill="#ffffff" opacity="0.4" />
      <defs>
        <linearGradient id="energyBoltGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#facc15" />
          <stop offset="100%" stopColor="#eab308" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function PlusSvgIcon({ className = "game-svg-icon" }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M8 2.5V13.5M2.5 8H13.5" stroke="#ffffff" strokeWidth="2.8" strokeLinecap="round" />
    </svg>
  );
}

export function CameraHintSvgIcon({ className = "game-svg-icon" }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* 3D Golden Camera Body */}
      <rect x="2" y="6" width="18" height="19" rx="4" fill="url(#cameraBodyGrad)" stroke="#854d0e" strokeWidth="1.6" />
      {/* Camera Lens Cone */}
      <path d="M20 12L28 7V24L20 19V12Z" fill="url(#cameraConeGrad)" stroke="#854d0e" strokeWidth="1.6" strokeLinejoin="round" />
      {/* Glossy top shine */}
      <rect x="4" y="8" width="14" height="2" rx="1" fill="#ffffff" opacity="0.6" />
      {/* Exclamation badge */}
      <circle cx="11" cy="16.5" r="5" fill="#ef4444" stroke="#7f1d1d" strokeWidth="1" />
      <text x="11" y="20" textAnchor="middle" fontSize="10" fontWeight="900" fill="#ffffff" fontFamily="sans-serif">!</text>
      <defs>
        <linearGradient id="cameraBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="40%" stopColor="#facc15" />
          <stop offset="100%" stopColor="#eab308" />
        </linearGradient>
        <linearGradient id="cameraConeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="100%" stopColor="#ca8a04" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function HomeSvgIcon({ className = "game-svg-icon" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M3 10.5L12 3L21 10.5V20C21 20.6 20.6 21 20 21H15V14.5H9V21H4C3.4 21 3 20.6 3 20V10.5Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function UndoSvgIcon({ className = "game-svg-icon" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M6 10H14C17.3 10 20 12.7 20 16C20 19.3 17.3 22 14 22H9"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 6L5 10L10 14"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function RetrySvgIcon({ className = "game-svg-icon" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M20 12C20 16.4 16.4 20 12 20C7.6 20 4 16.4 4 12C4 8 7 4.6 11 4.1"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <polyline points="20,4 20,10 14,10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SoundSvgIcon({ enabled = true, className = "game-svg-icon" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M3 9.5H7L12 5V19L7 14.5H3V9.5Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      {enabled ? (
        <path
          d="M15.5 8C17 9.5 17.5 11 17.5 12C17.5 13 17 14.5 15.5 16M18.5 5.5C21 8 21.5 10.5 21.5 12C21.5 13.5 21 16 18.5 18.5"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      ) : (
        <path d="M16 8.5L21.5 15.5M21.5 8.5L16 15.5" stroke="#ef4444" strokeWidth="2.6" strokeLinecap="round" />
      )}
    </svg>
  );
}

export function ChevronIcon({ direction = "up", className = "chevron-icon" }) {
  const rotMap = { up: 0, right: 90, down: 180, left: 270 };
  const rot = rotMap[direction] ?? 0;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: `rotate(${rot}deg)` }}
      aria-hidden="true"
    >
      <path
        d="M6 14.5L12 8.5L18 14.5"
        stroke="#ffffff"
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function WardrobeSvgIcon({ className = "game-svg-icon" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M5 6L9 3H15L19 6L17 10L14 8.5V21H10V8.5L7 10L5 6Z"
        fill="url(#wardrobeGrad)"
        stroke="#1e293b"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="wardrobeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function CoinSvgIcon({ className = "game-svg-icon" }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="16" cy="16" r="13" fill="url(#hudCoinGrad)" stroke="#b45309" strokeWidth="2" />
      <circle cx="16" cy="16" r="10" stroke="#fef08a" strokeWidth="1" strokeDasharray="3 2" />
      <text x="16" y="21" textAnchor="middle" fontSize="15" fontWeight="900" fill="#78350f" fontFamily="sans-serif">¢</text>
      <ellipse cx="12" cy="11" rx="3" ry="1.5" transform="rotate(-30 12 11)" fill="white" opacity="0.65" />
      <defs>
        <radialGradient id="hudCoinGrad" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#fef9c3" />
          <stop offset="45%" stopColor="#facc15" />
          <stop offset="85%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#b45309" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export function PauseSvgIcon({ className = "game-svg-icon" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="5.5" y="4" width="4" height="16" rx="2" fill="currentColor" />
      <rect x="14.5" y="4" width="4" height="16" rx="2" fill="currentColor" />
    </svg>
  );
}

export function TimerSvgIcon({ className = "game-svg-icon" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="12" cy="13" r="8.5" fill="#f8fafc" stroke="#0ea5e9" strokeWidth="2" />
      <path d="M12 2V4.5M10 2.5H14" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 13V8.5" stroke="#0284c7" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M12 13L15.5 15.5" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="13" r="1.8" fill="#0284c7" />
    </svg>
  );
}

export function GiftSvgIcon({ className = "game-svg-icon" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="3" y="10" width="18" height="11" rx="2" fill="#ec4899" stroke="#be185d" strokeWidth="1.4" />
      <rect x="2" y="6" width="20" height="4" rx="1.5" fill="#f43f5e" stroke="#9f1239" strokeWidth="1.4" />
      <rect x="10.5" y="6" width="3" height="15" fill="#fde047" stroke="#ca8a04" strokeWidth="0.8" />
    </svg>
  );
}

export function TrophySvgIcon({ className = "game-svg-icon" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M6 4H18V10C18 13.5 15.3 16 12 16C8.7 16 6 13.5 6 10V4Z" fill="#facc15" stroke="#b45309" strokeWidth="1.5" />
      <path d="M6 6H3C3 8.5 4.5 10.5 7 10.5" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18 6H21C21 8.5 19.5 10.5 17 10.5" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 16V19M8 21H16" stroke="#b45309" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function HintSvgIcon({ className = "game-svg-icon" }) {
  return <CameraHintSvgIcon className={className} />;
}

/* =========================================================================
   TRUE REFERENCE FLOATING TOP HUD
   - Top-left: Slate stamina / energy capsule with timer & red "+" button
   - Top-center: Parchment Level plaque
   - Top-right: Golden video camera hint button + Sound toggle
   ========================================================================= */

export function AdventureTopHUD({
  level,
  _world,
  applesLeft = 0,
  totalApples = 0,
  timeLeft = 90,
  _moves = 0,
  coins = 150,
  sfxEnabled = true,
  onToggleSfx,
  onHint,
  onOpenPause,
  onOpenWallet,
  onOpenRewardCenter,
}) {
  const formattedTime = `${String(Math.floor(timeLeft / 60)).padStart(2, "0")}:${String(timeLeft % 60).padStart(2, "0")}`;

  return (
    <header className="ref-floating-top-hud" aria-label="Game Status Bar">
      {/* Top Left: Slate Energy / Stamina Pill with Red Plus Button */}
      <div className="ref-stamina-capsule" onClick={onOpenRewardCenter || onOpenWallet} title="Energy & Wallet">
        <div className="capsule-icon-wrap">
          <EnergyBoltIcon className="capsule-energy-icon" />
        </div>
        <div className="capsule-info">
          <div className="capsule-stamina-row">
            <strong>{coins} ¢</strong>
          </div>
          <div className="capsule-timer-row">
            <span className="capsule-timer">{formattedTime}</span>
          </div>
        </div>
        <button
          type="button"
          className="capsule-plus-btn"
          onClick={(e) => {
            e.stopPropagation();
            if (onOpenRewardCenter) onOpenRewardCenter();
            else if (onOpenWallet) onOpenWallet();
          }}
          title="Get More Energy / Coins"
          aria-label="Add Energy"
        >
          <PlusSvgIcon className="plus-svg" />
        </button>
      </div>

      {/* Top Center: Authentic Parchment Level Plaque */}
      <div
        className="ref-parchment-plaque"
        onClick={onOpenPause}
        role="button"
        tabIndex={0}
        title="Click to Pause / View Objectives"
      >
        <span className="plaque-title">Level {level?.id || 1}</span>
        {totalApples > 0 && (
          <span className="plaque-apple-sub" title={`${applesLeft} apples left`}>
            🍎 {totalApples - applesLeft}/{totalApples}
          </span>
        )}
      </div>

      {/* Top Right: Golden Video Hint Button & Audio Toggle */}
      <div className="ref-top-right-group">
        <button
          type="button"
          className="ref-camera-hint-btn"
          onClick={onHint}
          title="Watch Ad for Hint / Solution"
          aria-label="Hint Video"
        >
          <CameraHintSvgIcon className="camera-hint-icon" />
        </button>

        <button
          type="button"
          className={`ref-audio-toggle-btn ${sfxEnabled ? "" : "muted"}`}
          onClick={onToggleSfx}
          title={sfxEnabled ? "Mute SFX" : "Unmute SFX"}
          aria-label="Toggle Sound"
        >
          <SoundSvgIcon enabled={sfxEnabled} className="ref-audio-icon" />
        </button>
      </div>
    </header>
  );
}

/* =========================================================================
   TRUE REFERENCE LEFT-SIDE ACTION RAIL
   Floating vertical slate buttons: Home, Undo, Retry, Skins
   ========================================================================= */

export function AdventureLeftRail({
  canUndo = true,
  onUndo,
  onRestart,
  onOpenLevelPicker,
  onOpenSkins,
}) {
  return (
    <aside className="ref-floating-left-rail" aria-label="Game Actions">
      {/* Home / Worlds Button */}
      <button
        type="button"
        className="ref-slate-square-btn home-btn"
        onClick={onOpenLevelPicker}
        title="Levels / Worlds (Home)"
        aria-label="Levels"
      >
        <HomeSvgIcon className="slate-btn-icon" />
      </button>

      {/* Undo Button */}
      <button
        type="button"
        className="ref-slate-square-btn undo-btn"
        disabled={!canUndo}
        onClick={onUndo}
        title="Undo Move (Z)"
        aria-label="Undo"
      >
        <UndoSvgIcon className="slate-btn-icon" />
      </button>

      {/* Restart Button */}
      <button
        type="button"
        className="ref-slate-square-btn restart-btn"
        onClick={onRestart}
        title="Restart Level (R)"
        aria-label="Restart"
      >
        <RetrySvgIcon className="slate-btn-icon" />
      </button>

      {/* Wardrobe / Skins Button */}
      <button
        type="button"
        className="ref-slate-square-btn skins-btn"
        onClick={onOpenSkins}
        title="Worm Skins"
        aria-label="Skins"
      >
        <WardrobeSvgIcon className="slate-btn-icon" />
      </button>
    </aside>
  );
}

/* =========================================================================
   TRUE REFERENCE BOTTOM-RIGHT STONE DIAMOND CONTROLLER
   4 circular stone buttons in a diamond layout with white chevrons (^, <, >, v)
   ========================================================================= */

export function AdventureDiamondPad({ onMove }) {
  return (
    <div className="ref-stone-diamond-pad" aria-label="Directional Controls">
      {/* UP BUTTON */}
      <button
        type="button"
        className="stone-circle-btn btn-up"
        onClick={() => onMove(0, -1)}
        title="Move Up (W / Up Arrow)"
        aria-label="Move Up"
      >
        <span className="stone-notch notch-top" />
        <span className="stone-notch notch-bottom" />
        <ChevronIcon direction="up" className="stone-chevron" />
      </button>

      {/* MIDDLE ROW: LEFT & RIGHT */}
      <div className="stone-diamond-mid-row">
        <button
          type="button"
          className="stone-circle-btn btn-left"
          onClick={() => onMove(-1, 0)}
          title="Move Left (A / Left Arrow)"
          aria-label="Move Left"
        >
          <span className="stone-notch notch-left" />
          <span className="stone-notch notch-right" />
          <ChevronIcon direction="left" className="stone-chevron" />
        </button>

        <button
          type="button"
          className="stone-circle-btn btn-right"
          onClick={() => onMove(1, 0)}
          title="Move Right (D / Right Arrow)"
          aria-label="Move Right"
        >
          <span className="stone-notch notch-left" />
          <span className="stone-notch notch-right" />
          <ChevronIcon direction="right" className="stone-chevron" />
        </button>
      </div>

      {/* DOWN BUTTON */}
      <button
        type="button"
        className="stone-circle-btn btn-down"
        onClick={() => onMove(0, 1)}
        title="Move Down (S / Down Arrow)"
        aria-label="Move Down"
      >
        <span className="stone-notch notch-top" />
        <span className="stone-notch notch-bottom" />
        <ChevronIcon direction="down" className="stone-chevron" />
      </button>
    </div>
  );
}

/* =========================================================================
   BACKWARD-COMPATIBLE WRAPPERS FOR APP.JSX IMPORTS
   Ensures seamless interop with existing calls in App.jsx
   ========================================================================= */

export function MobileGameHeader(props) {
  return <AdventureTopHUD {...props} />;
}

export function TopBar(props) {
  return <AdventureTopHUD {...props} />;
}

export function ActionDock({ canUndo, onUndo, onRestart, onOpenSkins }) {
  return (
    <AdventureLeftRail
      canUndo={canUndo}
      onUndo={onUndo}
      onRestart={onRestart}
      onOpenLevelPicker={() => {}}
      onOpenSkins={onOpenSkins}
    />
  );
}

export function TouchDPad({ onMove }) {
  return <AdventureDiamondPad onMove={onMove} />;
}

export function MobileControlCockpit({
  canUndo,
  onUndo,
  onRestart,
  _onHint,
  onOpenSkins,
  onMove,
}) {
  return (
    <div className="ref-cockpit-unified-container">
      <AdventureLeftRail
        canUndo={canUndo}
        onUndo={onUndo}
        onRestart={onRestart}
        onOpenLevelPicker={() => {}}
        onOpenSkins={onOpenSkins}
      />
      <AdventureDiamondPad onMove={onMove} />
    </div>
  );
}

export function ArcadeHUD({
  level,
  applesLeft,
  totalApples,
  moves,
  _score,
  _timeLeft,
  status,
  collectedKeys = [],
}) {
  const isPortalUnlocked = applesLeft === 0;
  return (
    <div className="arcade-sidebar-hud" aria-label="Game Info">
      <div className="hud-metric-row">
        <div className="metric-box">
          <AppleSvgIcon className="metric-box-icon" />
          <div className="metric-box-text">
            <small>APPLES</small>
            <strong>{totalApples - applesLeft} / {totalApples}</strong>
          </div>
        </div>
        <div className="metric-box">
          <TrophySvgIcon className="metric-box-icon" />
          <div className="metric-box-text">
            <small>MOVES</small>
            <strong>{moves}</strong>
          </div>
        </div>
      </div>
      {(level?.keys || []).length > 0 && (
        <div className="metric-box full-width">
          <span className="metric-emoji">🗝️</span>
          <div className="metric-box-text">
            <small>KEYS</small>
            <strong>{collectedKeys.length} / {level.keys.length}</strong>
          </div>
        </div>
      )}
      <div className={`hud-portal-status-card status-${status} ${isPortalUnlocked ? "portal-open" : ""}`}>
        <strong>
          {status === "won"
            ? "VICTORY ACHIEVED!"
            : status === "failed"
            ? "TRY AGAIN!"
            : isPortalUnlocked
            ? "PORTAL UNLOCKED! ENTER NOW!"
            : "EAT ALL APPLES TO UNLOCK PORTAL"}
        </strong>
      </div>
    </div>
  );
}
