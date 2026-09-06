import { Linkedin, Github, Globe, Headphones } from 'lucide-react';

export default function StudioView() {
  return (
    <div className="relative pt-6">

      <div className="w-full border-t-8 border-dashed border-neutral-dark mb-10"></div>

      {/* Social strips */}
      <section className="w-full">
        {/* Social Strips */}
        <div>
          <h2 className="font-display text-4xl uppercase mb-8 select-none">
            LINK UP
          </h2>

          <div className="flex flex-col gap-4">
            {/* Behance Strip */}
            <a 
              href="https://www.behance.net/noeljosephvarghese" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group block bg-neutral-light border-4 border-neutral-dark brutalist-shadow-accent-red hover:shadow-none hover:translate-x-1.5 hover:translate-y-1.5 transition-all p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="bg-accent-red text-neutral-light p-3 border-2 border-neutral-dark rounded-full group-hover:rotate-12 transition-transform shadow-[2px_2px_0px_#131b2e]">
                  <Globe size={24} />
                </div>
                <span className="font-display text-2xl uppercase mt-1">BEHANCE</span>
              </div>
              <span className="font-mono text-xs font-bold text-neutral-muted border-b-2 border-neutral-dark">
                &gt; PORTFOLIO
              </span>
            </a>

            {/* LinkedIn Strip */}
            <a 
              href="https://www.linkedin.com/in/noel-joseph-varghese-576507273/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group block bg-neutral-light border-4 border-neutral-dark brutalist-shadow-primary hover:shadow-none hover:translate-x-1.5 hover:translate-y-1.5 transition-all p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="bg-primary text-neutral-light p-3 border-2 border-neutral-dark rounded-full group-hover:rotate-12 transition-transform shadow-[2px_2px_0px_#131b2e]">
                  <Linkedin size={24} fill="#faf8ff" />
                </div>
                <span className="font-display text-2xl uppercase mt-1">LINKEDIN</span>
              </div>
              <span className="font-mono text-xs font-bold text-neutral-muted border-b-2 border-neutral-dark">
                &gt; CONNECT
              </span>
            </a>

            {/* GitHub Strip */}
            <a 
              href="https://github.com/whynot231455" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group block bg-neutral-light border-4 border-neutral-dark brutalist-shadow-yellow hover:shadow-none hover:translate-x-1.5 hover:translate-y-1.5 transition-all p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="bg-accent-yellow text-neutral-dark p-3 border-2 border-neutral-dark rounded-full group-hover:-rotate-12 transition-transform shadow-[2px_2px_0px_#131b2e]">
                  <Github size={24} />
                </div>
                <span className="font-display text-2xl uppercase mt-1">GITHUB</span>
              </div>
              <span className="font-mono text-xs font-bold text-neutral-muted border-b-2 border-neutral-dark">
                &gt; SOURCE
              </span>
            </a>

            {/* Spotify Strip */}
            <a 
              href="https://open.spotify.com/user/317gsb4a24nouynbki54pf5zbcl4" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group block bg-neutral-light border-4 border-neutral-dark brutalist-shadow-primary hover:shadow-none hover:translate-x-1.5 hover:translate-y-1.5 transition-all p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="bg-accent-green text-neutral-dark p-3 border-2 border-neutral-dark rounded-full group-hover:rotate-12 transition-transform shadow-[2px_2px_0px_#131b2e]">
                  <Headphones size={24} />
                </div>
                <span className="font-display text-2xl uppercase mt-1">SPOTIFY</span>
              </div>
              <span className="font-mono text-xs font-bold text-neutral-muted border-b-2 border-neutral-dark">
                &gt; LISTEN
              </span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
