import skills from '@/data/skills.json';

export default function Skills() {
    return (
        <section id="skills" className="scroll-mt-16">
            <h2 className="text-2xl font-bold mb-8 pb-2 border-b-2 border-border inline-block">Skills</h2>
            <div className="grid gap-6">
                {skills.categories.map((category) => (
                    <div key={category.name} className="bg-card border border-border rounded-xl p-6 shadow-sm">
                        <h3 className="text-sm font-bold uppercase text-muted-foreground mb-4 tracking-wider">{category.name}</h3>
                        <div className="flex flex-wrap gap-2">
                            {category.skills.map(skill => (
                                <span
                                    key={skill}
                                    className="px-3 py-1.5 text-sm bg-muted/20 border border-border rounded-full hover:border-primary/50 transition-colors"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
