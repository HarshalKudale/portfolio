import Image from 'next/image';
import profile from '@/data/profile.json';
import links from '@/data/links.json';

interface HeroProps {
    onResumeClick?: () => void;
    showResume?: boolean;
}

export default function Hero({ onResumeClick, showResume }: HeroProps) {
    return (
        <section className="text-center">
            <div className="relative w-[150px] h-[150px] mx-auto mb-6 rounded-full overflow-hidden border-4 border-card shadow-lg">
                <Image
                    src={profile.image}
                    alt={profile.name}
                    fill
                    className="object-cover"
                    priority
                />
            </div>
            <h1 className="text-3xl font-bold mb-2">{profile.name}</h1>
            <p className="text-lg text-muted-foreground mb-1">{profile.title}</p>
            <p className="text-sm text-muted-foreground mb-6">{profile.location}</p>

            <div className="flex flex-wrap justify-center gap-3 max-w-lg mx-auto">
                {links.professional.map(link => (
                    <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted/10 transition-colors text-sm font-medium min-w-[120px]"
                    >
                        {link.icon === 'github' && (
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
                        )}
                        {link.icon === 'linkedin' && (
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                        )}
                        {link.name}
                    </a>
                ))}

                {links.personal.map(link => (
                    <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted/10 transition-colors text-sm font-medium min-w-[120px]"
                    >
                        {/* Generic Icon for personal sites if not specific */}
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                        {link.name}
                    </a>
                ))}

                {/* Mobile: Download Resume */}
                <a
                    href="/resume.pdf"
                    download
                    className="lg:hidden flex items-center justify-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium min-w-[120px]"
                >
                    Download Resume
                </a>

                {/* Desktop: Toggle Resume Pane */}
                <button
                    onClick={onResumeClick}
                    className={`hidden lg:flex items-center justify-center px-4 py-2 rounded-lg transition-colors text-sm font-medium min-w-[120px] ${showResume
                        ? 'bg-muted text-foreground hover:bg-muted/80'
                        : 'bg-primary text-white hover:bg-primary/90'
                        }`}
                >
                    {showResume ? 'Close Resume' : 'View Resume'}
                </button>
            </div>
        </section>
    );
}
