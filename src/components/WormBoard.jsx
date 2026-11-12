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
    const minSwipe = 18;

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
      className={`adventure-level-board world-${world.id}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 10x10 Transparent Puzzle Grid */}
      <div className="puzzle-grid-surface" role="grid" aria-label="Game Board">
        {Array.from({ length: SIZE * SIZE }, (_, idx) => {
          const x = idx % SIZE;
          const y = Math.floor(idx / SIZE);
          const cell = { x, y };

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
              className={`puzzle-cell ${hasWall ? "cell-wall" : "cell-air"} ${
                wormIndex !== -1 ? "cell-has-worm" : ""
              }`}
              role="gridcell"
              aria-label={`Cell ${x},${y}`}
            >
              {/* Game Entities on Open Adventure Landscape */}
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

      {/* Floating Score Popup Bubbles */}
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
  );
}
