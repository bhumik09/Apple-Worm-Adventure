import React from "react";

/* =========================================================================
   TRUE REFERENCE VECTOR ICONS (Matching Snake Puzzle Screenshots)
   ========================================================================= */

export function AppleSvgIcon({ className = "game-svg-icon" }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M16 6C13.5 3.5 9.5 4 8 6C5 10 5.5 17 8.5 22C10.5 26 13 28 16 28C19 28 21.5 26 23.5 22C26.5 17 27 10 24 6C22.5 4 18.5 3.5 16 6Z"
        fill="url(#refAppleGrad)"
        stroke="#7f1d1d"
        strokeWidth="1.6"
      />
      <path d="M16 6Q16.5 2.5 20 1.5" stroke="#78350f" strokeWidth="2.2" strokeLinecap="round" />
      <path
        d="M17.5 4C20.5 3 23 4.5 23 4.5C23 4.5 22 7 19 6.5"
        fill="#4ade80"
        stroke="#15803d"
        strokeWidth="1"
      />
      <ellipse cx="11.5" cy="11.5" rx="3.5" ry="5.5" transform="rotate(-30 11.5 11.5)" fill="white" opacity="0.65" />
      <circle cx="10" cy="9" r="1.5" fill="white" opacity="0.85" />
      <defs>
        <radialGradient id="refAppleGrad" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#f87171" />
          <stop offset="40%" stopColor="#ef4444" />
          <stop offset="85%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#7f1d1d" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export function StarSvgIcon({ className = "game-svg-icon", filled = true }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M16 2.5L19.8 11.2L29.2 12.1L22.1 18.3L24.1 27.5L16 22.8L7.9 27.5L9.9 18.3L2.8 12.1L12.2 11.2L16 2.5Z"
        fill={filled ? "#facc15" : "#64748b"}
        stroke={filled ? "#b45309" : "#334155"}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {filled && <circle cx="16" cy="14" r="3" fill="#ffffff" opacity="0.75" />}
    </svg>
  );
}

/* 1. Restart Button Icon (↺) */
export function RestartBtnSvg({ className = "ref-top-svg" }) {
  return (
    <svg className={className} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M21 14C21 18 17.5 21 13.5 21C9.5 21 6.5 17.5 6.5 13.5C6.5 9.5 9.5 6.5 13.5 6.5C16.5 6.5 19 8.5 20.2 11"
        stroke="#ffffff"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <polyline points="21,5 21,11 15,11" stroke="#ffffff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* 2. Fast Forward / Skip Level Icon (⏩ with Ad badge) */
export function FastForwardBtnSvg({ className = "ref-top-svg" }) {
  return (
    <svg className={className} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 7L13 14L5 21V7Z" fill="#ffffff" />
      <path d="M13 7L21 14L13 21V7Z" fill="#ffffff" />
      {/* Small Yellow Ad Play Badge */}
      <rect x="15" y="15.5" width="11" height="10" rx="3" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
      <path d="M19 18L23 20.5L19 23V18Z" fill="#78350f" />
    </svg>
  );
}

/* 3. Hint Bulb Icon (💡 with Count 1 badge) */
export function HintBulbBtnSvg({ className = "ref-top-svg" }) {
  return (
    <svg className={className} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14 4C10.5 4 8 6.5 8 10C8 12.2 9.2 14.2 11 15.5V18H17V15.5C18.8 14.2 20 12.2 20 10C20 6.5 17.5 4 14 4Z"
        fill="#fef08a"
        stroke="#ca8a04"
        strokeWidth="1.6"
      />
      <rect x="11.5" y="18.5" width="5" height="2.5" rx="1" fill="#cbd5e1" stroke="#64748b" strokeWidth="1" />
      {/* Small Yellow Count Badge "1" */}
      <rect x="16" y="15" width="11" height="11" rx="3" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
      <text x="21.5" y="23" textAnchor="middle" fontSize="9" fontWeight="900" fill="#78350f" fontFamily="sans-serif">1</text>
    </svg>
  );
}

/* 4. Duck Deal Badge (🦆) */
export function DealBadgeSvg({ className = "ref-top-svg" }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="19" r="11" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
      <circle cx="16" cy="19" r="6" fill="#f0f9ff" />
      <circle cx="16" cy="11" r="7" fill="#facc15" stroke="#ca8a04" strokeWidth="1.2" />
      <ellipse cx="14" cy="10" rx="1.4" ry="2" fill="#0f172a" />
      <ellipse cx="18" cy="10" rx="1.4" ry="2" fill="#0f172a" />
      <path d="M12 13Q16 16 20 13" fill="#f97316" stroke="#c2410c" strokeWidth="1" />
      {/* Special Deal Tag */}
      <rect x="2" y="24" width="28" height="7" rx="3.5" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.8" />
      <text x="16" y="29.5" textAnchor="middle" fontSize="6" fontWeight="900" fill="#854d0e" fontFamily="sans-serif">Special Deal</text>
    </svg>
  );
}

/* 5. Gift Box Icon (🎁 %) */
export function GiftBoxSvg({ className = "ref-top-svg" }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="12" width="22" height="15" rx="3" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
      <rect x="3" y="8" width="26" height="5" rx="2" fill="#facc15" stroke="#ca8a04" strokeWidth="1.2" />
      <rect x="14" y="8" width="4" height="19" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
      <path d="M14 8Q10 4 13 4Q16 4 16 8ZM18 8Q22 4 19 4Q16 4 16 8Z" fill="#facc15" stroke="#ca8a04" strokeWidth="0.8" />
      {/* Badge % */}
      <circle cx="23" cy="23" r="5.5" fill="#ef4444" stroke="#991b1b" strokeWidth="1" />
      <text x="23" y="26.5" textAnchor="middle" fontSize="7" fontWeight="900" fill="#ffffff" fontFamily="sans-serif">%</text>
    </svg>
  );
}

