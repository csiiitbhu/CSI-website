import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown, ArrowUpRight, Sparkles, Sun, Moon, CheckCircle2 } from 'lucide-react';

const dummyAchievements = [
  {
    id: 1,
    number: "01",
    category: "NATIONAL HACKATHON • 2026",
    title: "Smart India Hackathon Grand Finale Finalists",
    description:
      "We engineered a full-stack green-tech geospatial architecture with interactive 3D map visualizations, placing in the top 1% out of 50,000+ teams nationwide.",
    badge: "🏆 Top 1% Nationwide",
    metrics: ["3D WebGIS Engine", "MERN Architecture", "National Finale"],
    bgColor: "bg-[#a84315]", // Warm Terracotta from video
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 2,
    number: "02",
    category: "SUSTAINABILITY • 2026",
    title: "Cut hostel energy wastage by 24% with AI smart-grid",
    description:
      "Awarded 1st Place and a ₹1,00,000 innovation grant at the Eco-Innovate National Summit for designing an automated IoT & AI energy optimization blueprint.",
    badge: "🥇 1st Place Winner",
    metrics: ["₹1,00,000 Grant", "24% Energy Saved", "IoT + AI Grid"],
    bgColor: "bg-[#0d6e52]", // Deep Forest Emerald from video
    image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 3,
    number: "03",
    category: "CAMPUS CULTURE • 2025",
    title: "Turning sustainability into a live multiplayer experience",
    description:
      "We paired bold gamification with a real-time betting quiz and live leaderboard at the freshman induction stall, engaging over 500+ students simultaneously.",
    badge: "⚡ 500+ Live Players",
    metrics: ["Highest Stall Footfall", "Zero-Latency Sync", "Best Club Stall"],
    bgColor: "bg-[#d6006e]", // Vibrant Magenta from video
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 4,
    number: "04",
    category: "AI & RESEARCH • 2025",
    title: "Forecasting urban air quality spikes 48 hours ahead",
    description:
      "An approachable deep-learning atmospheric model turns live climate telemetry into actionable environmental warnings with 96.8% validation accuracy.",
    badge: "🌟 Best Research Model",
    metrics: ["96.8% Precision", "Open-Source Dataset", "Climate-AI"],
    bgColor: "bg-[#3b28cc]", // Royal Indigo from video
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 5,
    number: "05",
    category: "CIRCULAR ECONOMY • 2025",
    title: "Diverting 400kg+ of campus e-waste from landfills",
    description:
      "Spearheaded a month-long electronic waste collection and hardware upcycling marathon across 12 hostels, earning UN SDG Youth Changemaker recognition.",
    badge: "🌍 UN SDG Recognized",
    metrics: ["400kg+ E-Waste Recycled", "12 Hostels Covered", "Hardware Upcycling"],
    bgColor: "bg-[#143d59]", // Deep Slate Blue
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1000&q=80",
  },
];

