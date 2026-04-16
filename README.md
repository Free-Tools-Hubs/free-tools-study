# StudyToolsHub 🚀

Premium, 100% client-side study tools for students. Built for speed, offline-first reliability, and programmatic SEO.

## ✨ Features

- **Flashcard Generator:** Instant digital index cards for 1000+ subjects.
- **Adaptive Quiz Taker:** Test your knowledge with automated scoring and analytics.
- **Smart Study Planner:** Generate optimized weekly timetables based on cognitive science.
- **100% Offline-First:** All tools work without an internet connection using IndexedDB.
- **Zero Backend:** No accounts, no sign-ups, no tracking. Your data stays on your device.
- **Programmatic SEO:** Scaled to 2,200+ unique study pages with no duplicate content.

## 🛠 Tech Stack

- **Frontend:** React 18 + TypeScript + Vite
- **Styling:** Vanilla CSS + Tailwind Core + Glassmorphism
- **State:** Zustand (Global State) + idb-keyval (IndexedDB Persistence)
- **SEO:** React Helmet Async + Programmatic Sitemap Generation
- **PWA:** Web App Manifest + Offline Service Worker support

## 🚀 Getting Started

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Seed Content Database:**
   ```bash
   node scripts/seedData.js
   ```

3. **Generate SEO Files:**
   ```bash
   node scripts/generateSEOFiles.js
   ```

4. **Run Dev Server:**
   ```bash
   npm run dev
   ```

5. **Build for Production:**
   ```bash
   npm run build
   ```

## 📈 SEO Performance

This project uses a **Deterministic Variation Engine** to generate 1,000+ unique study landing pages. By combining static JSON data with procedural text permutation, we achieve high search engine visibility without "Thin Content" penalties.

## 📄 License

MIT © StudyToolsHub
