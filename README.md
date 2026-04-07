# Focus Warden Pro 🛡️

<p align="center">
  <img src="https://img.shields.io/badge/Version-2.1-blue?style=for-the-badge" alt="Version">
  <img src="https://img.shields.io/badge/Manifest-V3-green?style=for-the-badge" alt="Manifest V3">
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" alt="License">
  <img src="https://img.shields.io/badge/Platform-Chrome-orange?style=for-the-badge" alt="Platform">
</p>

**Focus Warden Pro** is an industry-grade productivity extension designed to break the cycle of digital distraction. By implementing a **"Protected Session"** architecture, it allows users to whitelist specific work tabs while providing a real-time, non-intrusive warning system for everything else.

---

## 💎 The Problem & The Solution

Most site blockers are either too restrictive or too easy to bypass. **Focus Warden Pro** solves this by shifting the focus from "blocking" to "protecting":

* **Dynamic Whitelisting:** Instead of chasing an infinite list of "bad" sites, you simply designate your "work" tabs.
* **Visual Accountability:** A persistent glassmorphism timer appears the moment you lose focus, creating immediate psychological awareness.
* **The Interruption Pattern:** A high-quality blurred overlay physically breaks the "infinite scroll" dopamine loop, forcing an intentional choice to return to work.

---

## ✨ Key Features

### 🛠️ Multi-Tab Shielding
Protect an entire workspace. Whether you have three tabs for research and one for coding, you can lock them all. The extension icon tracks your active shield count in real-time using the Chrome Badge API.

### ⏳ Glassmorphism Countdown
Switching to a distraction tab triggers a beautiful, translucent timer in the bottom-right corner. It gives you a **10-second grace period** to return to your tasks before the "Hard Lock" initiates.

### 🔒 Professional Lockscreen
If the timer hits zero, the tab is "Warden Locked" with a premium backdrop-blur effect. It requires an intentional click to dismiss, giving your brain the pause it needs to choose productivity over distraction.

### 📊 Modern Dashboard
A sleek, Apple-inspired UI (influenced by *Focus To-Do*) for managing active sessions. View your protected tabs at a glance and deactivate shields with a single click.

---

## 🛠️ Technical Stack

* **Manifest V3:** The latest Chrome extension standard for optimized security and performance.
* **Service Workers:** Background logic handled via non-persistent scripts to minimize system memory footprint.
* **Chrome Scripting API:** Dynamic, secure injection of CSS and JS into active DOMs.
* **Storage API:** Local persistence of session data to ensure privacy and speed.
* **Glassmorphism UI:** Advanced CSS `backdrop-filter` and `rgba` transparency for a modern, OS-native aesthetic.

---

## 📦 Installation (Developer Mode)

1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/your-username/focus-warden-pro.git](https://github.com/your-username/focus-warden-pro.git)
    ```
2.  **Access Extensions**
    Open Chrome and navigate to `chrome://extensions/`.
3.  **Enable Developer Mode**
    Toggle the **Developer mode** switch in the top-right corner.
4.  **Load Unpacked**
    Click the **Load unpacked** button and select the project folder.
5.  **Pin & Launch**
    Pin the extension to your toolbar for the best experience.

---

## 📖 How to Use

1.  Open the tab(s) you need for your current work session.
2.  Click the **Focus Warden Pro** icon and select **"Protect Current Session"**.
3.  Switching to any non-protected tab will initiate the **10-second patrol timer**.
4.  Return to any work tab at any time to automatically reset the warden.
5.  Use **"Disable All Protections"** in the popup footer to end your focus block.

---

## 📂 Project Structure

```text
├── manifest.json         # Extension configuration & permissions
├── background.js         # The "Patrol Engine" (Service Worker)
├── content.js            # The "Lock Screen" overlay logic
├── popup.html            # Dashboard UI structure
├── popup.js              # Dashboard logic & state management
└── assets/               # Project screenshots & branding
