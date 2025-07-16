document.addEventListener('DOMContentLoaded', () => {
    // Header elements for scroll and hover effects
    const header = document.querySelector('header');
    const companyName = document.querySelector('.company-name');
    const adminLink = document.querySelector('.admin-link');
    const aboutUsLinkElement = document.getElementById('aboutUsLink');
    const aboutUsClickHint = document.getElementById('aboutUsClickHint');
    const mainNavUl = document.querySelector('.main-nav ul');
    const activeNavLink = document.querySelector('.main-nav li.active');
    const homeIcon = document.querySelector('.main-nav .home-icon');

    // Hero Section elements
    const heroSection = document.querySelector('.hero-section');
    const heroTextOverlay = document.querySelector('.hero-text-overlay');

    // Flip Cards - Select them within their respective modal windows
    const aboutUsFlipCard = document.querySelector('#aboutUsWindow .flip-card');
    const adminFlipCard = document.querySelector('#adminLoginWindow .flip-card');

    // Modal Backdrop Overlay & Enlarged Logo Overlay - Get references from DOM
    // These elements are created in index.js and are available in the DOM
    const modalBackdropOverlay = document.getElementById('modal-backdrop-overlay');
    const enlargedLogoOverlay = document.querySelector('.enlarged-logo-overlay');
    const enlargedLogoImg = enlargedLogoOverlay ? enlargedLogoOverlay.querySelector('img') : null;


    let shimmerObserver;
    let headerHideTimeout; // This variable is declared but not used, consider removing if not needed.
    let headerHovering = false;
    let lastScrollTop = 0;
    let navAnimationPlayedOnLoad = false;
    const topThreshold = 50;

    // Calculate scrollbar width for body overflow compensation
    function getScrollbarWidth() {
        const outer = document.createElement('div');
        outer.style.visibility = 'hidden';
        outer.style.overflow = 'scroll';
        outer.style.msOverflowStyle = 'scrollbar';
        document.body.appendChild(outer);
        const inner = document.createElement('div');
        outer.appendChild(inner);
        const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
        outer.parentNode.removeChild(outer);
        return scrollbarWidth;
    }
    const scrollbarWidth = getScrollbarWidth();
    document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);


    // --- Header Visibility on Scroll/Hover ---
    function applyGlassmorphism() {
        if (header) header.classList.add('show-glassmorphism');
    }

    function removeGlassmorphism() {
        if (header) header.classList.remove('show-glassmorphism');
    }

    // Consolidated function to update header style based on all conditions
    function updateHeaderStyle() {
        if (!header) return;

        const currentScrollY = window.pageYOffset;
        const isHovering = header.matches(':hover') || (headerTriggerArea && headerTriggerArea.matches(':hover'));

        const activeModals = document.querySelectorAll('.modal-window.active');
        const enlargedLogoIsShowing = enlargedLogoOverlay && enlargedLogoOverlay.classList.contains('active');

        // Condition 1: If any modal or enlarged logo is active, always show header with glassmorphism
        if (activeModals.length > 0 || enlargedLogoIsShowing) {
            header.classList.remove('hide-header');
            applyGlassmorphism();
            return; // Exit, as overlays override scroll/hover
        }

        // Condition 2: Scrolling down and past header height, and not hovering
        if (currentScrollY > lastScrollTop && currentScrollY > topThreshold) {
            if (!isHovering) {
                header.classList.add('hide-header');
                removeGlassmorphism();
            }
        }
        // Condition 3: Scrolling up, or at the very top, or hovering
        else if (currentScrollY < lastScrollTop || currentScrollY <= topThreshold || isHovering) {
            header.classList.remove('hide-header');
            if (currentScrollY > topThreshold || isHovering) {
                applyGlassmorphism();
            } else {
                removeGlassmorphism();
            }
        }
        lastScrollTop = currentScrollY;
    }


    const headerTriggerArea = document.createElement('div');
    headerTriggerArea.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: ${topThreshold}px;
        z-index: 1004; /* High z-index to be clickable, but lower than modals/enlarged logo */
        pointer-events: auto;
    `;
    document.body.appendChild(headerTriggerArea);

    headerTriggerArea.addEventListener('mouseenter', () => {
        headerHovering = true; // This variable is declared but not used inside updateHeaderStyle. Consider removing if not needed.
        updateHeaderStyle();
    });

    headerTriggerArea.addEventListener('mouseleave', () => {
        headerHovering = false; // This variable is declared but not used inside updateHeaderStyle. Consider removing if not needed.
        updateHeaderStyle();
    });

    if (header) {
        header.addEventListener('mouseenter', () => {
            headerHovering = true; // This variable is declared but not used inside updateHeaderStyle. Consider removing if not needed.
            updateHeaderStyle();
        });

        header.addEventListener('mouseleave', () => {
            headerHovering = false; // This variable is declared but not used inside updateHeaderStyle. Consider removing if not needed.
            updateHeaderStyle();
        });
    }

    window.addEventListener('scroll', updateHeaderStyle);

    // Initial check on load
    updateHeaderStyle();


    // --- Text Sparkle (Shimmer) Effect for NexGen Graphics and Admin ---
    function startShimmer(element) {
        const linkElement = element.querySelector('a');
        if (linkElement && !element.classList.contains('shimmer-active')) {
            element.classList.add('shimmer-active');
            setTimeout(() => {
                element.classList.remove('shimmer-active');
            }, 8000);
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
                }
            });
        }, { threshold: 0.5 });

        if (companyName) shimmerObserver.observe(companyName);
        if (adminLink) shimmerObserver.observe(adminLink);
    } else {
        // Fallback for browsers without IntersectionObserver
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
            }, 3000);
        }
    }

    // This function will be triggered when the aboutUsLinkElement is clicked
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
            mainNavUl.classList.remove('nav-hidden-initial');
            mainNavUl.classList.add('show-nav-initial');
            navAnimationPlayedOnLoad = true;

            mainNavUl.addEventListener('transitionend', function handler(event) {
                if (event.propertyName === 'transform' && mainNavUl.classList.contains('show-nav-initial')) {
                    animateActiveBar();
                    mainNavUl.removeEventListener('transitionend', handler);
                }
            });
        }
    }

    triggerMainNavAnimation();


    // --- Active bar movement and icon flip/zoom animation ---
    function animateActiveBar() {
        if (activeNavLink && mainNavUl) {
            const navRect = mainNavUl.getBoundingClientRect();
            const activeLinkRect = activeNavLink.getBoundingClientRect();

            const targetLeft = activeLinkRect.left - navRect.left;
            const targetWidth = activeLinkRect.width;

            let activeBar = mainNavUl.querySelector('.active-bar');
            if (!activeBar) {
                activeBar = document.createElement('div');
                activeBar.classList.add('active-bar');
                mainNavUl.prepend(activeBar);
            }

            activeBar.style.width = `${targetWidth}px`;
            activeBar.style.left = `${navRect.width}px`; // Start off the right edge of the nav UL
            activeBar.style.transform = `translateY(-50%)`;
            activeBar.style.transition = 'none'; // Temporarily remove transition for initial placement

            void activeBar.offsetWidth; // Force a reflow

            activeBar.style.transition = 'transform 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55), width 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55), left 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            activeBar.style.left = `${targetLeft}px`;

            activeBar.addEventListener('transitionend', function handler(event) {
                if (event.propertyName === 'left' && homeIcon) {
                    homeIcon.style.animation = 'icon-flip-zoom 0.6s ease-out forwards'; // 0.6s for flip and zoom
                    homeIcon.addEventListener('animationend', function iconAnimationEndHandler() {
                        homeIcon.style.animation = 'none'; // Remove animation after it finishes
                        homeIcon.removeEventListener('animationend', iconAnimationEndHandler);
                    }, { once: true });
                    activeBar.removeEventListener('transitionend', handler);
                }
            });
        }
    }

    // --- Hero Section Text Animation ---
    function animateHeroText() {
        if (heroTextOverlay) {
            heroTextOverlay.classList.remove('animate-in');
            void heroTextOverlay.offsetWidth; // Trigger reflow
            heroTextOverlay.classList.add('animate-in');
        }
    }

    // Observe the hero section for animation
    if (heroSection && heroTextOverlay) {
        const observerOptions = {
            root: null, // relative to the viewport
            rootMargin: '0px',
            threshold: 0.5 // Trigger when 50% of the hero section is visible
        };

        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateHeroText();
                } else {
                    heroTextOverlay.classList.remove('animate-in');
                }
            });
        }, observerOptions);

        heroObserver.observe(heroSection);

        // Initial animation check on page load
        const rect = heroSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            animateHeroText();
        }
    }

    // --- Hero Section Image Blur/Animation ---
    const heroImage = document.querySelector('.hero-image-container img');
    const glowingFrame = document.querySelector('.glowing-frame');

    if (heroImage) {
        setTimeout(() => {
            heroImage.style.filter = 'blur(0px)'; // Remove blur
            heroImage.style.transition = 'filter 1.5s ease-out'; // Smooth transition for blur removal

            if (glowingFrame) {
                glowingFrame.style.animation = 'pulse-glow 4s infinite alternate'; // Start glowing animation
            }
        }, 1000); // Delay for 1 second after page load
    }


    // --- Flip Card Initial Flip & Hover/Tap (About Us & Admin) ---
    function setupFlipCardAnimation(flipCardElement, backImageSrc, frontImageSrc, stopOnFlippedState = false) {
        if (!flipCardElement) return;

        let flipInterval;
        const flipDuration = 3000; // 3 seconds per side
        const totalAnimationDuration = 15000; // 15 seconds total for auto-flip (5 flips)

        function startAutoFlip() {
            clearInterval(flipInterval); // Clear any existing interval

            // Initial flip after a short delay to start the sequence
            setTimeout(() => {
                if (flipCardElement && !flipCardElement.classList.contains('flipped')) {
                    // Ensure it starts by flipping to the back image (e.g., nate.png for about us initially)
                    flipCardElement.classList.add('flipped');
                }
            }, 500); // Small delay before first flip

            let flipCount = 0; // Track the number of flips
            flipInterval = setInterval(() => {
                if (flipCardElement) {
                    flipCardElement.classList.toggle('flipped');
                    flipCount++;
                    // Stop auto-flipping once total duration (5 flips) is reached
                    if (flipCount >= (totalAnimationDuration / flipDuration)) {
                        clearInterval(flipInterval);
                        // Ensure it stops on the desired side
                        if (flipCardElement.classList.contains('flipped') && !stopOnFlippedState) {
                            flipCardElement.classList.remove('flipped'); // Unflip to show front (black-logo.png)
                        } else if (!flipCardElement.classList.contains('flipped') && stopOnFlippedState) {
                            flipCardElement.classList.add('flipped'); // Flip to show back (nate.png)
                        }
                    }
                }
            }, flipDuration); // Flip every 3 seconds
        }

        // Initially start auto-flipping
        startAutoFlip();

        // Hover/Click to show enlarged logo & control auto-flip
        flipCardElement.addEventListener('mouseenter', () => {
            clearInterval(flipInterval); // Stop auto-flip on hover
        });

        flipCardElement.addEventListener('mouseleave', () => {
            const modalParent = flipCardElement.closest('.modal-window');
            // Resume auto-flip only if no modal is active and no enlarged logo overlay is active
            const enlargedLogoActive = enlargedLogoOverlay && enlargedLogoOverlay.classList.contains('active');
            if ((!modalParent || !modalParent.classList.contains('active')) && !enlargedLogoActive) {
                startAutoFlip(); // Restart if not in a modal and not enlarging
            }
        });

        // Click event for the flip card to show enlarged logo
        flipCardElement.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent modal from closing if click is on card

            clearInterval(flipInterval); // Stop auto-flip on click/tap

            let imageUrlToEnlarge;
            // Determine which image to show enlarged based on the 'flipped' class on the card
            if (flipCardElement.classList.contains('flipped')) {
                imageUrlToEnlarge = backImageSrc; // If currently showing back (nate.png)
            } else {
                imageUrlToEnlarge = frontImageSrc; // If currently showing front (black-logo.png)
            }

            // Call the animationModule's showEnlargedLogo function directly
            if (window.animationModule && typeof window.animationModule.showEnlargedLogo === 'function') {
                window.animationModule.showEnlargedLogo(imageUrlToEnlarge); // Removed unnecessary params as they are already globally referenced
            }
        });
    }

    // Setup for About Us Flip Card
    if (aboutUsFlipCard) {
        // For About Us, stopOnFlippedState is false (stops on company logo - front: black-logo.png)
        setupFlipCardAnimation(aboutUsFlipCard, '../images/nate.png', '../images/black-logo.png', false);
    }

    // Setup for Admin Flip Card
    if (adminFlipCard) {
        // For Admin, stopOnFlippedState is true (stops on NC side - back: nate.png)
        setupFlipCardAnimation(adminFlipCard, '../images/nate.png', '../images/black-logo.png', true);
    }


    // --- Global Animation Module (for Modals and Enlarged Logo) ---
    // This object will hold all the functions related to modal and overlay animations and logic.
    window.animationModule = {
        // Helper to update body class and backdrop state
        updateOverlayState: function() {
            const activeModals = document.querySelectorAll('.modal-window.active');
            const enlargedLogoIsShowing = enlargedLogoOverlay && enlargedLogoOverlay.classList.contains('active');

            if (activeModals.length === 0 && !enlargedLogoIsShowing) {
                document.body.classList.remove('modal-open');
                if (modalBackdropOverlay) {
                    modalBackdropOverlay.classList.remove('active');
                }
            } else if (enlargedLogoIsShowing) {
                document.body.classList.add('modal-open');
                if (modalBackdropOverlay) {
                    modalBackdropOverlay.classList.add('active');
                    // Set backdrop Z-index for enlarged logo (higher than regular modals)
                    modalBackdropOverlay.style.zIndex = '9998';
                }
                // Set enlarged logo Z-index (highest)
                if (enlargedLogoOverlay) enlargedLogoOverlay.style.zIndex = '9999';
            } else if (activeModals.length > 0) {
                document.body.classList.add('modal-open');
                if (modalBackdropOverlay) {
                    modalBackdropOverlay.classList.add('active');
                    // Set backdrop Z-index for regular modals
                    modalBackdropOverlay.style.zIndex = '100';
                }
            }
            // Always update header style after overlay state changes
            updateHeaderStyle();
        },

        openModal: function(modalElement) {
            if (modalElement) {
                modalElement.classList.add('active');
                // Set modal Z-index (higher than regular modal backdrop)
                modalElement.style.zIndex = '101';
                this.updateOverlayState();
            }
        },

        closeModal: function(modalElement) {
            if (modalElement) {
                modalElement.classList.remove('active');
                // Give a brief delay to allow CSS transition to complete before updating state
                setTimeout(() => {
                    modalElement.style.zIndex = ''; // Reset z-index
                    this.updateOverlayState();
                }, 300); // Match modal fade-out transition duration
            }
        },

        showEnlargedLogo: function(imageUrl) {
            if (!enlargedLogoOverlay || !enlargedLogoImg) return;

            enlargedLogoImg.src = imageUrl;
            enlargedLogoImg.alt = "Enlarged Logo";

            enlargedLogoOverlay.style.visibility = 'visible';
            enlargedLogoOverlay.style.opacity = '1';
            enlargedLogoImg.style.transform = 'scale(1)';
            enlargedLogoOverlay.classList.add('active');

            this.updateOverlayState();

            // Re-attach click listener for closing, ensuring 'once' behavior
            // Remove previous listener if it exists to avoid multiple triggers
            const currentCloseHandler = enlargedLogoOverlay.__closeHandler__; // Use a hidden property to store handler
            if (currentCloseHandler) {
                enlargedLogoOverlay.removeEventListener('click', currentCloseHandler);
            }

            const newCloseHandler = (e) => {
                if (e.target === enlargedLogoOverlay || e.target === enlargedLogoImg) { // Also allow clicking the image to close
                    enlargedLogoOverlay.style.opacity = '0';
                    enlargedLogoImg.style.transform = 'scale(0.8)';
                    enlargedLogoOverlay.classList.remove('active');

                    setTimeout(() => {
                        enlargedLogoOverlay.style.visibility = 'hidden';
                        this.updateOverlayState();
                        // Remove the event listener after it's used
                        enlargedLogoOverlay.removeEventListener('click', newCloseHandler);
                        enlargedLogoOverlay.__closeHandler__ = null; // Clear the stored handler
                    }, 300);
                }
            };
            enlargedLogoOverlay.addEventListener('click', newCloseHandler);
            enlargedLogoOverlay.__closeHandler__ = newCloseHandler; // Store reference to the handler
        },

        handleBackdropClick: function() {
            // Prioritize closing the enlarged logo if it's active
            if (enlargedLogoOverlay && enlargedLogoOverlay.classList.contains('active')) {
                // Directly call the close logic for enlarged logo
                this.showEnlargedLogo(''); // Call with empty string to trigger close logic
            } else {
                // Otherwise, close any active modals
                const activeModals = document.querySelectorAll('.modal-window.active');
                activeModals.forEach(modal => {
                    modal.classList.remove('active');
                    // Give a brief delay to allow CSS transition to complete before updating state
                    setTimeout(() => {
                        modal.style.zIndex = ''; // Reset z-index
                        this.updateOverlayState();
                    }, 300);
                });
            }
        }
    }; // End window.animationModule

    // Attach open modal listeners directly here, using the animationModule
    // These will now call animationModule.openModal which handles display.
    if (aboutUsLinkElement) {
        aboutUsLinkElement.addEventListener('click', (event) => {
            event.preventDefault();
            const aboutUsWindow = document.getElementById('aboutUsWindow');
            if (aboutUsWindow) window.animationModule.openModal(aboutUsWindow);
        });
    }

    if (adminLink && adminLink.querySelector('a')) {
        adminLink.querySelector('a').addEventListener('click', (event) => {
            event.preventDefault();
            const adminLoginWindow = document.getElementById('adminLoginWindow');
            if (adminLoginWindow) window.animationModule.openModal(adminLoginWindow);
        });
    }
});