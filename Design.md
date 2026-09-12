# Design Philosophy

TapeDeck relies heavily on **Skeuomorphic Brutalism**. The app embraces the tactile, mechanical feel of physical 1980s cassette decks (like the Sony Walkman WM-D6C) without compromising on modern mobile usability.

## 1. Visual Language

- **Skeuomorphism over Flat Design:** The app avoids flat, minimalist vectors in favor of textured layers, drop shadows, screw-heads, and physical buttons with deep press states.
- **Information Density:** Inspired by professional audio gear, the UI packs significant telemetry into small spaces using monospaced typography, mimicking LCD or LED segmented displays.
- **Color Palette:**
  - Backgrounds: Dark, matte graphite/black (`COLORS.surface`, `COLORS.surfaceContainerLowest`).
  - Accents: Warning reds, warning oranges, and LCD greens (`COLORS.secondary`, `COLORS.tertiary`, `COLORS.error`).

## 2. Typography

We rely exclusively on high-contrast, mechanical typefaces provided by Google Fonts:
1. **Space Grotesk** (`@expo-google-fonts/space-grotesk`)
   - Used for structural headers, chassis labels, and track titles.
   - Distinctly geometric, adding a brutalist edge.
2. **Courier Prime** (`@expo-google-fonts/courier-prime`)
   - Used for telemetry, timestamps (e.g., `04:12`), and readouts.
   - Monospaced to ensure layout stability when counters rapidly increment.

## 3. Core Components

### The "Walkman Deck" (`index.tsx`)
The centerpiece of the app is the simulated tape window.
- **Tape Spools:** The UI dynamically calculates the remaining tape spool size `(positionMs / durationMs) * 100`. As the song progresses, the left spool shrinks and the right spool grows.
- **VU Meters:** Segmented audio level meters respond to playback state.
- **Piano Keys:** Heavy, tactile transport buttons (`REW`, `PLAY`, `F.FWD`, `STOP/EJ`, `PAUSE`).

### The Vault (`library.tsx`)
- Playlists are presented as "Cassette Spines" stacked on a shelf. 
- "J-Cards" are used to display track lists and liner notes.
