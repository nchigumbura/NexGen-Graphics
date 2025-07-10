// =========================================
// --- Header Animations ---
// =========================================

document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const companyName = document.querySelector('.company-name');
    const adminLink = document.querySelector('.admin-link');
    const aboutUsLinkElement = document.getElementById('aboutUsLink');
    const aboutUsClickHint = document.getElementById('aboutUsClickHint');
    const mainNavUl = document.querySelector('.main-nav ul');
    const activeNavLink = document.querySelector('.main-nav li.active');
    const homeIcon = document.querySelector('.main-nav li.active .home-icon');

    // New variables for Hero Section Animation
    const heroTextOverlay = document.querySelector('.hero-text-overlay');
    let heroAnimationPlayed = false; // Flag to ensure animation plays only once

    let shimmerObserver;
    let headerHideTimeout;
    let headerHovering = false;
    let lastScrollTop = 0;
    let navAnimationPlayedOnLoad = false;
    const topThreshold = 50; // Pixels from top to trigger header behavior changes

    // --- Header Visibility on Scroll/Hover ---
    function applyGlassmorphism() {
        header.classList.add('show-glassmorphism');
    }

    function removeGlassmorphism() {
        header.classList.remove('show-glassmorphism');
    }

    function hideHeader() {
        // Only hide if not at the very top AND not hovering
        // Also ensure glassmorphism is removed when hidden
        if (!headerHovering && window.pageYOffset > topThreshold) {
            header.classList.add('hide-header');
            removeGlassmorphism(); // Ensure it clears blur when hidden
        }
    }

    function showHeader() {
        header.classList.remove('hide-header');
        clearTimeout(headerHideTimeout); // Clear any pending hide timeouts

        // Apply glassmorphism only if scrolled down OR currently hovering
        if (window.pageYOffset > topThreshold || headerHovering) {
            applyGlassmorphism();
        } else {
            // If at top, ensure no glassmorphism is applied (initial state)
            removeGlassmorphism();
        }
    }

    // Create an invisible "hot zone" at the top of the viewport
    const headerTriggerArea = document.createElement('div');
    headerTriggerArea.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: ${topThreshold}px;
        z-index: 1001; /* Above header to capture hover first */
        pointer-events: auto; /* Allow hover events */
    `;
    document.body.appendChild(headerTriggerArea);

    headerTriggerArea.addEventListener('mouseenter', () => {
        headerHovering = true;
        showHeader();
    });

    headerTriggerArea.addEventListener('mouseleave', () => {
        headerHovering = false;
        if (window.pageYOffset > topThreshold) {
            headerHideTimeout = setTimeout(() => {
                if (!header.matches(':hover') && !headerHovering) {
                    hideHeader();
                }
            }, 100);
        }
    });

    header.addEventListener('mouseenter', () => {
        headerHovering = true;
        showHeader();
    });

    header.addEventListener('mouseleave', () => {
        headerHovering = false;
        if (window.pageYOffset > topThreshold) {
            headerHideTimeout = setTimeout(() => {
                if (!headerHovering && !headerTriggerArea.matches(':hover')) {
                    hideHeader();
                }
            }, 100);
        }
    });

    // Main scroll event handler
    window.addEventListener('scroll', () => {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScrollTop > lastScrollTop && currentScrollTop > topThreshold) {
            // Scrolling down past threshold, hide header if not hovered
            if (!headerHovering) {
                hideHeader();
            }
        } else if (currentScrollTop < lastScrollTop || currentScrollTop <= topThreshold) {
            // Scrolling up, or at the very top, show header
            showHeader();
        }

        lastScrollTop = currentScrollTop;
    });

    // Initial check on load to ensure correct state
    if (window.pageYOffset <= topThreshold) {
        removeGlassmorphism();
    } else {
        applyGlassmorphism();
        hideHeader();
    }


    // --- Text Sparkle (Shimmer) Effect for NexGen Graphics and Admin ---
    function startShimmer(element) {
        const linkElement = element.querySelector('a');
        if (linkElement && !element.classList.contains('shimmer-active')) {
            element.classList.add('shimmer-active');
            // Remove the class after 8 seconds to reset to original color
            setTimeout(() => {
                element.classList.remove('shimmer-active');
            }, 8000); // Shimmer duration changed to 8 seconds
        }
    }

    if ('IntersectionObserver' in window) {
        shimmerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.classList.contains('company-name')) {
                        startShimmer(entry.target);
                        showAboutUsHint();
                    } else if (entry.target.classList.contains('admin-link')) {
                        startShimmer(entry.target);
                    }
                } else {
                    // Optional: If you want shimmer to restart every time it comes into view
                    // For now, it will only trigger on first intersection.
                    // If you want it to stop completely when out of view, you would add:
                    // entry.target.classList.remove('shimmer-active');
                }
            });
        }, { threshold: 0.5 }); // Trigger when 50% of the element is visible

        if (companyName) shimmerObserver.observe(companyName);
        if (adminLink) shimmerObserver.observe(adminLink);
    } else {
        // Fallback for browsers without IntersectionObserver (less common now)
        if (companyName) startShimmer(companyName);
        if (adminLink) startShimmer(adminLink);
        if (aboutUsClickHint) showAboutUsHint();
    }

    // --- Disappearing "Click Me" Text ---
    let hintTimeout;
    function showAboutUsHint() {
        if (aboutUsClickHint && aboutUsClickHint.style.display !== 'none') {
            aboutUsClickHint.classList.add('show');
            clearTimeout(hintTimeout);
            hintTimeout = setTimeout(() => {
                aboutUsClickHint.classList.remove('show');
            }, 3000); // Hint disappears after 3 seconds
        }
    }

    function hideAboutUsHint() {
        if (aboutUsClickHint) {
            aboutUsClickHint.classList.remove('show');
            clearTimeout(hintTimeout);
        }
    }

    if (aboutUsLinkElement && aboutUsClickHint) {
        aboutUsLinkElement.addEventListener('click', () => {
            if (aboutUsClickHint) {
                aboutUsClickHint.style.display = 'none'; // Hide permanently after modal opened
            }
        });
    }

    // --- Dynamic Navbar Pop-out Animation on Load ---
    function triggerMainNavAnimation() {
        if (mainNavUl && !navAnimationPlayedOnLoad) {
            // Remove the initial hidden class immediately from the UL
            mainNavUl.classList.remove('nav-hidden-initial');

            // Add the class to trigger the pop-out animation
            mainNavUl.classList.add('show-nav-initial');
            navAnimationPlayedOnLoad = true;

            // Wait for the main nav pop-out transition to finish before moving the bar
            mainNavUl.addEventListener('transitionend', function handler(event) {
                // Ensure it's the 'transform' property that finished
                if (event.propertyName === 'transform' && mainNavUl.classList.contains('show-nav-initial')) {
                    animateActiveBar();
                    mainNavUl.removeEventListener('transitionend', handler); // Remove listener after first trigger
                }
            });
        }
    }

    // Call the main nav animation immediately when the DOM is ready
    triggerMainNavAnimation();


    // --- Active bar movement and icon flip/zoom animation ---
    function animateActiveBar() {
        if (activeNavLink && mainNavUl) {
            const navRect = mainNavUl.getBoundingClientRect();
            const activeLinkRect = activeNavLink.getBoundingClientRect();

            // Calculate target position and width relative to the nav UL
            const targetLeft = activeLinkRect.left - navRect.left;
            const targetWidth = activeLinkRect.width;

            let activeBar = mainNavUl.querySelector('.active-bar');
            if (!activeBar) {
                activeBar = document.createElement('div');
                activeBar.classList.add('active-bar');
                mainNavUl.prepend(activeBar); // Add it to the DOM
            }

            // Set initial state for the bar (off-screen right)
            activeBar.style.width = `${targetWidth}px`;
            activeBar.style.left = `${navRect.width}px`; // Start off the right edge of the nav UL
            activeBar.style.transform = `translateY(-50%)`; // Ensure vertical centering
            activeBar.style.transition = 'none'; // Temporarily remove transition for initial placement

            void activeBar.offsetWidth; // Force a reflow to apply initial styles immediately

            // Now apply the smooth transition to move it to the target position
            activeBar.style.transition = 'transform 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55), width 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55), left 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            activeBar.style.left = `${targetLeft}px`;

            // Wait for the active bar's transition to complete
            activeBar.addEventListener('transitionend', function handler(event) {
                if (event.propertyName === 'left' && homeIcon) {
                    // Start the home icon animation after the bar lands
                    homeIcon.style.animation = 'icon-flip-zoom 0.6s ease-out forwards'; // 0.6s for flip and zoom
                    homeIcon.addEventListener('animationend', function iconAnimationEndHandler() {
                        homeIcon.style.animation = 'none'; // Remove animation after it finishes to allow future triggers
                        homeIcon.removeEventListener('animationend', iconAnimationEndHandler);
                    }, { once: true });
                    activeBar.removeEventListener('transitionend', handler); // Remove listener after first trigger
                }
            });
        }
    }

    // --- Hero Section Text Animation ---
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !heroAnimationPlayed) {
                // When the hero section enters the viewport, add the animation class
                heroTextOverlay.classList.add('animate-in');
                heroAnimationPlayed = true; // Set flag to true
                heroObserver.unobserve(entry.target); // Stop observing after animation
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the hero section is visible
    });

    // Start observing the hero section
    if (heroTextOverlay) {
        heroObserver.observe(heroTextOverlay);
    }
    
    // Optional: If you want the animation to play on load even if not scrolled
    // For example, if the hero section is immediately visible
    // This is good practice to ensure it animates if it's the very first thing on the page.
    if (heroTextOverlay && heroTextOverlay.getBoundingClientRect().top < window.innerHeight && !heroAnimationPlayed) {
        heroTextOverlay.classList.add('animate-in');
        heroAnimationPlayed = true;
    }

    // Event listener for current active link to re-animate on click (if applicable)
    // You'd typically update the 'active' class via JS for navigation clicks.
    // For now, this just ensures the animation plays on initial load of the active link.

});