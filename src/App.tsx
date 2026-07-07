import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Lock, Terminal, Cpu, Globe, Award, BookOpen, Sparkles, 
  ExternalLink, Copy, Check, Mail, Phone, Menu, X, 
  ChevronDown, Code, Target, Activity, Send, Flame
} from 'lucide-react';

// Import local assets
import profileImg from './assets/profile.png';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedText, setCopiedText] = useState<'email' | 'phone' | null>(null);
  
  // Contact Form State
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  // Sections list for scrollspy
  const sections = ['home', 'about', 'skills', 'certifications', 'practice', 'interests', 'hobbies', 'contact'];

  // Scrollspy effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Offset for navbar

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopy = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "88a88b60-eeab-495b-b9bb-5eeba9cbf16c",
          name: formState.name,
          email: formState.email,
          message: formState.message,
          subject: "New Message from Portfolio Website",
          from_name: "Iniyan Portfolio",
        }),
      });
      
      const result = await response.json();
      if (result.success) {
        setFormSuccess(true);
        setFormState({ name: '', email: '', message: '' });
        setTimeout(() => setFormSuccess(false), 5000);
      } else {
        console.error("Web3Forms Error:", result);
        alert("Oops! Something went wrong. Please try emailing me directly at trio832206@gmail.com.");
      }
    } catch (error) {
      console.error("Form Submission Error:", error);
      alert("Oops! Network error. Please try emailing me directly at trio832206@gmail.com.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-sand-texture text-gray-100 selection:bg-gold-500 selection:text-black">
      
      {/* BACKGROUND ACCENT GRADIENTS */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-gold-500/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[600px] w-[600px] rounded-full bg-blue-500/5 blur-[150px]" />
      </div>

      {/* HEADER / NAVIGATION */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/60 backdrop-blur-md">
        <div className="mx-auto flex max-h-20 max-w-7xl items-center justify-between px-6 py-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => scrollToSection('home')}
          >
            <Shield className="h-6 w-6 text-gold-500" />
            <span className="font-display text-xl font-extrabold tracking-wider text-white">
              INIYAN<span className="text-gold-500">.A</span>
            </span>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden items-center space-x-1 md:flex">
            {sections.map((sec) => (
              <button
                key={sec}
                onClick={() => scrollToSection(sec)}
                className={`relative px-4 py-2 font-sans text-sm font-medium tracking-wide uppercase transition-colors duration-300 ${
                  activeSection === sec ? 'text-gold-500' : 'text-gray-400 hover:text-white'
                }`}
              >
                {sec === 'practice' ? 'Projects & CTFs' : sec}
                {activeSection === sec && (
                  <motion.span 
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-gold-500" 
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-400 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-20 z-40 border-b border-white/10 bg-black/95 px-6 py-8 backdrop-blur-lg md:hidden"
          >
            <nav className="flex flex-col space-y-4">
              {sections.map((sec) => (
                <button
                  key={sec}
                  onClick={() => scrollToSection(sec)}
                  className={`text-left font-display text-lg font-semibold tracking-wide uppercase transition-colors ${
                    activeSection === sec ? 'text-gold-500' : 'text-gray-400'
                  }`}
                >
                  {sec === 'practice' ? 'Projects & CTFs' : sec}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10 mx-auto max-w-7xl px-6">
        
        {/* HERO SECTION */}
        <section 
          id="home" 
          className="relative flex min-h-screen flex-col justify-center pt-20 bg-fabric-texture -mx-6 px-6"
        >
          <div className="grid grid-cols-1 items-center gap-12 py-12 md:grid-cols-12 md:py-24">
            
            {/* Text Hero */}
            <div className="order-2 md:order-1 md:col-span-7 flex flex-col justify-center space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center space-x-2 rounded-full border border-gold-500/20 bg-gold-500/5 px-4 py-1.5 text-sm text-gold-400 w-fit"
              >
                <Terminal className="h-4 w-4" />
                <span className="font-mono tracking-wider">SYSTEM_STATUS: SECURE</span>
              </motion.div>

              <div className="space-y-2">
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="font-sans text-lg font-medium tracking-widest text-gray-400 uppercase"
                >
                  Hello, I'm
                </motion.h3>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="font-display text-5xl font-black tracking-tight text-white sm:text-7xl"
                >
                  INIYAN A
                </motion.h1>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="font-display text-2xl font-bold tracking-wider text-gold-500 sm:text-3xl text-glow uppercase"
                >
                  Cybersecurity Enthusiast
                </motion.h2>
              </div>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="max-w-xl font-sans text-base leading-relaxed text-gray-300"
              >
                Studying Cybersecurity with a focus on penetration testing, malware analysis, OSINT, and networking. Ready to protect systems by thinking like an attacker and building as a defender.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-wrap gap-4 pt-4"
              >
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="rounded-lg bg-gold-500 px-6 py-3 font-display font-bold text-black shadow-lg shadow-gold-500/10 hover:bg-gold-400 hover:shadow-gold-500/20 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                >
                  Get In Touch
                </button>
                <button 
                  onClick={() => scrollToSection('practice')}
                  className="rounded-lg border border-white/10 bg-white/5 px-6 py-3 font-display font-bold text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
                >
                  View My CTF Record
                </button>
              </motion.div>
            </div>

            {/* Profile Hero */}
            <div className="order-1 md:order-2 md:col-span-5 flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, type: 'spring' }}
                className="relative group cursor-pointer"
              >
                {/* Visual rings around profile */}
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-gold-500 to-blue-500 opacity-20 blur-md group-hover:opacity-40 transition duration-1000 group-hover:duration-300" />
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black p-2 border-glow">
                  <img 
                    src={profileImg} 
                    alt="Iniyan A Portrait" 
                    className="h-80 w-64 rounded-xl object-cover grayscale contrast-[1.15] brightness-95 transition-all duration-500 group-hover:grayscale-0 group-hover:scale-[1.02]"
                  />
                  <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-black/70 p-3 text-center backdrop-blur-md border border-white/5">
                    <span className="font-mono text-xs text-gold-400 tracking-wider">NEC B.E. CSE Student</span>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>

          {/* Scroll Down */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 text-gray-500 hover:text-gold-500 cursor-pointer transition-colors duration-300" onClick={() => scrollToSection('about')}>
            <span className="font-mono text-xs uppercase tracking-widest">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ChevronDown className="h-4 w-4" />
            </motion.div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-20 border-t border-white/5">
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between">
              <div>
                <span className="font-mono text-xs font-semibold uppercase tracking-widest text-gold-500">01 / Profile</span>
                <h2 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">About Me</h2>
              </div>
              <p className="mt-4 max-w-md font-sans text-gray-400 md:mt-0">
                A structured overview of my passion for cybersecurity, academic milestones, and core background.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
              
              {/* Summary Bio */}
              <div className="lg:col-span-7 space-y-6">
                <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-md">
                  <p className="font-sans text-lg leading-relaxed text-gray-300">
                    I’m a college student with a strong passion for cybersecurity. I love diving into <span className="font-semibold text-gold-400">Capture the Flag (CTF) competitions</span>, where I get to challenge myself and sharpen my problem-solving skills.
                  </p>
                  <p className="mt-4 font-sans text-base leading-relaxed text-gray-400">
                    Most of my practice and learning happens on platforms like <span className="font-semibold text-white">TryHackMe</span>, which I use to explore real-world scenarios and strengthen my technical knowledge. Cybersecurity excites me because it’s both a puzzle and a mission — protecting systems while constantly learning new ways to think like an attacker and defender.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-xl border border-white/5 bg-white/[0.01] p-4 text-center">
                    <span className="block font-display text-3xl font-extrabold text-gold-500">Top 15%</span>
                    <span className="mt-1 block font-mono text-xs text-gray-400 uppercase">TryHackMe Rank</span>
                  </div>
                  <div className="rounded-xl border border-white/5 bg-white/[0.01] p-4 text-center">
                    <span className="block font-display text-3xl font-extrabold text-gold-500">38</span>
                    <span className="mt-1 block font-mono text-xs text-gray-400 uppercase">Rooms Solved</span>
                  </div>
                  <div className="rounded-xl border border-white/5 bg-white/[0.01] p-4 text-center">
                    <span className="block font-display text-3xl font-extrabold text-gold-500">3+</span>
                    <span className="mt-1 block font-mono text-xs text-gray-400 uppercase">CTFs Played</span>
                  </div>
                </div>
              </div>

              {/* Education & Info Sidebar */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Education Card */}
                <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-md space-y-4">
                  <div className="flex items-center space-x-3 text-gold-400">
                    <BookOpen className="h-5 w-5" />
                    <h3 className="font-display text-lg font-bold">Education</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="relative pl-4 border-l border-gold-500/30">
                      <span className="text-xs font-mono text-gold-400">2024 - Present</span>
                      <h4 className="font-display font-semibold text-white text-sm">National Engineering College</h4>
                      <p className="text-xs text-gray-400">B.E. Computer Science & Engineering (Domain: Cybersecurity)</p>
                      <p className="text-xs text-gray-500 mt-0.5">Currently studying in II Year</p>
                    </div>

                    <div className="relative pl-4 border-l border-white/10">
                      <span className="text-xs font-mono text-gray-400">2022 - 2024</span>
                      <h4 className="font-display font-semibold text-white text-sm">Vel's Vidhyalaya</h4>
                      <p className="text-xs text-gray-400">Higher Secondary Education (Bio-Maths Group)</p>
                      <p className="text-xs text-gold-400/80 font-mono mt-0.5">Aggregate: 91%</p>
                    </div>
                  </div>
                </div>

                {/* Languages Card */}
                <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-md space-y-4">
                  <div className="flex items-center space-x-3 text-gold-400">
                    <Globe className="h-5 w-5" />
                    <h3 className="font-display text-lg font-bold">Languages</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-lg bg-white/5 border border-white/5 px-3 py-1 text-sm font-mono">Tamil (Native)</span>
                    <span className="rounded-lg bg-white/5 border border-white/5 px-3 py-1 text-sm font-mono">English (Professional)</span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="py-20 border-t border-white/5">
          <div className="space-y-12">
            <div>
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-gold-500">02 / Capabilities</span>
              <h2 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Skills & Knowledge</h2>
              <p className="mt-4 max-w-xl font-sans text-gray-400">
                Core cybersecurity domains and specialized tools I leverage for vulnerability assessment and auditing.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              
              {/* Tool - Wireshark */}
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6 hover:border-gold-500/20 transition-all duration-300 space-y-4">
                <div className="rounded-lg bg-blue-500/10 p-3 text-blue-400 w-fit">
                  <Activity className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-white text-lg">Wireshark</h3>
                  <p className="text-xs font-mono text-gold-500">Network Sniffing & Analysis</p>
                </div>
                <p className="text-sm text-gray-400">
                  Inspecting live and captured packets to analyze network traffic patterns, discover bottlenecks, and isolate malicious transmissions.
                </p>
              </div>

              {/* Tool - Splunk */}
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6 hover:border-gold-500/20 transition-all duration-300 space-y-4">
                <div className="rounded-lg bg-purple-500/10 p-3 text-purple-400 w-fit">
                  <Cpu className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-white text-lg">Splunk</h3>
                  <p className="text-xs font-mono text-gold-500">SIEM & Log Monitoring</p>
                </div>
                <p className="text-sm text-gray-400">
                  Using Splunk dashboard to search logs, trace alerts, detect anomalies, and perform defensive incident monitoring on systems.
                </p>
              </div>

              {/* Tool - Burpsuite */}
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6 hover:border-gold-500/20 transition-all duration-300 space-y-4">
                <div className="rounded-lg bg-orange-500/10 p-3 text-orange-400 w-fit">
                  <Lock className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-white text-lg">Burpsuite</h3>
                  <p className="text-xs font-mono text-gold-500">Web App Auditing</p>
                </div>
                <p className="text-sm text-gray-400">
                  Intercepting HTTP requests, proxying traffic, and scanning web pages to audit parameters and exploit API/injection flaws.
                </p>
              </div>

              {/* Core Skill - OSINT */}
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6 hover:border-gold-500/20 transition-all duration-300 space-y-4">
                <div className="rounded-lg bg-gold-500/10 p-3 text-gold-400 w-fit">
                  <Target className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-white text-lg">OSINT</h3>
                  <p className="text-xs font-mono text-gold-500">Reconnaissance</p>
                </div>
                <p className="text-sm text-gray-400">
                  Gathering intelligence via metadata, search indexes, open-source footprints, DNS structures, and digital records.
                </p>
              </div>

            </div>

            {/* Knowledge Badges */}
            <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-6 space-y-4">
              <h4 className="font-display text-sm font-bold text-gray-400 uppercase tracking-widest">Additional Knowledge & Frameworks</h4>
              <div className="flex flex-wrap gap-2.5">
                <span className="rounded-lg border border-white/5 bg-white/5 px-4 py-2 font-mono text-xs hover:border-gold-500/20 transition-colors">Networking & Firewalls</span>
                <span className="rounded-lg border border-white/5 bg-white/5 px-4 py-2 font-mono text-xs hover:border-gold-500/20 transition-colors">Vulnerability Scanning</span>
                <span className="rounded-lg border border-white/5 bg-white/5 px-4 py-2 font-mono text-xs hover:border-gold-500/20 transition-colors">Malware Analysis Fundamentals</span>
                <span className="rounded-lg border border-white/5 bg-white/5 px-4 py-2 font-mono text-xs hover:border-gold-500/20 transition-colors">Command Line (Linux/Bash/PowerShell)</span>
                <span className="rounded-lg border border-white/5 bg-white/5 px-4 py-2 font-mono text-xs hover:border-gold-500/20 transition-colors">Threat Reconnaissance</span>
                <span className="rounded-lg border border-white/5 bg-white/5 px-4 py-2 font-mono text-xs hover:border-gold-500/20 transition-colors">Ethical Hacking Methodologies</span>
              </div>
            </div>

          </div>
        </section>

        {/* CERTIFICATIONS SECTION */}
        <section id="certifications" className="py-20 border-t border-white/5">
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between">
              <div>
                <span className="font-mono text-xs font-semibold uppercase tracking-widest text-gold-500">03 / Accreditations</span>
                <h2 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Certifications</h2>
              </div>
              <p className="mt-4 max-w-sm font-sans text-gray-400 md:mt-0">
                Verified training and credentials completing complex practical coursework.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              
              {/* Cert 1 */}
              <div className="relative group overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-6 hover:border-gold-500/20 transition-all duration-300">
                <div className="absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-gold-500/5 blur-xl group-hover:bg-gold-500/10 transition-colors" />
                
                <div className="flex items-start space-x-4">
                  <div className="rounded-xl bg-gold-500/10 p-3 text-gold-400">
                    <Award className="h-6 w-6" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <span className="text-xs font-mono text-gold-500">Udemy Credential</span>
                    <h3 className="font-display text-xl font-bold leading-snug text-white group-hover:text-gold-400 transition-colors">
                      The Complete OSINT (Open Source Intelligence) Training
                    </h3>
                    <p className="text-sm text-gray-400">
                      In-depth instruction on gathering digital footprints, investigating networks, auditing exposures, and mapping metadata domains.
                    </p>
                    <div className="flex items-center space-x-2 text-xs font-mono text-gray-500">
                      <span>Completed Coursework</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cert 2 */}
              <div className="relative group overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-6 hover:border-gold-500/20 transition-all duration-300">
                <div className="absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-blue-500/5 blur-xl group-hover:bg-blue-500/10 transition-colors" />
                
                <div className="flex items-start space-x-4">
                  <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400">
                    <Award className="h-6 w-6" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <span className="text-xs font-mono text-blue-400">Udemy Credential</span>
                    <h3 className="font-display text-xl font-bold leading-snug text-white group-hover:text-blue-400 transition-colors">
                      Practical Malware Analysis for Beginners
                    </h3>
                    <p className="text-sm text-gray-400">
                      Covers basic static and dynamic analysis, setting up sandbox isolation environments, inspecting headers, and auditing API registries of executables.
                    </p>
                    <div className="flex items-center space-x-2 text-xs font-mono text-gray-500">
                      <span>Completed Coursework</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* PROJECTS & CTF TIMELINE (PRACTICE) */}
        <section id="practice" className="py-20 border-t border-white/5">
          <div className="space-y-12">
            <div>
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-gold-500">04 / Performance</span>
              <h2 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Projects & Competitions</h2>
              <p className="mt-4 max-w-xl font-sans text-gray-400">
                Practical activities where I test security models, exploit misconfigurations, and solve CTF rooms.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
              
              {/* CTF timeline */}
              <div className="lg:col-span-7 space-y-8">
                <h3 className="font-display text-lg font-bold text-white flex items-center space-x-2">
                  <Terminal className="h-5 w-5 text-gold-500" />
                  <span>Recent CTF Contests</span>
                </h3>
                
                <div className="relative pl-6 space-y-8 border-l border-white/10">
                  
                  {/* Item 1 */}
                  <div className="relative">
                    <div className="absolute -left-[31px] top-1 h-4 w-4 rounded-full border border-gold-500 bg-black" />
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="rounded bg-gold-500/10 px-2 py-0.5 text-xs font-mono text-gold-400">2026</span>
                        <span className="text-xs text-gray-500">Contestant</span>
                      </div>
                      <h4 className="font-display text-lg font-bold text-white">MythX CTF</h4>
                      <p className="text-sm text-gold-500/80 font-mono">KIET, Ghaziabad</p>
                      <p className="text-sm text-gray-400">
                        Fought in multi-hour security contests, breaking files, hacking mock ports, and analyzing cryptographic cipher files.
                      </p>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="relative">
                    <div className="absolute -left-[31px] top-1 h-4 w-4 rounded-full border border-white/20 bg-black" />
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="rounded bg-white/5 px-2 py-0.5 text-xs font-mono text-gray-400">2025</span>
                        <span className="text-xs text-gray-500">Contestant</span>
                      </div>
                      <h4 className="font-display text-lg font-bold text-white">PicoCTF</h4>
                      <p className="text-sm text-gray-500 font-mono">CMU Africa</p>
                      <p className="text-sm text-gray-400">
                        Solved Jeopardy-style tasks including reverse engineering binaries, web hacking, and scanning packet capture files.
                      </p>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div className="relative">
                    <div className="absolute -left-[31px] top-1 h-4 w-4 rounded-full border border-white/20 bg-black" />
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="rounded bg-white/5 px-2 py-0.5 text-xs font-mono text-gray-400">2025</span>
                        <span className="text-xs text-gray-500">Contestant</span>
                      </div>
                      <h4 className="font-display text-lg font-bold text-white">Questcon CTF</h4>
                      <p className="text-sm text-gray-500 font-mono">OWASP PCCOE</p>
                      <p className="text-sm text-gray-400">
                        Participated in OWASP chapter cyber challenges, identifying vulnerabilities in standard configurations and script formats.
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* TryHackMe Interactive Widget */}
              <div className="lg:col-span-5 flex flex-col justify-start">
                <div className="sticky top-28 rounded-2xl border border-white/5 bg-[#111] p-6 hover:border-gold-500/20 shadow-2xl transition-all duration-300 space-y-6">
                  
                  {/* Header widget */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-red-500">
                      <Flame className="h-6 w-6 animate-pulse" />
                      <span className="font-display text-sm font-extrabold tracking-widest uppercase">TryHackMe Profile</span>
                    </div>
                    <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-[10px] font-mono text-red-400">LIVE STATS</span>
                  </div>

                  {/* User info */}
                  <div className="flex items-center space-x-4 border-b border-white/5 pb-4">
                    <div className="relative">
                      <div className="h-12 w-12 rounded-full border border-white/10 bg-black/60 flex items-center justify-center font-display font-extrabold text-gold-500 text-lg">
                        T
                      </div>
                      <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#111] bg-green-500" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-white text-base">triotreek</h4>
                      <p className="text-xs text-gray-400 font-mono">Rank: top 15%</p>
                    </div>
                  </div>

                  {/* Stats list */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-black/40 p-4 border border-white/5">
                      <span className="block text-[10px] font-mono text-gray-500 uppercase">Rooms Solved</span>
                      <span className="block font-display text-2xl font-extrabold text-white mt-1">38</span>
                    </div>
                    <div className="rounded-lg bg-black/40 p-4 border border-white/5">
                      <span className="block text-[10px] font-mono text-gray-500 uppercase">Percentile</span>
                      <span className="block font-display text-2xl font-extrabold text-gold-500 mt-1">15%</span>
                    </div>
                  </div>

                  {/* Shimmer loading bar representing current rank progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono text-gray-500">
                      <span>Percentile Progress</span>
                      <span>85 / 100</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
                      <div className="h-full rounded-full bg-gold-500 progress-bar" style={{ width: '85%' }} />
                    </div>
                  </div>

                  {/* CTA link */}
                  <a 
                    href="https://tryhackme.com/p/triotreek" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center space-x-2 rounded-lg bg-red-500 hover:bg-red-400 py-3 font-display font-bold text-white shadow-lg shadow-red-500/10 hover:scale-[1.01] transition-all duration-300 cursor-pointer"
                  >
                    <span>View THM Profile</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* INTERESTS SECTION */}
        <section id="interests" className="py-20 border-t border-white/5">
          <div className="space-y-12">
            <div>
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-gold-500">05 / Personal</span>
              <h2 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Areas of Interest</h2>
              <p className="mt-4 max-w-xl font-sans text-gray-400">
                Core cybersecurity segments that capture my attention and focus my continuous learning efforts.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              
              {/* Interest 1 */}
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6 hover:border-gold-500/20 transition-all duration-300 space-y-3">
                <Lock className="h-6 w-6 text-gold-500" />
                <h3 className="font-display font-bold text-white text-lg">Penetration Testing</h3>
                <p className="text-sm text-gray-400">
                  Exploiting system and network vulnerabilities legally to verify defensive controls, find security gaps, and draft corrective guidelines.
                </p>
              </div>

              {/* Interest 2 */}
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6 hover:border-gold-500/20 transition-all duration-300 space-y-3">
                <Shield className="h-6 w-6 text-gold-500" />
                <h3 className="font-display font-bold text-white text-lg">OSINT Research</h3>
                <p className="text-sm text-gray-400">
                  Investigating open source databases, DNS profiles, leak records, and metadata tracks to model adversarial profiles and protect exposures.
                </p>
              </div>

              {/* Interest 3 */}
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6 hover:border-gold-500/20 transition-all duration-300 space-y-3">
                <Terminal className="h-6 w-6 text-gold-500" />
                <h3 className="font-display font-bold text-white text-lg">Malware Defenses</h3>
                <p className="text-sm text-gray-400">
                  Understanding binary formats, headers, network calls, and filesystem changes made by malware to deploy SIEM filters and protect systems.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* HOBBIES SECTION */}
        <section id="hobbies" className="py-20 border-t border-white/5">
          <div className="space-y-12">
            <div>
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-gold-500">06 / Creative</span>
              <h2 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Hobbies & Creativity</h2>
              <p className="mt-4 max-w-xl font-sans text-gray-400">
                Outside of terminal consoles, I channel my problem-solving skills into micro arts and digital animation layouts.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              
              {/* Hobby 1 */}
              <div className="group rounded-2xl border border-white/5 bg-white/[0.02] p-6 hover:border-gold-500/20 transition-all duration-300 space-y-4">
                <div className="rounded-xl bg-gold-500/10 p-3 text-gold-400 w-fit group-hover:bg-gold-500/20 transition-colors">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-white">Micro Art Creation</h3>
                <p className="text-sm text-gray-400">
                  Sculpting and constructing detailed art layouts on micro-scale materials. Requires intense patience, steady focus, and extreme precision.
                </p>
              </div>

              {/* Hobby 2 */}
              <div className="group rounded-2xl border border-white/5 bg-white/[0.02] p-6 hover:border-gold-500/20 transition-all duration-300 space-y-4">
                <div className="rounded-xl bg-gold-500/10 p-3 text-gold-400 w-fit group-hover:bg-gold-500/20 transition-colors">
                  <Code className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-white">Video Editing</h3>
                <p className="text-sm text-gray-400">
                  Splicing clips, coordinating audios, correcting colors, and setting pacing to produce polished video segments for presentations.
                </p>
              </div>

              {/* Hobby 3 */}
              <div className="group rounded-2xl border border-white/5 bg-white/[0.02] p-6 hover:border-gold-500/20 transition-all duration-300 space-y-4">
                <div className="rounded-xl bg-gold-500/10 p-3 text-gold-400 w-fit group-hover:bg-gold-500/20 transition-colors">
                  <Cpu className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-white">Animating Cartoons</h3>
                <p className="text-sm text-gray-400">
                  Creating character models and configuring frame layouts to animate dynamic characters and produce simple graphical narratives.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-20 border-t border-white/5">
          <div className="space-y-12">
            <div>
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-gold-500">07 / Inquiries</span>
              <h2 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Contact Me</h2>
              <p className="mt-4 max-w-xl font-sans text-gray-400">
                Have a question or interested in collaborating? Leave me a message below or reach out directly.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
              
              {/* Direct Info */}
              <div className="lg:col-span-5 space-y-4">
                
                {/* Email card */}
                <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.01] p-5 backdrop-blur-md">
                  <div className="flex items-center space-x-4">
                    <div className="rounded-lg bg-gold-500/10 p-3 text-gold-400">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="block text-xs font-mono text-gray-500">Email Address</span>
                      <span className="font-display text-sm font-semibold text-white">trio832206@gmail.com</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleCopy('trio832206@gmail.com', 'email')}
                    className="rounded-lg bg-white/5 hover:bg-white/10 p-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
                    aria-label="Copy email"
                  >
                    {copiedText === 'email' ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>

                {/* Phone card */}
                <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.01] p-5 backdrop-blur-md">
                  <div className="flex items-center space-x-4">
                    <div className="rounded-lg bg-gold-500/10 p-3 text-gold-400">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="block text-xs font-mono text-gray-500">Phone Number</span>
                      <span className="font-display text-sm font-semibold text-white">+91 7010371588</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleCopy('+91 7010371588', 'phone')}
                    className="rounded-lg bg-white/5 hover:bg-white/10 p-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
                    aria-label="Copy phone"
                  >
                    {copiedText === 'phone' ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>



              </div>

              {/* Form */}
              <div className="lg:col-span-7">
                <form onSubmit={handleFormSubmit} className="space-y-4 rounded-2xl border border-white/5 bg-white/[0.02] p-6 md:p-8 backdrop-blur-md">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="form-name" className="block font-mono text-xs text-gray-400 uppercase">Your Name</label>
                      <input 
                        id="form-name"
                        type="text" 
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="e.g. Alice"
                        className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500 transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="form-email" className="block font-mono text-xs text-gray-400 uppercase">Email Address</label>
                      <input 
                        id="form-email"
                        type="email" 
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="e.g. alice@example.com"
                        className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500 transition-colors"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="form-message" className="block font-mono text-xs text-gray-400 uppercase">Message</label>
                    <textarea 
                      id="form-message"
                      rows={5}
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Write your message here..."
                      className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500 transition-colors resize-none"
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="flex w-full items-center justify-center space-x-2 rounded-lg bg-gold-500 hover:bg-gold-400 py-3 font-display font-bold text-black hover:scale-[1.01] transition-all duration-300 disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">Sending Message...</span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </button>

                  <AnimatePresence>
                    {formSuccess && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="rounded-lg border border-green-500/20 bg-green-500/10 p-4 text-center text-sm text-green-400"
                      >
                        Message sent successfully! I will get back to you soon.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/5 bg-black py-12 text-center">
        <div className="mx-auto max-w-7xl px-6 space-y-6">
          <div className="flex items-center justify-center space-x-2">
            <Shield className="h-5 w-5 text-gold-500" />
            <span className="font-display font-extrabold tracking-wider text-white">INIYAN A</span>
          </div>
          <p className="text-xs text-gray-500 font-mono">
            &copy; {new Date().getFullYear()} INIYAN A. ALL RIGHTS RESERVED. SECURED ENVIRONMENT.
          </p>
        </div>
      </footer>

    </div>
  );
}
