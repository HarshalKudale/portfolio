'use client';

import { useTheme } from '@/context/ThemeContext';

interface HeaderProps {
    desktop?: boolean;
}

export default function Header({ desktop = false }: HeaderProps) {
    const { theme, toggleTheme } = useTheme();

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    const NavButton = ({ id, label }: { id: string, label: string }) => (
        <button
            onClick={() => scrollTo(id)}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
            {label}
        </button>
    );

    return (
        <header className={`w-full ${desktop ? 'bg-transparent' : 'bg-card border-b border-border'}`}>
            <div className={`mx-auto ${desktop ? 'h-16 flex items-center justify-between' : 'px-4 h-16 flex items-center justify-between'}`}>
                {/* Logo - only on mobile or if needed, but per requirements logo is hidden in desktop nav wrapper in old CSS. 
            Here we can control it via desktop prop. 
            User said "Header buttons are broken again fix them."
        */}
                {!desktop && (
                    <a href="#" className="text-lg font-bold text-foreground">HK</a>
                )}

                <nav className={`flex items-center gap-6 ${!desktop ? 'hidden' : ''}`}>
                    <NavButton id="about" label="About" />
                    <NavButton id="skills" label="Skills" />
                    <NavButton id="experience" label="Experience" />
                    <NavButton id="projects" label="Projects" />
                    <NavButton id="contact" label="Contact" />
                </nav>

                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground transition-all"
                        aria-label="Toggle theme"
                    >
                        {theme === 'light' ? (
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                <path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                            </svg>
                        ) : (
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
}
