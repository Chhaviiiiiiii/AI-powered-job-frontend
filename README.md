# AI-Powered Autonomous Job Application Platform - Frontend

This is the frontend repository for the **AI-Powered Autonomous Job Application Platform**, designed as a production-ready, highly modular SaaS application. It uses React 18, Vite, TypeScript, and Tailwind CSS.

---

## Tech Stack

The application uses the following libraries and tooling:
- **Core Framework**: React 18 & TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS & Material UI (MUI)
- **Routing**: React Router DOM (v6)
- **Forms & Validation**: React Hook Form & Zod
- **State Management**: Zustand
- **Data Fetching**: React Query (TanStack Query)
- **HTTP Client**: Axios
- **Animations**: Framer Motion
- **Icons**: Lucide React

---

## Folder Structure

The project follows a modular, feature-based directory architecture:

```text
src/
├── assets/          # Static assets (images, logos, icons)
├── components/      # Common and layout React components
│   ├── common/      # Reusable UI elements (Button, Input, Modal, etc.)
│   ├── layout/      # Page wrapper layouts (Public and Protected)
│   └── ui/          # Generic custom interface items
├── features/        # Feature-based folders containing local modules
├── pages/           # High-level route pages (LandingPage, etc.)
├── hooks/           # Reusable custom React hooks
├── services/        # External API services (Axios configuration)
├── routes/          # Navigation and route definitions (AppRoutes)
├── store/           # Zustand global state stores (themeStore, etc.)
├── contexts/        # React Context providers (MuiThemeProvider)
├── constants/       # Global constants and config
├── utils/           # Helper functions and utilities
├── types/           # Global TypeScript declarations
├── styles/          # Global styles (Tailwind base and customization)
├── App.tsx          # App entry point with providers
└── main.tsx         # Main entry point mounting React DOM
```

---

## Installation

1. **Clone the repository** and navigate to the directory.
2. **Install dependencies**:
   ```bash
   npm install
   ```

---

## Run Commands

- **Development Server**:
  ```bash
  npm run dev
  ```
- **Build Production Bundle**:
  ```bash
  npm run build
  ```
- **Preview Production Build**:
  ```bash
  npm run preview
  ```
