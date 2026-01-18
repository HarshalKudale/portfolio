// GitHub Stats Fetcher
// Fetches stars and download counts from GitHub API

(function () {
    'use strict';

    // Format large numbers with K suffix
    function formatNumber(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
        }
        return num.toString();
    }

    // Fetch repository stats from GitHub API
    async function fetchRepoStats(owner, repo) {
        try {
            const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
            if (!response.ok) throw new Error('API request failed');
            const data = await response.json();
            return {
                stars: data.stargazers_count,
                forks: data.forks_count
            };
        } catch (e) {
            console.warn(`Failed to fetch stats for ${owner}/${repo}:`, e);
            return null;
        }
    }

    // Fetch total downloads from all releases
    async function fetchDownloads(owner, repo) {
        try {
            const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/releases`);
            if (!response.ok) throw new Error('API request failed');
            const releases = await response.json();

            let totalDownloads = 0;
            releases.forEach(release => {
                release.assets.forEach(asset => {
                    totalDownloads += asset.download_count;
                });
            });

            return totalDownloads;
        } catch (e) {
            console.warn(`Failed to fetch downloads for ${owner}/${repo}:`, e);
            return null;
        }
    }

    // Update project card with stats
    async function updateProjectStats(card) {
        const owner = card.dataset.githubOwner;
        const repo = card.dataset.githubRepo;

        if (!owner || !repo) return;

        // Fetch stats
        const [repoStats, downloads] = await Promise.all([
            fetchRepoStats(owner, repo),
            fetchDownloads(owner, repo)
        ]);

        // Update stars
        if (repoStats && repoStats.stars) {
            const starsEl = card.querySelector('[data-stat="stars"]');
            if (starsEl) {
                starsEl.textContent = formatNumber(repoStats.stars);
                starsEl.setAttribute('data-loaded', 'true');
            }
        }

        // Update downloads
        if (downloads && downloads > 0) {
            const downloadsEl = card.querySelector('[data-stat="downloads"]');
            if (downloadsEl) {
                downloadsEl.textContent = formatNumber(downloads);
                downloadsEl.setAttribute('data-loaded', 'true');
            }
        }
    }

    // Initialize on DOM load
    document.addEventListener('DOMContentLoaded', function () {
        const projectCards = document.querySelectorAll('.project-card[data-github-owner]');
        projectCards.forEach(updateProjectStats);
    });
})();
