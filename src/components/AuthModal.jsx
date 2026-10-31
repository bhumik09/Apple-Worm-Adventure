import React, { useState } from "react";
import { audio } from "../utils/audioEngine";

export default function AuthModal({ onLogin, onRegister, onClose, currentUser }) {
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isLoginTab) {
        await onLogin(email, password);
      } else {
        await onRegister(username, email, password);
      }
      audio.playClick();
      onClose();
    } catch (err) {
      setError(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-card auth-card">
        <div className="card-top-header">
          <div className="header-title-group">
            <span className="card-badge">PLAYER ACCOUNT</span>
            <h2>{isLoginTab ? "Welcome Back" : "Join the Adventure"}</h2>
          </div>
          <button type="button" className="modal-close-icon-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Current User Status */}
        <div className="auth-current-status">
          <span>Active Player:</span>
          <strong>{currentUser?.username || "Guest Player"}</strong>
          <small>({currentUser?.role === "guest" ? "Guest Mode" : "Verified Account"})</small>
        </div>

        {/* Tabs */}
        <div className="auth-tabs">
          <button
            type="button"
            className={`auth-tab ${isLoginTab ? "active" : ""}`}
            onClick={() => {
              setIsLoginTab(true);
              setError("");
            }}
          >
            Log In
          </button>
          <button
            type="button"
            className={`auth-tab ${!isLoginTab ? "active" : ""}`}
            onClick={() => {
              setIsLoginTab(false);
              setError("");
            }}
          >
            Create Account
          </button>
        </div>

        {error && <div className="auth-error-banner">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLoginTab && (
            <div className="auth-input-group">
              <label>Player Name:</label>
              <input
                type="text"
                required
                placeholder="e.g. AppleWormHero"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          )}

          <div className="auth-input-group">
            <label>Email Address:</label>
            <input
              type="email"
              required
              placeholder="player@veloop.io"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="auth-input-group">
            <label>Password:</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-auth-submit tactile-btn" disabled={loading}>
            {loading ? "Processing..." : isLoginTab ? "Sign In" : "Register Account"}
          </button>
        </form>
      </div>
    </div>
  );
}
