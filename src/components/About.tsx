import about from '@/data/profile.json';

export default function About() {
    return (
        <section id="about" className="scroll-mt-16">
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-border inline-block">About Me</h2>
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <p className="text-lg text-muted-foreground leading-relaxed">
                    {about.bio}
                </p>
            </div>
        </section>
    );
}
