import React from "react";

// Ultra-Polished 3D-Styled SVG Game Assets for Apple Worm Adventure

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
        transform: `rotate(${rot}deg) scale(1.34)`,
      }}
    >
      <svg viewBox="0 0 48 48" className="worm-head-svg">
        <defs>
          {/* Rich 3D Radial Gradients */}
          <radialGradient id={`head-3d-${skin.id}`} cx="32%" cy="26%" r="70%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="22%" stopColor={skin.headHighlight} />
            <stop offset="62%" stopColor={skin.headColor} />
            <stop offset="100%" stopColor={skin.bodySecondary} />
          </radialGradient>

          <radialGradient id="eye-gloss" cx="28%" cy="28%" r="72%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="70%" stopColor="#f1f5f9" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </radialGradient>

          <filter id="head-3d-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="4" stdDeviation="2.8" floodColor="#0f172a" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* Dynamic Antennae with cute wiggle */}
        <g className="worm-antennae">
          <path
            d="M 18 10 Q 12 1 6 3"
            fill="none"
            stroke={skin.bodySecondary}
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <circle cx="5" cy="3" r="3.8" fill={skin.sparkleColor} filter="drop-shadow(0 0 3px rgba(255,255,255,0.9))" />

          <path
            d="M 30 10 Q 36 1 42 3"
            fill="none"
            stroke={skin.bodySecondary}
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <circle cx="43" cy="3" r="3.8" fill={skin.sparkleColor} filter="drop-shadow(0 0 3px rgba(255,255,255,0.9))" />
        </g>

        {/* Head Main Sphere with 3D lighting */}
        <circle
          cx="24"
          cy="24"
          r="19.5"
          fill={`url(#head-3d-${skin.id})`}
          filter="url(#head-3d-shadow)"
          stroke={skin.bodySecondary}
          strokeWidth="1.8"
        />

        {/* Rosy Glowing Cheeks */}
        <ellipse cx="10" cy="30" rx="4" ry="2.6" fill={skin.cheekColor} opacity="0.8" />
        <ellipse cx="38" cy="30" rx="4" ry="2.6" fill={skin.cheekColor} opacity="0.8" />

        {/* Expressive Large Cartoon Eyes */}
        {isDead ? (
          // Comic Dizzy Spinning X Eyes
          <g stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round">
            <line x1="12" y1="14" x2="22" y2="24" />
            <line x1="22" y1="14" x2="12" y2="24" />
            <line x1="26" y1="14" x2="36" y2="24" />
            <line x1="36" y1="14" x2="26" y2="24" />
          </g>
        ) : (
          <g className="worm-eyes-group">
            {/* Left Big Eye */}
            <ellipse cx="16.5" cy="18.5" rx="6" ry="7.5" fill="url(#eye-gloss)" stroke="#0f172a" strokeWidth="1.2" />
            <ellipse cx="18" cy="18.5" rx="3.5" ry="4.5" fill={skin.eyeColor} />
            <circle cx="19.2" cy="16.5" r="1.8" fill="#ffffff" />
            <circle cx="17" cy="21" r="1" fill="#ffffff" />

            {/* Right Big Eye */}
            <ellipse cx="31.5" cy="18.5" rx="6" ry="7.5" fill="url(#eye-gloss)" stroke="#0f172a" strokeWidth="1.2" />
            <ellipse cx="33" cy="18.5" rx="3.5" ry="4.5" fill={skin.eyeColor} />
            <circle cx="34.2" cy="16.5" r="1.8" fill="#ffffff" />
            <circle cx="32" cy="21" r="1" fill="#ffffff" />
          </g>
        )}

        {/* Mouth */}
        {isNearApple ? (
          // Open Excited Munch Mouth
          <g className="hungry-mouth">
            <path
              d="M 16 28 Q 24 40 32 28 Z"
              fill="#e11d48"
              stroke={skin.bodySecondary}
              strokeWidth="2"
            />
            {/* Cute front teeth */}
            <rect x="21" y="28" width="6" height="3" rx="1" fill="#ffffff" />
          </g>
        ) : (
          // Cheerful Glossy Smile
          <path
            d="M 17 28 Q 24 36 31 28"
            fill="none"
            stroke={skin.bodySecondary}
            strokeWidth="2.8"
            strokeLinecap="round"
          />
        )}

        {/* Specular Top Shine */}
        <ellipse
          cx="20"
          cy="11"
          rx="7.5"
          ry="3.2"
          fill="#ffffff"
          opacity="0.5"
          transform="rotate(-15 20 11)"
        />

        {/* Royal Crown for Golden Monarch Skin */}
        {skin.id === "golden" && (
          <g className="golden-crown" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.35))">
            <path
              d="M 13 10 L 18 14 L 24 5 L 30 14 L 35 10 L 33 16 L 15 16 Z"
              fill="linear-gradient(#fde047, #ca8a04)"
              stroke="#854d0e"
              strokeWidth="1.6"
            />
            <circle cx="24" cy="5" r="2.2" fill="#ef4444" />
            <circle cx="13" cy="10" r="1.6" fill="#38bdf8" />
            <circle cx="35" cy="10" r="1.6" fill="#38bdf8" />
          </g>
        )}
      </svg>
    </div>
  );
}

