import React from "react";

// ============================================================================
// ULTRA-PREMIUM 3D CARTOON GAME PIECES FOR APPLE WORM ADVENTURE
// Inspired by top-tier mobile arcade puzzle games (Snake Puzzle, Cut the Rope)
// ============================================================================

export function WormHead({ skin, facing = "right", isNearApple = false, isDead = false }) {
  const rotationMap = {
    up: -90,
    down: 90,
    left: 180,
    right: 0,
  };
  const rot = rotationMap[facing] ?? 0;

  return (
    <div
      className={`piece-worm-head ${isDead ? "dead" : ""} ${isNearApple ? "hungry" : ""}`}
      style={{
        transform: `rotate(${rot}deg)`,
        transformOrigin: "center center",
      }}
      aria-label="Worm Head"
    >
      <svg viewBox="0 0 46 46" className="worm-head-svg">
        <defs>
          <linearGradient id={`worm-head-grad-${skin.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={skin.headHighlight || "#4ade80"} />
            <stop offset="60%" stopColor={skin.headColor || "#22c55e"} />
            <stop offset="100%" stopColor={skin.bodySecondary || "#16a34a"} />
          </linearGradient>
        </defs>

        {/* Continuous Plump Cartoon Head Body (Matching Reference Images 2, 3, 4) */}
        <rect
          x="1"
          y="3"
          width="44"
          height="40"
          rx="15"
          fill={`url(#worm-head-grad-${skin.id})`}
          stroke="#14532d"
          strokeWidth="2.4"
        />

        {/* Lime/Yellow Underbelly */}
        <path
          d="M 1 27 Q 23 37 45 27 V 33 Q 23 44 1 33 Z"
          fill={skin.bellyColor || "#a3e635"}
          stroke="#14532d"
          strokeWidth="1.2"
        />

        {/* Expressive Cartoon Eyes with Eyelids & Lashes (Matching Images 2, 3, 4) */}
        {isDead ? (
          <g stroke="#ffffff" strokeWidth="3.6" strokeLinecap="round">
            <line x1="14" y1="12" x2="24" y2="22" />
            <line x1="24" y1="12" x2="14" y2="22" />
            <line x1="26" y1="12" x2="36" y2="22" />
            <line x1="36" y1="12" x2="26" y2="22" />
          </g>
        ) : (
          <g className="worm-eyes-reference">
            {/* Eyelids / Lashes */}
            <path d="M 15 8 Q 23 5 31 8" stroke="#0f172a" strokeWidth="2.6" strokeLinecap="round" />
            <line x1="16" y1="7" x2="13" y2="4" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
            <line x1="30" y1="7" x2="33" y2="4" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />

            {/* Left Big Eye */}
            <ellipse cx="19" cy="15" rx="6" ry="7" fill="#ffffff" stroke="#0f172a" strokeWidth="1.8" />
            <circle cx="21" cy="15" r="3.2" fill="#0f172a" />
            <circle cx="22" cy="13.5" r="1.3" fill="#ffffff" />

            {/* Right Big Eye */}
            <ellipse cx="29" cy="15" rx="6" ry="7" fill="#ffffff" stroke="#0f172a" strokeWidth="1.8" />
            <circle cx="31" cy="15" r="3.2" fill="#0f172a" />
            <circle cx="32" cy="13.5" r="1.3" fill="#ffffff" />
          </g>
        )}

        {/* Snout & Mouth */}
        {isNearApple ? (
          <path d="M 18 30 Q 23 38 28 30 Z" fill="#ef4444" stroke="#14532d" strokeWidth="1.8" />
        ) : (
          <path d="M 17 29 Q 23 35 29 29" fill="none" stroke="#14532d" strokeWidth="2.4" strokeLinecap="round" />
        )}
      </svg>
    </div>
  );
}

export function WormBody({ skin, index, totalLength: _totalLength }) {
  return (
    <div
      className="piece-worm-body"
      aria-label={`Worm Segment ${index}`}
    >
      <svg viewBox="0 0 46 46" className="worm-body-svg">
        <defs>
          <linearGradient id={`worm-body-grad-${skin.id}-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={skin.headHighlight || "#4ade80"} />
            <stop offset="60%" stopColor={skin.bodyPrimary || "#22c55e"} />
            <stop offset="100%" stopColor={skin.bodySecondary || "#16a34a"} />
          </linearGradient>
        </defs>

        {/* Continuous Plump Tubular Body Block (Matching Images 2, 3, 4) */}
        <rect
          x="0"
          y="3"
          width="46"
          height="40"
          rx="12"
          fill={`url(#worm-body-grad-${skin.id}-${index})`}
          stroke="#14532d"
          strokeWidth="2.2"
        />

        {/* Lime/Yellow Belly Strip */}
        <path
          d="M 0 27 Q 23 37 46 27 V 33 Q 23 44 0 33 Z"
          fill={skin.bellyColor || "#a3e635"}
          stroke="#14532d"
          strokeWidth="1.2"
        />

        {/* Specular Highlight Streak */}
        <rect x="4" y="6" width="38" height="3" rx="1.5" fill="#ffffff" opacity="0.35" />
      </svg>
    </div>
  );
}

export function ApplePiece({ isGolden = false }) {
  return (
    <div className={`piece-apple ${isGolden ? "golden" : "red"}`} aria-label={isGolden ? "Golden Apple" : "Red Apple"}>
      {/* Floating Sparkle Halo for Golden Apple */}
      {isGolden && <div className="golden-apple-halo" aria-hidden="true" />}

      <svg viewBox="0 0 48 48" className="apple-svg">
        <defs>
          {/* Ultra Juicy 3D Red Apple Gradient */}
          <radialGradient id="apple-3d-red-rich" cx="28%" cy="22%" r="75%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="18%" stopColor="#fca5a5" />
            <stop offset="50%" stopColor="#ef4444" />
            <stop offset="82%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#7f1d1d" />
          </radialGradient>

          {/* Gleaming 3D Golden Apple Gradient */}
          <radialGradient id="apple-3d-gold-rich" cx="28%" cy="22%" r="75%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.98" />
            <stop offset="22%" stopColor="#fef08a" />
            <stop offset="55%" stopColor="#facc15" />
            <stop offset="85%" stopColor="#ca8a04" />
            <stop offset="100%" stopColor="#78350f" />
          </radialGradient>

          {/* Rich Apple Drop Shadow */}
          <filter id="apple-ambient-shadow" x="-35%" y="-35%" width="170%" height="170%">
            <feDropShadow
              dx="0"
              dy="5"
              stdDeviation="3.2"
              floodColor={isGolden ? "#ca8a04" : "#7f1d1d"}
              floodOpacity={isGolden ? "0.6" : "0.5"}
            />
          </filter>
        </defs>

        {/* Stem */}
        <path
          d="M 24 14 Q 27 5 31 3"
          fill="none"
          stroke="#78350f"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Crisp Green Leaf with Dew Drop */}
        <path
          d="M 25 9 Q 36 5 36 14 Q 30 16 25 9"
          fill={isGolden ? "#fde047" : "#4ade80"}
          stroke={isGolden ? "#ca8a04" : "#15803d"}
          strokeWidth="1.5"
          filter="drop-shadow(0 2px 3px rgba(0,0,0,0.2))"
        />
        <circle cx="30" cy="10" r="1.2" fill="#ffffff" opacity="0.9" />

        {/* Plump 3D Apple Body */}
        <path
          d="M 24 15 C 15 12 8 18 8 27 C 8 38 18 41 24 39 C 30 41 40 38 40 27 C 40 18 33 12 24 15 Z"
          fill={isGolden ? "url(#apple-3d-gold-rich)" : "url(#apple-3d-red-rich)"}
          filter="url(#apple-ambient-shadow)"
          stroke={isGolden ? "#a16207" : "#7f1d1d"}
          strokeWidth="1.6"
        />

        {/* Curving Glassy Highlight Streak */}
        <path
          d="M 14 21 C 14 17 18 15 22 16 C 18 18 16 23 17 28 C 15 26 14 24 14 21 Z"
          fill="#ffffff"
          opacity="0.68"
        />
        <circle cx="21" cy="19" r="2.4" fill="#ffffff" opacity="0.9" />

        {/* Twinkling Golden Apple Sparkles */}
        {isGolden && (
          <g className="golden-sparkles-spin">
            <polygon points="36,9 37.5,12.5 41,13.5 37.5,14.5 36,18 34.5,14.5 31,13.5 34.5,12.5" fill="#ffffff" />
            <polygon points="12,32 13,34.5 15.5,35.5 13,36.5 12,39 11,36.5 8.5,35.5 11,34.5" fill="#ffffff" />
          </g>
        )}
      </svg>
    </div>
  );
}

export function WallPiece() {
  return (
    <div className="piece-wall" aria-label="3D Wooden Platform Block">
      <svg viewBox="0 0 48 48" className="wall-svg">
        <defs>
          <linearGradient id="wall-top-bevel" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#9c6843" />
            <stop offset="100%" stopColor="#80502e" />
          </linearGradient>
          <linearGradient id="wall-front-bevel" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#5d351b" />
            <stop offset="100%" stopColor="#432410" />
          </linearGradient>
        </defs>

        {/* 3D Drop/Side Face */}
        <rect x="0.5" y="0.5" width="47" height="47" rx="6" fill="url(#wall-front-bevel)" stroke="#261308" strokeWidth="2" />

        {/* Top 3D Lighter Platform Deck */}
        <rect x="1.5" y="1.5" width="45" height="22" rx="5" fill="url(#wall-top-bevel)" />
        {/* Soft highlight line on top edge */}
        <rect x="3" y="2" width="42" height="3" rx="1.5" fill="#b07d57" opacity="0.6" />
      </svg>
    </div>
  );
}

export function SpikePiece() {
  return (
    <div className="piece-spike" aria-label="Hazard Spikes">
      <svg viewBox="0 0 46 46" className="spike-svg">
        <defs>
          <radialGradient id="spike-plate-warning" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f87171" />
            <stop offset="60%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#450a0a" />
          </radialGradient>
        </defs>

        {/* Hazard Ground Trap Ring */}
        <rect x="4" y="4" width="38" height="38" rx="8" fill="url(#spike-plate-warning)" opacity="0.4" stroke="#dc2626" strokeWidth="1.5" />
        <line x1="6" y1="6" x2="40" y2="40" stroke="#ef4444" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />

        {/* 3D Metallic Razor Spikes */}
        {/* Center Giant Spike */}
        <polygon points="14,37 23,7 21,37" fill="#f87171" />
        <polygon points="21,37 23,7 31,37" fill="#7f1d1d" />

        {/* Left Side Spike */}
        <polygon points="7,38 15,16 20,38" fill="#ef4444" />
        <polygon points="15,16 20,38 18,38" fill="#991b1b" />

        {/* Right Side Spike */}
        <polygon points="26,38 31,16 39,38" fill="#991b1b" />
        <polygon points="31,16 34,38 39,38" fill="#450a0a" />

        {/* Gleaming Metallic Sparkles */}
        <circle cx="23" cy="7" r="2.4" fill="#ffffff" filter="drop-shadow(0 0 3px #ffffff)" />
        <circle cx="15" cy="16" r="1.8" fill="#ffffff" />
        <circle cx="31" cy="16" r="1.8" fill="#ffffff" />
      </svg>
    </div>
  );
}

export function KeyPiece() {
  return (
    <div className="piece-key" aria-label="Golden Secret Key">
      <svg viewBox="0 0 46 46" className="key-svg">
        <defs>
          <linearGradient id="gold-key-radiance" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="25%" stopColor="#fef08a" />
            <stop offset="60%" stopColor="#facc15" />
            <stop offset="100%" stopColor="#a16207" />
          </linearGradient>
          <filter id="key-glow-bloom" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="0" stdDeviation="4.5" floodColor="#facc15" floodOpacity="0.9" />
          </filter>
        </defs>

        <g filter="url(#key-glow-bloom)" transform="rotate(-30 23 23)">
          {/* Key Ring Bow */}
          <circle cx="15" cy="23" r="8.5" fill="none" stroke="url(#gold-key-radiance)" strokeWidth="3.6" />
          <circle cx="15" cy="23" r="4.2" fill="#854d0e" opacity="0.3" />

          {/* Key Shaft */}
          <line x1="23.5" y1="23" x2="38" y2="23" stroke="url(#gold-key-radiance)" strokeWidth="3.8" strokeLinecap="round" />

          {/* Key Bit / Teeth */}
          <line x1="33" y1="23" x2="33" y2="30" stroke="url(#gold-key-radiance)" strokeWidth="3.4" strokeLinecap="round" />
          <line x1="37" y1="23" x2="37" y2="29" stroke="url(#gold-key-radiance)" strokeWidth="3.4" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}

export function GatePiece({ isUnlocked = false }) {
  return (
    <div className={`piece-gate ${isUnlocked ? "unlocked" : "locked"}`} aria-label={isUnlocked ? "Unlocked Gate" : "Locked Gate"}>
      <svg viewBox="0 0 46 46" className="gate-svg">
        <defs>
          <linearGradient id="gate-laser-force" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fda4af" />
            <stop offset="50%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#be123c" />
          </linearGradient>
        </defs>

        {/* Heavy Stone Pillars */}
        <rect x="2" y="3" width="9" height="40" rx="4.5" fill="#334155" stroke="#0f172a" strokeWidth="2" />
        <rect x="35" y="3" width="9" height="40" rx="4.5" fill="#334155" stroke="#0f172a" strokeWidth="2" />

        {/* Forcefield Laser Grid */}
        {!isUnlocked && (
          <g className="gate-laser-active">
            <rect x="11" y="9" width="24" height="4.5" rx="2" fill="url(#gate-laser-force)" filter="drop-shadow(0 0 5px #f43f5e)" />
            <rect x="11" y="21" width="24" height="4.5" rx="2" fill="url(#gate-laser-force)" filter="drop-shadow(0 0 5px #f43f5e)" />
            <rect x="11" y="33" width="24" height="4.5" rx="2" fill="url(#gate-laser-force)" filter="drop-shadow(0 0 5px #f43f5e)" />

            {/* Central Padlock Shield */}
            <circle cx="23" cy="23" r="8.5" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
            <rect x="20" y="22" width="6" height="5" rx="1.2" fill="#facc15" />
            <path d="M 21 22 L 21 19 Q 23 17 25 19 L 25 22" fill="none" stroke="#facc15" strokeWidth="1.6" />
          </g>
        )}
      </svg>
    </div>
  );
}

export function TeleportPiece({ color = "#38bdf8" }) {
  return (
    <div className="piece-teleport" aria-label="Wormhole Teleporter">
      <svg viewBox="0 0 46 46" className="teleport-svg">
        <defs>
          <filter id="teleport-bloom" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor={color} floodOpacity="0.9" />
          </filter>
        </defs>

        {/* Outer Rotating Stargate Rune Ring */}
        <circle
          cx="23"
          cy="23"
          r="19"
          fill="none"
          stroke={color}
          strokeWidth="3.2"
          strokeDasharray="8 4"
          filter="url(#teleport-bloom)"
          className="tele-spin-outer"
        />

        {/* Swirling Warp Core */}
        <circle cx="23" cy="23" r="12" fill={color} opacity="0.45" />
        <circle cx="23" cy="23" r="5.5" fill="#ffffff" filter="drop-shadow(0 0 4px #ffffff)" />
      </svg>
    </div>
  );
}

export function PortalPiece({ isOpen = false }) {
  return (
    <div className={`piece-portal ${isOpen ? "open" : "locked"}`} aria-label="Spiral Exit Hole">
      {isOpen && <div className="portal-awakened-burst" aria-hidden="true" />}

      <svg viewBox="0 0 52 52" className="portal-svg">
        <defs>
          <radialGradient id="portal-black-hole" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1e182f" />
            <stop offset="70%" stopColor="#110d1c" />
            <stop offset="100%" stopColor="#08060e" />
          </radialGradient>
        </defs>

        {/* Outer Circular Black Disc */}
        <circle
          cx="26"
          cy="26"
          r="23"
          fill="url(#portal-black-hole)"
          stroke="#000000"
          strokeWidth="2.5"
        />

        {/* Concentric Swirling Ridges (Spiral Wormhole from Reference Screenshot) */}
        <circle cx="26" cy="26" r="18" fill="none" stroke="#373052" strokeWidth="2.2" opacity="0.8" />
        <circle cx="26" cy="26" r="13" fill="none" stroke="#4a406c" strokeWidth="2" opacity="0.75" />
        <circle cx="26" cy="26" r="8" fill="none" stroke="#5f5388" strokeWidth="1.8" opacity="0.6" />
        <circle cx="26" cy="26" r="3.5" fill="#1e182f" />

        {/* Swirling Spiral Path */}
        <path
          d="M 26 5 A 21 21 0 0 1 47 26 A 16 16 0 0 1 26 42 A 11 11 0 0 1 15 26 A 7 7 0 0 1 26 19 A 3.5 3.5 0 0 1 26 26"
          fill="none"
          stroke={isOpen ? "#a855f7" : "#5a507e"}
          strokeWidth="2.6"
          strokeLinecap="round"
          className="portal-swirl-active"
        />
      </svg>
    </div>
  );
}
