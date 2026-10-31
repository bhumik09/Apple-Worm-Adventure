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
    const minSwipe = 20;

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
      {/* 3D Beveled Board Frame */}
      <div className={`board-grid-wrapper ${status === "won" ? "board-won-glow" : ""}`}>
        {/* Corner Golden Rivets */}
        <span className="board-rivet top-left" aria-hidden="true" />
        <span className="board-rivet top-right" aria-hidden="true" />
        <span className="board-rivet bottom-left" aria-hidden="true" />
        <span className="board-rivet bottom-right" aria-hidden="true" />

        {/* Floating Ambient Sparkles / Fireflies */}
        <div className="ambient-fireflies" aria-hidden="true">
          <span className="firefly f1" />
          <span className="firefly f2" />
          <span className="firefly f3" />
          <span className="firefly f4" />
        </div>

        {/* 10x10 Grid */}
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

            return (
              <div
                key={`${x}-${y}`}
                className={`board-cell ${isDarkTile ? "tile-dark" : "tile-light"} ${
                  wormIndex !== -1 ? "cell-has-worm" : ""
                }`}
                role="gridcell"
                aria-label={`Cell ${x},${y}`}
              >
                {/* 3D Tile Inset & Texture */}
                <span className="tile-3d-highlight" aria-hidden="true" />

                {/* Cute Garden Meadow Flowers / Clovers on select empty tiles */}
                {!hasWall &&
                  !hasSpike &&
                  !keyItem &&
                  !gateItem &&
                  !hasApple &&
                  !hasGoldenApple &&
                  !isPortal &&
                  !teleportItem &&
                  wormIndex === -1 &&
                  ((x * 7 + y * 13) % 17 === 0 ? (
                    <span className="garden-deco daisy" aria-hidden="true">
                      🌼
                    </span>
                  ) : (x * 5 + y * 11) % 23 === 0 ? (
                    <span className="garden-deco clover" aria-hidden="true">
                      🍀
                    </span>
                  ) : null)}

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
        <div className="floating-effects-layer" pointer-events="none" aria-hidden="true">
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
