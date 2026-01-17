'use client';

import { useEffect, useState } from 'react';

interface BlogPost {
    title: string;
    url: string;
    date: string;
    description: string;
    readingTime: number;
    tags: string[];
}

interface BlogData {
    title: string;
    description: string;
    url: string;
    posts: BlogPost[];
}

const BLOG_URL = process.env.NEXT_PUBLIC_BLOG_URL || 'https://blog.harshalkudale.com';
const BLOG_API_URL = process.env.NEXT_PUBLIC_BLOG_API_URL || `${BLOG_URL}/index.json`;

export default function Blog() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await fetch(BLOG_API_URL);
                if (!response.ok) {
                    throw new Error('Failed to fetch blog posts');
                }
                const data: BlogData = await response.json();
                // Only show the 4 most recent posts
                setPosts(data.posts.slice(0, 4));
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load blog posts');
            } finally {
                setLoading(false);
            }
        }
        fetchPosts();
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <section id="blog" className="scroll-mt-16">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold pb-2 border-b-2 border-border inline-block">Blog</h2>
                <a
                    href={BLOG_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
                >
                    View all posts
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                </a>
            </div>

            {loading && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="bg-card border border-border rounded-xl p-6 animate-pulse">
                            <div className="h-4 bg-muted/30 rounded w-3/4 mb-3"></div>
                            <div className="h-3 bg-muted/20 rounded w-full mb-2"></div>
                            <div className="h-3 bg-muted/20 rounded w-2/3 mb-4"></div>
                            <div className="flex gap-2">
                                <div className="h-5 bg-muted/20 rounded w-16"></div>
                                <div className="h-5 bg-muted/20 rounded w-12"></div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {error && (
                <div className="bg-card border border-border rounded-xl p-6 text-center">
                    <p className="text-muted-foreground">{error}</p>
                    <a
                        href={BLOG_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-sm mt-2 inline-block"
                    >
                        Visit blog directly →
                    </a>
                </div>
            )}

            {!loading && !error && posts.length === 0 && (
                <div className="bg-card border border-border rounded-xl p-6 text-center">
                    <p className="text-muted-foreground">No blog posts yet.</p>
                </div>
            )}

            {!loading && !error && posts.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {posts.map((post) => (
                        <a
                            key={post.url}
                            href={post.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group bg-card border border-border rounded-xl p-6 flex flex-col transition-all hover:-translate-y-1 hover:border-primary shadow-sm hover:shadow-md"
                        >
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                                <span>{formatDate(post.date)}</span>
                                <span>•</span>
                                <span>{post.readingTime} min read</span>
                            </div>

                            <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                                {post.title}
                            </h3>

                            <p className="text-sm text-muted-foreground mb-4 flex-grow leading-relaxed line-clamp-2">
                                {post.description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {post.tags.slice(0, 3).map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2.5 py-1 text-xs font-medium bg-muted/20 text-muted-foreground rounded-md border border-border/50"
                                    >
                                        {tag}
                                    </span>
                                ))}
                                {post.tags.length > 3 && (
                                    <span className="px-2.5 py-1 text-xs font-medium text-muted-foreground">
                                        +{post.tags.length - 3}
                                    </span>
                                )}
                            </div>
                        </a>
                    ))}
                </div>
            )}
        </section>
    );
}