/* 6. No-Ads Icon (🚫 ADS) */
export function NoAdsSvg({ className = "ref-top-svg" }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="13" fill="#ef4444" stroke="#b91c1c" strokeWidth="1.6" />
      <text x="16" y="20" textAnchor="middle" fontSize="9" fontWeight="900" fill="#ffffff" fontFamily="sans-serif">ADS</text>
      <line x1="6" y1="26" x2="26" y2="6" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/* 7. Shirt / Wardrobe Icon (👕 !) */
export function ShirtWardrobeSvg({ className = "ref-top-svg" }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="28" height="28" rx="8" fill="#64748b" stroke="#334155" strokeWidth="1.5" />
      <path
        d="M9 10L12 7H20L23 10L21 14L19 12.5V23H13V12.5L11 14L9 10Z"
        fill="#ffffff"
        stroke="#e2e8f0"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {/* Red Alert Dot */}
      <circle cx="24" cy="7" r="3.5" fill="#ef4444" stroke="#ffffff" strokeWidth="1" />
    </svg>
  );
}

/* 8. Settings Gear Icon (⚙️) */
export function SettingsGearSvg({ className = "ref-top-svg" }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="28" height="28" rx="8" fill="#64748b" stroke="#334155" strokeWidth="1.5" />
      <circle cx="16" cy="16" r="4.5" fill="none" stroke="#ffffff" strokeWidth="2.5" />
      <path
        d="M16 6V9M16 23V26M6 16H9M23 16H26M8.9 8.9L11 11M21 21L23.1 23.1M8.9 23.1L11 21M21 11L23.1 8.9"
        stroke="#ffffff"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* 9. Yellow Shopping Basket Icon (🧺) */
export function ShopBasketSvg({ className = "ref-top-svg" }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="28" height="28" rx="8" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
      <path
        d="M7 14H25L23 24H9L7 14Z"
        fill="#fef08a"
        stroke="#854d0e"
        strokeWidth="1.4"
      />
      <path d="M12 14L16 8L20 14" stroke="#854d0e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="12" y1="17" x2="12" y2="21" stroke="#ca8a04" strokeWidth="1.4" />
      <line x1="16" y1="17" x2="16" y2="21" stroke="#ca8a04" strokeWidth="1.4" />
      <line x1="20" y1="17" x2="20" y2="21" stroke="#ca8a04" strokeWidth="1.4" />
    </svg>
  );
}

/* 10. Glass Chevron Icon (^, <, >, v) */
export function GlassChevronSvg({ direction = "up", className = "glass-chevron" }) {
  const rotMap = { up: 0, right: 90, down: 180, left: 270 };
  const rot = rotMap[direction] ?? 0;
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: `rotate(${rot}deg)` }}
      aria-hidden="true"
    >
      <path
        d="M8 20L16 12L24 20"
        stroke="#ffffff"
        strokeWidth="4.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* Fallback / Backward Compatibility Icons */
