import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sliders, 
  Cpu, 
  Video, 
  BarChart3, 
  Briefcase, 
  Paintbrush, 
  Palette, 
  Code, 
  Terminal, 
  Search, 
  Info, 
  Check
} from 'lucide-react';
import { SkillDomain } from '../../types';
import { SKILL_DOMAINS } from '../../data';

// Explicit manual mapping of skills to completed archive projects for deep interactivity
const SKILL_TO_PROJECT_MAP: Record<string, { id: string; title: string; category: string }[]> = {
  'Content Operations': [{ id: 'social-content-creation', title: 'Video & Reels Production', category: 'VIDEO' }],
  'Content Strategy': [{ id: 'social-content-creation', title: 'Video & Reels Production', category: 'VIDEO' }],
  'Content Ecosystem Analysis': [{ id: 'social-content-creation', title: 'Video & Reels Production', category: 'VIDEO' }],
  'Visual Content Production': [{ id: 'social-content-creation', title: 'Video & Reels Production', category: 'VIDEO' }],
  'Social Media Content Creation': [{ id: 'social-content-creation', title: 'Video & Reels Production', category: 'VIDEO' }],
  'Audience Growth Strategy (600+ followers across YT/IG)': [{ id: 'social-content-creation', title: 'Video & Reels Production', category: 'VIDEO' }],
  'Video Editing & Reels': [{ id: 'social-content-creation', title: 'Video & Reels Production', category: 'VIDEO' }],
  
  'Generative AI': [{ id: 'automotive-erp', title: 'Automotive ERP System', category: 'AI_CODE' }],
  'Marketing Mix Modelling': [{ id: 'mmm-dashboard', title: 'MMM Analytics Dashboard', category: 'AI_CODE' }],
  'Predictive Analytics': [{ id: 'mmm-dashboard', title: 'MMM Analytics Dashboard', category: 'AI_CODE' }],
  'Dataiku DSS': [{ id: 'mmm-dashboard', title: 'MMM Analytics Dashboard', category: 'AI_CODE' }],
  
  'SQL/MySQL': [{ id: 'mmm-dashboard', title: 'MMM Analytics Dashboard', category: 'AI_CODE' }],
  'Python': [{ id: 'mmm-dashboard', title: 'MMM Analytics Dashboard', category: 'AI_CODE' }],
  'Power BI': [{ id: 'mmm-dashboard', title: 'MMM Analytics Dashboard', category: 'AI_CODE' }],
  'Data Visualization': [{ id: 'mmm-dashboard', title: 'MMM Analytics Dashboard', category: 'AI_CODE' }],
  'KPI Hierarchy Design': [{ id: 'mmm-dashboard', title: 'MMM Analytics Dashboard', category: 'AI_CODE' }],
  'Cloud Deployment (Vercel)': [{ id: 'mmm-dashboard', title: 'MMM Analytics Dashboard', category: 'AI_CODE' }],
  
  'Agile / Scrum': [{ id: 'automotive-erp', title: 'Automotive ERP System', category: 'AI_CODE' }],
  'Sprint Planning & Execution': [{ id: 'automotive-erp', title: 'Automotive ERP System', category: 'AI_CODE' }],
  'Requirements Gathering (BRD/FRD)': [{ id: 'automotive-erp', title: 'Automotive ERP System', category: 'AI_CODE' }],
  'Technical Documentation': [{ id: 'automotive-erp', title: 'Automotive ERP System', category: 'AI_CODE' }],
  'Business Analysis': [{ id: 'automotive-erp', title: 'Automotive ERP System', category: 'AI_CODE' }],
  'Product Delivery': [{ id: 'automotive-erp', title: 'Automotive ERP System', category: 'AI_CODE' }],
  'Release Management': [{ id: 'automotive-erp', title: 'Automotive ERP System', category: 'AI_CODE' }],
  'Stakeholder Reporting': [{ id: 'automotive-erp', title: 'Automotive ERP System', category: 'AI_CODE' }],
  'Vendor Management': [{ id: 'automotive-erp', title: 'Automotive ERP System', category: 'AI_CODE' }],
  
  'Figma (expert)': [
    { id: 'automotive-erp', title: 'Automotive ERP System', category: 'AI_CODE' },
    { id: 'tripssecure-brand', title: 'Tripssecure Design System', category: 'DESIGN' },
    { id: 'sproutplus-mockup', title: 'SproutPlus App Mockup Design', category: 'DESIGN' },
    { id: 'safescan-mockup', title: 'SafeScan Mobile App Mockup Design', category: 'DESIGN' }
  ],
  'UI/UX Design': [
    { id: 'tripssecure-brand', title: 'Tripssecure Design System', category: 'DESIGN' },
    { id: 'sproutplus-mockup', title: 'SproutPlus App Mockup Design', category: 'DESIGN' },
    { id: 'safescan-mockup', title: 'SafeScan Mobile App Mockup Design', category: 'DESIGN' }
  ],
  'Design Systems & Component Libraries': [{ id: 'tripssecure-brand', title: 'Tripssecure Design System', category: 'DESIGN' }],
  'Wireframing & Prototyping': [
    { id: 'automotive-erp', title: 'Automotive ERP System', category: 'AI_CODE' },
    { id: 'tripssecure-brand', title: 'Tripssecure Design System', category: 'DESIGN' },
    { id: 'sproutplus-mockup', title: 'SproutPlus App Mockup Design', category: 'DESIGN' },
    { id: 'safescan-mockup', title: 'SafeScan Mobile App Mockup Design', category: 'DESIGN' }
  ],
  'Responsive Web & Mobile Design': [
    { id: 'tripssecure-brand', title: 'Tripssecure Design System', category: 'DESIGN' },
    { id: 'sproutplus-mockup', title: 'SproutPlus App Mockup Design', category: 'DESIGN' },
    { id: 'safescan-mockup', title: 'SafeScan Mobile App Mockup Design', category: 'DESIGN' }
  ],
  'User Research': [{ id: 'tripssecure-brand', title: 'Tripssecure Design System', category: 'DESIGN' }],
  'Journey Mapping': [{ id: 'tripssecure-brand', title: 'Tripssecure Design System', category: 'DESIGN' }],
  'Service Blueprints': [{ id: 'tripssecure-brand', title: 'Tripssecure Design System', category: 'DESIGN' }],
  
  'Adobe Photoshop': [
    { id: 'tripssecure-brand', title: 'Tripssecure Design System', category: 'DESIGN' },
    { id: 'social-content-creation', title: 'Video & Reels Production', category: 'VIDEO' }
  ],
  'CapCut': [{ id: 'social-content-creation', title: 'Video & Reels Production', category: 'VIDEO' }],
  'Brand Collateral': [{ id: 'tripssecure-brand', title: 'Tripssecure Design System', category: 'DESIGN' }],
  'Digital Assets': [{ id: 'social-content-creation', title: 'Video & Reels Production', category: 'VIDEO' }],
  'Storyboards': [{ id: 'social-content-creation', title: 'Video & Reels Production', category: 'VIDEO' }],
  'Mood Boards': [{ id: 'social-content-creation', title: 'Video & Reels Production', category: 'VIDEO' }],
  'Marketing Comps': [{ id: 'social-content-creation', title: 'Video & Reels Production', category: 'VIDEO' }],
  
  'HTML': [{ id: 'web-blocker', title: 'Web-Blocker Chrome Extension', category: 'AI_CODE' }],
  'CSS': [{ id: 'web-blocker', title: 'Web-Blocker Chrome Extension', category: 'AI_CODE' }],
  'JavaScript': [{ id: 'web-blocker', title: 'Web-Blocker Chrome Extension', category: 'AI_CODE' }],
  'Chrome Extension Development': [{ id: 'web-blocker', title: 'Web-Blocker Chrome Extension', category: 'AI_CODE' }],
  'Dev Handoff': [{ id: 'web-blocker', title: 'Web-Blocker Chrome Extension', category: 'AI_CODE' }],
  'Feasibility Assessment': [{ id: 'web-blocker', title: 'Web-Blocker Chrome Extension', category: 'AI_CODE' }],
  
  'Git': [{ id: 'web-blocker', title: 'Web-Blocker Chrome Extension', category: 'AI_CODE' }],
  'Supabase': [
    { id: 'automotive-erp', title: 'Automotive ERP System', category: 'AI_CODE' },
    { id: 'web-blocker', title: 'Web-Blocker Chrome Extension', category: 'AI_CODE' }
  ],
  'Lovable': [{ id: 'automotive-erp', title: 'Automotive ERP System', category: 'AI_CODE' }],

  // Front-End additions
  'React': [
    { id: 'mmm-dashboard', title: 'MMM Analytics Dashboard', category: 'AI_CODE' },
    { id: 'automotive-erp', title: 'Automotive ERP System', category: 'AI_CODE' }
  ],
  'TypeScript': [
    { id: 'mmm-dashboard', title: 'MMM Analytics Dashboard', category: 'AI_CODE' },
    { id: 'web-blocker', title: 'Web-Blocker Chrome Extension', category: 'AI_CODE' }
  ],
  'Tailwind CSS': [{ id: 'mmm-dashboard', title: 'MMM Analytics Dashboard', category: 'AI_CODE' }],
  'Vite': [{ id: 'mmm-dashboard', title: 'MMM Analytics Dashboard', category: 'AI_CODE' }],

  // AI / Data additions
  'Gemini API': [{ id: 'mmm-dashboard', title: 'MMM Analytics Dashboard', category: 'AI_CODE' }],
  'Recharts': [{ id: 'mmm-dashboard', title: 'MMM Analytics Dashboard', category: 'AI_CODE' }],
  'Node.js': [{ id: 'mmm-dashboard', title: 'MMM Analytics Dashboard', category: 'AI_CODE' }],

  // Creative AI additions
  'ChatGPT Images 2.0': [
    { id: 'sproutplus-mockup', title: 'SproutPlus App Mockup Design', category: 'DESIGN' },
    { id: 'safescan-mockup', title: 'SafeScan Mobile App Mockup Design', category: 'DESIGN' }
  ],
  'AI Image Generation': [
    { id: 'sproutplus-mockup', title: 'SproutPlus App Mockup Design', category: 'DESIGN' },
    { id: 'safescan-mockup', title: 'SafeScan Mobile App Mockup Design', category: 'DESIGN' }
  ],
  'Midjourney': [
    { id: 'sproutplus-mockup', title: 'SproutPlus App Mockup Design', category: 'DESIGN' },
    { id: 'safescan-mockup', title: 'SafeScan Mobile App Mockup Design', category: 'DESIGN' }
  ]
};

