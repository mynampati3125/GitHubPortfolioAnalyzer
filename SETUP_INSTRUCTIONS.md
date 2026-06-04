# AI-Based Portfolio & GitHub Analyzer - Setup Instructions

## Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

## Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. **Open in Browser**
   - The app will run at `http://localhost:5173`
   - Open this URL in your browser

## Project Structure
```
├── src/
│   ├── app/
│   │   ├── components/       # React components
│   │   ├── utils/           # Utility functions
│   │   ├── types.ts         # TypeScript types
│   │   └── App.tsx          # Main app component
│   ├── styles/
│   │   └── theme.css        # CSS variables and styles
│   └── main.tsx             # Entry point
├── index.html               # HTML template
├── package.json             # Dependencies
├── vite.config.ts          # Vite configuration
└── tsconfig.json           # TypeScript configuration

## Features
- GitHub profile analysis with real-time data
- Portfolio website evaluation
- AI-powered insights and recommendations
- Coding consistency tracking
- Tech stack diversity analysis
- Placement readiness assessment
