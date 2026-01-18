// Blog Posts Fetcher
(function () {
    const BLOG_API_URL = 'https://blog.harshalkudale.com/index.json';
    const MAX_POSTS = 4;

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    function createPostCard(post) {
        const article = document.createElement('article');
        article.className = 'post-card';

        article.innerHTML = `
            <h3 class="post-card-title">
                <a href="${post.url}" target="_blank" rel="noopener noreferrer">${post.title}</a>
            </h3>
            <div class="post-card-meta">
                <span>${formatDate(post.date)}</span>
                <span>•</span>
                <span>${post.readingTime || 5} min read</span>
            </div>
            <p class="post-card-excerpt">${post.description}</p>
            <div class="post-card-tags">
                ${post.tags ? post.tags.slice(0, 4).map(tag => `<span class="tag">${tag}</span>`).join('') : ''}
            </div>
        `;

        return article;
    }

    function renderError(container) {
        container.innerHTML = `
            <div class="blog-error">
                <p>Unable to load blog posts.</p>
                <a href="https://blog.harshalkudale.com" target="_blank" rel="noopener noreferrer">
                    Visit blog directly →
                </a>
            </div>
        `;
    }

    function renderLoading(container) {
        container.innerHTML = `
            <div class="blog-loading">
                <p>Loading posts...</p>
            </div>
        `;
    }

    async function fetchAndRenderPosts() {
        const container = document.getElementById('blog-posts');
        if (!container) return;

        renderLoading(container);

        try {
            const response = await fetch(BLOG_API_URL);
            if (!response.ok) throw new Error('Failed to fetch');

            const data = await response.json();
            const posts = data.posts.slice(0, MAX_POSTS);

            container.innerHTML = '';

            if (posts.length === 0) {
                container.innerHTML = '<div class="blog-error"><p>No posts yet.</p></div>';
                return;
            }

            posts.forEach(post => {
                container.appendChild(createPostCard(post));
            });
        } catch (error) {
            console.error('Failed to fetch blog posts:', error);
            renderError(container);
        }
    }

    document.addEventListener('DOMContentLoaded', fetchAndRenderPosts);
})();
