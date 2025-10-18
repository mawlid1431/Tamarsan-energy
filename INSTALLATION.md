# Tamarsan Renewable Energy Website - Installation Guide

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 18.0 or higher)
  - Download from: https://nodejs.org/
  - Verify installation: `node --version`
  
- **npm** (version 9.0 or higher) - comes with Node.js
  - Verify installation: `npm --version`

- **Git** (optional, for version control)
  - Download from: https://git-scm.com/
  - Verify installation: `git --version`

---

## 🚀 Installation Steps

### Step 1: Clone or Download the Project

**Option A: Using Git (Recommended)**
```bash
git clone https://github.com/tamarsan/renewable-energy-website.git
cd renewable-energy-website
```

**Option B: Manual Download**
- Download the project ZIP file
- Extract to your desired location
- Open terminal/command prompt in the project folder

---

### Step 2: Install Dependencies

Run the following command in the project root directory:

```bash
npm install
```

This will:
- Install all required packages listed in `package.json`
- Generate `package-lock.json` automatically
- Create `node_modules` folder with all dependencies

**Expected time:** 2-5 minutes depending on your internet connection

---

### Step 3: Verify Installation

Check if all dependencies were installed correctly:

```bash
npm list --depth=0
```

You should see a list of installed packages without errors.

---

## 🏃 Running the Application

### Development Mode (Local Development)

Start the development server:

```bash
npm run dev
```

- The application will start on `http://localhost:5173` (default Vite port)
- Hot-reload is enabled - changes will reflect automatically
- Press `Ctrl+C` to stop the server

Expected output:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

---

### Build for Production

Create an optimized production build:

```bash
npm run build
```

This will:
- Compile TypeScript files
- Bundle and minify all assets
- Output files to `dist` folder

---

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

- Serves the built application from `dist` folder
- Opens on `http://localhost:4173` (default)

---

## 📁 Project Structure

```
tamarsan-renewable-energy/
├── App.tsx                 # Main application component
├── package.json            # Project dependencies and scripts
├── package-lock.json       # Locked dependency versions (auto-generated)
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite build configuration
├── tailwind.config.js      # Tailwind CSS configuration (if needed)
├── index.html              # HTML entry point
├── components/             # Reusable React components
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Footer.tsx
│   ├── WhatsAppButton.tsx
│   ├── ProjectDetail.tsx
│   └── ui/                 # ShadCN UI components
├── pages/                  # Page components
│   ├── About.tsx
│   ├── Projects.tsx
│   ├── Contact.tsx
│   └── Testimonials.tsx
├── styles/                 # Global styles
│   └── globals.css
└── public/                 # Static assets (images, fonts, etc.)
```

---

## 🔧 Configuration Files

### Required Configuration Files

You may need to create these files if they don't exist:

**1. vite.config.ts**
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
})
```

**2. tsconfig.json**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["**/*.ts", "**/*.tsx"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

**3. index.html** (in root directory)
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Tamarsan - Renewable Energy Consultancy in Somaliland" />
    <title>Tamarsan | Renewable Energy Solutions</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/App.tsx"></script>
  </body>
</html>
```

---

## 🎨 Customization

### Update WhatsApp Number

Edit `/components/WhatsAppButton.tsx` or `/App.tsx`:
```tsx
<WhatsAppButton 
  phoneNumber="+252638383838"  // Change this number
  message="Your custom message here"
/>
```

### Update Company Information

Edit the following files:
- Contact details: `/pages/Contact.tsx`
- Company info: `/components/Footer.tsx`
- Logo: `/components/Logo.tsx`

### Change Color Scheme

Primary colors are indigo/purple. To change:
- Edit color classes in components (search for `indigo-` and `purple-`)
- Modify CSS variables in `/styles/globals.css`

---

## 🐛 Troubleshooting

### Issue: "npm install" fails

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue: Port 5173 already in use

**Solution:**
```bash
# Use a different port
npm run dev -- --port 3000
```

### Issue: TypeScript errors

**Solution:**
```bash
# Check TypeScript version
npx tsc --version

# Reinstall TypeScript
npm install -D typescript@latest
```

### Issue: Tailwind styles not working

**Solution:**
- Ensure `/styles/globals.css` is imported in `App.tsx`
- Check if Tailwind CSS is properly installed
- Verify `@tailwind` directives are in `globals.css`

---

## 📦 Deployment

### Deploy to Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

### Deploy to Netlify

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to Netlify

### Deploy to GitHub Pages

1. Install gh-pages:
```bash
npm install -D gh-pages
```

2. Add to package.json:
```json
"scripts": {
  "deploy": "npm run build && gh-pages -d dist"
}
```

3. Deploy:
```bash
npm run deploy
```

---

## 📞 Support

For technical support or questions:

- **Email:** info@tamarsan.com
- **WhatsApp:** +252 63 838 3838
- **Website:** [Tamarsan Company Website]

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## ✅ Checklist

- [ ] Node.js and npm installed
- [ ] Project files downloaded/cloned
- [ ] Dependencies installed (`npm install`)
- [ ] Development server runs successfully (`npm run dev`)
- [ ] WhatsApp number updated (if needed)
- [ ] Company information customized
- [ ] Production build tested (`npm run build`)

---

**Last Updated:** October 2025  
**Version:** 1.0.0