export function WormBody({ skin, index, totalLength }) {
  // Plump, prominent body segments - scaled up for high visibility
  const scale = Math.max(1.0, 1.25 - (index / totalLength) * 0.22);

  return (
    <div
      className="piece-worm-body"
      style={{
        transform: `scale(${scale})`,
      }}
    >
      <svg viewBox="0 0 44 44" className="worm-body-svg">
        <defs>
          <radialGradient id={`body-3d-${skin.id}-${index}`} cx="32%" cy="26%" r="70%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="26%" stopColor={skin.headHighlight} />
            <stop offset="66%" stopColor={skin.bodyPrimary} />
            <stop offset="100%" stopColor={skin.bodySecondary} />
          </radialGradient>

          <filter id={`body-shadow-${index}`} x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="4" stdDeviation="2.4" floodColor="#0f172a" floodOpacity="0.35" />
          </filter>
        </defs>

        {/* 3D Segment Sphere */}
        <circle
          cx="22"
          cy="22"
          r="18"
          fill={`url(#body-3d-${skin.id}-${index})`}
          filter={`url(#body-shadow-${index})`}
          stroke={skin.bodySecondary}
          strokeWidth="1.8"
        />

        {/* Belly Cushion Stripe */}
        <ellipse
          cx="22"
          cy="26"
          rx="12"
          ry="6.5"
          fill={skin.bellyColor}
          opacity="0.8"
        />

        {/* Specular Gloss Reflection */}
        <ellipse
          cx="17"
          cy="14"
          rx="6.5"
          ry="3.2"
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
    <div className={`piece-apple ${isGolden ? "golden" : "red"}`}>
      <svg viewBox="0 0 44 44" className="apple-svg">
        <defs>
          {/* Ultra Juicy 3D Apple Gradient */}
          <radialGradient id="apple-3d-red" cx="30%" cy="25%" r="72%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="20%" stopColor="#fca5a5" />
            <stop offset="55%" stopColor="#ef4444" />
            <stop offset="85%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#7f1d1d" />
          </radialGradient>

          <radialGradient id="apple-3d-gold" cx="30%" cy="25%" r="72%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="25%" stopColor="#fef08a" />
            <stop offset="60%" stopColor="#facc15" />
            <stop offset="85%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#854d0e" />
          </radialGradient>

          <filter id="apple-drop-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow
              dx="0"
              dy="5"
              stdDeviation="3"
              floodColor={isGolden ? "#eab308" : "#991b1b"}
              floodOpacity={isGolden ? "0.6" : "0.45"}
            />
          </filter>
        </defs>

        {/* Apple Stem */}
        <path
          d="M 22 13 Q 25 5 28 3"
          fill="none"
          stroke="#78350f"
          strokeWidth="2.8"
          strokeLinecap="round"
        />

        {/* Glossy Green Leaf */}
        <path
          d="M 23 8 Q 33 4 33 12 Q 28 14 23 8"
          fill={isGolden ? "#fde047" : "#4ade80"}
          stroke={isGolden ? "#ca8a04" : "#166534"}
          strokeWidth="1.4"
          filter="drop-shadow(0 2px 2px rgba(0,0,0,0.15))"
        />

        {/* Apple 3D Body */}
        <path
          d="M 22 14 C 14 11 8 17 8 25 C 8 35 17 38 22 36 C 27 38 36 35 36 25 C 36 17 30 11 22 14 Z"
          fill={isGolden ? "url(#apple-3d-gold)" : "url(#apple-3d-red)"}
          filter="url(#apple-drop-shadow)"
          stroke={isGolden ? "#a16207" : "#7f1d1d"}
          strokeWidth="1.6"
        />

        {/* Specular Highlight Streak */}
        <path
          d="M 13 20 C 13 16 16 14 20 15 C 17 17 15 22 16 26 C 14 24 13 22 13 20 Z"
          fill="#ffffff"
          opacity="0.65"
        />
        <circle cx="20" cy="18" r="2.2" fill="#ffffff" opacity="0.85" />

        {/* Rotating Sparkles on Golden Apple */}
        {isGolden && (
          <g className="golden-sparkles-spin">
            <polygon points="34,8 35,11 38,12 35,13 34,16 33,13 30,12 33,11" fill="#fff" />
            <polygon points="10,30 11,32 13,33 11,34 10,36 9,34 7,33 9,32" fill="#fff" />
          </g>
        )}
      </svg>
    </div>
  );
}

