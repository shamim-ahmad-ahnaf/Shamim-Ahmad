import React, { useState, useEffect, useRef } from 'react';
import { SKILLS, PROJECTS } from './constants';
import { Project, Message } from './types';
import { chatWithAI } from './services/geminiService';

// Component: Project Detail Modal
const ProjectModal: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => (
  <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-6 bg-black/95 backdrop-blur-xl animate-fade-in">
    <div className="glass w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[3rem] p-8 md:p-12 relative animate-zoom-in border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)]">
      <button 
        onClick={onClose}
        className="absolute top-8 right-8 p-3 bg-white/5 hover:bg-orange-500 rounded-2xl transition-all duration-500 hover:rotate-90 z-20 group"
      >
        <svg className="w-6 h-6 text-white group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="rounded-[2.5rem] overflow-hidden shadow-2xl group/modal-img sticky top-0">
          <img src={project.imageUrl} alt={project.title} className="w-full object-cover transition-transform duration-1000 group-hover/modal-img:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/modal-img:opacity-100 transition-opacity"></div>
        </div>
        
        <div className="space-y-10">
          <div>
            <span className="text-orange-400 text-xs font-black uppercase tracking-[0.5em] mb-4 block">{project.category}</span>
            <h2 className="text-5xl md:text-7xl font-black mb-6 leading-[0.9] tracking-tighter">{project.title}</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Core Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold text-gray-300 uppercase tracking-widest hover:border-orange-500/50 transition-colors">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Project Intelligence</h4>
            <p className="text-gray-400 leading-relaxed text-lg font-light italic">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-5 pt-10 border-t border-white/5">
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex-1 text-center px-10 py-6 bg-white text-black font-black text-xs uppercase tracking-[0.3em] rounded-2xl hover:bg-orange-500 hover:text-white transition-all duration-500 hover:scale-105 shadow-xl shadow-white/5">
              Launch Site
            </a>
            <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex-1 text-center px-10 py-6 glass text-white font-black text-xs uppercase tracking-[0.3em] rounded-2xl hover:bg-white/10 transition-all duration-500 border-white/10">
              Repository
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Component: Navbar
const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
    }
  };

  const socialLinks = [
    { 
      name: 'WhatsApp', 
      href: 'https://wa.me/8801748186766', 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.417-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.305 1.652zm6.599-3.835c1.406.836 3.111 1.282 4.85 1.282 5.178 0 9.389-4.211 9.392-9.39.001-2.512-.975-4.87-2.749-6.645s-4.134-2.751-6.641-2.751c-5.178 0-9.39 4.211-9.392 9.39 0 1.814.52 3.586 1.497 5.132l-.991 3.615 3.704-.971zm11.381-7.391c-.312-.156-1.848-.911-2.136-1.014-.288-.104-.499-.156-.707.156-.208.312-.806 1.014-.988 1.221-.182.208-.364.234-.676.078-.312-.156-1.317-.485-2.51-1.548-.928-.827-1.554-1.849-1.736-2.161-.182-.312-.019-.481.137-.636.141-.139.312-.364.468-.546.156-.182.208-.312.312-.52.104-.208.052-.39-.026-.546-.078-.156-.707-1.703-.969-2.333-.255-.614-.514-.531-.707-.541-.183-.01-.39-.012-.598-.012s-.546.078-.832.39c-.286.312-1.092 1.066-1.092 2.599 0 1.534 1.118 3.016 1.274 3.224.156.208 2.199 3.358 5.326 4.706.744.321 1.324.512 1.777.656.748.237 1.43.203 1.968.123.599-.088 1.848-.754 2.109-1.482.261-.728.261-1.352.183-1.482-.078-.13-.286-.208-.598-.364z"/>
        </svg>
      )
    },
    { 
      name: 'Email', 
      href: 'mailto:shamimahmadahnaf@gmail.com', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>
      )
    }
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 animate-slide-down backdrop-blur-md border-b border-white/5 ${scrolled ? 'py-2 bg-black/60 shadow-2xl' : 'py-6 bg-transparent'}`}>
        <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between h-full">
          {/* Logo Section */}
          <button onClick={() => scrollToSection('hero')} className="text-3xl md:text-4xl font-black gradient-text tracking-tighter uppercase leading-none hover:scale-105 transition-transform duration-300">SHAMIM.</button>
          
          {/* Main Navigation (Desktop Only) */}
          <div className="hidden lg:flex items-center gap-10">
            {['Home', 'About', 'Skills', 'Projects'].map(item => (
              <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="nav-link text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 hover:text-white transition-colors duration-300">{item}</button>
            ))}
          </div>

          {/* Icons & CTA */}
          <div className="flex items-center gap-3 md:gap-8">
            <button onClick={() => scrollToSection('contact')} className="hidden sm:block px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 active:scale-95 text-[10px] font-black uppercase tracking-widest transition-all duration-300 shadow-xl shadow-orange-600/30">Let's Talk</button>
            
            {/* Social Icons in Header */}
            <div className="flex items-center gap-2 md:gap-4">
              {socialLinks.map((link) => (
                <a key={link.name} href={link.href} target="_blank" rel="noreferrer" className="p-2 md:p-2.5 rounded-xl glass border-white/5 text-gray-400 hover:text-orange-500 hover:border-orange-500/50 transition-all" aria-label={link.name}>
                  {link.icon}
                </a>
              ))}
            </div>
            
            <button className="lg:hidden p-2 text-white hover:text-orange-400 transition-colors z-[120]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">{mobileMenuOpen ? (<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>) : (<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"/>)}</svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 z-[110] backdrop-blur-sm transition-opacity duration-500 ${mobileMenuOpen ? 'opacity-100 bg-black/50' : 'opacity-0 pointer-events-none'}`} onClick={() => setMobileMenuOpen(false)}></div>
      <div className={`fixed top-0 right-0 h-full w-[300px] z-[115] glass border-l border-white/10 shadow-2xl transition-transform duration-500 transform ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full p-10 space-y-12">
          <button onClick={() => scrollToSection('hero')} className="text-3xl font-black gradient-text tracking-tighter uppercase">SHAMIM.</button>
          <div className="flex flex-col gap-8">
            {['Home', 'About', 'Skills', 'Projects'].map(item => (<button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="text-left font-black text-2xl uppercase tracking-widest hover:text-orange-400 transition-all">{item}</button>))}
          </div>
          <div className="space-y-6">
            <button onClick={() => scrollToSection('contact')} className="w-full py-5 rounded-2xl bg-orange-600 text-white font-black text-xs uppercase tracking-[0.2em] text-center shadow-lg active:scale-95 transition-all">Let's Talk Now</button>
            <div className="flex justify-center gap-6 pt-4 border-t border-white/5">
              {socialLinks.map((link) => (
                <a key={link.name} href={link.href} target="_blank" rel="noreferrer" className="p-4 rounded-2xl glass border-white/5 text-gray-400 hover:text-orange-500 hover:border-orange-500/50 transition-all" aria-label={link.name}>
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Component: Hero Section
const Hero: React.FC = () => (
  <section id="hero" className="min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-6 max-w-7xl mx-auto scroll-mt-32">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
      <div className="text-center lg:text-left order-2 lg:order-1 animate-slide-left">
        <div className="inline-block px-4 py-1.5 mb-10 rounded-full glass text-orange-400 text-[10px] font-black uppercase tracking-[0.3em] float border-orange-500/20">Senior Web Developer</div>
        <h1 className="text-7xl md:text-[8rem] font-black mb-8 tracking-tighter leading-[0.8]">Fullstack <br /> <span className="gradient-text">Excellence</span> <br /> Delivered.</h1>
        <p className="max-w-xl text-xl md:text-2xl text-gray-400 mb-14 leading-relaxed font-light mx-auto lg:mx-0">Hi, I'm <span className="text-white font-bold">Shamim Ahmad</span>. I build scalable web architectures and immersive user experiences using React, Node, and Next.js.</p>
        <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
          <button 
            onClick={() => document.getElementById('projects')?.scrollIntoView({behavior: 'smooth'})} 
            className="group relative px-12 py-6 overflow-hidden rounded-2xl bg-white text-black font-black text-sm uppercase tracking-[0.2em] transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl shadow-white/10"
          >
            <span className="relative z-10">View Projects</span>
            <div className="absolute inset-0 translate-y-full bg-orange-500 transition-transform duration-300 group-hover:translate-y-0"></div>
          </button>
          
          <a 
            href="/cv.pdf" 
            download="Shamim_Ahmad_CV.pdf"
            className="group px-12 py-6 rounded-2xl glass font-black text-sm uppercase tracking-[0.2em] hover:bg-white/10 hover:border-orange-500/40 active:scale-95 transition-all duration-300 border-white/10 flex items-center justify-center gap-4"
          >
            Download CV
            <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
            </svg>
          </a>
        </div>
      </div>
      <div className="order-1 lg:order-2 flex justify-center lg:justify-end animate-slide-right">
        <div className="relative group">
          <div className="absolute -inset-6 bg-orange-600/20 blur-3xl rounded-full group-hover:bg-orange-600/40 transition-all duration-700"></div>
          <div className="relative w-80 h-[480px] md:w-[450px] md:h-[620px] rounded-[4rem] overflow-hidden glass border-4 border-white/10 shadow-2xl group-hover:border-orange-500/30 transition-all duration-1000">
            <img src="https://raw.githubusercontent.com/shamim-ahmad/portfolio-assets/main/hero.jpg" alt="Shamim Ahmad" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop"; }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-12 left-12 text-left"><p className="text-[11px] font-black text-orange-400 uppercase tracking-[0.5em] mb-2">Located in</p><p className="text-3xl font-black uppercase tracking-widest text-white desktop-only leading-none">Dhaka, BD</p></div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Component: About Section
const AboutSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); } },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { label: 'Years of Experience', value: '05+', suffix: 'EXP' },
    { label: 'Projects Completed', value: '40+', suffix: 'PRJ' },
    { label: 'Happy Clients', value: '15+', suffix: 'HPC' }
  ];

  return (
    <section ref={sectionRef} id="about" className="py-32 md:py-64 px-6 max-w-7xl mx-auto relative overflow-hidden scroll-mt-32">
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-orange-600/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
        <div className={`lg:col-span-7 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
          <div className="inline-flex items-center gap-4 mb-8">
            <div className="w-12 h-[1px] bg-orange-500"></div>
            <span className="text-orange-500 text-[10px] font-black uppercase tracking-[0.8em]">Architecting the Digital</span>
          </div>
          <h2 className="text-7xl md:text-[10rem] font-black leading-[0.85] mb-12 tracking-tighter uppercase">Crafting <br /> <span className="gradient-text">Elite Web</span> <br /> Experiences.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div className="space-y-6"><p className="text-gray-400 text-xl font-light leading-relaxed">I am <span className="text-white font-bold">Shamim Ahmad</span>, a Senior Web Architect specializing in high-performance fullstack solutions.</p></div>
            <div className="space-y-6"><p className="text-gray-500 text-lg font-light leading-relaxed italic border-l-2 border-orange-500/30 pl-6">"Code is not just syntax; it is the infrastructure of tomorrow's digital economy."</p></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-12 border-t border-white/5">
            {stats.map((stat, idx) => (<div key={idx} className="group"><div className="text-5xl md:text-7xl font-black tracking-tighter mb-2 group-hover:text-orange-500 transition-colors">{stat.value}</div><p className="text-[9px] font-black text-gray-600 uppercase tracking-[0.4em]">{stat.label}</p></div>))}
          </div>
        </div>
        <div className={`lg:col-span-5 relative transition-all duration-1000 delay-300 transform ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
          <div className="relative group">
            <div className="absolute -inset-4 bg-orange-600/10 blur-2xl rounded-[4rem] group-hover:bg-orange-600/20 transition-all"></div>
            <div className="relative glass p-4 rounded-[4rem] border-white/10 shadow-2xl transition-transform duration-700 hover:rotate-3"><img src="https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=1000&auto=format&fit=crop" alt="Philosophy" className="w-full aspect-[4/5] object-cover rounded-[3.2rem]" /><div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-[3.2rem]"></div></div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Component: SkillsSection
const SkillsSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); } }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);
  const categories = [{ title: 'Frontend Architecture', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' }, { title: 'Backend & Data', icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7' }, { title: 'Systems & Tools', icon: 'M9 3v2m6-2v2M9 19v2m6-2v2' }];
  const tools = [{ name: 'GitHub', icon: 'GH' }, { name: 'Figma', icon: 'FG' }, { name: 'VS Code', icon: 'VS' }, { name: 'Postman', icon: 'PM' }, { name: 'Docker', icon: 'DK' }, { name: 'Gemini', icon: 'AI' }];
  return (
    <section ref={sectionRef} id="skills" className="py-32 md:py-64 bg-black/40 relative overflow-hidden scroll-mt-32 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className={`text-center mb-32 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <span className="text-orange-500 text-[10px] font-black uppercase tracking-[0.8em] mb-6 block">Technical Arsenal</span>
          <h2 className="text-7xl md:text-[11rem] font-black mb-12 leading-[0.8] tracking-tighter uppercase">Power <br /> <span className="gradient-text">Parameters</span></h2>
          <div className="h-2 w-32 bg-orange-600 mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-8 space-y-20">
            {categories.map((cat, catIdx) => (
              <div key={catIdx} className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`} style={{ transitionDelay: `${catIdx * 200}ms` }}>
                <div className="flex items-center gap-6 mb-12"><div className="w-16 h-16 rounded-2xl glass border-white/10 flex items-center justify-center text-orange-500"><svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={cat.icon}/></svg></div><h3 className="text-4xl md:text-5xl font-black uppercase">{cat.title}</h3></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
                  {SKILLS.filter(s => catIdx === 0 ? (s.category === 'Frameworks' || s.name === 'JavaScript') : catIdx === 1 ? s.category === 'Backend' : (s.category === 'Tools' || s.name === 'TypeScript')).map((skill, sIdx) => (
                    <div key={sIdx} className="group"><div className="flex justify-between items-end mb-4"><span className="text-xl font-bold tracking-tight text-white group-hover:text-orange-500 transition-colors uppercase">{skill.name}</span><span className="text-gray-600 font-black text-xs mono tracking-widest">{isVisible ? skill.level : 0}%</span></div><div className="relative w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/5"><div className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-600 to-rose-500 rounded-full transition-all duration-[2s] ease-out shadow-[0_0_15px_rgba(249,115,22,0.3)]" style={{ width: isVisible ? `${skill.level}%` : '0%' }}></div></div></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="lg:col-span-4 flex flex-col justify-start">
            <div className={`glass p-10 md:p-14 rounded-[3.5rem] border-white/10 sticky top-32 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
              <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-500 mb-12 text-center">System Environment</h4>
              <div className="grid grid-cols-2 gap-6">{tools.map((tool, idx) => (<div key={idx} className="group flex flex-col items-center gap-4"><div className="w-20 h-20 rounded-[1.8rem] bg-white/5 border border-white/10 flex items-center justify-center text-2xl font-black text-gray-400 group-hover:bg-orange-600 group-hover:text-white transition-all duration-500 cursor-default">{tool.icon}</div><span className="text-[9px] font-black uppercase tracking-widest text-gray-600 group-hover:text-white transition-colors">{tool.name}</span></div>))}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Component: ProjectsSection
const ProjectsSection: React.FC<{ onSelectProject: (p: Project) => void }> = ({ onSelectProject }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [filter, setFilter] = useState<'All' | 'Frontend' | 'Backend' | 'Fullstack'>('All');
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); } },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const filteredProjects = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  return (
    <section ref={sectionRef} id="projects" className="py-32 md:py-64 px-6 max-w-7xl mx-auto scroll-mt-32">
      <div className={`text-center mb-24 md:mb-40 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        <span className="text-orange-500 text-[10px] font-black uppercase tracking-[1em] mb-10 block">Engineering Portfolio</span>
        <h2 className="text-7xl md:text-[12rem] font-black mb-16 leading-[0.8] tracking-tighter uppercase">Selected <br /> <span className="gradient-text">Commands</span></h2>
        
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 pt-8">
          {['All', 'Frontend', 'Backend', 'Fullstack'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat as any)}
              className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-500 border ${filter === cat ? 'bg-white text-black border-white' : 'glass text-gray-500 border-white/5 hover:border-orange-500/50 hover:text-orange-500'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-32">
        {filteredProjects.map((project, idx) => (
          <div 
            key={project.id} 
            onClick={() => onSelectProject(project)}
            className={`group relative cursor-pointer transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-32'}`}
            style={{ transitionDelay: `${idx * 150}ms` }}
          >
            <div className="absolute -top-10 -left-6 md:-left-12 text-8xl md:text-[12rem] font-black text-white/[0.03] tracking-tighter leading-none pointer-events-none group-hover:text-orange-500/[0.05] transition-colors">
              0{idx + 1}
            </div>

            <div className="relative rounded-[4rem] overflow-hidden glass border-white/10 aspect-[4/5] sm:aspect-[4/3] group-hover:shadow-[0_60px_100px_rgba(0,0,0,0.4)] transition-all duration-700 transform group-hover:-translate-y-6">
              <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transition-all duration-1000 scale-100 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <div className="absolute inset-0 p-12 md:p-16 flex flex-col justify-end">
                <div className="transform translate-y-16 group-hover:translate-y-0 transition-transform duration-700">
                  <div className="flex items-center gap-4 mb-6 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    <span className="px-4 py-1.5 rounded-full bg-orange-600 text-[8px] font-black uppercase tracking-widest text-white">{project.category}</span>
                    <div className="h-[1px] flex-1 bg-white/10"></div>
                  </div>
                  
                  <h3 className="text-5xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter mb-8 group-hover:text-orange-400 transition-colors uppercase">{project.title}</h3>
                  
                  <div className="flex flex-wrap gap-2 mb-10 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-300">
                    {project.techStack.slice(0, 3).map(tech => (
                      <span key={tech} className="text-[9px] font-black uppercase tracking-widest text-gray-400"># {tech}</span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-700 delay-400">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500">View Blueprint</span>
                    <div className="w-16 h-16 rounded-2xl bg-white text-black flex items-center justify-center shadow-2xl group-hover:bg-orange-600 group-hover:text-white transition-all">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div 
          className={`group flex flex-col justify-center items-center text-center p-20 rounded-[4rem] border-2 border-dashed border-white/5 hover:border-orange-500/30 transition-all duration-700 aspect-[4/5] sm:aspect-[4/3] transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-32'}`}
          style={{ transitionDelay: `${filteredProjects.length * 150}ms` }}
        >
          <div className="w-24 h-24 rounded-full bg-orange-600/5 flex items-center justify-center mb-10 group-hover:scale-110 group-hover:bg-orange-600/10 transition-all">
             <svg className="w-12 h-12 text-orange-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
          </div>
          <h3 className="text-5xl md:text-6xl font-black tracking-tighter leading-none mb-10 uppercase">Envision <br /> Your Next <br /> <span className="text-orange-500">Breakthrough?</span></h3>
          <button onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})} className="px-12 py-5 glass rounded-2xl text-[10px] font-black text-white uppercase tracking-widest hover:bg-white hover:text-black transition-all border-white/10">Initiate Collaboration</button>
        </div>
      </div>
    </section>
  );
};

// Component: ContactSection
const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); } }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    
    try {
      // AJAX Submission to Formspree using JSON
      // NOTE: You must replace 'shamimahmadahnaf@gmail.com' with your actual Formspree Form ID (a random string)
      // for the most reliable results. You can get it from the Formspree dashboard.
      const response = await fetch("https://formspree.io/f/shamimahmadahnaf@gmail.com", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        // More descriptive error handling
        const errorMsg = result.error || "Transmission failed. If this is a new form, check your email to confirm activation with Formspree.";
        alert(errorMsg);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Critical Connection Error. Please verify your internet and try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="py-24 md:py-48 px-6 max-w-7xl mx-auto scroll-mt-32 relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
        <div className={`flex flex-col justify-between space-y-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
          <div className="space-y-6 md:space-y-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 glass rounded-full border-white/5"><span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span><span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Sync with Shamim</span></div>
            <h2 className="text-6xl md:text-8xl lg:text-[11rem] font-black leading-[0.82] tracking-tighter uppercase mb-4">Start A <br /> <span className="gradient-text">Mission.</span></h2>
            <p className="text-gray-500 text-lg md:text-2xl font-light leading-relaxed max-w-md border-l-4 border-orange-500/20 pl-6 md:pl-8 py-2">Have a groundbreaking idea? Let's turn your concept into a digital powerhouse.</p>
          </div>

          <div className="flex flex-col gap-6 pt-6">
            <div className="glass p-8 rounded-[2.5rem] border-white/5 flex items-center gap-8 hover:bg-white/5 transition-all group overflow-hidden">
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-orange-600/10 flex items-center justify-center text-orange-500 group-hover:bg-orange-600 group-hover:text-white transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </div>
              <div className="min-w-0">
                <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Inquiries</p>
                <a href="mailto:shamimahmadahnaf@gmail.com" className="text-xl font-bold tracking-tight hover:text-orange-400 transition-colors truncate block">shamimahmadahnaf@gmail.com</a>
              </div>
            </div>

            <div className="glass p-8 rounded-[2.5rem] border-white/5 flex items-center gap-8 hover:bg-white/5 transition-all group overflow-hidden">
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              </div>
              <div className="min-w-0">
                <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Direct Connection</p>
                <a href="tel:+8801748186766" className="text-xl font-bold tracking-tight hover:text-blue-400 transition-colors block">+880 1748-186766</a>
              </div>
            </div>
          </div>
        </div>

        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
          <form onSubmit={handleSubmit} className="h-full glass p-8 md:p-12 lg:p-16 rounded-[3rem] md:rounded-[4rem] border-white/5 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div className="space-y-8 md:space-y-10">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em] ml-2">Your Credentials</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <input required name="name" type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Full Identity" className="w-full bg-white/[0.03] border border-white/10 rounded-xl md:rounded-2xl px-6 md:px-8 py-4 md:py-6 text-sm focus:outline-none focus:border-orange-500 focus:bg-orange-500/5 transition-all font-light" />
                  <input required name="email" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="Digital Address" className="w-full bg-white/[0.03] border border-white/10 rounded-xl md:rounded-2xl px-6 md:px-8 py-4 md:py-6 text-sm focus:outline-none focus:border-orange-500 focus:bg-orange-500/5 transition-all font-light" />
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em] ml-2">Mission Parameters</label>
                <textarea required name="message" rows={6} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} placeholder="Tell me about your project or inquiry..." className="w-full bg-white/[0.03] border border-white/10 rounded-[1.5rem] md:rounded-[2.5rem] px-6 md:px-8 py-6 md:py-8 text-sm focus:outline-none focus:border-orange-500 focus:bg-orange-500/5 transition-all font-light resize-none h-[150px] md:h-[220px]"></textarea>
              </div>
            </div>
            <button 
              type="submit" 
              disabled={isSending}
              className={`mt-8 md:mt-10 w-full py-6 md:py-8 rounded-xl md:rounded-[1.5rem] font-black text-[10px] md:text-[11px] uppercase tracking-[0.7em] transition-all duration-700 flex items-center justify-center gap-4 md:gap-6 relative group ${submitted ? 'bg-green-600 text-white' : isSending ? 'bg-gray-700 text-gray-400' : 'bg-white text-black hover:bg-orange-500 hover:text-white'}`}
            >
              <span className="relative z-10">{submitted ? 'Transmission Complete' : isSending ? 'Syncing...' : 'Execute Dispatch'}</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

// Component: AI Assistant Chat
const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ role: 'model', text: "Hello! I am Shamim's personal AI Agent. Ready to discuss his technical prowess or project specifics." }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isTyping]);
  const handleSend = async () => { if (!input.trim() || isTyping) return; const userMsg = input.trim(); setInput(''); setMessages(prev => [...prev, { role: 'user', text: userMsg }]); setIsTyping(true); const history = messages.map(m => ({ role: m.role, parts: [{ text: m.text }] })); const response = await chatWithAI(history, userMsg); setMessages(prev => [...prev, { role: 'model', text: response }]); setIsTyping(false); };
  return (
    <div className="fixed bottom-8 md:bottom-12 right-8 md:right-12 z-[100]">
      {isOpen ? (
        <div className="w-[300px] sm:w-[400px] md:w-[500px] h-[500px] md:h-[700px] glass rounded-[2.5rem] md:rounded-[4rem] flex flex-col shadow-2xl overflow-hidden animate-zoom-in border-white/10">
          <div className="p-6 md:p-10 border-b border-white/10 flex items-center justify-between bg-white/5"><div className="flex items-center gap-4 md:gap-6"><div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-[1.5rem] bg-orange-600 flex items-center justify-center font-black text-xs md:text-sm text-white shadow-2xl shadow-orange-600/30">AI</div><div><p className="font-black text-sm md:text-base tracking-[0.1em] uppercase">Assistant</p></div></div><button onClick={() => setIsOpen(false)} className="p-2 md:p-3 hover:bg-white/10 rounded-xl transition-all"><svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg></button></div>
          <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-6 md:space-y-10 bg-black/20 scrollbar-hide">{messages.map((msg, i) => (<div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[85%] p-5 md:p-7 rounded-[1.5rem] md:rounded-[2.5rem] text-sm md:text-base leading-relaxed ${msg.role === 'user' ? 'bg-orange-600 text-white rounded-tr-none' : 'glass text-gray-200 rounded-tl-none border border-white/10 font-light'}`}>{msg.text}</div></div>))}{isTyping && <div className="flex justify-start"><div className="glass p-5 md:p-7 rounded-[1.5rem] md:rounded-[2.5rem] flex gap-2 md:gap-3 border-white/10"><div className="w-2 md:w-2.5 h-2 md:h-2.5 bg-orange-500 rounded-full animate-bounce"></div><div className="w-2 md:w-2.5 h-2 md:h-2.5 bg-orange-500 rounded-full animate-bounce [animation-delay:0.2s]"></div><div className="w-2 md:w-2.5 h-2 md:h-2.5 bg-orange-500 rounded-full animate-bounce [animation-delay:0.4s]"></div></div></div>}<div ref={chatEndRef} /></div>
          <div className="p-10 border-t border-white/10 flex gap-3 md:gap-5 bg-white/5"><input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Ask something..." className="flex-1 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-6 md:px-10 py-4 md:py-6 text-sm md:text-base focus:outline-none focus:border-orange-500 transition-all font-light" /><button onClick={handleSend} className="w-14 h-14 md:w-20 md:h-20 bg-orange-600 rounded-xl md:rounded-2xl flex items-center justify-center hover:bg-orange-700 transition-all shadow-2xl shadow-orange-600/40 disabled:opacity-50" disabled={isTyping || !input.trim()}><svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg></button></div>
        </div>
      ) : (<button onClick={() => setIsOpen(true)} className="w-20 h-20 md:w-28 md:h-28 rounded-2xl md:rounded-[3rem] bg-orange-600 shadow-2xl flex items-center justify-center hover:scale-110 hover:rotate-6 transition-all group shadow-orange-600/50"><svg className="w-10 h-10 md:w-14 md:h-14 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg></button>)}
    </div>
  );
};