export function UndoSvgIcon({ className = "ref-top-svg" }) {
  return <RestartBtnSvg className={className} />;
}
export function RetrySvgIcon({ className = "ref-top-svg" }) {
  return <RestartBtnSvg className={className} />;
}
export function SoundSvgIcon({ enabled = true, className = "ref-top-svg" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 9.5H7L12 5V19L7 14.5H3V9.5Z" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
      {enabled ? (
        <path d="M15.5 8C17 9.5 17.5 11 17.5 12C17.5 13 17 14.5 15.5 16M18.5 5.5C21 8 21.5 10.5 21.5 12C21.5 13.5 21 16 18.5 18.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      ) : (
        <path d="M16 8.5L21.5 15.5M21.5 8.5L16 15.5" stroke="#ef4444" strokeWidth="2.6" strokeLinecap="round" />
      )}
    </svg>
  );
}
export function TrophySvgIcon({ className = "ref-top-svg" }) {
  return <DealBadgeSvg className={className} />;
}
export function GiftSvgIcon({ className = "ref-top-svg" }) {
  return <GiftBoxSvg className={className} />;
}
export function WardrobeSvgIcon({ className = "ref-top-svg" }) {
  return <ShirtWardrobeSvg className={className} />;
}
export function CameraHintSvgIcon({ className = "ref-top-svg" }) {
  return <HintBulbBtnSvg className={className} />;
}
export function ChevronIcon(props) {
  return <GlassChevronSvg {...props} />;
}

/* =========================================================================
   TRUE REFERENCE TOP HUD (Matching Screenshots 2, 3, 4)
   - Left: ↺ Restart, ⏩ Skip, 💡 1 Hint
   - Center: Slate Pill "Level 3"
   - Right: 🦆 Deal, 🎁 Gift, 🚫 ADS, 👕 Skins, ⚙️ Settings, 🧺 Shop
   ========================================================================= */

export function AdventureTopHUD({
  level,
  _world,
  _applesLeft = 0,
  _totalApples = 0,
  _timeLeft = 90,
  _moves = 0,
  _coins = 150,
  _sfxEnabled = true,
  onToggleSfx,
  onHint,
  onOpenPause,
  onOpenWallet,
  onOpenRewardCenter,
  onOpenSkins,
  onRestart,
  onNextLevel,
}) {
  return (
    <header className="ref-top-game-bar" aria-label="Game Bar">
      {/* LEFT ACTION BUTTONS: Restart, Fast Forward, Hint */}
      <div className="ref-top-left-actions">
        <button
          type="button"
          className="ref-square-action-btn restart-btn"
          onClick={onRestart}
          title="Restart Level"
          aria-label="Restart Level"
        >
          <RestartBtnSvg />
        </button>

        <button
          type="button"
          className="ref-square-action-btn skip-btn"
          onClick={onNextLevel || onHint}
          title="Skip Level (Ad)"
          aria-label="Skip Level"
        >
          <FastForwardBtnSvg />
        </button>

        <button
          type="button"
          className="ref-square-action-btn hint-btn"
          onClick={onHint}
          title="Hint (💡)"
          aria-label="Hint"
        >
          <HintBulbBtnSvg />
        </button>
      </div>

      {/* CENTER LEVEL BADGE: Translucent Slate Pill "Level 3" */}
      <div
        className="ref-center-level-pill"
        onClick={onOpenPause}
        role="button"
        tabIndex={0}
        title="Level Info / Pause"
      >
        <span>Level {level?.id || 1}</span>
      </div>

      {/* RIGHT ACTION BUTTONS: Deal, Gift, No-Ads, Wardrobe, Settings, Shop */}
      <div className="ref-top-right-actions">
        <button
          type="button"
          className="ref-round-action-btn deal-btn"
          onClick={onOpenRewardCenter}
          title="Special Deals"
          aria-label="Special Deals"
        >
          <DealBadgeSvg />
        </button>

        <button
          type="button"
          className="ref-round-action-btn gift-btn"
          onClick={onOpenRewardCenter}
          title="Daily Gifts & Rewards"
          aria-label="Gifts"
        >
          <GiftBoxSvg />
        </button>

        <button
          type="button"
          className="ref-round-action-btn noads-btn"
          onClick={onOpenRewardCenter}
          title="Remove Ads"
          aria-label="No Ads"
        >
          <NoAdsSvg />
        </button>

        <button
          type="button"
          className="ref-round-action-btn skins-btn"
          onClick={onOpenSkins}
          title="Worm Wardrobe"
          aria-label="Skins"
        >
          <ShirtWardrobeSvg />
        </button>

        <button
          type="button"
          className="ref-round-action-btn settings-btn"
          onClick={onOpenPause || onToggleSfx}
          title="Settings"
          aria-label="Settings"
        >
          <SettingsGearSvg />
        </button>

        <button
          type="button"
          className="ref-round-action-btn shop-btn"
          onClick={onOpenWallet}
          title="Shop / Coins"
          aria-label="Shop"
        >
          <ShopBasketSvg />
        </button>
      </div>
    </header>
  );
}