export function WallPiece() {
  return (
    <div className="piece-wall">
      <svg viewBox="0 0 44 44" className="wall-svg">
        <defs>
          <linearGradient id="wall-3d-stone" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#cbd5e1" />
            <stop offset="35%" stopColor="#94a3b8" />
            <stop offset="80%" stopColor="#475569" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
          <filter id="wall-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="2" floodColor="#0f172a" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* 3D Carved Stone Block */}
        <rect
          x="3"
          y="3"
          width="38"
          height="38"
          rx="9"
          fill="url(#wall-3d-stone)"
          filter="url(#wall-shadow)"
          stroke="#1e293b"
          strokeWidth="2"
        />

        {/* Top Rim Bevel Highlight */}
        <path
          d="M 8 5 L 36 5 Q 39 5 39 8 L 39 12 L 5 12 L 5 8 Q 5 5 8 5 Z"
          fill="#ffffff"
          opacity="0.25"
        />

        {/* Cracks & Weathering */}
        <path
          d="M 9 14 L 18 19 L 24 13 M 16 31 L 23 25 L 34 32"
          fill="none"
          stroke="#1e293b"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* Fresh Moss Dots */}
        <circle cx="10" cy="10" r="3.2" fill="#4ade80" opacity="0.85" />
        <circle cx="34" cy="33" r="2.8" fill="#4ade80" opacity="0.75" />
      </svg>
    </div>
  );
}

export function SpikePiece() {
  return (
    <div className="piece-spike">
      <svg viewBox="0 0 44 44" className="spike-svg">
        <defs>
          <radialGradient id="spike-hazard" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f87171" />
            <stop offset="60%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#450a0a" />
          </radialGradient>
        </defs>

        {/* Hazard Ground Trap Ring */}
        <circle cx="22" cy="22" r="18" fill="url(#spike-hazard)" opacity="0.45" />
        <circle cx="22" cy="22" r="18" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="5 3" />

        {/* 3D Metallic Hazard Spikes */}
        <polygon points="13,35 22,8 20,35" fill="#f87171" />
        <polygon points="20,35 22,8 29,35" fill="#991b1b" />

        <polygon points="7,36 14,16 19,36" fill="#ef4444" />
        <polygon points="25,36 30,16 37,36" fill="#7f1d1d" />

        {/* Sharp Metallic Glints */}
        <circle cx="22" cy="8" r="2.2" fill="#ffffff" filter="drop-shadow(0 0 2px #fff)" />
        <circle cx="14" cy="16" r="1.6" fill="#ffffff" />
        <circle cx="30" cy="16" r="1.6" fill="#ffffff" />
      </svg>
    </div>
  );
}