// Component: Elite Footer
const Footer: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <footer className="pt-32 pb-16 bg-black border-t border-white/5 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-orange-900/5 blur-[150px] pointer-events-none rounded-full"></div>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-24">
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-4xl font-black gradient-text tracking-tighter uppercase leading-none">SHAMIM.</h2>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm font-light">Architecting high-performance digital experiences through technical precision and elite engineering. Specialized in Fullstack architectures and AI integrations.</p>
            <div className="flex flex-wrap gap-4">
              {[
                { name: 'GitHub', icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z', href: 'https://github.com/shamim-ahmad-ahnaf' },
                { name: 'LinkedIn', icon: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z', href: 'https://www.linkedin.com/in/shamim-ahmad-772484331/' }
              ].map((social, i) => (
                <a key={i} href={social.href} target="_blank" rel="noreferrer" aria-label={social.name} className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-gray-400 hover:text-white hover:bg-orange-600 hover:border-orange-600 hover:-translate-y-1 transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d={social.icon}/></svg>
                </a>
              ))}
            </div>
          </div>
          <div className="space-y-8"><h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Explore</h4><ul className="space-y-4">{['Home', 'About', 'Skills', 'Projects', 'Contact'].map(item => (<li key={item}><button onClick={() => scrollTo(item.toLowerCase())} className="text-gray-500 hover:text-orange-400 text-xs font-medium transition-colors uppercase tracking-widest">{item}</button></li>))}</ul></div>
          <div className="space-y-8"><h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Services</h4><ul className="space-y-4">{['Web Architecture', 'AI Integration', 'Cloud Solutions', 'UI/UX Strategy'].map(service => (<li key={service} className="text-gray-500 text-xs font-medium uppercase tracking-widest cursor-default">{service}</li>))}</ul></div>
          <div className="space-y-8"><h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Operation</h4><div className="space-y-6"><div className="space-y-1"><p className="text-[9px] font-black text-gray-700 uppercase tracking-widest">Location</p><p className="text-sm font-bold text-gray-300">Dhaka, Bangladesh</p></div></div></div>
        </div>
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8"><p className="text-[10px] font-black text-gray-700 uppercase tracking-[0.4em]">© {new Date().getFullYear()} SHAMIM AHMAD • ALL RIGHTS RESERVED</p><p className="text-[9px] font-black text-gray-800 uppercase tracking-widest flex items-center gap-2">Engineered with <span className="text-orange-600">❤</span> using Gemini AI</p></div>
      </div>
    </footer>
  );
};

// Main App Component
const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  return (
    <div className="relative selection:bg-orange-500/30 min-h-screen">
      <div className="fixed top-[-15%] left-[-15%] w-[60%] h-[60%] bg-orange-900/5 blur-[200px] pointer-events-none rounded-full"></div>
      <div className="fixed bottom-[-15%] right-[-15%] w-[60%] h-[60%] bg-amber-900/5 blur-[200px] pointer-events-none rounded-full"></div>
      <Navbar />
      <main className="overflow-x-hidden"><Hero /><AboutSection /><SkillsSection /><ProjectsSection onSelectProject={setSelectedProject} /><ContactSection /></main>
      <Footer /><AIAssistant />
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </div>
  );
};

export default App;
