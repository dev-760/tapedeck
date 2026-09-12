# TapeDeck V2 📼

Welcome to **TapeDeck V2**, a premium, cassette-themed music player for React Native/Expo. TapeDeck brings back the mechanical joy of physical media, combined with a highly modern, extensible streaming backend powered by QuickJS and WebAssembly.

## Documentation Index

- [API Documentation](API.md) - Internal interfaces, provider abstractions, and state stores.
- [Architecture Overview](Architecture.md) - System design, sandboxing, and data flow.
- [Design Philosophy](Design.md) - UI/UX principles, brutalist aesthetics, and typography.
- [Handover Status](Handover.md) - Current project state, recent completions, and future roadmap.

## Features

* **Skeuomorphic Walkman UI:** A fully animated cassette deck interface that reacts to playback state, spool speeds, and duration.
* **Curated Mixtapes:** Organize your tracks into custom "Mixtapes" in the Vault, saved locally.
* **Extensible Provider System (SpotiFLAC):** Connects to external audio sources (like Tidal/Qobuz) using sandboxed JavaScript plugins.
* **Audiophile Controls:** Mechanical auto-reverse toggles, bias adjustments, and VU meter visualization (simulated).

## Tech Stack

* **Framework:** React Native / Expo Router
* **State Management:** Zustand
* **Audio Engine:** `react-native-track-player`
* **Sandbox Runtime:** `quickjs-emscripten` (WebAssembly)
* **Crypto:** `react-native-quick-crypto` (JSI/C++)
* **Styling:** React Native StyleSheet (Google Fonts: Space Grotesk & Courier Prime)

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the Expo development server:**
   ```bash
   npm start
   ```

3. **Run on iOS/Android:**
   Use the Expo Go app or build a development client to test the native modules (`react-native-quick-crypto`, `track-player`).
