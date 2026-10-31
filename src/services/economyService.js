import { api } from "./api";

export const economyService = {
  async getConfig() {
    try {
      const data = await api.get("/economy/config");
      return data.config || null;
    } catch {
      // Local fallback configuration matching PDF specs
      return {
        levelCompletionCoins: 25,
        rewardedAd: {
          doubleCoinsMultiplier: 2,
          doubleScoreMultiplier: 2,
          reviveEnabled: true,
          extraMoves: 5,
          hintEnabled: true,
          maxRewardedAdsPerDay: 15,
          maxRevivesPerLevel: 1,
        },
      };
    }
  },

  async updateConfig(newConfig) {
    return api.put("/economy/config", newConfig);
  },
};
