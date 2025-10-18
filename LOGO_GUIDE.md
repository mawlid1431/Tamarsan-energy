# Tamarsan Logo Guide

## Logo Implementation

The Tamarsan logo automatically adapts to light and dark modes:

### Light Mode
- **Color:** Red (#C9284C)
- **Usage:** Displays when the site is in light mode
- **Background:** Transparent

### Dark Mode
- **Color:** White (#FFFFFF)
- **Usage:** Displays when the site is in dark mode
- **Background:** Transparent

## Logo Features

The logo includes:
- **TAMARSAN** text in bold, uppercase letters
- **Sun icon** with rays (representing solar energy)
- **Solar panel** graphic below the sun (representing renewable energy solutions)

## Favicon

The favicon uses the sun and solar panel icon from the logo in red (#C9284C).

## Usage

The logo component automatically detects theme changes and switches between red and white versions:

```tsx
import { Logo } from "./components/Logo";

// Use in your component
<Logo className="h-10 w-auto" />
```

## Files

- `components/Logo.tsx` - Logo component with theme detection
- `public/favicon.svg` - Favicon file
- `index.html` - Contains inline favicon for immediate loading
