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
        transform: `rotate(${rot}deg) scale(1.36)`,
        transformOrigin: "center center",
      }}
      aria-label="Worm Head"
    >
      <svg viewBox="0 0 52 52" className="worm-head-svg">
        <defs>
          {/* Rich 3D Radial Gradients for Worm Head */}
          <radialGradient id={`worm-head-sphere-${skin.id}`} cx="30%" cy="24%" r="75%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="20%" stopColor={skin.headHighlight || "#86efac"} />
            <stop offset="58%" stopColor={skin.headColor || "#22c55e"} />
            <stop offset="85%" stopColor={skin.bodySecondary || "#15803d"} />
            <stop offset="100%" stopColor="#0f4422" />
          </radialGradient>

          {/* Eye Gloss Gradient */}
          <radialGradient id="worm-eye-gloss" cx="26%" cy="24%" r="76%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="65%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </radialGradient>

          {/* Head Ambient 3D Drop Shadow */}
          <filter id="worm-head-depth" x="-35%" y="-35%" width="170%" height="170%">
            <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#0f172a" floodOpacity="0.45" />
          </filter>
        </defs>

        {/* Dynamic Bouncy Antennae with glowing tips */}
        <g className="worm-antennae-group">
          {/* Left Antenna */}
          <path
            d="M 19 12 Q 13 2 7 4"
            fill="none"
            stroke={skin.bodySecondary || "#15803d"}
            strokeWidth="3.4"
            strokeLinecap="round"
          />
          <circle
            cx="6"
            cy="4"
            r="4.2"
            fill={skin.sparkleColor || "#facc15"}
            filter="drop-shadow(0 0 4px rgba(250, 204, 21, 0.9))"
          />
          <circle cx="5" cy="3" r="1.5" fill="#ffffff" />

          {/* Right Antenna */}
          <path
            d="M 33 12 Q 39 2 45 4"
            fill="none"
            stroke={skin.bodySecondary || "#15803d"}
            strokeWidth="3.4"
            strokeLinecap="round"
          />
          <circle
            cx="46"
            cy="4"
            r="4.2"
            fill={skin.sparkleColor || "#facc15"}
            filter="drop-shadow(0 0 4px rgba(250, 204, 21, 0.9))"
          />
          <circle cx="45" cy="3" r="1.5" fill="#ffffff" />
        </g>

        {/* Head Main 3D Sphere */}
        <circle
          cx="26"
          cy="26"
          r="21"
          fill={`url(#worm-head-sphere-${skin.id})`}
          filter="url(#worm-head-depth)"
          stroke={skin.bodySecondary || "#15803d"}
          strokeWidth="2"
        />

        {/* Rosy Blushing Cheeks */}
        <ellipse cx="11" cy="32" rx="4.5" ry="3" fill={skin.cheekColor || "#f43f5e"} opacity="0.82" />
        <ellipse cx="41" cy="32" rx="4.5" ry="3" fill={skin.cheekColor || "#f43f5e"} opacity="0.82" />

        {/* Expressive Cartoon Eyes */}
        {isDead ? (
          // Dizzy Comic Spinning Eyes on Failure
          <g stroke="#ffffff" strokeWidth="3.8" strokeLinecap="round">
            <line x1="13" y1="15" x2="23" y2="25" />
            <line x1="23" y1="15" x2="13" y2="25" />
            <line x1="29" y1="15" x2="39" y2="25" />
            <line x1="39" y1="15" x2="29" y2="25" />
          </g>
        ) : (
          <g className="worm-eyes-animated">
            {/* Left Big Shiny Eye */}
            <ellipse cx="18" cy="20" rx="6.5" ry="8" fill="url(#worm-eye-gloss)" stroke="#0f172a" strokeWidth="1.4" />
            <ellipse cx="19.5" cy="20" rx="3.8" ry="5" fill={skin.eyeColor || "#0f172a"} />
            <circle cx="21" cy="17.5" r="2.2" fill="#ffffff" />
            <circle cx="18" cy="22.5" r="1.2" fill="#ffffff" />

            {/* Right Big Shiny Eye */}
            <ellipse cx="34" cy="20" rx="6.5" ry="8" fill="url(#worm-eye-gloss)" stroke="#0f172a" strokeWidth="1.4" />
            <ellipse cx="35.5" cy="20" rx="3.8" ry="5" fill={skin.eyeColor || "#0f172a"} />
            <circle cx="37" cy="17.5" r="2.2" fill="#ffffff" />
            <circle cx="34" cy="22.5" r="1.2" fill="#ffffff" />
          </g>
        )}

        {/* Dynamic Mouth: Hungry Munch vs Cheerful Smile */}
        {isNearApple ? (
          <g className="worm-mouth-hungry">
            {/* Open Happy Chomping Mouth */}
            <path
              d="M 17 30 Q 26 43 35 30 Z"
              fill="#e11d48"
              stroke={skin.bodySecondary || "#15803d"}
              strokeWidth="2.2"
            />
            {/* Cute Front Buck Teeth */}
            <rect x="22.5" y="30" width="7" height="3.5" rx="1.2" fill="#ffffff" />
            {/* Rosy Tongue */}
            <path d="M 21 37 Q 26 34 31 37 Z" fill="#fda4af" />
          </g>
        ) : (
          // Cheerful Confident Smile
          <path
            d="M 18 30 Q 26 39 34 30"
            fill="none"
            stroke={skin.bodySecondary || "#15803d"}
            strokeWidth="3.2"
            strokeLinecap="round"
          />
        )}

        {/* Specular Curved Highlight */}
        <ellipse
          cx="22"
          cy="12"
          rx="8"
          ry="3.6"
          fill="#ffffff"
          opacity="0.55"
          transform="rotate(-15 22 12)"
        />

        {/* Royal Crown for Golden Monarch Skin */}
        {skin.id === "golden" && (
          <g className="golden-crown" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.4))">
            <path
              d="M 14 11 L 20 15 L 26 6 L 32 15 L 38 11 L 36 17 L 16 17 Z"
              fill="#facc15"
              stroke="#854d0e"
              strokeWidth="1.8"
            />
            <circle cx="26" cy="6" r="2.5" fill="#ef4444" />
            <circle cx="14" cy="11" r="1.8" fill="#38bdf8" />
            <circle cx="38" cy="11" r="1.8" fill="#38bdf8" />
          </g>
        )}
      </svg>
    </div>
  );
}