export default function ToolsSkillsView() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const getDomainIcon = (iconName: string) => {
    switch (iconName) {
      case 'Video': return <Video size={22} className="text-accent-red" />;
      case 'Cpu': return <Cpu size={22} className="text-primary" />;
      case 'BarChart3': return <BarChart3 size={22} className="text-accent-yellow" />;
      case 'Briefcase': return <Briefcase size={22} className="text-accent-green" />;
      case 'Figma': return <Paintbrush size={22} className="text-primary" />;
      case 'Palette': return <Palette size={22} className="text-accent-red" />;
      case 'Code': return <Code size={22} className="text-accent-yellow" />;
      case 'Terminal': return <Terminal size={22} className="text-neutral-dark" />;
      default: return <Sliders size={22} className="text-primary" />;
    }
  };

  const filteredDomains = SKILL_DOMAINS.map(domain => {
    if (!searchQuery) return domain;
    const matchingSkills = domain.skills.filter(skill => 
      skill.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const domainMatches = domain.domain.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (domainMatches || matchingSkills.length > 0) {
      return {
        ...domain,
        skills: matchingSkills.length > 0 ? matchingSkills : domain.skills,
        isMatched: true
      };
    }
    return null;
  }).filter((d): d is SkillDomain & { isMatched?: boolean } => d !== null);

  return (
    <div className="relative pt-6">
      {/* Background design accents */}
      <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none"></div>

      {/* Header */}
      <header className="border-b-8 border-neutral-dark pb-6 flex flex-col lg:flex-row justify-between items-start lg:items-end border-dashed mb-8">
        <div>
          <h1 className="font-display text-5xl sm:text-7xl uppercase text-primary drop-shadow-[4px_4px_0px_#131b2e]">
            Tools &amp; Skills
          </h1>
          <p className="font-mono text-xs sm:text-sm text-neutral-light bg-neutral-dark inline-block px-4 py-1 border-2 border-primary mt-3 rotate-[1deg]">
            Comprehensive technical stack, cross-functional competencies, and domain expertise
          </p>
        </div>
      </header>

      <div className="space-y-8">
        {/* Controls Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between bg-neutral-dark/5 p-4 border-4 border-neutral-dark brutalist-shadow-dark">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-muted" size={18} />
            <input
              type="text"
              placeholder="Search across domains, tools, or expert competencies (e.g. Figma, LangGraph, Python)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-light border-2 border-neutral-dark pl-10 pr-4 py-2.5 font-mono text-sm focus:outline-hidden focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="font-mono text-xs bg-neutral-dark text-neutral-light px-3.5 py-2.5 border-2 border-neutral-dark hover:bg-accent-red hover:text-neutral-light transition-colors cursor-pointer"
            >
              CLEAR FILTER
            </button>
          )}
        </div>

        {/* Interactive Associated Project Banner */}
        <AnimatePresence mode="popLayout">
          {selectedSkill && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-accent-yellow text-neutral-dark border-4 border-neutral-dark p-4 brutalist-shadow-dark relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-neutral-dark text-accent-yellow rounded-none border-2 border-neutral-dark shrink-0">
                  <Info size={20} />
                </div>
                <div>
                  <h4 className="font-mono text-xs font-black uppercase tracking-wider">
                    Interactive Project Matcher:
                  </h4>
                  <p className="font-sans text-sm mt-0.5">
                    Completed works using <span className="font-bold underline">{selectedSkill}</span>:
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {SKILL_TO_PROJECT_MAP[selectedSkill] ? (
                  SKILL_TO_PROJECT_MAP[selectedSkill].map(proj => (
                    <span 
                      key={proj.id}
                      className="bg-neutral-dark text-neutral-light font-mono text-[10px] font-black px-3 py-1.5 border border-neutral-light flex items-center gap-1.5 hover:bg-primary transition-colors cursor-default"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-green"></span>
                      {proj.title}
                      <span className="text-[8px] bg-neutral-light/20 text-neutral-light px-1">
                        {proj.category}
                      </span>
                    </span>
                  ))
                ) : (
                  <span className="font-mono text-xs italic text-neutral-muted">
                    Applied across custom pipeline integrations &amp; operational systems
                  </span>
                )}
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="bg-accent-red text-neutral-light font-mono text-[9px] font-black px-2 py-1 border border-neutral-dark hover:bg-neutral-dark transition-colors cursor-pointer self-stretch flex items-center"
                >
                  CLOSE
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bento Grid layout of Domains */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDomains.map((dom, idx) => {
            const rot = idx % 2 === 0 ? '-rotate-[0.5deg]' : 'rotate-[0.5deg]';
            return (
              <motion.article
                layout
                key={dom.id}
                whileHover={{ scale: 1.01, rotate: 0 }}
                className={`bg-neutral-light border-4 border-neutral-dark p-5 brutalist-shadow-dark flex flex-col justify-between transition-shadow relative overflow-hidden ${rot}`}
              >
                <div>
                  {/* Domain title and Icon */}
                  <div className="flex items-center gap-3 border-b-2 border-neutral-dark border-dashed pb-3.5 mb-3.5">
                    <div className="p-2 border-2 border-neutral-dark bg-neutral-dark/5 shadow-[2px_2px_0px_#131b2e]">
                      {getDomainIcon(dom.icon)}
                    </div>
                    <h3 className="font-display text-lg uppercase text-neutral-dark tracking-tight leading-none">
                      {dom.domain}
                    </h3>
                  </div>

                  <p className="font-sans text-xs text-neutral-muted leading-relaxed mb-4 min-h-[40px]">
                    {dom.description}
                  </p>

                  {/* Skill tags list */}
                  <div className="flex flex-wrap gap-1.5">
                    {dom.skills.map((skill, sIdx) => {
                      const isSelected = selectedSkill === skill;
                      const hasProject = !!SKILL_TO_PROJECT_MAP[skill];
                      
                      return (
                        <button
                          key={sIdx}
                          onClick={() => setSelectedSkill(isSelected ? null : skill)}
                          className={`font-mono text-[10px] px-2 py-1 border-2 transition-all cursor-pointer select-none flex items-center gap-1 ${
                            isSelected
                              ? 'bg-accent-yellow text-neutral-dark border-neutral-dark font-black scale-105 shadow-[2px_2px_0px_#131b2e]'
                              : 'bg-neutral-muted/5 text-neutral-dark border-neutral-dark/15 hover:bg-neutral-dark hover:text-neutral-light hover:border-neutral-dark'
                          }`}
                        >
                          {skill}
                          {hasProject && !isSelected && (
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-red shrink-0 animate-pulse"></span>
                          )}
                          {isSelected && <Check size={8} strokeWidth={4} />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Little bottom system coordinate line */}
                <div className="mt-5 pt-3 border-t border-neutral-dark/10 font-mono text-[8px] text-neutral-muted flex justify-between">
                  <span>SYS_DOM.{idx + 1}</span>
                  <span>VERIFIED_SKILLS_OK</span>
                </div>
              </motion.article>
            );
          })}

          {filteredDomains.length === 0 && (
            <div className="col-span-full bg-neutral-dark/5 p-12 border-4 border-dashed border-neutral-dark text-center">
              <p className="font-mono text-sm text-neutral-muted uppercase">
                No skills matched your search query &quot;{searchQuery}&quot;
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 font-mono text-xs bg-neutral-dark text-neutral-light px-4 py-2 border-2 border-neutral-dark hover:bg-accent-yellow hover:text-neutral-dark transition-colors"
              >
                RESET SEARCH
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
