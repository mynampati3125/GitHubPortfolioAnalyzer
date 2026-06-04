# 🚀 How to Run This Project in VS Code

## 📍 Where is the Code?

The code is in **your current working directory**: `/workspaces/default/code/`

If you're seeing this file, all the source code is in the **same folder** as this file!

---

## 🖥️ How to Run in VS Code (Step-by-Step)

### Method 1: If You're Already in a Cloud Environment

If you're currently in a cloud IDE or development environment:

1. **The code is already here!** Look at the file explorer on the left
2. **Open integrated terminal** in VS Code (Ctrl+` or View → Terminal)
3. **Run these commands:**

```bash
npm install
npm run dev
```

4. **Open the app** - It will show you a URL like `http://localhost:5173`

---

### Method 2: Download to Your Local Machine

#### Step 1: Download the Code

**Option A: Download the TAR file**
```bash
# The file is at: ~/github-analyzer.tar.gz
# Download it and extract:
tar -xzf github-analyzer.tar.gz
cd code
```

**Option B: Copy all files**
- Copy the entire `/workspaces/default/code/` folder to your local machine

#### Step 2: Open in VS Code
```bash
# Navigate to the project folder
cd path/to/your/downloaded/code

# Open in VS Code
code .
```

#### Step 3: Install Dependencies
In VS Code's integrated terminal (Ctrl+`):
```bash
npm install
```

#### Step 4: Run the Development Server
```bash
npm run dev
```

#### Step 5: Open in Browser
- The terminal will show: `Local: http://localhost:5173`
- Click the link or open your browser and go to that URL

---

## 📁 Project Structure

```
code/
├── package.json              # Dependencies & scripts
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript config
├── index.html               # HTML entry point
├── src/
│   ├── main.tsx            # React entry point
│   ├── styles/
│   │   └── theme.css       # Global styles
│   └── app/
│       ├── App.tsx         # Main app component
│       ├── types.ts        # TypeScript types
│       ├── utils/
│       │   └── analysisUtils.ts    # Analysis calculations
│       └── components/
│           ├── AnalysisTypeSelector.tsx  # NEW: Select what to analyze
│           ├── AnalyzerLanding.tsx       # Input form
│           ├── AnalyzerDashboard.tsx     # Results dashboard
│           ├── ProfileHeader.tsx
│           ├── ScoreOverview.tsx
│           ├── ActivityChart.tsx
│           ├── TechStackAnalysis.tsx
│           ├── RepoQualityList.tsx
│           ├── PortfolioAnalysis.tsx
│           └── AIInsights.tsx
```

---

## ✨ What's New (Just Fixed!)

### 1. ✅ Selection Screen
- **Before**: App always asked for both GitHub username and portfolio
- **After**: You now choose what you want to analyze:
  - 🔵 GitHub Only
  - 🟣 Portfolio Only  
  - 🟢 Both

### 2. ✅ Fixed Fake Portfolio Analysis
- **Before**: Random scores even for invalid URLs
- **After**: Basic analysis only, with disclaimer that detailed analysis requires manual review
- Portfolio analysis now shows:
  - Whether it's a custom domain
  - URL provided (no fake data)

---

## 🎯 How to Use the App

1. **Start the app** (`npm run dev`)
2. **Choose what to analyze:**
   - GitHub Only - If you only have a GitHub profile
   - Portfolio Only - If you only have a portfolio website
   - Both - If you have both

3. **Enter your information**
4. **Get your results** with AI-powered insights!

---

## 🔧 Common Issues

### "npm: command not found"
- Install Node.js from https://nodejs.org/
- Make sure it's in your PATH

### "Cannot find module"
- Run `npm install` again
- Delete `node_modules` folder and run `npm install` again

### Port 5173 already in use
- Change the port in `vite.config.ts`:
```typescript
server: {
  port: 3000,  // Change to any available port
}
```

---

## 📝 Available Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

---

## 🎉 You're All Set!

Your AI-Based Portfolio & GitHub Analyzer is ready to use!

For questions or issues, check the code comments or console logs.
