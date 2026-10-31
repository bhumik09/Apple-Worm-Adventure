import { useCallback, useEffect, useState } from "react";
import "./App.css";
import "./veloop-modals.css";

import { LEVELS, getLevel, getWorldForLevel } from "./data/levels";
import { getSkin } from "./data/skins";
import { audio } from "./utils/audioEngine";
import { GAME_NAME } from "./config/gameConfig";

import WormBoard from "./components/WormBoard";
import {
  TopBar,
  ArcadeHUD,
  ActionDock,
  TouchDPad,
  MobileGameHeader,
  MobileControlCockpit,
} from "./components/GameHUD";
import LevelPickerModal from "./components/LevelPickerModal";
import SkinsModal from "./components/SkinsModal";
import { StartScreen, WinModal, FailModal, PauseModal } from "./components/GameModals";

// VELoop Economy Modals & Services
import RewardedAdPlayerModal from "./components/RewardedAdPlayerModal";
import RewardCenterModal from "./components/RewardCenterModal";
import WalletLedgerModal from "./components/WalletLedgerModal";
import LeaderboardModal from "./components/LeaderboardModal";
import AchievementsModal from "./components/AchievementsModal";
import AdminEconomyModal from "./components/AdminEconomyModal";
import AuthModal from "./components/AuthModal";
import { rewardService } from "./services/rewardService";
import { economyService } from "./services/economyService";
import { api } from "./services/api";

const SIZE = 10;

const DIFFICULTIES = {
  Casual: { time: 120, icon: "🌱", bonus: "Relaxed Time" },
  Normal: { time: 90, icon: "⚡", bonus: "Standard" },
  Master: { time: 55, icon: "🔥", bonus: "Speed Bonus" },
};

const THEME_MODES = [
  { id: "dynamic", name: "World Colors", icon: "🌍" },
  { id: "emerald", name: "Lush Forest", icon: "🌿" },
  { id: "sunset", name: "Sunset Fire", icon: "🌅" },
  { id: "night", name: "Cosmic Night", icon: "🌌" },
];

function sameCell(a, b) {
  return a && b && a.x === b.x && a.y === b.y;
}

