# Elden Ring Vue Explorer

Welcome to the **Elden Ring Vue Explorer**! This is a comprehensive, interactive web application built with **Vue 3**, **Vite**, and **Tailwind CSS** that lets you explore the vast world of Elden Ring. Discover details about terrifying bosses, powerful weapons, and essential items from the Lands Between.

## 🚀 Deployed Site

[**Check out the live project here!**](#) _(Replace this link with your actual deployed URL, e.g., Vercel, Netlify, or GitHub Pages)_

---

## 📸 Screenshots

Here is a glimpse of what the project looks like:

### Home & Categories

<div style="display: flex; gap: 10px;">
  <img src="./public/screenshots/homePage.png" alt="Home Page" width="400" />
  <img src="./public/screenshots/categories.png" alt="Categories" width="400" />
</div>

### Exploring the Lands Between

<div style="display: flex; gap: 10px;">
  <img src="./public/screenshots/bossesPage.png" alt="Bosses Page" width="400" />
  <img src="./public/screenshots/WeaponsPage.png" alt="Weapons Page" width="400" />
  <img src="./public/screenshots/ItemsPage.png" alt="Items Page" width="400" />
</div>

### Detailed Views

<div style="display: flex; gap: 10px;">
  <img src="./public/screenshots/BossesDetailPage.png" alt="Boss Detail" width="400" />
  <img src="./public/screenshots/WeaponsDetailPage.png" alt="Weapon Detail" width="400" />
  <img src="./public/screenshots/ItemsDetailPage.png" alt="Item Detail" width="400" />
</div>

---

## 🛠️ Technology Stack

- **Framework:** [Vue 3](https://vuejs.org/) (Composition API)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [shadcn-vue](https://shadcn-vue.com/)
- **Routing:** [Vue Router](https://router.vuejs.org/)
- **Testing:** [Vitest](https://vitest.dev/)
- **Component Explorer:** [Storybook](https://storybook.js.org/)
- **3D Rendering:** [Three.js](https://threejs.org/) (Used for immersive background effects)

---

## 💻 Available Scripts

In the project directory, you can run the following commands via `npm`:

### Development & Build

- **`npm run dev`**
  Starts the Vite development server with Hot Module Replacement (HMR).
- **`npm run build`**
  Runs type-checking and bundles the app for production.
- **`npm run preview`**
  Boots up a local web server to preview your production build (`dist` folder).
- **`npm run build-only`**
  Builds the application for production without running type-checking.
- **`npm run type-check`**
  Runs the TypeScript compiler (`vue-tsc`) to check for type errors.
- **`npm run analyze`**
  Builds the project and automatically opens a bundle analyzer to inspect your chunk sizes.

### Testing & UI

- **`npm run test`**
  Runs the unit test suite using Vitest.
- **`npm run storybook`**
  Starts the Storybook development environment on `localhost:6006` to browse and develop your UI components in isolation.
- **`npm run build-storybook`**
  Builds your Storybook into a static web app for deployment.

### Code Quality (Linting & Formatting)

- **`npm run lint`**
  Runs both ESLint and Oxlint to catch and fix code quality issues.
- **`npm run lint:eslint`**
  Runs ESLint specifically with auto-fix enabled.
- **`npm run lint:oxlint`**
  Runs the lightning-fast Oxlint tool for immediate issue detection.
- **`npm run format`**
  Formats all your source files using Prettier.
- **`npm run format:check`**
  Checks if your files are properly formatted without making changes.
- **`npm run prepare`**
  Installs Husky for managing Git hooks (e.g., pre-commit linting).

---

## ⚙️ Getting Started

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) to view it in your browser.
