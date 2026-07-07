# Iniyan A | Cybersecurity Portfolio

A premium, modern, and minimalist single-page portfolio website showcasing academic work, tools, certifications, and Capture the Flag (CTF) competition records.

🛡️ **Live TryHackMe Integration:** Includes an interactive TryHackMe profile widget with real-time progress metrics.

---

## 🚀 Features

* **Single-Page Smooth Scrolling:** Interactive fixed navigation bar with scroll-spy active state highlighting.
* **Premium Cyber Aesthetic:** Deep dark obsidian glassmorphism layouts (`backdrop-blur-md bg-white/5 border-white/10`) coupled with rich sand and fabric texture overlays.
* **Interactive Skill Cards:** Displays proficiency in core cybersecurity auditing utilities (Wireshark, Splunk, Burp Suite) and OSINT.
* **Contest Timeline:** Visual presentation of played CTF events (Questcon, PicoCTF, MythX).
* **OSINT & Malware Credentials:** Grid layout detailing completed certifications.
* **Copy-to-Clipboard Utilities:** Quick copy features for direct email and phone contact links.
* **Interactive Contact Form:** Responsive web form featuring verification success indicators.

---

## 🛠️ Technology Stack

* **Frontend Framework:** React 19 (TypeScript)
* **Build tool:** Vite
* **Styling Engine:** Tailwind CSS v4 (incorporating custom theme variables)
* **Animation Library:** Framer Motion (delivering fluid transitions)
* **Icon Set:** Lucide React

---

## 📁 Directory Structure

```text
portfolio/
├── public/                 # Static public files
├── src/
│   ├── assets/             # Raw media assets (Sand texture, fabric texture, profile portrait)
│   ├── App.tsx             # Main component tree, section elements, and interactivity
│   ├── index.css           # Tailwind v4 import, fonts, custom scrollbars, and keyframes
│   └── main.tsx            # React application mount entry point
├── package.json            # Script instructions and dependencies configuration
├── vite.config.ts          # Vite build plugin definitions (react, tailwindcss)
└── tsconfig.json           # TypeScript configuration
```

---

## 💻 Local Setup & Development

Follow these steps to run the project locally.

### Prerequisites
Make sure you have Node.js (v18+) and npm installed.

### 1. Install Dependencies
Initialize package dependencies:
```bash
npm install
```

### 2. Run the Development Server
Launch the local development workspace:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 3. Build for Production
Bundle and optimize all scripts and assets for production:
```bash
npm run build
```
Output build files will be written to the `dist/` directory.
