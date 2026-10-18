import React, { useState, useEffect } from 'react';
import { Mail, Terminal, Cpu, Globe, Leaf, Radio, PenTool, Sparkles, ArrowUpRight, Users, FolderGit2, Calendar, Award } from 'lucide-react';

const Linkedin = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const statsData = [
  { label: "Active Members", value: "50+", icon: <Users size={18} className="text-primary" /> },
  { label: "Projects", value: "20+", icon: <FolderGit2 size={18} className="text-secondary" /> },
  { label: "Events", value: "15+", icon: <Calendar size={18} className="text-primary" /> },
  { label: "Years Running", value: "5+", icon: <Award size={18} className="text-secondary" /> },
];

const dummyTeamData = [
  {
    id: "helm",
    category: "Meet The Helm",
    code: "SYS.HELMSMAN",
    subtitle: "Leading CSI with vision and dedication",
    icon: <Globe className="text-primary" size={28} />,
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
    icon: <Leaf className="text-secondary" size={28} />,
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
    icon: <Terminal className="text-primary" size={28} />,
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
    icon: <Cpu className="text-secondary" size={28} />,
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
    icon: <Radio className="text-primary" size={28} />,
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
    icon: <PenTool className="text-secondary" size={28} />,
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

const TeamNew = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [textIndex, setTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

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
    <div className="min-h-screen bg-background py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans text-foreground">
      
      {/* --- HERO SECTION --- */}
      <div className="max-w-7xl mx-auto text-center mb-20 relative z-10 flex flex-col items-center">
        
        <div className="inline-flex items-center gap-2.5 border border-border bg-muted px-5 py-2 rounded-full mb-8 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span className="text-xs font-bold text-primary tracking-[0.2em] uppercase">
            CSI // Club of Sustainability & Innovation
          </span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 text-foreground">
          CSI <span className="text-primary">NEXUS</span>
        </h1>

        <div className="h-12 md:h-14 flex items-center justify-center mb-4">
          <h2 className="text-xl md:text-3xl font-bold text-secondary tracking-wide">
            {displayedText}
            <span className="inline-block w-2.5 h-6 md:h-8 bg-primary ml-1.5 align-middle animate-pulse"></span>
          </h2>
        </div>

        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed mb-12">
          Driving innovation and sustainability forward. Meet the passionate individuals behind our mission to create a sustainable future through technology and innovation.
        </p>

        {/* --- STATS BAR --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl mb-16">
          {statsData.map((stat, idx) => (
            <div 
              key={idx} 
              className="group bg-card border border-border rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-soft"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                {stat.icon}
                <span className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
                  {stat.value}
                </span>
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* --- DEPARTMENT FILTER PILLS --- */}
        <div className="flex flex-wrap justify-center gap-2.5 p-2 bg-card border border-border rounded-2xl max-w-4xl shadow-sm">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              activeFilter === 'all'
                ? 'bg-primary text-primary-foreground shadow-soft'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            All Units ({dummyTeamData.reduce((acc, s) => acc + s.members.length, 0)})
          </button>
          {dummyTeamData.map((sec) => (
            <button
              key={sec.id}
              onClick={() => setActiveFilter(sec.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeFilter === sec.id
                  ? 'bg-primary text-primary-foreground shadow-soft'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
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
            
            <div className="relative flex flex-col items-center justify-center text-center">
              <div className="relative bg-card border border-border p-4 rounded-2xl mb-4 shadow-sm flex items-center justify-center">
                {section.icon}
              </div>

              <span className="text-[10px] font-bold uppercase tracking-[0.25em] px-3 py-1 rounded-full border border-border bg-muted text-primary mb-3">
                {section.code}
              </span>
              
              <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tight mb-2">
                {section.category}
              </h2>
              <p className="text-muted-foreground font-medium text-xs md:text-sm tracking-widest uppercase">
                {section.subtitle}
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-10 lg:gap-12">
              {section.members.map((member) => (
                <div key={member.id} className="relative group w-72 md:w-80">
                  
                  <div className="relative h-full bg-card border border-border rounded-[2rem] p-8 flex flex-col items-center overflow-hidden transition-all duration-500 ease-out group-hover:-translate-y-2 shadow-soft hover:shadow-lg">
                    
                    <div className="w-full flex items-center justify-between mb-6 z-10 px-1">
                      <span className="border border-border bg-muted px-2.5 py-0.5 rounded text-[10px] font-bold text-muted-foreground tracking-wider uppercase">
                        ID // {member.id}
                      </span>
                    </div>

                    <div className="relative w-36 h-36 mb-7">
                      <div className="absolute inset-0 border-2 border-border group-hover:border-primary rounded-full transition-colors duration-500"></div>
                      
                      <div className="absolute inset-2 rounded-full overflow-hidden border-2 border-border bg-muted">
                        <img 
                          src={member.img} 
                          alt={member.name} 
                          className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-all duration-700 ease-out"
                        />
                      </div>
                    </div>
                    
                    <h3 className="text-xl md:text-2xl font-bold text-foreground tracking-tight text-center mb-1.5 group-hover:text-primary transition-colors">
                      {member.name}
                    </h3>
                    
                    <p className="text-xs font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full border border-border bg-muted text-secondary mb-7">
                      {member.role}
                    </p>
                    
                    <div className="flex items-center justify-center gap-4 mt-auto w-full bg-background border border-border rounded-2xl p-2.5">
                      <a 
                        href={member.mail} 
                        title={`Email ${member.name}`}
                        className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-card hover:bg-primary text-muted-foreground hover:text-primary-foreground text-xs font-bold transition-all duration-300 shadow-sm"
                      >
                        <Mail size={16} />
                        <span>MAIL</span>
                      </a>
                      <a 
                        href={member.linkedin} 
                        target="_blank" 
                        rel="noreferrer"
                        title={`${member.name} on LinkedIn`}
                        className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-card hover:bg-secondary text-muted-foreground hover:text-primary-foreground text-xs font-bold transition-all duration-300 shadow-sm"
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

      {/* --- CTA BANNER --- */}
      <div className="max-w-5xl mx-auto mt-36 relative z-10">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-card p-10 md:p-14 shadow-soft">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                <Sparkles size={14} />
                <span>Next-Gen Collaboration</span>
              </div>
              <h3 className="text-3xl md:text-5xl font-black text-foreground tracking-tight">
                Where ideas meet <span className="text-secondary">impact.</span>
              </h3>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed font-medium">
                Let's team up to create meaningful, sustainable, and innovative projects together!
              </p>
            </div>

            <a 
              href="#contact" 
              className="shrink-0 group inline-flex items-center gap-3 bg-primary text-primary-foreground font-bold px-8 py-4 rounded-2xl shadow-soft hover:bg-secondary hover:-translate-y-1 transition-all duration-300"
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

export default TeamNew;