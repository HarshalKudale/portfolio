/**
 * Harshal Kudale Portfolio - Core Interactive Script
 */

(function () {
    'use strict';

    const STORAGE_KEY = 'theme';
    const DARK = 'dark';
    const LIGHT = 'light';

    // ----------------------------------------------------
    // Theme Management
    // ----------------------------------------------------
    function getInitialTheme() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === DARK || stored === LIGHT) return stored;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK : LIGHT;
    }

    function updateToggleIcons(theme) {
        const darkIcons = document.querySelectorAll('.theme-icon-dark');
        const lightIcons = document.querySelectorAll('.theme-icon-light');

        darkIcons.forEach(el => {
            el.style.display = theme === DARK ? 'inline-block' : 'none';
        });
        lightIcons.forEach(el => {
            el.style.display = theme === LIGHT ? 'inline-block' : 'none';
        });
    }

    function updateGiscusTheme(theme) {
        const giscusFrame = document.querySelector('iframe.giscus-frame');
        if (giscusFrame && giscusFrame.contentWindow) {
            const giscusTheme = theme === DARK ? 'dark' : 'light';
            giscusFrame.contentWindow.postMessage(
                { giscus: { setConfig: { theme: giscusTheme } } },
                'https://giscus.app'
            );
        }
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        updateToggleIcons(theme);
        updateGiscusTheme(theme);
    }

    function toggleTheme() {
        const current = document.documentElement.getAttribute('data-theme') || DARK;
        const next = current === DARK ? LIGHT : DARK;
        localStorage.setItem(STORAGE_KEY, next);
        applyTheme(next);
    }

    // ----------------------------------------------------
    // Toast Notifications
    // ----------------------------------------------------
    let toastTimeout = null;
    function showToast(message) {
        const toast = document.getElementById('toast');
        if (!toast) return;

        toast.textContent = message;
        toast.classList.add('show');

        if (toastTimeout) clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 2600);
    }

    // ----------------------------------------------------
    // Mobile Drawer Navigation
    // ----------------------------------------------------
    function initMobileNav() {
        const menuBtn = document.getElementById('mobile-menu-btn');
        const overlay = document.getElementById('mobile-nav-overlay');
        const closeBtn = document.getElementById('mobile-nav-close');
        if (!menuBtn || !overlay) return;

        function openMenu() {
            overlay.classList.add('is-open');
            overlay.setAttribute('aria-hidden', 'false');
            menuBtn.setAttribute('aria-expanded', 'true');
            document.body.classList.add('nav-open');
        }

        function closeMenu() {
            overlay.classList.remove('is-open');
            overlay.setAttribute('aria-hidden', 'true');
            menuBtn.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('nav-open');
        }

        menuBtn.addEventListener('click', () => {
            const isOpen = overlay.classList.contains('is-open');
            if (isOpen) closeMenu();
            else openMenu();
        });

        if (closeBtn) closeBtn.addEventListener('click', closeMenu);

        // Click outside drawer to close
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeMenu();
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
                closeMenu();
            }
        });

        // Close on link click
        overlay.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }

    // ----------------------------------------------------
    // Copy Actions (Email, Phone, Anchor, Code)
    // ----------------------------------------------------
    function initCopyButtons() {
        // Contact copy buttons
        document.querySelectorAll('.copy-action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const text = btn.getAttribute('data-copy');
                if (!text) return;

                navigator.clipboard.writeText(text).then(() => {
                    const originalHTML = btn.innerHTML;
                    btn.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
                    btn.classList.add('copied');
                    showToast(`Copied "${text}" to clipboard!`);

                    setTimeout(() => {
                        btn.innerHTML = originalHTML;
                        btn.classList.remove('copied');
                    }, 2000);
                }).catch(() => {
                    showToast('Failed to copy to clipboard.');
                });
            });
        });

        // Anchor link copy
        document.querySelectorAll('.anchor-link').forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const url = window.location.origin + window.location.pathname + this.getAttribute('href');
                navigator.clipboard.writeText(url).then(() => {
                    showToast('Section link copied to clipboard!');
                });
            });
        });

        // Code block copy
        document.querySelectorAll('.code-copy-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const wrapper = btn.closest('.code-block-wrapper');
                const codeElement = wrapper ? wrapper.querySelector('code') : null;
                const text = codeElement ? codeElement.textContent : '';

                navigator.clipboard.writeText(text).then(() => {
                    const copyIcon = btn.querySelector('.copy-icon');
                    const checkIcon = btn.querySelector('.check-icon');
                    btn.classList.add('copied');
                    if (copyIcon) copyIcon.style.display = 'none';
                    if (checkIcon) checkIcon.style.display = 'block';
                    showToast('Code copied to clipboard!');

                    setTimeout(() => {
                        btn.classList.remove('copied');
                        if (copyIcon) copyIcon.style.display = 'block';
                        if (checkIcon) checkIcon.style.display = 'none';
                    }, 2000);
                });
            });
        });
    }

    // ----------------------------------------------------
    // Scroll Reveal & Animations
    // ----------------------------------------------------
    function initScrollReveal() {
        const revealElements = document.querySelectorAll(
            '.section, .project-flagship-card, .project-card, .skill-category-card, .timeline-item, .education-card, .post-preview-card'
        );

        if (!('IntersectionObserver' in window)) {
            revealElements.forEach(el => el.classList.add('in-view'));
            return;
        }

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    obs.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '0px 0px -40px 0px',
            threshold: 0.08
        });

        revealElements.forEach((el, index) => {
            el.classList.add('reveal-on-scroll');
            observer.observe(el);
        });
    }

    // ----------------------------------------------------
    // Back To Top Button
    // ----------------------------------------------------
    function initBackToTop() {
        const btn = document.getElementById('back-to-top');
        if (!btn) return;

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ----------------------------------------------------
    // Smooth Anchor Navigation
    // ----------------------------------------------------
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    if (history.pushState) {
                        history.pushState(null, null, targetId);
                    }
                }
            });
        });
    }

    // ----------------------------------------------------
    // Initialize Everything on DOMContentLoaded
    // ----------------------------------------------------
    document.addEventListener('DOMContentLoaded', function () {
        const currentTheme = getInitialTheme();
        applyTheme(currentTheme);

        document.querySelectorAll('.theme-toggle').forEach(btn => {
            btn.addEventListener('click', toggleTheme);
        });

        initMobileNav();
        initCopyButtons();
        initScrollReveal();
        initBackToTop();
        initSmoothScroll();
    });

    // Run theme apply immediately to prevent flash
    const initialTheme = getInitialTheme();
    document.documentElement.setAttribute('data-theme', initialTheme);
})();
