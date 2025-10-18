# 🌞 Tamarsan Renewable Energy Website

![Tamarsan Logo](https://via.placeholder.com/150x50?text=Tamarsan)

A modern, professional website for **Tamarsan Company** - a renewable energy consultancy based in Somaliland specializing in solar, hybrid, and off-grid systems.

---

## 🌟 Features

### 🎯 Core Functionality
- ✅ **5 Main Pages:** Home, About, Projects, Testimonials, Contact
- ✅ **Project Detail Modals:** Click any project to view comprehensive details
- ✅ **WhatsApp Integration:** Floating chat button for instant communication
- ✅ **Dark/Light Mode:** Automatic theme switching with smooth transitions
- ✅ **Responsive Design:** Optimized for desktop, tablet, and mobile devices
- ✅ **Smooth Animations:** Powered by Framer Motion for professional interactions

### 🎨 Design Features
- Modern Solarify-style design aesthetic
- Indigo/purple color scheme (#6366f1)
- Large bold typography with asymmetric layouts
- Minimalist service cards with hover effects
- Dark CTA sections with gradient backgrounds
- Professional testimonials carousel
- Interactive project galleries

### 🛠️ Technical Stack
- **Frontend:** React 18 + TypeScript
- **Styling:** Tailwind CSS v4.0
- **Animations:** Framer Motion (motion/react)
- **UI Components:** ShadCN UI
- **Icons:** Lucide React
- **Build Tool:** Vite
- **State Management:** React Hooks

---

## 📸 Screenshots

### Home Page
Modern hero section with bold typography and call-to-action buttons.

### Projects Page
Interactive project cards with detailed modal views showing capacity, investment, and impact metrics.

### Contact Page
Clean contact form with WhatsApp integration for instant communication.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18.0 or higher
- npm 9.0 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/tamarsan/renewable-energy-website.git

# Navigate to project directory
cd renewable-energy-website

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

📖 For detailed installation instructions, see [INSTALLATION.md](./INSTALLATION.md)

---

## 📁 Project Structure

```
tamarsan-renewable-energy/
├── App.tsx                      # Main application entry
├── components/
│   ├── Navbar.tsx              # Navigation with theme toggle
│   ├── Hero.tsx                # Homepage hero section
│   ├── ServiceCards.tsx        # Service offering cards
│   ├── ProjectsPreview.tsx     # Featured projects
│   ├── ProjectDetail.tsx       # Project detail modal
│   ├── TestimonialsPreview.tsx # Client testimonials
│   ├── CTASection.tsx          # Call-to-action sections
│   ├── WhatsAppButton.tsx      # Floating WhatsApp button
│   ├── Footer.tsx              # Site footer
│   └── ui/                     # ShadCN UI components
├── pages/
│   ├── About.tsx               # About page
│   ├── Projects.tsx            # Projects page
│   ├── Testimonials.tsx        # Testimonials page
│   └── Contact.tsx             # Contact page
├── styles/
│   └── globals.css             # Global styles & Tailwind
└── public/                     # Static assets
```

---

## 🎨 Key Components

### WhatsApp Integration
```tsx
<WhatsAppButton 
  phoneNumber="+252638383838"
  message="Hello! I'm interested in Tamarsan's services."
/>
```

### Project Detail Modal
```tsx
<ProjectDetail
  isOpen={isDetailOpen}
  onClose={() => setIsDetailOpen(false)}
  project={selectedProject}
/>
```

### Theme Toggle
Automatic dark/light mode with smooth transitions, integrated in the Navbar component.

---

## 🌐 Pages Overview

### 1. Home Page
- Hero section with animated typing effect
- Service cards (Solar, Hybrid, Off-grid)
- Mission statement
- Company values preview
- Featured projects
- Client testimonials
- CTA section with "Get in Touch"

### 2. About Page
- Company history and mission
- Team values and expertise
- Why choose Tamarsan
- Impact statistics
- Service areas in Somaliland

### 3. Projects Page
- Project gallery with filter options
- Detailed project cards
- Click to view full project details:
  - Project overview
  - Challenges faced
  - Solutions implemented
  - Key results and impact
  - Investment details
  - Beneficiary statistics

### 4. Testimonials Page
- Client reviews and feedback
- Project success stories
- Partner logos
- Rating system

### 5. Contact/Get in Touch Page
- Contact form
- Company contact information
- WhatsApp quick access
- Office location map
- Business hours

---

## 📊 Project Metrics

Each project includes detailed metrics:
- **Date:** Project completion timeline
- **Capacity:** Power generation capacity (kW)
- **Beneficiaries:** Number of people served
- **Investment:** Project cost
- **Impact:** Measurable results (fuel reduction, CO2 savings, etc.)

---

## 🎯 Featured Projects

### 1. Hybrid Energy Systems
- **Location:** Berbera, Burao, and Borama
- **Capacity:** 500 kW
- **Impact:** 60% reduction in fuel costs
- **Beneficiaries:** 2,000+ people

### 2. Off-grid Solar Electrification
- **Location:** Togdheer, Sanaag, and Sool
- **Capacity:** 750 kW
- **Impact:** 5,000+ households powered
- **Beneficiaries:** 25,000+ people

### 3. Solar-Powered Water Pumping
- **Location:** Ainabo, Badhan, and Buhodle
- **Capacity:** 120 kW
- **Impact:** 15,000+ people served
- **Investment:** $450K

---

## 🛠️ Customization

### Update Contact Information

**WhatsApp Number:**
Edit `/App.tsx`:
```tsx
<WhatsAppButton phoneNumber="+252XXXXXXXXX" />
```

**Contact Details:**
Edit `/pages/Contact.tsx` to update email, phone, and address.

### Change Colors

The website uses an indigo/purple color scheme. To modify:

1. **Tailwind Classes:** Search and replace `indigo-` and `purple-` classes
2. **CSS Variables:** Edit `/styles/globals.css`

### Update Logo

Replace the logo component in `/components/Logo.tsx` with your own SVG or image.

---

## 🚢 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Deploy the 'dist' folder
```

### GitHub Pages
```bash
npm install -D gh-pages
npm run deploy
```

For detailed deployment instructions, see [INSTALLATION.md](./INSTALLATION.md)

---

## 📱 Responsive Design

- **Desktop:** 1920px+ (full layout)
- **Laptop:** 1024px - 1919px (optimized layout)
- **Tablet:** 768px - 1023px (adjusted grid)
- **Mobile:** 320px - 767px (single column, mobile menu)

---

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Color contrast compliance (WCAG AA)
- Screen reader friendly
- Focus indicators on all interactive elements

---

## 🔒 Security

- No hardcoded API keys
- Environment variables for sensitive data
- XSS protection
- HTTPS recommended for production

---

## 📈 Performance

- Lazy loading for images
- Code splitting by route
- Optimized bundle size
- Compressed assets
- Minimal external dependencies

**Lighthouse Scores (Target):**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 95+

---

## 🐛 Known Issues

None at the moment. Please report issues via GitHub Issues.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📞 Contact & Support

**Tamarsan Company**
- **Website:** [Coming Soon]
- **Email:** info@tamarsan.com
- **WhatsApp:** +252 63 838 3838
- **Location:** Hargeisa, Somaliland

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **ShadCN UI** - Component library
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide Icons** - Icon set
- **Unsplash** - Stock photography
- **React Team** - React library

---

## 📋 Changelog

### Version 1.0.0 (October 2025)
- ✅ Initial release
- ✅ 5 main pages implemented
- ✅ Project detail modals
- ✅ WhatsApp integration
- ✅ Dark/light mode
- ✅ Fully responsive design
- ✅ Smooth animations
- ✅ SEO optimized

---

## 🗺️ Roadmap

### Phase 2 (Planned)
- [ ] Supabase integration for contact forms
- [ ] Email notifications via Nodemailer
- [ ] Project database with CMS
- [ ] Blog section
- [ ] Multi-language support (English, Somali, Arabic)
- [ ] Analytics integration
- [ ] Live chat support

### Phase 3 (Future)
- [ ] Client portal
- [ ] Project tracking dashboard
- [ ] Online quotation system
- [ ] Payment integration
- [ ] Mobile app

---

## 📊 Stats

- **Total Components:** 25+
- **Pages:** 5
- **Dependencies:** 40+
- **Lines of Code:** ~5,000+
- **Build Size:** ~500KB (gzipped)

---

**Built with ❤️ by Tamarsan Company**

*Powering Somaliland's renewable energy future*

---

**Last Updated:** October 18, 2025  
**Version:** 1.0.0
