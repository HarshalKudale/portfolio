// Theme Toggle Script
(function () {
    const STORAGE_KEY = 'theme';
    const DARK = 'dark';
    const LIGHT = 'light';

    // Get initial theme
    function getInitialTheme() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) return stored;

        // Check system preference
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return DARK;
        }
        return LIGHT;
    }

    // Apply theme to document
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        updateToggleIcon(theme);
        updateGiscusTheme(theme);
    }

    // Update toggle button icon
    function updateToggleIcon(theme) {
        const toggles = document.querySelectorAll('.theme-toggle');
        toggles.forEach(toggle => {
            toggle.innerHTML = theme === DARK ? '☀️' : '🌙';
            toggle.setAttribute('aria-label', `Switch to ${theme === DARK ? 'light' : 'dark'} mode`);
        });
    }

    // Update Giscus theme if present
    function updateGiscusTheme(theme) {
        const giscusFrame = document.querySelector('iframe.giscus-frame');
        if (giscusFrame) {
            const giscusTheme = theme === DARK ? 'dark' : 'light';
            giscusFrame.contentWindow.postMessage(
                { giscus: { setConfig: { theme: giscusTheme } } },
                'https://giscus.app'
            );
        }
    }

    // Toggle theme
    function toggleTheme() {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === DARK ? LIGHT : DARK;
        localStorage.setItem(STORAGE_KEY, next);
        applyTheme(next);
    }

    // Initialize on DOM ready
    document.addEventListener('DOMContentLoaded', function () {
        const theme = getInitialTheme();
        applyTheme(theme);

        // Bind toggle buttons
        const toggles = document.querySelectorAll('.theme-toggle');
        toggles.forEach(toggle => {
            toggle.addEventListener('click', toggleTheme);
        });
    });

    // Prevent flash of wrong theme
    const theme = getInitialTheme();
    document.documentElement.setAttribute('data-theme', theme);
})();

// Smooth scroll for navigation (only for anchor links)
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
