import experience from '@/data/experience.json';

export default function Experience() {
    return (
        <section id="experience" className="scroll-mt-16">
            <h2 className="text-2xl font-bold mb-8 pb-2 border-b-2 border-border inline-block">Experience</h2>
            <div className="space-y-6">
                {experience.map((job, index) => (
                    <div key={index} className="bg-card border border-border rounded-xl p-6 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-primary/20"></div>
                        <div className="mb-4">
                            <h3 className="text-xl font-bold">{job.role}</h3>
                            <div className="flex flex-wrap justify-between items-center mt-1 text-sm">
                                <span className="font-semibold text-primary">{job.company}</span>
                                <span className="text-muted-foreground">{job.period}</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">{job.location}</p>
                        </div>

                        <ul className="space-y-2">
                            {job.highlights.map((highlight, i) => (
                                <li key={i} className="text-sm text-muted-foreground pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-primary">
                                    {highlight}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
}
