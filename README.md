# Rohith Gowda S. — Software Portfolio

A clean, high-performance, dark/technical developer portfolio built with React, TypeScript, Tailwind CSS v4, and Framer Motion. Built to present software projects, technical skills, verified certifications, and academic background in an editorial design aesthetic.

---

## 🚀 Key Features

* **Editorial Dark Aesthetic**: Deep black background, crisp typography (`Syne` + `JetBrains Mono`), vermilion red accents (`#eb4a42`), and subtle technical grid details.
* **Featured Projects & Dedicated Case Studies**: Detailed breakdowns for full-stack and AI-powered projects with interactive modal case studies (`Health Tracker PWA`, `IntelliSlide AI`).
* **Open Source & Live GitHub Tracking**: Integrated GitHub activity component fetching real-time repository metadata and contribution stats.
* **Credentials System**: Verified certifications grid with direct PDF document viewers (`OpenAI`, `Cisco`, `IBM`).
* **Responsive Interactive Canvas & SVGs**: Hand-crafted vector decorative elements and smooth layout transitions (`Framer Motion`, `ScrollSectionWrapper`).
* **Direct Contact & Credentials Access**: Streamlined contact section and single-click resume downloading.

---

## 🛠️ Tech Stack

### Core Technologies
* **Framework**: React 19, TypeScript
* **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`), Custom CSS Variables
* **Build Tool**: Vite 8
* **Routing**: React Router v7 (`HashRouter`)
* **Animations**: Framer Motion 13
* **Icons**: Lucide React
* **Code Quality**: Oxlint, TypeScript strict mode

---

## 📁 Project Structure

```text
Portfolio/
├── public/
│   └── certificates/     # Verified certification PDF files
├── src/
│   ├── components/       # UI Components (Navbar, ProjectDetailPage, GitHubActivity, etc.)
│   ├── App.tsx           # Main Application Layout & Page Sections
│   ├── index.css         # Global Styles, Font Imports & Theme Tokens
│   ├── main.tsx          # React Root Setup
│   └── portfolioConfig.ts# Centralized Portfolio Data Configuration
├── index.html            # HTML Shell with metadata & Inline SVG Favicon
├── package.json          # Dependencies & Scripts
└── vite.config.ts        # Vite Build Configuration
```

---

## ⚙️ Local Setup & Development

### Prerequisites
Make sure you have **Node.js** (v18+) and **npm** installed.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Rohith1833/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

### Available Scripts

* `npm run dev`: Start local development server with HMR.
* `npm run build`: Type-check with `tsc` and build for production bundle.
* `npm run preview`: Preview the local production build.
* `npm run lint`: Run Oxlint to verify code quality.

---

## 📬 Contact & Links

* **Email**: [rohithmohith78@gmail.com](mailto:rohithmohith78@gmail.com)
* **GitHub**: [github.com/Rohith1833](https://github.com/Rohith1833)
* **LinkedIn**: [linkedin.com/in/rohith-gowda-s-449939339](https://www.linkedin.com/in/rohith-gowda-s-449939339/)
* **Instagram**: [@rohith_s_08](https://www.instagram.com/rohith_s_08/)
