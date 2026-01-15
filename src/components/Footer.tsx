import links from '@/data/links.json';

export default function Footer() {
    return (
        <footer className="mt-20 py-8 border-t border-border text-center text-sm text-muted-foreground">
            <p className="mb-4">© {new Date().getFullYear()} Harshal Kudale. All rights reserved.</p>
            <div className="flex justify-center gap-6">
                {links.professional.map(link => (
                    <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors font-medium"
                    >
                        {link.name}
                    </a>
                ))}
            </div>
        </footer>
    );
}
