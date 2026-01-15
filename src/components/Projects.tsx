import projects from '@/data/projects.json';

export default function Projects() {
    return (
        <section id="projects" className="scroll-mt-16">
            <h2 className="text-2xl font-bold mb-8 pb-2 border-b-2 border-border inline-block">Projects</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map(project => (
                    <div key={project.id} className="bg-card border border-border rounded-xl p-6 flex flex-col transition-all hover:-translate-y-1 hover:border-primary shadow-sm hover:shadow-md">
                        <h3 className="text-lg font-semibold mb-2">{project.name}</h3>
                        <p className="text-sm text-muted-foreground mb-4 flex-grow leading-relaxed">
                            {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {project.tags.map(tag => (
                                <span
                                    key={tag}
                                    className="px-2.5 py-1 text-xs font-medium bg-muted/20 text-muted-foreground rounded-md border border-border/50"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="flex gap-3 mt-auto">
                            {/* GitHub Button */}
                            {project.githubUrl ? (
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium border border-border rounded-md hover:bg-muted/10 transition-colors"
                                >
                                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
                                    Code
                                </a>
                            ) : (
                                <button disabled className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium border border-border/50 rounded-md text-muted-foreground/50 cursor-not-allowed bg-muted/5">
                                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className="opacity-50"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
                                    Source
                                </button>
                            )}

                            {/* View Project Button */}
                            {project.deployUrl ? (
                                <a
                                    href={project.deployUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium bg-primary text-white rounded-md hover:bg-primary/90 transition-colors shadow-sm"
                                >
                                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                    Live Demo
                                </a>
                            ) : (
                                <button disabled className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium bg-muted text-muted-foreground rounded-md cursor-not-allowed opacity-70">
                                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                    Live Demo
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