/* =========================================================================
   TRUE REFERENCE BOTTOM-RIGHT FROSTED GLASS DIAMOND CONTROLLER
   - 4 translucent glass circles with white double border & bold white chevrons
   - Exact match to Images 2, 3, 4, 5
   ========================================================================= */

export function AdventureDiamondPad({ onMove }) {
  return (
    <div className="ref-glass-diamond-pad" aria-label="Game Controller">
      {/* UP BUTTON */}
      <button
        type="button"
        className="glass-circle-btn btn-up"
        onClick={() => onMove(0, -1)}
        title="Move Up"
        aria-label="Move Up"
      >
        <span className="glass-inner-ring" />
        <GlassChevronSvg direction="up" />
      </button>

      {/* MIDDLE ROW: LEFT & RIGHT */}
      <div className="glass-diamond-mid-row">
        <button
          type="button"
          className="glass-circle-btn btn-left"
          onClick={() => onMove(-1, 0)}
          title="Move Left"
          aria-label="Move Left"
        >
          <span className="glass-inner-ring" />
          <GlassChevronSvg direction="left" />
        </button>

        <button
          type="button"
          className="glass-circle-btn btn-right"
          onClick={() => onMove(1, 0)}
          title="Move Right"
          aria-label="Move Right"
        >
          <span className="glass-inner-ring" />
          <GlassChevronSvg direction="right" />
        </button>
      </div>

      {/* DOWN BUTTON */}
      <button
        type="button"
        className="glass-circle-btn btn-down"
        onClick={() => onMove(0, 1)}
        title="Move Down"
        aria-label="Move Down"
      >
        <span className="glass-inner-ring" />
        <GlassChevronSvg direction="down" />
      </button>
    </div>
  );
}

/* Backward-compatible Exports */
export function AdventureLeftRail() {
  return null;
}
export function MobileGameHeader(props) {
  return <AdventureTopHUD {...props} />;
}
export function TopBar(props) {
  return <AdventureTopHUD {...props} />;
}
export function ActionDock() {
  return null;
}
export function TouchDPad({ onMove }) {
  return <AdventureDiamondPad onMove={onMove} />;
}
export function MobileControlCockpit({ onMove }) {
  return <AdventureDiamondPad onMove={onMove} />;
}
export function ArcadeHUD() {
  return null;
}

/* =========================================================================
   TRUE REFERENCE CITY SKYLINE BACKDROP (Images 2, 3, 4, 5)
   ========================================================================= */
