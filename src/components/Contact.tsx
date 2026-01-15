import contact from '@/data/profile.json';
import links from '@/data/links.json';

export default function Contact() {
    return (
        <section id="contact" className="scroll-mt-16">
            <h2 className="text-2xl font-bold mb-8 pb-2 border-b-2 border-border inline-block">Contact</h2>

            <div className="grid gap-8">
                {/* Contact Info Card */}
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-semibold mb-6">Get in Touch</h3>
                    <div className="space-y-4">
                        <a
                            href={`mailto:${contact.email}`}
                            className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
                        >
                            <div className="p-2 rounded-lg bg-muted/10 group-hover:bg-primary/10 transition-colors">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><path d="M22 6l-10 7L2 6"></path></svg>
                            </div>
                            <span className="font-medium">{contact.email}</span>
                        </a>



                        <div className="flex items-center gap-3 text-muted-foreground">
                            <div className="p-2 rounded-lg bg-muted/10">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                            </div>
                            <span className="font-medium">{contact.location}</span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
