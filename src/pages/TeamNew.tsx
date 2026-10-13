import React, { useState, useEffect } from 'react';
import { Mail, Terminal, Cpu, Globe, Leaf, Radio, PenTool, Zap, Sparkles, ArrowUpRight, Users, FolderGit2, Calendar, Award } from 'lucide-react';

// Custom SVG for LinkedIn
const Linkedin = ({ size = 20 }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const statsData = [
  { label: "Active Members", value: "50+", icon: <Users size={18} className="text-emerald-400" /> },
  { label: "Projects", value: "20+", icon: <FolderGit2 size={18} className="text-cyan-400" /> },
  { label: "Events", value: "15+", icon: <Calendar size={18} className="text-purple-400" /> },
  { label: "Years Running", value: "5+", icon: <Award size={18} className="text-amber-400" /> },
];

const dummyTeamData = [
  {
    id: "helm",
    category: "Meet The Helm",
    code: "SYS.HELMSMAN",
    subtitle: "Leading CSI with vision and dedication",
    icon: <Globe className="text-emerald-400 z-10 relative" size={28} />,
    glow: "from-emerald-600 to-teal-400",
    borderGlow: "group-hover:border-emerald-500/60",
    textGlow: "group-hover:text-emerald-400 group-hover:drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]",
    ring: "border-t-emerald-400 border-b-emerald-400/30",
    scanline: "via-emerald-400/40",
    badge: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    members: [
      { id: 'H01', name: "Krish Kumar", role: "Executive Helm", img: "https://club-website-iota.vercel.app/Images/team/member-1.jpg", linkedin: "https://www.linkedin.com/in/krish-kumar/", mail: "mailto:battula.mukesh.bce23@itbhu.ac.in" },
      { id: 'H02', name: "Swostik Subhadarshan", role: "Executive Helm", img: "https://club-website-iota.vercel.app/Images/team/member-2.jpg", linkedin: "https://www.linkedin.com/in/swostik-subhadarshan-371828280/", mail: "mailto:swostik.subhadarshan.eee23@itbhu.ac.in" },
      { id: 'H03', name: "Battula Mukesh", role: "Executive Helm", img: "https://club-website-iota.vercel.app/Images/team/member-3.jpg", linkedin: "https://www.linkedin.com/in/mukesh-battula-700419294/", mail: "mailto:krish.kumar.civ23@itbhu.ac.in" },
    ]
  },
  {
    id: "esp",
    category: "ESP Team",
    code: "BIO.ECOLOGY",
    subtitle: "Environment, Society & Planet",
    icon: <Leaf className="text-green-400 z-10 relative" size={28} />,
    glow: "from-green-600 to-lime-400",
    borderGlow: "group-hover:border-green-500/60",
    textGlow: "group-hover:text-green-400 group-hover:drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]",
    ring: "border-t-green-400 border-b-green-400/30",
    scanline: "via-green-400/40",
    badge: "text-green-400 bg-green-500/10 border-green-500/30",
    members: [
      { id: 'E01', name: "Nithya Raj P", role: "ESP Lead", img: "https://club-website-iota.vercel.app/Images/team/member-4.jpg", linkedin: "https://www.linkedin.com/in/nithya-raj-p/", mail: "mailto:nithya.rajp.mst23@itbhu.ac.in" },
      { id: 'E02', name: "Meghna", role: "ESP Core", img: "https://club-website-iota.vercel.app/Images/team/member-5.jpg", linkedin: "https://www.linkedin.com/in/meghna/", mail: "mailto:meghna@csi.org.in" },
    ]
  },
  {
    id: "sde",
    category: "SDE Team",
    code: "DEV.ARCHITECT",
    subtitle: "Software Development Excellence",
    icon: <Terminal className="text-cyan-400 z-10 relative" size={28} />,
    glow: "from-cyan-600 to-blue-500",
    borderGlow: "group-hover:border-cyan-500/60",
    textGlow: "group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]",
    ring: "border-t-cyan-400 border-b-cyan-400/30",
    scanline: "via-cyan-400/40",
    badge: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
    members: [
      { id: 'S01', name: "Shubham Khetan", role: "SDE Lead", img: "https://club-website-iota.vercel.app/Images/team/member-6.jpg", linkedin: "#", mail: "mailto:shubham.pkhetan.mat23@itbhu.ac.in" },
      { id: 'S02', name: "Aryan Gautam", role: "SDE Core", img: "https://club-website-iota.vercel.app/Images/team/member-7.jpg", linkedin: "https://www.linkedin.com/404/", mail: "mailto:aryan.gautam.mec23@itbhu.ac.in" },
    ]
  },
  {
    id: "aiml",
    category: "AI/ML Team",
    code: "NEURAL.MATRIX",
    subtitle: "Artificial Intelligence & Machine Learning",
    icon: <Cpu className="text-purple-400 z-10 relative" size={28} />,
    glow: "from-fuchsia-600 to-purple-500",
    borderGlow: "group-hover:border-purple-500/60",
    textGlow: "group-hover:text-purple-400 group-hover:drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]",
    ring: "border-t-purple-400 border-b-purple-400/30",
    scanline: "via-purple-400/40",
    badge: "text-purple-400 bg-purple-500/10 border-purple-500/30",
    members: [
      { id: 'A01', name: "Sachin", role: "AI/ML Lead", img: "https://club-website-iota.vercel.app/Images/team/member-8.jpg", linkedin: "https://www.linkedin.com/in/sachin-44aa15287/", mail: "mailto:sachin.student.civ23@itbhu.ac.in" },
      { id: 'A02', name: "Prakshaale Jain", role: "AI/ML Core", img: "https://club-website-iota.vercel.app/Images/team/member-9.jpg", linkedin: "https://www.linkedin.com/in/prakshaale-jain/", mail: "mailto:prakshaale.jain.civ23@itbhu.ac.in" },
    ]
  },
  {
    id: "outreach",
    category: "Outreach Team",
    code: "COMMS.NETWORK",
    subtitle: "Community & Communication",
    icon: <Radio className="text-orange-400 z-10 relative" size={28} />,
    glow: "from-orange-600 to-amber-500",
    borderGlow: "group-hover:border-orange-500/60",
    textGlow: "group-hover:text-orange-400 group-hover:drop-shadow-[0_0_8px_rgba(251,146,60,0.8)]",
    ring: "border-t-orange-400 border-b-orange-400/30",
    scanline: "via-orange-400/40",
    badge: "text-orange-400 bg-orange-500/10 border-orange-500/30",
    members: [
      { id: 'O01', name: "Kritika Mishra", role: "Outreach Lead", img: "https://i.pravatar.cc/300?img=20", linkedin: "https://www.linkedin.com/in/kritika/", mail: "mailto:kritika@csi.org.in" },
      { id: 'O02', name: "Vaishnavi Agarwal", role: "Outreach Core", img: "https://club-website-iota.vercel.app/Images/team/member-11.jpg", linkedin: "https://www.linkedin.com/in/vaishnavi/", mail: "mailto:vaishnavi@csi.org.in" },
    ]
  },
  {
    id: "creative",
    category: "Creative Team",
    code: "GFX.STUDIO",
    subtitle: "Crafting Visual Excellence",
    icon: <PenTool className="text-pink-400 z-10 relative" size={28} />,
    glow: "from-pink-600 to-rose-400",
    borderGlow: "group-hover:border-pink-500/60",
    textGlow: "group-hover:text-pink-400 group-hover:drop-shadow-[0_0_8px_rgba(244,114,182,0.8)]",
    ring: "border-t-pink-400 border-b-pink-400/30",
    scanline: "via-pink-400/40",
    badge: "text-pink-400 bg-pink-500/10 border-pink-500/30",
    members: [
      { id: 'C01', name: "S Adithyaraj", role: "Creative Lead", img: "https://club-website-iota.vercel.app/Images/team/member-12.jpg", linkedin: "https://www.linkedin.com/in/adithyaraj/", mail: "mailto:adithyaraj@csi.org.in" },
      { id: 'C02', name: "Vedic Bhatnagar", role: "Creative Core", img: "https://club-website-iota.vercel.app/Images/team/member-13.jpg", linkedin: "https://www.linkedin.com/in/vedic/", mail: "mailto:vedic@csi.org.in" },
    ]
  }
];

const phrases = [
  "The People Powering Innovation",
  "Collaboration that Drives Change",
  "Engineering a Sustainable Future"
];

const Team = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [textIndex, setTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Smooth Typewriter Effect
  useEffect(() => {
    const currentPhrase = phrases[textIndex];
    const typingSpeed = isDeleting ? 35 : 70;

    const timer = setTimeout(() => {
      if (!isDeleting && displayedText === currentPhrase) {
        setTimeout(() => setIsDeleting(true), 1800);
      } else if (isDeleting && displayedText === '') {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % phrases.length);
      } else {
        setDisplayedText(
          currentPhrase.substring(0, displayedText.length + (isDeleting ? -1 : 1))
        );
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, textIndex]);

  const filteredSections = activeFilter === 'all' 
    ? dummyTeamData 
    : dummyTeamData.filter(sec => sec.id === activeFilter);

  return (
    <div className="min-h-screen bg-[#040406] py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans text-zinc-300 selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* --- CYBERPUNK AMBIENT MATRIX --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>
      <div className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] bg-emerald-900/25 blur-[160px] rounded-full pointer-events-none"></div>
      <div className="absolute top-[30%] right-[-15%] w-[45%] h-[45%] bg-cyan-900/20 blur-[160px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-15%] left-[20%] w-[50%] h-[40%] bg-purple-900/15 blur-[160px] rounded-full pointer-events-none"></div>

      {/* --- HERO SECTION --- */}
      <div className="max-w-7xl mx-auto text-center mb-20 relative z-10 flex flex-col items-center">
        
        {/* Top Floating Status Pill */}
        <div className="inline-flex items-center gap-2.5 border border-emerald-500/30 bg-emerald-950/20 backdrop-blur-xl px-5 py-2 rounded-full mb-8 shadow-[0_0_25px_rgba(16,185,129,0.15)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-mono text-emerald-300 tracking-[0.2em] uppercase">
            CSI // Club of Sustainability & Innovation
          </span>
        </div>
        
        {/* Main Brand Title */}
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-100 to-zinc-500">
          CSI <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">NEXUS</span>
        </h1>

        {/* Dynamic Typewriter Subtitle */}
        <div className="h-12 md:h-14 flex items-center justify-center mb-4">
          <h2 className="text-xl md:text-3xl font-bold text-zinc-200 tracking-wide font-mono">
            {displayedText}
            <span className="inline-block w-2.5 h-6 md:h-8 bg-emerald-400 ml-1.5 align-middle animate-pulse shadow-[0_0_10px_#34d399]"></span>
          </h2>
        </div>

        <p className="text-base md:text-lg text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed mb-12">
          Driving innovation and sustainability forward. Meet the passionate individuals behind our mission to create a sustainable future through technology and innovation.
        </p>

        {/* --- HUD TELEMETRY STATS BAR --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl mb-16">
          {statsData.map((stat, idx) => (
            <div 
              key={idx} 
              className="relative group bg-zinc-900/40 backdrop-blur-md border border-zinc-800/80 hover:border-emerald-500/40 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute -right-4 -top-4 w-16 h-16 bg-emerald-500/5 rounded-full blur-xl group-hover:bg-emerald-500/20 transition-all"></div>
              <div className="flex items-center justify-center gap-2 mb-2">
                {stat.icon}
                <span className="text-3xl md:text-4xl font-black text-white tracking-tight">
                  {stat.value}
                </span>
              </div>
              <p className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* --- INTERACTIVE DEPARTMENT FILTER PILLS --- */}
        <div className="flex flex-wrap justify-center gap-2.5 p-2 bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/80 rounded-2xl max-w-4xl">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
              activeFilter === 'all'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-zinc-950 font-bold shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
            }`}
          >
            All Units ({dummyTeamData.reduce((acc, s) => acc + s.members.length, 0)})
          </button>
          {dummyTeamData.map((sec) => (
            <button
              key={sec.id}
              onClick={() => setActiveFilter(sec.id)}
              className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                activeFilter === sec.id
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-zinc-950 font-bold shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
              }`}
            >
              {sec.category}
            </button>
          ))}
        </div>
      </div>

      {/* --- TEAMS DIRECTORY GRID --- */}
      <div className="max-w-7xl mx-auto space-y-32 relative z-10">
        {filteredSections.map((section) => (
          <div key={section.id} className="space-y-14">
            
            {/* Category Header */}
            <div className="relative flex flex-col items-center justify-center text-center">
              <div className={`absolute -top-4 w-28 h-28 bg-gradient-to-r ${section.glow} blur-3xl opacity-20 rounded-full pointer-events-none`}></div>
              
              <div className="relative bg-zinc-950 border border-zinc-800/90 p-4 rounded-2xl mb-4 shadow-2xl flex items-center justify-center">
                {section.icon}
              </div>

              <span className={`text-[10px] font-mono uppercase tracking-[0.25em] px-3 py-0.5 rounded-full border mb-3 ${section.badge}`}>
                {section.code}
              </span>
              
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-2">
                {section.category}
              </h2>
              <p className="text-zinc-400 font-mono text-xs md:text-sm tracking-widest uppercase">
                {section.subtitle}
              </p>
            </div>
            
            {/* Members Cards */}
            <div className="flex flex-wrap justify-center gap-10 lg:gap-12">
              {section.members.map((member) => (
                <div key={member.id} className="relative group w-72 md:w-80">
                  
                  {/* Outer Holographic Aura */}
                  <div className={`absolute -inset-1 bg-gradient-to-br ${section.glow} rounded-[2rem] blur-xl opacity-0 group-hover:opacity-35 transition duration-700 ease-out`}></div>
                  
                  {/* Card Chassis */}
                  <div className={`relative h-full bg-[#09090d]/95 backdrop-blur-xl border border-zinc-800/80 ${section.borderGlow} rounded-[2rem] p-8 flex flex-col items-center overflow-hidden transition-all duration-500 ease-out group-hover:-translate-y-2.5 shadow-2xl`}>
                    
                    {/* Corner HUD Reticles */}
                    <div className="absolute top-4 left-4 w-3 h-3 border-t-2 border-l-2 border-zinc-700 group-hover:border-emerald-400 transition-colors"></div>
                    <div className="absolute top-4 right-4 w-3 h-3 border-t-2 border-r-2 border-zinc-700 group-hover:border-emerald-400 transition-colors"></div>
                    <div className="absolute bottom-4 left-4 w-3 h-3 border-b-2 border-l-2 border-zinc-700 group-hover:border-emerald-400 transition-colors"></div>
                    <div className="absolute bottom-4 right-4 w-3 h-3 border-b-2 border-r-2 border-zinc-700 group-hover:border-emerald-400 transition-colors"></div>

                    {/* Inner Matrix Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:10px_10px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                    {/* Top Metadata Row */}
                    <div className="w-full flex items-center justify-between mb-6 z-10 px-1">
                      <span className="border border-zinc-800 bg-zinc-900/90 px-2.5 py-0.5 rounded text-[10px] font-mono text-zinc-400 tracking-wider">
                        ID // {member.id}
                      </span>
                      <span className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        ONLINE
                      </span>
                    </div>

                    {/* Avatar With Dual Orbital Rings & Laser Scanline */}
                    <div className="relative w-36 h-36 mb-7">
                      {/* Outer Orbital Ring */}
                      <div className={`absolute inset-0 border-2 border-transparent ${section.ring} rounded-full opacity-30 group-hover:opacity-100 animate-[spin_4s_linear_infinite] transition-all duration-500`}></div>
                      
                      {/* Inner Counter-Rotating Dashed Ring */}
                      <div className="absolute inset-1.5 border border-dashed border-zinc-700 group-hover:border-zinc-400 rounded-full opacity-50 group-hover:opacity-100 group-hover:animate-[spin_6s_linear_infinite_reverse] transition-all duration-500"></div>
                      
                      {/* Avatar Frame */}
                      <div className="absolute inset-3 rounded-full overflow-hidden border-2 border-zinc-800 bg-zinc-900">
                        <img 
                          src={member.img} 
                          alt={member.name} 
                          className="w-full h-full object-cover scale-110 group-hover:scale-100 grayscale-[0.7] group-hover:grayscale-0 transition-all duration-700 ease-out"
                        />
                        {/* Vertical Laser Scan Overlay on Hover */}
                        <div className={`absolute inset-0 bg-gradient-to-b from-transparent ${section.scanline} to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-1000 ease-in-out pointer-events-none`}></div>
                      </div>
                    </div>
                    
                    {/* Identity Readout */}
                    <h3 className={`text-2xl font-bold text-white tracking-tight text-center mb-1.5 transition-all duration-300 ${section.textGlow}`}>
                      {member.name}
                    </h3>
                    
                    <p className={`text-xs font-mono tracking-[0.2em] uppercase px-3 py-1 rounded-full border mb-7 ${section.badge}`}>
                      {member.role}
                    </p>
                    
                    {/* Action Dock */}
                    <div className="flex items-center justify-center gap-4 mt-auto w-full bg-zinc-900/70 border border-zinc-800/80 rounded-2xl p-2.5 backdrop-blur-md group-hover:border-zinc-700 transition-colors">
                      <a 
                        href={member.mail} 
                        title={`Email ${member.name}`}
                        className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-zinc-950/60 hover:bg-zinc-800 text-zinc-400 hover:text-white text-xs font-mono transition-all duration-300"
                      >
                        <Mail size={16} />
                        <span>MAIL</span>
                      </a>
                      <a 
                        href={member.linkedin} 
                        target="_blank" 
                        rel="noreferrer"
                        title={`${member.name} on LinkedIn`}
                        className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-zinc-950/60 hover:bg-zinc-800 text-zinc-400 hover:text-white text-xs font-mono transition-all duration-300"
                      >
                        <Linkedin size={16} />
                        <span>CONNECT</span>
                      </a>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* --- FUTURISTIC CTA BANNER ("Where ideas meet impact.") --- */}
      <div className="max-w-5xl mx-auto mt-36 relative z-10">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-emerald-500/30 bg-gradient-to-br from-zinc-900/90 via-[#071310] to-zinc-950 p-10 md:p-14 shadow-[0_0_50px_rgba(16,185,129,0.12)]">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-widest">
                <Sparkles size={14} />
                <span>Next-Gen Collaboration</span>
              </div>
              <h3 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                Where ideas meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">impact.</span>
              </h3>
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                Let's team up to create meaningful, sustainable, and innovative projects together!
              </p>
            </div>

            <a 
              href="#contact" 
              className="shrink-0 group inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-400 text-zinc-950 font-bold px-8 py-4 rounded-2xl shadow-[0_0_25px_rgba(16,185,129,0.4)] hover:shadow-[0_0_35px_rgba(16,185,129,0.7)] hover:scale-105 transition-all duration-300"
            >
              <span>Join Our Mission</span>
              <ArrowUpRight size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Team;