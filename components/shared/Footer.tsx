import { motion } from "framer-motion";
import { Linkedin, Github, Youtube } from "lucide-react";

const PinterestIcon = ({ size = 20 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.135-2.607 7.462-6.225 7.462-1.216 0-2.359-.631-2.75-1.378l-.75 2.852c-.271 1.033-1.002 2.324-1.492 3.121C8.258 23.907 10.076 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
  </svg>
);

export const Footer = () => {
  const socials = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/noel-joseph-varghese-576507273/",
      icon: <Linkedin size={20} />,
    },
    {
      name: "GitHub",
      href: "https://github.com/whynot231455",
      icon: <Github size={20} />,
    },
    {
      name: "Pinterest",
      href: "https://in.pinterest.com/why_not_231455/my-work/",
      icon: <PinterestIcon size={20} />,
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/@noeljosephvarghese",
      icon: <Youtube size={20} />,
    },
  ];

  return (
    <footer className="py-20 px-8 border-t border-foreground/10 flex flex-col items-center gap-8 bg-background">
      <div className="text-foreground/40 font-mono text-[10px] uppercase tracking-widest text-center">
        © {new Date().getFullYear()} Noel Joseph Varghese.
      </div>
      
      <div className="flex items-center gap-8">
        {socials.map((social) => (
          <motion.a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/40 hover:text-primary transition-all duration-300"
            whileHover={{ y: -4, scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={social.name}
          >
            {social.icon}
          </motion.a>
        ))}
      </div>
    </footer>
  );
};