const Achievements = () => {
  const stackContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [darkMode, setDarkMode] = useState(false); // Defaults to the exact cream look from the video

  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      if (!stackContainerRef.current) return;
      const rect = stackContainerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;

      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const clampedProgress = Math.max(0, Math.min(1, currentScroll / totalScrollable));

      animationFrameId = requestAnimationFrame(() => {
        setScrollProgress(clampedProgress);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const totalCards = dummyAchievements.length;
  // Ranges from 0 to (totalCards - 1) as user scrolls through the sticky zone
  const activeFloat = scrollProgress * (totalCards - 1);
  const currentCardIndex = Math.min(totalCards - 1, Math.round(activeFloat));

  // Jump smoothly to a specific card in the stack when clicking a pagination dot
  const scrollToCard = (index : number) => {
    if (!stackContainerRef.current) return;
    const rect = stackContainerRef.current.getBoundingClientRect();
    const containerTop = window.scrollY + rect.top;
    const totalScrollable = rect.height - window.innerHeight;
    const targetScroll = containerTop + (index / (totalCards - 1)) * totalScrollable;

    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 font-sans ${
        darkMode ? 'bg-[#070709] text-zinc-100' : 'bg-[#f4f1ea] text-zinc-900'
      }`}
    >
      {/* --- FLOATING THEME TOGGLE --- */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold shadow-lg border backdrop-blur-md transition-all ${
          darkMode
            ? 'bg-zinc-900/90 border-zinc-700 text-zinc-200 hover:bg-zinc-800'
            : 'bg-white/90 border-zinc-300 text-zinc-800 hover:bg-white'
        }`}
      >
        {darkMode ? <Sun size={15} className="text-amber-400" /> : <Moon size={15} className="text-zinc-700" />}
        <span>{darkMode ? 'Editorial Light' : 'Cyber Dark'}</span>
      </button>

      {/* --- 1. INTRO SCREEN ("Design That Delivers." equivalent) --- */}
      <section className="h-[85vh] w-full flex flex-col items-center justify-between py-12 px-4 relative">
        {/* Top "Scroll Down" Indicator */}
        <div
          className={`flex items-center gap-3 text-base md:text-lg font-medium tracking-tight ${
            darkMode ? 'text-zinc-400' : 'text-zinc-800'
          }`}
        >
          <ArrowDown size={18} className="animate-bounce" />
          <span>Scroll Down</span>
          <ArrowDown size={18} className="animate-bounce" />
        </div>

        {/* Center Impact Headline */}
        <div className="text-center max-w-4xl mx-auto my-auto">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-6 border ${
              darkMode
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-[#a84315]/10 border-[#a84315]/25 text-[#a84315]'
            }`}
          >
            <Sparkles size={13} />
            <span>Club of Sustainability & Innovation</span>
          </div>

          <h1
            className={`text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight leading-[1.02] ${
              darkMode ? 'text-white' : 'text-[#a84315]'
            }`}
          >
            Innovation That Delivers.
          </h1>

          <p
            className={`mt-6 text-base md:text-xl max-w-xl mx-auto font-normal ${
              darkMode ? 'text-zinc-400' : 'text-zinc-600'
            }`}
          >
            Scroll through our national hackathon victories, research breakthroughs, and campus-wide sustainability deployments.
          </p>
        </div>

        <div className="h-6"></div>
      </section>

      {/* --- 2. STICKY PEELING CARD DECK SECTION --- */}
      <section
        ref={stackContainerRef}
        style={{ height: `${totalCards * 110}vh` }}
        className="relative w-full"
      >
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-10">
          
          {/* Right-Side Quick Progress Dots */}
          <div className="hidden xl:flex fixed right-8 top-1/2 -translate-y-1/2 z-40 flex-col gap-3">
            {dummyAchievements.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => scrollToCard(idx)}
                title={item.title}
                className={`w-2.5 rounded-full transition-all duration-300 ${
                  currentCardIndex === idx
                    ? darkMode
                      ? 'h-8 bg-emerald-400'
                      : 'h-8 bg-[#a84315]'
                    : darkMode
                    ? 'h-2.5 bg-zinc-700 hover:bg-zinc-500'
                    : 'h-2.5 bg-zinc-300 hover:bg-zinc-500'
                }`}
              />
            ))}
          </div>

          {/* The Deck Container */}
          <div className="relative w-full max-w-[1140px] h-[540px] sm:h-[560px] md:h-[540px]">
            {dummyAchievements.map((card, index) => {
              // Relative position of this card in the scroll sequence
              const cardProgress = activeFloat - index;

              let translateY = '0px';
              let scale = 1;

              if (cardProgress > 0) {
                // Card is peeling UP and off the top of the stack as user scrolls down
                const peelPercent = Math.min(cardProgress, 1.3) * 118;
                translateY = `-${peelPercent}%`;
                scale = 1;
              } else {
                // Card is waiting underneath in the deck — peek its bottom edge out!
                const depth = Math.max(0, -cardProgress);
                const peekOffsetPx = depth * 18; // 18px bottom strip per card underneath
                scale = Math.max(0.88, 1 - depth * 0.025);
                translateY = `${peekOffsetPx}px`;
              }

              return (
                <div
                  key={card.id}
                  style={{
                    zIndex: totalCards - index,
                    transform: `translate3d(0, ${translateY}, 0) scale(${scale})`,
                    transformOrigin: 'bottom center',
                    willChange: 'transform',
                  }}
                  className={`absolute inset-0 w-full h-full ${card.bgColor} text-white rounded-[2rem] md:rounded-[2.5rem] p-6 sm:p-10 md:p-12 shadow-[0_25px_60px_rgba(0,0,0,0.28)] border-2 border-white/20 flex flex-col md:flex-row gap-6 md:gap-10 justify-between overflow-hidden select-none`}
                >
                  {/* --- LEFT COLUMN: NUMBER + TEXT CONTENT --- */}
                  <div className="w-full md:w-[54%] flex flex-col justify-between h-full z-10">
                    {/* Top Index Number ("01", "02"...) */}
                    <div className="flex items-center justify-between">
                      <span className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white/95">
                        {card.number}
                      </span>

                      <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-black/25 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-full">
                        {card.badge}
                      </span>
                    </div>

                    {/* Bottom Editorial Stack */}
                    <div className="my-auto md:my-0 pt-2">
                      <div className="text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] text-white/90">
                        {card.category}
                      </div>

                      {/* Thin Divider Line from Video */}
                      <div className="w-full h-[1px] bg-white/35 my-3 sm:my-4"></div>

                      <h2 className="text-2xl sm:text-4xl lg:text-[2.65rem] font-bold tracking-tight leading-[1.08] mb-3 sm:mb-4 text-white">
                        {card.title}
                      </h2>

                      <p className="text-xs sm:text-sm md:text-base text-white/85 leading-relaxed font-normal max-w-xl mb-5">
                        {card.description}
                      </p>

                      {/* Key Impact Pills */}
                      <div className="hidden sm:flex flex-wrap gap-2">
                        {card.metrics.map((m, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1.5 text-xs font-medium bg-white/15 backdrop-blur-sm border border-white/20 px-3 py-1 rounded-full text-white"
                          >
                            <CheckCircle2 size={12} />
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* --- RIGHT COLUMN: FRAMED VISUAL IMAGE --- */}
                  <div className="w-full md:w-[44%] h-44 sm:h-56 md:h-full rounded-[1.5rem] md:rounded-[1.8rem] overflow-hidden relative bg-black/20 shrink-0 shadow-inner">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* --- 3. OUTRO SECTION ("The End" equivalent) --- */}
      <section className="h-[75vh] w-full flex flex-col items-center justify-center px-4 text-center">
        <p
          className={`text-xs font-mono uppercase tracking-[0.25em] mb-3 ${
            darkMode ? 'text-zinc-500' : 'text-zinc-500'
          }`}
        >
          CSI // MILESTONE ARCHIVE COMPLETE
        </p>

        <h2
          className={`text-6xl sm:text-8xl font-extrabold tracking-tight mb-8 ${
            darkMode ? 'text-white' : 'text-zinc-900'
          }`}
        >
          The End
        </h2>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-transform hover:scale-105 ${
            darkMode
              ? 'bg-emerald-500 text-zinc-950'
              : 'bg-[#a84315] text-white shadow-lg'
          }`}
        >
          <span>Replay Stack</span>
          <ArrowUpRight size={16} />
        </button>
      </section>
    </div>
  );
};

export default Achievements;