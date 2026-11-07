import React, { useRef } from "react";
import {
  WormHead,
  WormBody,
  ApplePiece,
  WallPiece,
  SpikePiece,
  KeyPiece,
  GatePiece,
  TeleportPiece,
  PortalPiece,
} from "./GamePieces";

const SIZE = 10;

function sameCell(a, b) {
  return a && b && a.x === b.x && a.y === b.y;
}

// Vector botanical & world ambiance decorations (replaces raw emojis)
function BoardDeco({ type, worldId = 1 }) {
  if (type === "flower") {
    return (
      <svg
        className="garden-deco-svg flower-deco"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="12" cy="7" r="3.2" fill="#fde047" />
        <circle cx="17" cy="12" r="3.2" fill="#fde047" />
        <circle cx="12" cy="17" r="3.2" fill="#fde047" />
        <circle cx="7" cy="12" r="3.2" fill="#fde047" />
        <circle cx="12" cy="12" r="3" fill="#ea580c" />
      </svg>
    );
  }

  if (type === "clover") {
    return (
      <svg
        className="garden-deco-svg clover-deco"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M12 12C10 8 7 8 7 10C7 12 10 12 12 12ZM12 12C16 10 16 7 14 7C12 7 12 10 12 12ZM12 12C14 16 17 16 17 14C17 12 14 12 12 12ZM12 12C8 14 8 17 10 17C12 17 12 14 12 12Z"
          fill="#4ade80"
          stroke="#16a34a"
          strokeWidth="0.8"
        />
        <path d="M12 12Q11 18 8 20" stroke="#15803d" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "sprout") {
    return (
      <svg
        className="garden-deco-svg sprout-deco"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M12 19V11C12 11 9 9 7 11C5 13 8 15 12 14C12 14 15 11 17 12C19 13 17 16 12 16"
          fill="#86efac"
          stroke="#22c55e"
          strokeWidth="1"
        />
      </svg>
    );
  }

  // World 2: Autumn amber leaf
  if (worldId === 2) {
    return (
      <svg
        className="garden-deco-svg leaf-deco"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M12 4C8 7 7 14 12 18C17 14 16 7 12 4Z"
          fill="#fb923c"
          stroke="#c2410c"
          strokeWidth="0.8"
        />
        <line x1="12" y1="6" x2="12" y2="17" stroke="#7c2d12" strokeWidth="0.8" />
      </svg>
    );
  }

  // World 3: Amethyst Rune / Crystal
  if (worldId === 3) {
    return (
      <svg
        className="garden-deco-svg crystal-deco"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <polygon points="12,5 16,12 12,19 8,12" fill="#c084fc" stroke="#7e22ce" strokeWidth="1" />
      </svg>
    );
  }

  // World 4: Cosmic Sparkle
  return (
    <svg
      className="garden-deco-svg spark-deco"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 4L13.5 10.5L20 12L13.5 13.5L12 20L10.5 13.5L4 12L10.5 10.5L12 4Z"
        fill="#67e8f9"
      />
    </svg>
  );
}

export default function WormBoard({
  level,
  world,
  worm,
  apples,
  goldenApples = [],
  collectedKeys = [],
  facing = "right",
  status = "playing",
  skin,
  onSwipe,
  floatingTexts = [],
}) {
  const touchStartRef = useRef({ x: 0, y: 0 });

  const handleTouchStart = (e) => {
    if (!e.touches || e.touches.length === 0) return;
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleTouchEnd = (e) => {
    if (!e.changedTouches || e.changedTouches.length === 0 || !onSwipe) return;
    const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x;
    const deltaY = e.changedTouches[0].clientY - touchStartRef.current.y;
    const minSwipe = 24;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (Math.abs(deltaX) >= minSwipe) {
        onSwipe(deltaX > 0 ? [1, 0] : [-1, 0]);
      }
    } else {
      if (Math.abs(deltaY) >= minSwipe) {
        onSwipe(deltaY > 0 ? [0, 1] : [0, -1]);
      }
    }
  };

  const head = worm[0] || { x: 0, y: 0 };
  const allApples = [...apples, ...goldenApples];
  const isNearApple = allApples.some(
    (a) => Math.abs(a.x - head.x) + Math.abs(a.y - head.y) === 1
  );
  const isPortalOpen = apples.length === 0;

  return (
    <div
      className={`worm-board-container world-theme-${world.id} ${world.bgClass}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 3D Beveled Floating Island Frame */}
      <div
        className={`board-grid-wrapper world-chassis-${world.id} ${
          status === "won" ? "board-won-glow" : ""
        }`}
      >
        {/* Floating Ambient World Fireflies / Dust */}
        <div className="ambient-fireflies" aria-hidden="true">
          <span className="firefly f1" />
          <span className="firefly f2" />
          <span className="firefly f3" />
          <span className="firefly f4" />
        </div>

        {/* 10x10 Grid Tiles */}
        <div className="board-grid" role="grid" aria-label="Game Board">
          {Array.from({ length: SIZE * SIZE }, (_, idx) => {
            const x = idx % SIZE;
            const y = Math.floor(idx / SIZE);
            const cell = { x, y };
            const isDarkTile = (x + y) % 2 === 1;

            // Check what is on this cell
            const wormIndex = worm.findIndex((part) => sameCell(part, cell));
            const isHead = wormIndex === 0;
            const isBody = wormIndex > 0;
            const hasApple = apples.some((a) => sameCell(a, cell));
            const hasGoldenApple = goldenApples.some((ga) => sameCell(ga, cell));
            const hasWall = (level.walls || []).some((w) => sameCell(w, cell));
            const hasSpike = (level.spikes || []).some((s) => sameCell(s, cell));
            const keyItem = (level.keys || []).find(
              (k) => sameCell(k, cell) && !collectedKeys.includes(k.id)
            );
            const gateItem = (level.gates || []).find((g) => sameCell(g, cell));
            const isGateUnlocked = gateItem && collectedKeys.includes(gateItem.id);
            const teleportItem = (level.teleports || []).find((t) => sameCell(t, cell));
            const isPortal = sameCell(level.portal, cell);

            const isEmpty =
              !hasWall &&
              !hasSpike &&
              !keyItem &&
              !gateItem &&
              !hasApple &&
              !hasGoldenApple &&
              !isPortal &&
              !teleportItem &&
              wormIndex === -1;

            // Deterministic decorative flora on select empty tiles
            const hasFlower = isEmpty && (x * 7 + y * 13) % 17 === 0;
            const hasClover = isEmpty && !hasFlower && (x * 5 + y * 11) % 19 === 0;
            const hasSprout = isEmpty && !hasFlower && !hasClover && (x * 3 + y * 7) % 23 === 0;

            return (
              <div
                key={`${x}-${y}`}
                className={`board-cell ${isDarkTile ? "tile-dark" : "tile-light"} ${
                  wormIndex !== -1 ? "cell-has-worm" : ""
                }`}
                role="gridcell"
                aria-label={`Cell ${x},${y}`}
              >
                {/* 3D Tile Highlight */}
                <span className="tile-3d-highlight" aria-hidden="true" />

                {/* Vector World Flora & Runes */}
                {hasFlower && <BoardDeco type="flower" worldId={world.id} />}
                {hasClover && <BoardDeco type="clover" worldId={world.id} />}
                {hasSprout && <BoardDeco type="sprout" worldId={world.id} />}

                {/* Game Entities */}
                {hasWall && <WallPiece />}
                {hasSpike && <SpikePiece />}
                {teleportItem && <TeleportPiece color={teleportItem.color} />}
                {gateItem && <GatePiece isUnlocked={isGateUnlocked} />}
                {keyItem && <KeyPiece />}
                {hasApple && <ApplePiece isGolden={false} />}
                {hasGoldenApple && <ApplePiece isGolden={true} />}
                {isPortal && <PortalPiece isOpen={isPortalOpen} />}

                {/* Worm Segments */}
                {isHead && (
                  <WormHead
                    skin={skin}
                    facing={facing}
                    isNearApple={isNearApple}
                    isDead={status === "failed"}
                  />
                )}
                {isBody && (
                  <WormBody
                    skin={skin}
                    index={wormIndex}
                    totalLength={worm.length}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Floating Effects / Particle Layer */}
        <div className="floating-effects-layer" pointerEvents="none" aria-hidden="true">
          {floatingTexts.map((ft) => (
            <div
              key={ft.id}
              className={`floating-text-bubble ${ft.type || "score"}`}
              style={{
                left: `${(ft.x + 0.5) * 10}%`,
                top: `${(ft.y + 0.2) * 10}%`,
              }}
            >
              {ft.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
