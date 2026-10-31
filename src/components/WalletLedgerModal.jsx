import React, { useState } from "react";
import { audio } from "../utils/audioEngine";

export default function WalletLedgerModal({
  coins,
  transactions = [],
  onSpendCoins,
  onOpenRewardCenter,
  onClose,
}) {
  const [activeTab, setActiveTab] = useState("ledger"); // "ledger" | "shop"

  const shopItems = [
    { id: "hint_pack", name: "3x Strategic Hints", cost: 50, icon: "💡", desc: "Reveals the closest path and keys." },
    { id: "moves_pack", name: "+5 Extra Moves Voucher", cost: 60, icon: "🎯", desc: "Adds 5 moves when you run short." },
    { id: "undo_pack", name: "Infinite Undo Pack", cost: 40, icon: "↶", desc: "Free undo for your current level." },
    { id: "magic_booster", name: "Cosmic Fruit Magnet", cost: 100, icon: "🧲", desc: "Draws nearby juicy apples closer." },
  ];

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-card wallet-ledger-card">
        <div className="card-top-header">
          <div className="header-title-group">
            <span className="card-badge">PLAYER WALLET & LEDGER</span>
            <h2>Worm Economy Wallet</h2>
          </div>
          <button type="button" className="modal-close-icon-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Live Coins Balance Card */}
        <div className="wallet-balance-banner">
          <div className="balance-info">
            <span className="balance-label">AVAILABLE COINS</span>
            <div className="balance-amount-row">
              <span className="coin-large-icon">💰</span>
              <strong>{coins.toLocaleString()}</strong>
            </div>
            <small>Backed by VELoop Server-Side Economic Ledger</small>
          </div>
          <button
            type="button"
            className="btn-get-more-coins tactile-btn"
            onClick={() => {
              audio.playClick();
              onOpenRewardCenter();
            }}
          >
            <span>+</span> Earn Free Coins
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="wallet-tabs-bar">
          <button
            type="button"
            className={`wallet-tab-btn ${activeTab === "ledger" ? "active" : ""}`}
            onClick={() => setActiveTab("ledger")}
          >
            📜 Audit Ledger History
          </button>
          <button
            type="button"
            className={`wallet-tab-btn ${activeTab === "shop" ? "active" : ""}`}
            onClick={() => setActiveTab("shop")}
          >
            🛍️ Coin Spending Shop
          </button>
        </div>

        {/* Content Views */}
        {activeTab === "ledger" ? (
          <div className="ledger-table-container">
            {transactions.length === 0 ? (
              <div className="empty-ledger-state">
                <span>🪙</span>
                <p>No transactions yet. Complete levels or watch rewarded ads to earn coins!</p>
              </div>
            ) : (
              <table className="ledger-table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Source</th>
                    <th>Amount</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx, idx) => (
                    <tr key={tx.id || tx.createdAt || `tx-${idx}`}>
                      <td>
                        <span className={`tx-type-tag ${tx.type === "CREDIT" ? "credit" : "debit"}`}>
                          {tx.type}
                        </span>
                      </td>
                      <td className="tx-source-cell">
                        <strong>{tx.source}</strong>
                      </td>
                      <td className={`tx-amount-cell ${tx.type === "CREDIT" ? "positive" : "negative"}`}>
                        {tx.type === "CREDIT" ? `+${tx.amount}` : `-${tx.amount}`}
                      </td>
                      <td className="tx-date-cell">
                        {tx.createdAt ? new Date(tx.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "Today"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        ) : (
          <div className="shop-items-grid">
            {shopItems.map((item) => (
              <div key={item.id} className="shop-item-card">
                <span className="shop-icon">{item.icon}</span>
                <div className="shop-details">
                  <strong>{item.name}</strong>
                  <p>{item.desc}</p>
                </div>
                <button
                  type="button"
                  className="btn-buy-item tactile-btn"
                  onClick={() => {
                    audio.playClick();
                    onSpendCoins(item.cost, item.name);
                  }}
                  disabled={coins < item.cost}
                >
                  💰 {item.cost}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