export function CitySkylineBackdrop() {
  return (
    <div className="city-skyline-backdrop" aria-hidden="true">
      <svg className="city-skyline-svg" viewBox="0 0 1200 360" preserveAspectRatio="none">
        {/* Layer 1: Distant Pale Blue Silhouettes */}
        <g fill="#c5e3f3" opacity="0.75">
          <rect x="15" y="70" width="65" height="290" rx="3" />
          <line x1="47" y1="70" x2="47" y2="30" stroke="#c5e3f3" strokeWidth="3" />
          <rect x="90" y="110" width="70" height="250" rx="3" />
          <rect x="175" y="50" width="85" height="310" rx="3" />
          <line x1="217" y1="50" x2="217" y2="15" stroke="#c5e3f3" strokeWidth="3.5" />
          <rect x="275" y="130" width="60" height="230" rx="3" />
          <rect x="350" y="80" width="80" height="280" rx="3" />
          <rect x="450" y="45" width="75" height="315" rx="3" />
          <polygon points="450,45 487,15 525,45" fill="#c5e3f3" />
          <rect x="540" y="120" width="85" height="240" rx="3" />
          <rect x="645" y="65" width="95" height="295" rx="3" />
          <line x1="692" y1="65" x2="692" y2="25" stroke="#c5e3f3" strokeWidth="3" />
          <rect x="760" y="105" width="70" height="255" rx="3" />
          <rect x="845" y="75" width="85" height="285" rx="3" />
          <rect x="945" y="125" width="75" height="235" rx="3" />
          <rect x="1035" y="55" width="90" height="305" rx="3" />
          <line x1="1080" y1="55" x2="1080" y2="20" stroke="#c5e3f3" strokeWidth="3" />
          <rect x="1140" y="90" width="55" height="270" rx="3" />
        </g>

        {/* Layer 2: Mid-distance Skyscrapers (Medium Pastel Blue) */}
        <g fill="#aed6ed">
          <rect x="35" y="120" width="75" height="240" rx="4" />
          <rect x="125" y="90" width="85" height="270" rx="4" />
          <rect x="225" y="140" width="70" height="220" rx="4" />
          <rect x="310" y="100" width="90" height="260" rx="4" />
          <rect x="415" y="150" width="80" height="210" rx="4" />
          <rect x="510" y="90" width="95" height="270" rx="4" />
          <line x1="557" y1="90" x2="557" y2="50" stroke="#aed6ed" strokeWidth="3" />
          <rect x="620" y="130" width="75" height="230" rx="4" />
          <rect x="710" y="105" width="90" height="255" rx="4" />
          <rect x="815" y="145" width="70" height="215" rx="4" />
          <rect x="900" y="100" width="100" height="260" rx="4" />
          <rect x="1015" y="135" width="80" height="225" rx="4" />
          <rect x="1110" y="105" width="85" height="255" rx="4" />
        </g>

        {/* Layer 3: Foreground Skyscrapers with Crisp Window Grids */}
        <g fill="#9acae4">
          <rect x="0" y="160" width="65" height="200" rx="4" />
          <rect x="75" y="130" width="80" height="230" rx="4" />
          <rect x="170" y="170" width="90" height="190" rx="4" />
          <rect x="275" y="125" width="75" height="235" rx="4" />
          <rect x="365" y="155" width="100" height="205" rx="4" />
          <rect x="480" y="115" width="85" height="245" rx="4" />
          <rect x="580" y="165" width="75" height="195" rx="4" />
          <rect x="670" y="135" width="95" height="225" rx="4" />
          <rect x="780" y="160" width="85" height="200" rx="4" />
          <rect x="880" y="120" width="90" height="240" rx="4" />
          <rect x="985" y="155" width="80" height="205" rx="4" />
          <rect x="1080" y="130" width="95" height="230" rx="4" />
        </g>

        {/* Faint Window Dot Grids on Foreground Towers */}
        <g fill="#ffffff" opacity="0.38">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((col) => (
            <g key={col} transform={`translate(${col * 100 + 10}, 150)`}>
              <rect x="6" y="8" width="5" height="7" rx="1.5" />
              <rect x="18" y="8" width="5" height="7" rx="1.5" />
              <rect x="30" y="8" width="5" height="7" rx="1.5" />
              <rect x="42" y="8" width="5" height="7" rx="1.5" />

              <rect x="6" y="24" width="5" height="7" rx="1.5" />
              <rect x="18" y="24" width="5" height="7" rx="1.5" />
              <rect x="30" y="24" width="5" height="7" rx="1.5" />
              <rect x="42" y="24" width="5" height="7" rx="1.5" />

              <rect x="6" y="40" width="5" height="7" rx="1.5" />
              <rect x="18" y="40" width="5" height="7" rx="1.5" />
              <rect x="30" y="40" width="5" height="7" rx="1.5" />
              <rect x="42" y="40" width="5" height="7" rx="1.5" />

              <rect x="6" y="56" width="5" height="7" rx="1.5" />
              <rect x="18" y="56" width="5" height="7" rx="1.5" />
              <rect x="30" y="56" width="5" height="7" rx="1.5" />
              <rect x="42" y="56" width="5" height="7" rx="1.5" />

              <rect x="6" y="72" width="5" height="7" rx="1.5" />
              <rect x="18" y="72" width="5" height="7" rx="1.5" />
              <rect x="30" y="72" width="5" height="7" rx="1.5" />
              <rect x="42" y="72" width="5" height="7" rx="1.5" />

              <rect x="6" y="88" width="5" height="7" rx="1.5" />
              <rect x="18" y="88" width="5" height="7" rx="1.5" />
              <rect x="30" y="88" width="5" height="7" rx="1.5" />
              <rect x="42" y="88" width="5" height="7" rx="1.5" />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
