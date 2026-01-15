import education from '@/data/education.json';

export default function Education() {
    return (
        <section id="education" className="scroll-mt-16">
            <h2 className="text-2xl font-bold mb-8 pb-2 border-b-2 border-border inline-block">Education</h2>
            <div className="space-y-6">
                {education.map((edu, index) => (
                    <div key={index} className="bg-card border border-border rounded-xl p-6 shadow-sm">
                        <div className="mb-4">
                            <h3 className="text-xl font-bold">{edu.degree}</h3>
                            <div className="flex flex-wrap justify-between items-center mt-1">
                                <span className="font-medium">{edu.institution}</span>
                                <span className="text-sm text-muted-foreground">{edu.period}</span>
                            </div>
                            {edu.gpa && (
                                <p className="text-sm text-primary font-medium mt-1">GPA: {edu.gpa}</p>
                            )}
                        </div>
                        {edu.highlights && (
                            <ul className="space-y-2 mt-4">
                                {edu.highlights.map((highlight, i) => (
                                    <li key={i} className="text-sm text-muted-foreground pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-primary">
                                        {highlight}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