export function KeyPiece() {
  return (
    <div className="piece-key">
      <svg viewBox="0 0 44 44" className="key-svg">
        <defs>
          <linearGradient id="gold-key-3d" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="30%" stopColor="#fef08a" />
            <stop offset="65%" stopColor="#facc15" />
            <stop offset="100%" stopColor="#a16207" />
          </linearGradient>
          <filter id="key-radiance" x="-35%" y="-35%" width="170%" height="170%">
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#facc15" floodOpacity="0.85" />
          </filter>
        </defs>

        <g filter="url(#key-radiance)" transform="rotate(-30 22 22)">
          {/* Key Ring */}
          <circle cx="15" cy="22" r="8" fill="none" stroke="url(#gold-key-3d)" strokeWidth="3.4" />
          <circle cx="15" cy="22" r="4" fill="#a16207" opacity="0.3" />

          {/* Key Shaft */}
          <line x1="23" y1="22" x2="36" y2="22" stroke="url(#gold-key-3d)" strokeWidth="3.6" strokeLinecap="round" />

          {/* Key Teeth */}
          <line x1="32" y1="22" x2="32" y2="29" stroke="url(#gold-key-3d)" strokeWidth="3.2" strokeLinecap="round" />
          <line x1="36" y1="22" x2="36" y2="28" stroke="url(#gold-key-3d)" strokeWidth="3.2" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}

export function GatePiece({ isUnlocked = false }) {
  return (
    <div className={`piece-gate ${isUnlocked ? "unlocked" : "locked"}`}>
      <svg viewBox="0 0 44 44" className="gate-svg">
        <defs>
          <linearGradient id="gate-laser-glow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fb7185" />
            <stop offset="50%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#be123c" />
          </linearGradient>
        </defs>

        {/* Heavy Stone Pillars */}
        <rect x="2" y="3" width="8" height="38" rx="4" fill="#334155" stroke="#0f172a" strokeWidth="1.8" />
        <rect x="34" y="3" width="8" height="38" rx="4" fill="#334155" stroke="#0f172a" strokeWidth="1.8" />

        {/* Forcefield Laser Grid */}
        {!isUnlocked && (
          <g className="gate-lasers">
            <rect x="10" y="9" width="24" height="4.5" rx="2" fill="url(#gate-laser-glow)" filter="drop-shadow(0 0 4px #f43f5e)" />
            <rect x="10" y="20" width="24" height="4.5" rx="2" fill="url(#gate-laser-glow)" filter="drop-shadow(0 0 4px #f43f5e)" />
            <rect x="10" y="31" width="24" height="4.5" rx="2" fill="url(#gate-laser-glow)" filter="drop-shadow(0 0 4px #f43f5e)" />

            {/* Central Padlock Shield */}
            <circle cx="22" cy="22" r="8" fill="#881337" stroke="#f43f5e" strokeWidth="1.8" />
            <rect x="19" y="21" width="6" height="5" rx="1" fill="#facc15" />
            <path d="M 20 21 L 20 18 Q 22 16 24 18 L 24 21" fill="none" stroke="#facc15" strokeWidth="1.5" />
          </g>
        )}
      </svg>
    </div>
  );
}

export function TeleportPiece({ color = "#38bdf8" }) {
  return (
    <div className="piece-teleport">
      <svg viewBox="0 0 44 44" className="teleport-svg">
        <defs>
          <filter id="tele-intense-glow" x="-35%" y="-35%" width="170%" height="170%">
            <feDropShadow dx="0" dy="0" stdDeviation="4.5" floodColor={color} floodOpacity="0.9" />
          </filter>
        </defs>

        {/* Outer Spinning Stargate Rune Ring */}
        <circle
          cx="22"
          cy="22"
          r="18"
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeDasharray="7 4"
          filter="url(#tele-intense-glow)"
          className="tele-spin-outer"
        />

        {/* Swirling Warp Core */}
        <circle cx="22" cy="22" r="11" fill={color} opacity="0.4" />
        <circle cx="22" cy="22" r="5" fill="#ffffff" filter="drop-shadow(0 0 3px #fff)" />
      </svg>
    </div>
  );
}

export function PortalPiece({ isOpen = false }) {
  return (
    <div className={`piece-portal ${isOpen ? "open" : "locked"}`}>
      <svg viewBox="0 0 48 48" className="portal-svg">
        <defs>
          {/* Cosmic Nebula Radiant Gradient */}
          <radialGradient id="stargate-nebula" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="25%" stopColor="#38bdf8" />
            <stop offset="60%" stopColor="#a855f7" />
            <stop offset="90%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#2e1065" />
          </radialGradient>

          <filter id="stargate-bloom" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor={isOpen ? "#a855f7" : "#475569"} floodOpacity="0.9" />
          </filter>
        </defs>

        {isOpen ? (
          // Radiant Hyperspace Stargate
          <g filter="url(#stargate-bloom)">
            {/* Outer Rotating Energy Rings */}
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="#c084fc"
              strokeWidth="3.2"
              strokeDasharray="9 4"
              className="portal-ring-outer"
            />
            {/* Pulsing Core */}
            <circle
              cx="24"
              cy="24"
              r="16"
              fill="url(#stargate-nebula)"
              className="portal-core-pulse"
            />
            {/* Spiral Hyperspace Arms */}
            <path
              d="M 24 10 Q 34 20 24 24 Q 14 28 24 38"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.2"
              opacity="0.9"
              className="portal-spiral"
            />
            <circle cx="24" cy="24" r="4" fill="#ffffff" filter="drop-shadow(0 0 4px #fff)" />
          </g>
        ) : (
          // Locked Ancient Obsidian Portal
          <g filter="url(#stargate-bloom)">
            <circle
              cx="24"
              cy="24"
              r="19"
              fill="#0f172a"
              stroke="#334155"
              strokeWidth="3"
            />
            {/* Giant Golden Padlock */}
            <rect x="17" y="23" width="14" height="11" rx="2.5" fill="#eab308" stroke="#a16207" strokeWidth="1.8" />
            <path
              d="M 19 23 L 19 17 Q 24 12 29 17 L 29 23"
              fill="none"
              stroke="#eab308"
              strokeWidth="2.6"
              strokeLinecap="round"
            />
          </g>
        )}
      </svg>
    </div>
  );
}
