import { api } from "./api";

class AdProviderAdapter {
  constructor(name = "VELoop_AdNetwork_Simulator") {
    this.name = name;
  }

  // Simulates showing a rewarded video ad
  showRewardedAd({ placement, onProgress, onComplete, onError }) {
    console.log(`[${this.name}] Starting rewarded ad for placement: ${placement}`);
    let timeLeft = 5;

    const interval = setInterval(() => {
      timeLeft -= 1;
      if (onProgress) onProgress(timeLeft);

      if (timeLeft <= 0) {
        clearInterval(interval);
        const adEventId = "ad_evt_" + Math.random().toString(36).substring(2, 12) + "_" + Date.now();
        console.log(`[${this.name}] Rewarded ad completed! Event ID: ${adEventId}`);
        if (onComplete) {
          onComplete({
            success: true,
            adEventId,
            adProvider: this.name,
            placement,
          });
        }
      }
    }, 1000);

    return {
      cancel: () => {
        clearInterval(interval);
        if (onError) onError(new Error("User closed ad prematurely. Reward forfeited."));
      },
    };
  }
}

export const adProvider = new AdProviderAdapter();

export const rewardService = {
  // Request an ad opportunity from backend
  async createOpportunity(sessionId, levelId, placement) {
    try {
      const data = await api.post("/rewards/ad/opportunity", {
        sessionId: sessionId || "session_active",
        levelId: levelId || 1,
        placement,
      });
      return data;
    } catch {
      // Local fallback opportunity for smooth offline experience
      return {
        success: true,
        opportunityId: "local_opp_" + Date.now(),
        placement,
        adProvider: "VELoop_Local_Sim",
        durationSeconds: 5,
      };
    }
  },

  // Verify ad event and claim reward with server
  async verifyReward(opportunityId, adEventId, adProviderName = "VELoop_AdNetwork") {
    try {
      const data = await api.post("/rewards/ad/verify", {
        opportunityId,
        adEventId,
        adProvider: adProviderName,
      });
      return data;
    } catch (err) {
      console.warn("Server reward verification warning:", err.message);
      // Fallback local verification
      return {
        success: true,
        reward: { type: "LOCAL_FALLBACK", amount: 25 },
        newBalance: (Number(localStorage.getItem("appleWorm_coins")) || 0) + 25,
      };
    }
  },

  // Wallet APIs
  async getWalletBalance() {
    try {
      const data = await api.get("/wallet/balance");
      return data.coins;
    } catch {
      return Number(localStorage.getItem("appleWorm_coins")) || 150;
    }
  },

  async getWalletHistory() {
    try {
      const data = await api.get("/wallet/history");
      return data.transactions || [];
    } catch {
      return JSON.parse(localStorage.getItem("appleWorm_walletHistory") || "[]");
    }
  },

  async spendCoins(amount, purpose) {
    try {
      const data = await api.post("/wallet/spend", { amount, purpose });
      return data;
    } catch (err) {
      console.warn("Wallet spend fallback:", err.message);
      const current = Number(localStorage.getItem("appleWorm_coins")) || 0;
      if (current < amount) throw new Error("Insufficient coins");
      const next = current - amount;
      localStorage.setItem("appleWorm_coins", String(next));
      return { success: true, newBalance: next };
    }
  },
};