export default function App() {
  // Persistent Progress States
  const [currentLevel, setCurrentLevel] = useState(() => {
    const saved = Number(localStorage.getItem("appleWorm_currentLevel")) || 1;
    return Math.min(Math.max(saved, 1), LEVELS.length);
  });

  const [unlockedLevel, setUnlockedLevel] = useState(() => {
    const saved = Number(localStorage.getItem("appleWorm_unlockedLevel")) || 1;
    return Math.min(Math.max(saved, 1), LEVELS.length);
  });

  const [levelStars, setLevelStars] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("appleWorm_stars")) || {};
    } catch {
      return {};
    }
  });

  const [levelScores, setLevelScores] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("appleWorm_scores")) || {};
    } catch {
      return {};
    }
  });

  const [skinId, setSkinId] = useState(() => {
    return localStorage.getItem("appleWorm_skin") || "emerald";
  });

  // Economy & Wallet States
  const [coins, setCoins] = useState(() => {
    return Number(localStorage.getItem("appleWorm_coins")) || 150;
  });

  const [dailyAdsWatched, setDailyAdsWatched] = useState(() => {
    return Number(localStorage.getItem("appleWorm_dailyAds")) || 2;
  });

  const [walletHistory, setWalletHistory] = useState(() => {
    try {
      return (
        JSON.parse(localStorage.getItem("appleWorm_walletHistory")) || [
          {
            id: "tx-init",
            type: "CREDIT",
            amount: 150,
            source: "WELCOME_BONUS",
            createdAt: new Date().toISOString(),
          },
        ]
      );
    } catch {
      return [];
    }
  });

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("appleWorm_user")) || null;
    } catch {
      return null;
    }
  });

  const [sfxEnabled, setSfxEnabled] = useState(audio.sfxEnabled);
  const [musicEnabled, setMusicEnabled] = useState(audio.musicEnabled);
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem("appleWorm_themeMode") || "dynamic";
  });
  const [difficulty, setDifficulty] = useState("Normal");
  const [hasStarted, setHasStarted] = useState(false);

  // Modals
  const [showLevelPicker, setShowLevelPicker] = useState(false);
  const [showSkins, setShowSkins] = useState(false);
  const [showPauseModal, setShowPauseModal] = useState(false);
  const [showRewardCenter, setShowRewardCenter] = useState(false);
  const [showWalletLedger, setShowWalletLedger] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showAdminEconomy, setShowAdminEconomy] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Active Rewarded Ad state
  const [activeAd, setActiveAd] = useState(null); // { placement, onComplete }
  const [hasDoubledReward, setHasDoubledReward] = useState(false);
  const [revivesUsedThisLevel, setRevivesUsedThisLevel] = useState(0);
  const [lastCheckpoint, setLastCheckpoint] = useState(null);

  // Active Level Data
  const level = getLevel(currentLevel);
  const world = getWorldForLevel(currentLevel);
  const activeSkin = getSkin(skinId);

  // In-Game Play States
  const [worm, setWorm] = useState(() =>
    level.wormStart ? level.wormStart.map((p) => ({ ...p })) : [{ x: 1, y: 8 }, { x: 0, y: 8 }]
  );
  const [facing, setFacing] = useState("right");
  const [apples, setApples] = useState(() => level.apples.map((a) => ({ ...a })));
  const [goldenApples, setGoldenApples] = useState(() =>
    (level.goldenApples || []).map((ga) => ({ ...ga }))
  );
  const [collectedKeys, setCollectedKeys] = useState([]);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState("playing"); // "playing" | "won" | "failed"
  const [failReason, setFailReason] = useState("");
  const [timeLeft, setTimeLeft] = useState(DIFFICULTIES[difficulty].time);
  const [undoStack, setUndoStack] = useState([]);
  const [floatingTexts, setFloatingTexts] = useState([]);

  // Remote data state
  const [leaderboardList, setLeaderboardList] = useState([]);
  const [personalRank, setPersonalRank] = useState(null);
  const [achievementsList, setAchievementsList] = useState([]);
  const [adminStats, setAdminStats] = useState(null);

  // Calculate total stars
  const totalStars = Object.values(levelStars).reduce((sum, s) => sum + s, 0);

  // Update browser document title with GAME_NAME from .env
  useEffect(() => {
    document.title = `${GAME_NAME} - Arcade Puzzle Game`;
  }, []);

  // Add floating feedback text
  const addFloatingText = useCallback((x, y, text, type = "score") => {
    const id = Date.now() + Math.random();
    setFloatingTexts((prev) => [...prev, { id, x, y, text, type }]);
    setTimeout(() => {
      setFloatingTexts((prev) => prev.filter((item) => item.id !== id));
    }, 1200);
  }, []);

  // Record a wallet ledger transaction helper
  const recordWalletTx = useCallback(
    (type, amount, source) => {
      const newTx = {
        id: "tx-" + Date.now(),
        type,
        amount,
        source,
        createdAt: new Date().toISOString(),
      };
      setWalletHistory((prev) => {
        const updated = [newTx, ...prev].slice(0, 50);
        localStorage.setItem("appleWorm_walletHistory", JSON.stringify(updated));
        return updated;
      });
    },
    []
  );

  // Award Coins Helper
  const awardCoins = useCallback(
    (amount, source = "GAME_REWARD") => {
      setCoins((prev) => {
        const next = prev + amount;
        localStorage.setItem("appleWorm_coins", String(next));
        return next;
      });
      recordWalletTx("CREDIT", amount, source);
      audio.playCoinReward();
    },
    [recordWalletTx]
  );

  // Initialize or Reset a Level
  const initLevel = useCallback(
    (lvlNum) => {
      const lvl = getLevel(lvlNum);
      const startWorm = lvl.wormStart ? lvl.wormStart.map((p) => ({ ...p })) : [{ x: 1, y: 8 }, { x: 0, y: 8 }];
      setWorm(startWorm);
      setFacing("right");
      setApples(lvl.apples.map((a) => ({ ...a })));
      setGoldenApples((lvl.goldenApples || []).map((ga) => ({ ...ga })));
      setCollectedKeys([]);
      setMoves(0);
      setScore(0);
      setStatus("playing");
      setFailReason("");
      setTimeLeft(DIFFICULTIES[difficulty].time);
      setUndoStack([]);
      setFloatingTexts([]);
      setHasDoubledReward(false);
      setRevivesUsedThisLevel(0);
      setLastCheckpoint({
        worm: startWorm.map((p) => ({ ...p })),
        apples: lvl.apples.map((a) => ({ ...a })),
        goldenApples: (lvl.goldenApples || []).map((ga) => ({ ...ga })),
        collectedKeys: [],
        moves: 0,
        score: 0,
        facing: "right",
      });
    },
    [difficulty]
  );

  // Switch to specific level
  const handleSelectLevel = (lvlNum) => {
    if (lvlNum < 1 || lvlNum > unlockedLevel) return;
    setCurrentLevel(lvlNum);
    localStorage.setItem("appleWorm_currentLevel", String(lvlNum));
    initLevel(lvlNum);
    audio.playClick();
  };

  // Timer Countdown Effect
  useEffect(() => {
    if (!hasStarted || status !== "playing" || showPauseModal || activeAd) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setStatus("failed");
          setFailReason("Time is up! Be quicker on your next attempt.");
          audio.playFail("time");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [hasStarted, status, currentLevel, showPauseModal, activeAd]);

  // Handle Level Victory & Save Stars
  const handleLevelWon = useCallback(
    (finalMoves, currentScore) => {
      setStatus("won");

      const par3 = level.parMoves?.star3 || 25;
      const par2 = level.parMoves?.star2 || 35;

      let earned = 1;
      if (finalMoves <= par3) earned = 3;
      else if (finalMoves <= par2) earned = 2;

      // Time & Difficulty Bonus
      const timeBonus = Math.floor(timeLeft * 2);
      const finalScore = currentScore + 500 + earned * 150 + timeBonus;
      const baseCoins = 25;

      // Award base coins
      awardCoins(baseCoins, "LEVEL_COMPLETION");

      // Update stars in localStorage
      setLevelStars((prev) => {
        const oldStars = prev[currentLevel] || 0;
        const best = Math.max(oldStars, earned);
        const updated = { ...prev, [currentLevel]: best };
        localStorage.setItem("appleWorm_stars", JSON.stringify(updated));
        return updated;
      });

      // Update high scores
      setLevelScores((prev) => {
        const oldScore = prev[currentLevel] || 0;
        const best = Math.max(oldScore, finalScore);
        const updated = { ...prev, [currentLevel]: best };
        localStorage.setItem("appleWorm_scores", JSON.stringify(updated));
        return updated;
      });

      // Unlock next level
      if (currentLevel < LEVELS.length) {
        const nextLvl = currentLevel + 1;
        setUnlockedLevel((prev) => {
          const highest = Math.max(prev, nextLvl);
          localStorage.setItem("appleWorm_unlockedLevel", String(highest));
          return highest;
        });
      }

      audio.playWin();
    },
    [currentLevel, level, timeLeft, awardCoins]
  );

  // Rewarded Ad Flow Execution (VELoop Core Economy)
  const triggerRewardedAd = useCallback(
    async (placement, onRewardedSuccess) => {
      audio.playClick();
      try {
        const opp = await rewardService.createOpportunity("session_active", currentLevel, placement);
        setActiveAd({
          placement,
          opportunityId: opp.opportunityId || "opp_active",
          onComplete: async ({ adEventId, adProvider }) => {
            try {
              const res = await rewardService.verifyReward(
                opp.opportunityId || "opp_active",
                adEventId,
                adProvider
              );
              setDailyAdsWatched((prev) => {
                const next = prev + 1;
                localStorage.setItem("appleWorm_dailyAds", String(next));
                return next;
              });
              if (onRewardedSuccess) onRewardedSuccess(res);
            } catch (err) {
              console.error("Ad verify error:", err);
            } finally {
              setActiveAd(null);
            }
          },
        });
      } catch (err) {
        console.warn("Could not initiate ad:", err.message);
      }
    },
    [currentLevel]
  );

  // Rewarded Ad Revive Handler
  const handleWatchAdRevive = useCallback(() => {
    triggerRewardedAd("REVIVE", () => {
      if (lastCheckpoint) {
        setWorm(lastCheckpoint.worm);
        setApples(lastCheckpoint.apples);
        setGoldenApples(lastCheckpoint.goldenApples);
        setCollectedKeys(lastCheckpoint.collectedKeys);
        setFacing(lastCheckpoint.facing);
        setMoves(lastCheckpoint.moves);
        setScore(lastCheckpoint.score);
        setStatus("playing");
        setFailReason("");
        setRevivesUsedThisLevel((prev) => prev + 1);
        addFloatingText(lastCheckpoint.worm[0].x, lastCheckpoint.worm[0].y, "❤️ REVIVED!", "magic");
      }
    });
  }, [triggerRewardedAd, lastCheckpoint, addFloatingText]);

  // Rewarded Ad Double Reward Handler (Win screen)
  const handleWatchAdDoubleReward = useCallback(() => {
    triggerRewardedAd("DOUBLE_COINS", () => {
      setHasDoubledReward(true);
      awardCoins(25, "AD_DOUBLE_COINS");
      setScore((prev) => prev * 2);
      addFloatingText(5, 5, "⭐ REWARD DOUBLED!", "gold");
    });
  }, [triggerRewardedAd, awardCoins, addFloatingText]);

  // Rewarded Ad Extra Moves Handler
  const handleWatchAdExtraMoves = useCallback(() => {
    triggerRewardedAd("EXTRA_MOVES", () => {
      setTimeLeft((prev) => prev + 30);
      setStatus("playing");
      setFailReason("");
      addFloatingText(worm[0].x, worm[0].y, "+5 MOVES & TIME!", "score");
    });
  }, [triggerRewardedAd, worm, addFloatingText]);

  // Movement Logic
  const moveWorm = useCallback(
    (dx, dy) => {
      if (!hasStarted || status !== "playing") return;

      // Prevent 180-degree neck self-reversal
      const currentHead = worm[0];
      const neck = worm[1];
      const potentialNext = { x: currentHead.x + dx, y: currentHead.y + dy };
      if (neck && sameCell(potentialNext, neck)) {
        return; // Ignore reverse direction command
      }

      // Determine facing direction
      let newFacing = facing;
      if (dx === 1) newFacing = "right";
      else if (dx === -1) newFacing = "left";
      else if (dy === 1) newFacing = "down";
      else if (dy === -1) newFacing = "up";

      // 1. Boundary Check
      if (
        potentialNext.x < 0 ||
        potentialNext.x >= SIZE ||
        potentialNext.y < 0 ||
        potentialNext.y >= SIZE
      ) {
        setStatus("failed");
        setFailReason("Worm crawled out of the garden boundary!");
        audio.playFail("boundary");
        return;
      }

      // 2. Wall Collision Check
      if ((level.walls || []).some((w) => sameCell(w, potentialNext))) {
        setStatus("failed");
        setFailReason("Bonked into a solid stone obstacle!");
        audio.playFail("wall");
        return;
      }

      // 3. Spike Trap Check
      if ((level.spikes || []).some((s) => sameCell(s, potentialNext))) {
        setStatus("failed");
        setFailReason("Ouch! You stepped right onto dangerous sharp spikes!");
        audio.playFail("spike");
        return;
      }

      // 4. Locked Gate Check
      const hitGate = (level.gates || []).find((g) => sameCell(g, potentialNext));
      if (hitGate && !collectedKeys.includes(hitGate.id)) {
        addFloatingText(hitGate.x, hitGate.y, "🔒 GATE LOCKED!", "warning");
        audio.playClick();
        return;
      }

      // 5. Eating Check
      const eatenApple = apples.find((a) => sameCell(a, potentialNext));
      const eatenGolden = goldenApples.find((ga) => sameCell(ga, potentialNext));
      const isEating = Boolean(eatenApple || eatenGolden);

      // 6. Tail & Self Collision Check
      const bodyToCheck = isEating ? worm : worm.slice(0, -1);
      if (bodyToCheck.some((part) => sameCell(part, potentialNext))) {
        setStatus("failed");
        setFailReason("Worm got tangled in its own body!");
        audio.playFail("self");
        return;
      }

      // Save valid checkpoint for Revive system before moving
      setLastCheckpoint({
        worm: worm.map((p) => ({ ...p })),
        apples: apples.map((a) => ({ ...a })),
        goldenApples: goldenApples.map((ga) => ({ ...ga })),
        collectedKeys: [...collectedKeys],
        moves,
        score,
        facing,
      });

      // Push state to Undo Stack before mutating
      setUndoStack((prev) => [
        ...prev,
        {
          worm: worm.map((p) => ({ ...p })),
          apples: apples.map((a) => ({ ...a })),
          goldenApples: goldenApples.map((ga) => ({ ...ga })),
          collectedKeys: [...collectedKeys],
          moves,
          score,
          facing,
        },
      ]);

      // Teleporter Check
      let finalHead = potentialNext;
      const teleporter = (level.teleports || []).find((t) => sameCell(t, potentialNext));
      if (teleporter) {
        finalHead = { x: teleporter.targetX, y: teleporter.targetY };
        audio.playTeleport();
        addFloatingText(finalHead.x, finalHead.y, "✨ WARP!", "magic");
      }

      // Construct Next Worm Body
      const nextWorm = [finalHead, ...worm];
      if (!isEating) {
        nextWorm.pop();
      }

      // Handle Apple Consumption
      let nextApples = apples;
      let nextGolden = goldenApples;
      let scoreGain = 0;

      if (eatenApple) {
        nextApples = apples.filter((a) => !sameCell(a, potentialNext));
        scoreGain += 100;
        audio.playEat(false);
        addFloatingText(finalHead.x, finalHead.y, "+100", "score");

        if (nextApples.length === 0) {
          audio.playPortalUnlock();
          addFloatingText(level.portal.x, level.portal.y, "PORTAL OPEN! ✨", "portal");
        }
      }

      if (eatenGolden) {
        nextGolden = goldenApples.filter((ga) => !sameCell(ga, potentialNext));
        scoreGain += 300;
        audio.playEat(true);
        awardCoins(5, "GOLDEN_APPLE");
        addFloatingText(finalHead.x, finalHead.y, "+300 & +5 💰", "gold");
      }

      // Handle Key Pickup
      let nextKeys = collectedKeys;
      const keyFound = (level.keys || []).find(
        (k) => sameCell(k, potentialNext) && !collectedKeys.includes(k.id)
      );
      if (keyFound) {
        nextKeys = [...collectedKeys, keyFound.id];
        audio.playKey();
        addFloatingText(finalHead.x, finalHead.y, "🗝️ KEY FOUND!", "key");
      }

      if (!isEating && !teleporter && !keyFound) {
        audio.playMove();
      }

      // Update Move & Score
      const nextMoves = moves + 1;
      const nextScore = score + scoreGain;

      setWorm(nextWorm);
      setFacing(newFacing);
      setApples(nextApples);
      setGoldenApples(nextGolden);
      setCollectedKeys(nextKeys);
      setMoves(nextMoves);
      setScore(nextScore);

      // Check Portal Victory
      if (sameCell(finalHead, level.portal)) {
        if (nextApples.length === 0) {
          handleLevelWon(nextMoves, nextScore);
        } else {
          addFloatingText(
            level.portal.x,
            level.portal.y,
            `🔒 ${nextApples.length} apple(s) left!`,
            "warning"
          );
        }
      }
    },
    [
      hasStarted,
      status,
      worm,
      facing,
      apples,
      goldenApples,
      collectedKeys,
      level,
      moves,
      score,
      addFloatingText,
      awardCoins,
      handleLevelWon,
    ]
  );

  // Undo Last Move
  const handleUndo = useCallback(() => {
    if (undoStack.length === 0) return;
    const lastState = undoStack[undoStack.length - 1];
    setUndoStack((prev) => prev.slice(0, -1));

    setWorm(lastState.worm);
    setApples(lastState.apples);
    setGoldenApples(lastState.goldenApples);
    setCollectedKeys(lastState.collectedKeys);
    setMoves(lastState.moves);
    setScore(lastState.score);
    setFacing(lastState.facing);
    setStatus("playing");
    setFailReason("");

    audio.playUndo();
    addFloatingText(lastState.worm[0].x, lastState.worm[0].y, "Undo ↶", "undo");
  }, [undoStack, addFloatingText]);

  // Restart Level
  const handleRestart = useCallback(() => {
    audio.playClick();
    initLevel(currentLevel);
  }, [currentLevel, initLevel]);

  // Tactical Hint
  const handleHint = useCallback(() => {
    audio.playClick();
    const head = worm[0];

    // Priority 1: Key if gates exist and key not yet picked
    const uncollectedKey = (level.keys || []).find((k) => !collectedKeys.includes(k.id));
    if (uncollectedKey) {
      addFloatingText(uncollectedKey.x, uncollectedKey.y, "🗝️ Get Key!", "key");
      return;
    }

    // Priority 2: Closest Apple
    if (apples.length > 0) {
      const closest = apples.reduce((nearest, apple) => {
        const dist = Math.abs(apple.x - head.x) + Math.abs(apple.y - head.y);
        const nearDist = Math.abs(nearest.x - head.x) + Math.abs(nearest.y - head.y);
        return dist < nearDist ? apple : nearest;
      }, apples[0]);

      addFloatingText(closest.x, closest.y, "🍎 Target Apple!", "hint");
      return;
    }

    // Priority 3: Portal
    addFloatingText(level.portal.x, level.portal.y, "🌀 Head to Portal!", "portal");
  }, [worm, level, collectedKeys, apples, addFloatingText]);

  // Keyboard Listeners
  useEffect(() => {
    function onKeyDown(e) {
      if (["INPUT", "TEXTAREA"].includes(e.target.tagName)) return;

      const key = e.key.toLowerCase();
      if (["arrowup", "w"].includes(key)) {
        e.preventDefault();
        moveWorm(0, -1);
      } else if (["arrowdown", "s"].includes(key)) {
        e.preventDefault();
        moveWorm(0, 1);
      } else if (["arrowleft", "a"].includes(key)) {
        e.preventDefault();
        moveWorm(-1, 0);
      } else if (["arrowright", "d"].includes(key)) {
        e.preventDefault();
        moveWorm(1, 0);
      } else if (key === "z" || key === "u") {
        e.preventDefault();
        handleUndo();
      } else if (key === "r") {
        e.preventDefault();
        handleRestart();
      } else if (key === "h") {
        e.preventDefault();
        handleHint();
      } else if (key === "escape" || key === "p") {
        e.preventDefault();
        setShowPauseModal((prev) => !prev);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [moveWorm, handleUndo, handleRestart, handleHint]);

  // Skin Selection
  const handleSelectSkin = (id) => {
    setSkinId(id);
    localStorage.setItem("appleWorm_skin", id);
    audio.playClick();
  };

  // Theme Selection
  const handleCycleTheme = () => {
    const currentIndex = THEME_MODES.findIndex((t) => t.id === themeMode);
    const nextIndex = (currentIndex + 1) % THEME_MODES.length;
    const nextTheme = THEME_MODES[nextIndex];
    setThemeMode(nextTheme.id);
    localStorage.setItem("appleWorm_themeMode", nextTheme.id);
    audio.playClick();
  };

  // Next Level Handler
  const handleNextLevel = () => {
    if (currentLevel < LEVELS.length) {
      const next = currentLevel + 1;
      setCurrentLevel(next);
      localStorage.setItem("appleWorm_currentLevel", String(next));
      initLevel(next);
    }
  };

  // Open Leaderboard & Fetch
  const handleOpenLeaderboard = async () => {
    setShowLeaderboard(true);
    audio.playClick();
    try {
      const data = await api.get("/leaderboard");
      setLeaderboardList(data.leaderboard || []);
      setPersonalRank(data.personalRank || null);
    } catch {
      // Offline fallback leaderboard
      setLeaderboardList([
        { rank: 1, username: "GrandWorm99", totalScore: 68500, totalStars: 150, completedLevels: 50 },
        { rank: 2, username: "AppleKing", totalScore: 54200, totalStars: 110, completedLevels: 38 },
        { rank: 3, username: "SpeedyCaterpillar", totalScore: 39800, totalStars: 85, completedLevels: 29 },
      ]);
      setPersonalRank({ rank: 4, username: currentUser?.username || "You", totalScore: score, totalStars, completedLevels: unlockedLevel - 1 });
    }
  };

  // Open Achievements & Fetch
  const handleOpenAchievements = async () => {
    setShowAchievements(true);
    audio.playClick();
    try {
      const data = await api.get("/achievements");
      setAchievementsList(data.achievements || []);
    } catch {
      setAchievementsList([
        { id: "first_apple", name: "First Apple", desc: "Munch your very first juicy red apple.", icon: "🍎", rewardCoins: 25, unlocked: true },
        { id: "worm_beginner", name: "Worm Beginner", desc: "Complete 5 adventure levels.", icon: "🌱", rewardCoins: 50, unlocked: unlockedLevel >= 5 },
        { id: "portal_finder", name: "Portal Finder", desc: "Successfully unlock and slither into 10 portals.", icon: "🌀", rewardCoins: 100, unlocked: unlockedLevel >= 10 },
        { id: "star_collector", name: "Star Collector", desc: "Earn 50 golden stars in your puzzle journey.", icon: "⭐", rewardCoins: 200, unlocked: totalStars >= 50 },
      ]);
    }
  };

  // Claim Achievement
  const handleClaimAchievement = async (achId) => {
    try {
      const data = await api.post("/achievements/claim", { achievementId: achId });
      awardCoins(50, "ACHIEVEMENT_REWARD");
      setAchievementsList((prev) =>
        prev.map((a) => (a.id === achId ? { ...a, unlocked: true } : a))
      );
      addFloatingText(5, 5, data.message || "+50 Coins!", "gold");
    } catch {
      awardCoins(50, "ACHIEVEMENT_REWARD");
      setAchievementsList((prev) =>
        prev.map((a) => (a.id === achId ? { ...a, unlocked: true } : a))
      );
    }
  };

  // Open Admin Economy & Fetch
  const handleOpenAdmin = async () => {
    setShowAdminEconomy(true);
    audio.playClick();
    try {
      const data = await api.get("/admin/economy/stats");
      setAdminStats(data.stats);
    } catch {
      setAdminStats({
        todayAdOpportunities: 12,
        todayCompletedRewardedAds: dailyAdsWatched,
        rewardedAdCompletionRate: "92.5%",
        todayCoinsGranted: coins,
        todayCoinsSpent: 80,
        averageAdsPerUser: "2.4",
        currentEconomyConfig: {
          levelCompletionCoins: 25,
          rewardedAd: {
            doubleCoinsMultiplier: 2,
            doubleScoreMultiplier: 2,
            extraMoves: 5,
            maxRewardedAdsPerDay: 15,
          },
        },
      });
    }
  };

  // Save Economy Config (Admin)
  const handleSaveEconomyConfig = async (newConfig) => {
    try {
      await economyService.updateConfig(newConfig);
      setAdminStats((prev) => ({ ...prev, currentEconomyConfig: newConfig }));
    } catch {
      console.log("Locally saved economy config");
    }
  };

  // Spend Coins in Shop
  const handleSpendCoins = async (amount, itemName) => {
    try {
      await rewardService.spendCoins(amount, itemName);
      setCoins((prev) => prev - amount);
      recordWalletTx("DEBIT", amount, itemName);
      audio.playClick();
      addFloatingText(5, 5, `Purchased ${itemName}!`, "magic");
    } catch (err) {
      alert(err.message || "Insufficient coins");
    }
  };

  return (
    <div className={`apple-worm-app theme-${world.bgClass} mode-${themeMode}`}>
      {/* Ambient Animated Atmospheric Background */}
      <div className="ambient-background-canvas" aria-hidden="true">
        <div className="cartoon-cloud cloud-1" />
        <div className="cartoon-cloud cloud-2" />
        <div className="cartoon-cloud cloud-3" />
        <div className="cartoon-hills-backdrop" />
        <div className="bg-glow-orb orb-1" />
        <div className="bg-glow-orb orb-2" />
        <span className="bg-floating-element el-1">🍃</span>
        <span className="bg-floating-element el-2">✨</span>
        <span className="bg-floating-element el-3">🌸</span>
        <span className="bg-floating-element el-4">⭐</span>
      </div>

      {/* Top Bar Header (Desktop only) */}
      <div className="desktop-topbar-wrapper">
        <TopBar
          currentLevel={currentLevel}
          totalLevels={LEVELS.length}
          world={world}
          totalStars={totalStars}
          coins={coins}
          sfxEnabled={sfxEnabled}
          musicEnabled={musicEnabled}
          themeMode={themeMode}
          themeModes={THEME_MODES}
          onToggleSfx={() => {
            const next = !sfxEnabled;
            setSfxEnabled(next);
            audio.setSfxEnabled(next);
          }}
          onToggleMusic={() => {
            const next = !musicEnabled;
            setMusicEnabled(next);
            audio.setMusicEnabled(next);
          }}
          onCycleTheme={handleCycleTheme}
          onOpenLevelPicker={() => {
            audio.playClick();
            setShowLevelPicker(true);
          }}
          onOpenSkins={() => {
            audio.playClick();
            setShowSkins(true);
          }}
          onOpenWallet={() => {
            audio.playClick();
            setShowWalletLedger(true);
          }}
          onOpenRewardCenter={() => {
            audio.playClick();
            setShowRewardCenter(true);
          }}
          onOpenLeaderboard={handleOpenLeaderboard}
          onOpenAuth={() => setShowAuthModal(true)}
        />
      </div>

      {/* Main Game Stage */}
      <main className="game-main-stage">
        {!hasStarted ? (
          <StartScreen
            currentLevel={currentLevel}
            unlockedLevel={unlockedLevel}
            totalLevels={LEVELS.length}
            levelName={level.name}
            difficulty={difficulty}
            difficulties={DIFFICULTIES}
            onSelectDifficulty={(d) => {
              setDifficulty(d);
              setTimeLeft(DIFFICULTIES[d].time);
            }}
            onStartGame={() => {
              audio.init();
              audio.playClick();
              initLevel(currentLevel);
              setHasStarted(true);
            }}
            onOpenLevelPicker={() => setShowLevelPicker(true)}
            onOpenSkins={() => setShowSkins(true)}
            onOpenRewardCenter={() => setShowRewardCenter(true)}
            onOpenLeaderboard={handleOpenLeaderboard}
            onOpenAchievements={handleOpenAchievements}
            onOpenAdmin={handleOpenAdmin}
          />
        ) : (
          <div className="gameplay-wrapper">
            {/* Mobile Native Game Header (Displayed on mobile/tablet) */}
            <div className="mobile-header-wrapper">
              <MobileGameHeader
                level={level}
                world={world}
                applesLeft={apples.length}
                totalApples={level.apples.length}
                goldenApplesLeft={goldenApples.length}
                moves={moves}
                timeLeft={timeLeft}
                onOpenPause={() => {
                  audio.playClick();
                  setShowPauseModal(true);
                }}
                onCycleTheme={handleCycleTheme}
                currentTheme={THEME_MODES.find((t) => t.id === themeMode)}
                sfxEnabled={sfxEnabled}
                onToggleSfx={() => {
                  const next = !sfxEnabled;
                  setSfxEnabled(next);
                  audio.setSfxEnabled(next);
                }}
              />
            </div>

            {/* Left / Center Board Area */}
            <div className="board-column">
              <div className="board-top-info desktop-only">
                <div className="mission-title">
                  <span className="world-tag">{world.icon} {world.name}</span>
                  <h2>{level.name}</h2>
                </div>
                <div className="level-par-tag">
                  <span>Par 3★: ≤{level.parMoves?.star3 || 25} moves</span>
                </div>
              </div>

              {/* The Game Board */}
              <WormBoard
                level={level}
                world={world}
                worm={worm}
                apples={apples}
                goldenApples={goldenApples}
                collectedKeys={collectedKeys}
                facing={facing}
                status={status}
                skin={activeSkin}
                onSwipe={([dx, dy]) => moveWorm(dx, dy)}
                floatingTexts={floatingTexts}
              />

              {/* Desktop Controls (Action Dock + D-Pad) */}
              <div className="desktop-controls-wrapper">
                <ActionDock
                  canUndo={undoStack.length > 0 && status === "playing"}
                  onUndo={handleUndo}
                  onRestart={handleRestart}
                  onHint={handleHint}
                  onOpenSkins={() => setShowSkins(true)}
                />
                <TouchDPad onMove={(dx, dy) => moveWorm(dx, dy)} />
              </div>

              {/* Mobile Real-Game Integrated Bottom Cockpit */}
              <div className="mobile-cockpit-wrapper">
                <MobileControlCockpit
                  canUndo={undoStack.length > 0 && status === "playing"}
                  onUndo={handleUndo}
                  onRestart={handleRestart}
                  onHint={handleHint}
                  onOpenSkins={() => setShowSkins(true)}
                  onMove={(dx, dy) => moveWorm(dx, dy)}
                />
              </div>
            </div>

            {/* Right Side Status & Mission Panel (Desktop only) */}
            <aside className="gameplay-sidebar desktop-only">
              <div className="desktop-hud-container">
                <ArcadeHUD
                  level={level}
                  applesLeft={apples.length}
                  totalApples={level.apples.length}
                  goldenApplesLeft={goldenApples.length}
                  moves={moves}
                  score={score}
                  timeLeft={timeLeft}
                  status={status}
                  collectedKeys={collectedKeys}
                />
              </div>

              {/* Mission Objectives Card */}
              <div className="sidebar-card mission-card">
                <div className="card-header-row">
                  <span className="card-header-icon">🎯</span>
                  <strong>LEVEL OBJECTIVES</strong>
                </div>
                <ul className="objective-checklist">
                  <li className={apples.length === 0 ? "done" : ""}>
                    <span className="check-box">{apples.length === 0 ? "✓" : "1"}</span>
                    <div>
                      <strong>Eat all apples</strong>
                      <small>
                        {apples.length === 0
                          ? "All apples eaten!"
                          : `${apples.length} apple(s) left`}
                      </small>
                    </div>
                  </li>

                  {(level.keys || []).length > 0 && (
                    <li className={collectedKeys.length === level.keys.length ? "done" : ""}>
                      <span className="check-box">
                        {collectedKeys.length === level.keys.length ? "✓" : "2"}
                      </span>
                      <div>
                        <strong>Collect Golden Key</strong>
                        <small>
                          {collectedKeys.length === level.keys.length
                            ? "Gate unlocked!"
                            : "Find key to lower energy barrier"}
                        </small>
                      </div>
                    </li>
                  )}

                  <li className={status === "won" ? "done" : ""}>
                    <span className="check-box">{status === "won" ? "✓" : "3"}</span>
                    <div>
                      <strong>Enter the Stargate Portal</strong>
                      <small>
                        {apples.length === 0
                          ? "Portal is open! Slither inside."
                          : "Locked until all apples are eaten"}
                      </small>
                    </div>
                  </li>
                </ul>
              </div>

              {/* World Journey Progress Card */}
              <div className="sidebar-card world-progress-card">
                <div className="card-header-row">
                  <span className="card-header-icon">🏆</span>
                  <strong>ADVENTURE PROGRESS</strong>
                </div>
                <div className="world-progress-bar">
                  <span
                    className="world-progress-fill"
                    style={{ width: `${(unlockedLevel / LEVELS.length) * 100}%` }}
                  />
                </div>
                <div className="progress-card-stats">
                  <div>
                    <small>UNLOCKED</small>
                    <strong>{unlockedLevel} / {LEVELS.length}</strong>
                  </div>
                  <div>
                    <small>TOTAL STARS</small>
                    <strong>⭐ {totalStars}</strong>
                  </div>
                  <div>
                    <small>WALLET</small>
                    <strong>💰 {coins}</strong>
                  </div>
                </div>
              </div>

              {/* Tactical Tip */}
              <div className="sidebar-card tip-card">
                <span className="tip-eyebrow">💡 TACTICAL TIP</span>
                <p>
                  {status === "failed"
                    ? "Made a mistake? Hit Undo (Z) or Watch Ad to Revive from your safe state!"
                    : apples.length === 0
                    ? "The cosmic portal is open! Plan your path and crawl inside to win!"
                    : (level.spikes || []).length > 0
                    ? "Watch out for red thorns! They are lethal to the worm's head."
                    : "Plan a few moves ahead. The worm grows each time you eat an apple!"}
                </p>
              </div>
            </aside>
          </div>
        )}
      </main>

      {/* Modals & Overlays */}
      {showPauseModal && (
        <PauseModal
          level={level}
          levelNumber={currentLevel}
          world={world}
          applesLeft={apples.length}
          sfxEnabled={sfxEnabled}
          musicEnabled={musicEnabled}
          onToggleSfx={() => {
            const next = !sfxEnabled;
            setSfxEnabled(next);
            audio.setSfxEnabled(next);
          }}
          onToggleMusic={() => {
            const next = !musicEnabled;
            setMusicEnabled(next);
            audio.setMusicEnabled(next);
          }}
          onResume={() => {
            audio.playClick();
            setShowPauseModal(false);
          }}
          onRestart={() => {
            setShowPauseModal(false);
            handleRestart();
          }}
          onOpenLevelPicker={() => {
            setShowPauseModal(false);
            setShowLevelPicker(true);
          }}
          onOpenSkins={() => {
            setShowPauseModal(false);
            setShowSkins(true);
          }}
          onOpenRewardCenter={() => {
            setShowPauseModal(false);
            setShowRewardCenter(true);
          }}
          onCycleTheme={handleCycleTheme}
          currentTheme={THEME_MODES.find((t) => t.id === themeMode)}
        />
      )}

      {/* Level Win Modal with VELoop Double Reward Option */}
      {status === "won" && (
        <WinModal
          level={level}
          levelNumber={currentLevel}
          moves={moves}
          score={score}
          earnedStars={levelStars[currentLevel] || 1}
          isMaxLevel={currentLevel === LEVELS.length}
          coinsEarned={25}
          hasDoubled={hasDoubledReward}
          onNextLevel={handleNextLevel}
          onReplay={handleRestart}
          onOpenLevelPicker={() => setShowLevelPicker(true)}
          onWatchAdDoubleReward={handleWatchAdDoubleReward}
        />
      )}

      {/* Level Fail Modal with VELoop Revive & Extra Moves Option */}
      {status === "failed" && (
        <FailModal
          reason={failReason}
          canUndo={undoStack.length > 0}
          canRevive={revivesUsedThisLevel < 1 && Boolean(lastCheckpoint)}
          onUndo={handleUndo}
          onRestart={handleRestart}
          onOpenLevelPicker={() => setShowLevelPicker(true)}
          onWatchAdRevive={handleWatchAdRevive}
          onWatchAdExtraMoves={handleWatchAdExtraMoves}
        />
      )}

      {/* Interactive Rewarded Ad Player Modal Simulation */}
      {activeAd && (
        <RewardedAdPlayerModal
          placement={activeAd.placement}
          onAdCompleted={activeAd.onComplete}
          onClose={() => setActiveAd(null)}
        />
      )}

      {/* Reward Center Modal */}
      {showRewardCenter && (
        <RewardCenterModal
          coins={coins}
          dailyAdsWatched={dailyAdsWatched}
          maxDailyAds={15}
          onWatchAd={(placement) => {
            setShowRewardCenter(false);
            triggerRewardedAd(placement, () => {
              if (placement === "DOUBLE_COINS") awardCoins(50, "AD_DOUBLE_COINS");
              else if (placement === "DAILY_REWARD") awardCoins(50, "DAILY_GIFT");
              else if (placement === "EXTRA_MOVES") {
                setTimeLeft((prev) => prev + 30);
                addFloatingText(5, 5, "+5 MOVES & 30s TIME!", "score");
              } else if (placement === "HINT") {
                handleHint();
              }
            });
          }}
          onClose={() => setShowRewardCenter(false)}
        />
      )}

      {/* Wallet & Audit Ledger Modal */}
      {showWalletLedger && (
        <WalletLedgerModal
          coins={coins}
          transactions={walletHistory}
          onSpendCoins={handleSpendCoins}
          onOpenRewardCenter={() => {
            setShowWalletLedger(false);
            setShowRewardCenter(true);
          }}
          onClose={() => setShowWalletLedger(false)}
        />
      )}

      {/* Leaderboard Modal */}
      {showLeaderboard && (
        <LeaderboardModal
          leaderboard={leaderboardList}
          personalRank={personalRank}
          onClose={() => setShowLeaderboard(false)}
        />
      )}

      {/* Achievements Modal */}
      {showAchievements && (
        <AchievementsModal
          achievements={achievementsList}
          onClaim={handleClaimAchievement}
          onClose={() => setShowAchievements(false)}
        />
      )}

      {/* Admin Economy Control Panel */}
      {showAdminEconomy && (
        <AdminEconomyModal
          stats={adminStats}
          onSaveConfig={handleSaveEconomyConfig}
          onClose={() => setShowAdminEconomy(false)}
        />
      )}

      {/* Authentication Modal */}
      {showAuthModal && (
        <AuthModal
          currentUser={currentUser}
          onLogin={async (email, password) => {
            const data = await api.post("/auth/login", { email, password });
            api.setToken(data.token);
            setCurrentUser(data.user);
            setCoins(data.user.coins || 150);
            localStorage.setItem("appleWorm_user", JSON.stringify(data.user));
          }}
          onRegister={async (username, email, password) => {
            const data = await api.post("/auth/register", { username, email, password });
            api.setToken(data.token);
            setCurrentUser(data.user);
            setCoins(data.user.coins || 150);
            localStorage.setItem("appleWorm_user", JSON.stringify(data.user));
          }}
          onClose={() => setShowAuthModal(false)}
        />
      )}

      {/* Level Picker Modal */}
      {showLevelPicker && (
        <LevelPickerModal
          currentLevel={currentLevel}
          unlockedLevel={unlockedLevel}
          levelStars={levelStars}
          levelScores={levelScores}
          onSelectLevel={handleSelectLevel}
          onClose={() => setShowLevelPicker(false)}
        />
      )}

      {/* Wardrobe Skins Modal */}
      {showSkins && (
        <SkinsModal
          currentSkinId={skinId}
          totalStars={totalStars}
          onSelectSkin={handleSelectSkin}
          onClose={() => setShowSkins(false)}
        />
      )}
    </div>
  );
}