export function WormBody({ skin, index, totalLength }) {
  // Gracefully tapered plump caterpillar segments
  const scale = Math.max(1.02, 1.28 - (index / Math.max(1, totalLength)) * 0.24);

  return (
    <div
      className="piece-worm-body"
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "center center",
      }}
      aria-label={`Worm Segment ${index}`}
    >
      <svg viewBox="0 0 46 46" className="worm-body-svg">
        <defs>
          <radialGradient id={`worm-body-3d-${skin.id}-${index}`} cx="32%" cy="24%" r="72%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="22%" stopColor={skin.headHighlight || "#86efac"} />
            <stop offset="62%" stopColor={skin.bodyPrimary || "#22c55e"} />
            <stop offset="88%" stopColor={skin.bodySecondary || "#15803d"} />
            <stop offset="100%" stopColor="#0f4422" />
          </radialGradient>

          <filter id={`body-drop-shadow-${index}`} x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="3.5" stdDeviation="2.5" floodColor="#0f172a" floodOpacity="0.38" />
          </filter>
        </defs>

        {/* 3D Segment Body Sphere */}
        <circle
          cx="23"
          cy="23"
          r="19"
          fill={`url(#worm-body-3d-${skin.id}-${index})`}
          filter={`url(#body-drop-shadow-${index})`}
          stroke={skin.bodySecondary || "#15803d"}
          strokeWidth="1.8"
        />

        {/* Soft Cream Belly Cushion */}
        <ellipse
          cx="23"
          cy="28"
          rx="12.5"
          ry="7"
          fill={skin.bellyColor || "#dcfce7"}
          opacity="0.85"
        />

        {/* Glossy Specular Reflection Streak */}
        <ellipse
          cx="17"
          cy="14"
          rx="7"
          ry="3.4"
          fill="#ffffff"
          opacity="0.6"
          transform="rotate(-25 17 14)"
        />
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
    <div className="piece-wall" aria-label="Earth Platform Block">
      <svg viewBox="0 0 46 46" className="wall-svg">
        <defs>
          {/* Rich Cartoon Earthen Wood / Soil Gradient */}
          <linearGradient id="wall-earth-texture" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#633219" />
            <stop offset="20%" stopColor="#4e2511" />
            <stop offset="85%" stopColor="#3d1c0c" />
            <stop offset="100%" stopColor="#2b1307" />
          </linearGradient>

          {/* Top Surface Lighter Wood Rim */}
          <linearGradient id="wall-top-rim" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#824322" />
            <stop offset="100%" stopColor="#5c2e17" />
          </linearGradient>
        </defs>

        {/* Seamless Platform Block */}
        <rect
          x="0"
          y="0"
          width="46"
          height="46"
          fill="url(#wall-earth-texture)"
          stroke="#1a0b04"
          strokeWidth="1.5"
        />

        {/* Top Rim Highlight (stepped platform edge) */}
        <rect
          x="0"
          y="0"
          width="46"
          height="4.5"
          fill="url(#wall-top-rim)"
        />

        {/* Subtle Horizontal Wood/Rock Strata lines */}
        <line x1="4" y1="16" x2="22" y2="16" stroke="#2b1307" strokeWidth="1.2" opacity="0.6" strokeLinecap="round" />
        <line x1="28" y1="28" x2="42" y2="28" stroke="#2b1307" strokeWidth="1.2" opacity="0.6" strokeLinecap="round" />
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
    <div className={`piece-portal ${isOpen ? "open" : "locked"}`} aria-label={isOpen ? "Open Spiral Exit Hole" : "Locked Portal"}>
      {isOpen && <div className="portal-awakened-burst" aria-hidden="true" />}

      <svg viewBox="0 0 52 52" className="portal-svg">
        <defs>
          <radialGradient id="portal-black-hole" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={isOpen ? "#1e1b4b" : "#020617"} />
            <stop offset="60%" stopColor={isOpen ? "#0f172a" : "#090d16"} />
            <stop offset="100%" stopColor="#000000" />
          </radialGradient>
        </defs>

        {/* Outer Circular Rim */}
        <circle
          cx="26"
          cy="26"
          r="22"
          fill="url(#portal-black-hole)"
          stroke="#000000"
          strokeWidth="3.2"
        />

        {/* Concentric Swirling Ridges (Like reference game screenshot) */}
        <circle cx="26" cy="26" r="17" fill="none" stroke="#334155" strokeWidth="2.4" opacity="0.8" />
        <circle cx="26" cy="26" r="12" fill="none" stroke="#475569" strokeWidth="2" opacity="0.65" />
        <circle cx="26" cy="26" r="7" fill="none" stroke="#64748b" strokeWidth="1.8" opacity="0.5" />
        <circle cx="26" cy="26" r="3.2" fill={isOpen ? "#c084fc" : "#000000"} />

        {/* Swirling Spiral Path */}
        <path
          d="M 26 6 A 20 20 0 0 1 46 26 A 15 15 0 0 1 26 41 A 10 10 0 0 1 16 26 A 6 6 0 0 1 26 20"
          fill="none"
          stroke={isOpen ? "#c084fc" : "#1e293b"}
          strokeWidth="2.4"
          strokeLinecap="round"
          className={isOpen ? "portal-swirl-active" : ""}
        />

        {!isOpen && (
          // Small discreet golden lock badge when locked
          <g transform="translate(18, 18) scale(0.65)">
            <rect x="3" y="10" width="18" height="13" rx="3" fill="#eab308" stroke="#713f12" strokeWidth="1.5" />
            <path d="M 7 10 V 6 A 5 5 0 0 1 17 6 V 10" fill="none" stroke="#eab308" strokeWidth="2.5" />
          </g>
        )}
      </svg>
    </div>
  );
}
