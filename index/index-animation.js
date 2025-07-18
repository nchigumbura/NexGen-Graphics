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
    const modalBackdropOverlay = document.getElementById('modal-backdrop-overlay');
    const enlargedLogoOverlay = document.querySelector('.enlarged-logo-overlay');
    const enlargedLogoImg = enlargedLogoOverlay ? enlargedLogoOverlay.querySelector('img') : null;

    let shimmerObserver;
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

        // Use the 'active' class that animationModule applies
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

    headerTriggerArea.addEventListener('mouseenter', updateHeaderStyle);
    headerTriggerArea.addEventListener('mouseleave', updateHeaderStyle);

    if (header) {
        header.addEventListener('mouseenter', updateHeaderStyle);
        header.addEventListener('mouseleave', updateHeaderStyle);
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
            // If the card is currently 'flipped', it means the back image (nate.png) is visible.
            // If it's not 'flipped', the front image (black-logo.png) is visible.
            if (flipCardElement.classList.contains('flipped')) {
                // If the back of the card (nate.png) is clicked, you want to show the black logo.
                imageUrlToEnlarge = frontImageSrc; // This is the black logo image.
            } else {
                // If the front of the card (black-logo.png) is clicked, show the black logo.
                imageUrlToEnlarge = frontImageSrc;
            }

            // Call the animationModule's showEnlargedLogo function directly
            if (window.animationModule && typeof window.animationModule.showEnlargedLogo === 'function') {
                window.animationModule.showEnlargedLogo(imageUrlToEnlarge);
            }
        });
    }

    // Setup for About Us Flip Card
    if (aboutUsFlipCard) {
        // For About Us, stopOnFlippedState is false (stops on company logo - front: black-logo.png)
        setupFlipCardAnimation(aboutUsFlipCard, 'index/images/nate.png', 'index/images/black-logo.png', false);
    }

    // Setup for Admin Flip Card
    if (adminFlipCard) {
        // For Admin, stopOnFlippedState is true (stops on NC side - back: nate.png)
        setupFlipCardAnimation(adminFlipCard, 'index/images/nate.png', 'index/images/black-logo.png', true);
    }

    // --- Global Animation Module (for Modals and Enlarged Logo) ---
    window.animationModule = {
        // Helper to update body class and backdrop state
        updateOverlayState: function() {
            const activeModals = document.querySelectorAll('.modal-window.active');
            const enlargedLogoIsShowing = enlargedLogoOverlay && enlargedLogoOverlay.classList.contains('active');

            if (activeModals.length === 0 && !enlargedLogoIsShowing) {
                document.body.classList.remove('modal-open');
                if (modalBackdropOverlay) {
                    modalBackdropOverlay.classList.remove('active');
                    modalBackdropOverlay.style.zIndex = ''; // Reset z-index
                }
            } else if (enlargedLogoIsShowing) {
                document.body.classList.add('modal-open');
                if (modalBackdropOverlay) {
                    modalBackdropOverlay.classList.add('active');
                    // Ensure modal backdrop is behind enlarged logo overlay
                    modalBackdropOverlay.style.zIndex = '9998'; 
                }
                // Enlarged logo overlay has its z-index set in CSS (9999) and doesn't need dynamic adjustment here.
            } else if (activeModals.length > 0) {
                document.body.classList.add('modal-open');
                if (modalBackdropOverlay) {
                    modalBackdropOverlay.classList.add('active');
                    // Backdrop for regular modals (above header, below enlarged logo)
                    modalBackdropOverlay.style.zIndex = '1006'; 
                }
            }
            // Always update header style after overlay state changes
            updateHeaderStyle();
        },

        openModal: function(modalElement) {
            if (modalElement) {
                modalElement.classList.add('active');
                // Modal element's z-index (above backdrop, below enlarged logo)
                modalElement.style.zIndex = '1007'; 
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
            enlargedLogoImg.alt = "Enlarged Image";

            // Apply styles for visibility and animation start
            enlargedLogoOverlay.style.visibility = 'visible';
            enlargedLogoOverlay.style.opacity = '1';
            enlargedLogoImg.style.transform = 'scale(1)';
            enlargedLogoImg.style.opacity = '1';
            enlargedLogoOverlay.classList.add('active'); // Add active class

            this.updateOverlayState();

            // Setup single click listener for closing the enlarged logo
            const closeEnlargedLogoHandler = (e) => {
                // Check if the click occurred directly on the overlay or the image itself
                if (e.target === enlargedLogoOverlay || e.target === enlargedLogoImg) {
                    enlargedLogoOverlay.style.opacity = '0';
                    enlargedLogoImg.style.transform = 'scale(0.8)';
                    enlargedLogoImg.style.opacity = '0'; // Ensure the image also fades out
                    enlargedLogoOverlay.classList.remove('active'); // Remove active class

                    // Wait for fade-out transition to complete before setting visibility to hidden
                    enlargedLogoOverlay.addEventListener('transitionend', function handler() {
                        enlargedLogoOverlay.style.visibility = 'hidden';
                        enlargedLogoOverlay.removeEventListener('transitionend', handler); // Remove self
                        window.animationModule.updateOverlayState(); // Update global state
                    }, { once: true }); // Ensure this listener runs only once
                }
            };

            // Remove any previous click handler to prevent multiple executions
            if (enlargedLogoOverlay.__currentCloseHandler__) {
                enlargedLogoOverlay.removeEventListener('click', enlargedLogoOverlay.__currentCloseHandler__);
            }
            enlargedLogoOverlay.addEventListener('click', closeEnlargedLogoHandler);
            enlargedLogoOverlay.__currentCloseHandler__ = closeEnlargedLogoHandler; // Store for future removal
        },

        // This function is for backdrop clicks, so it needs to decide what to close
        handleBackdropClick: function() {
            // Prioritize closing the enlarged logo if it's active
            if (enlargedLogoOverlay && enlargedLogoOverlay.classList.contains('active')) {
                // Simulate a click on the enlarged logo overlay to trigger its close logic
                // This ensures the animation and state updates within showEnlargedLogo's closing part are used.
                enlargedLogoOverlay.click();
            } else {
                // Otherwise, close any active modals
                const activeModals = document.querySelectorAll('.modal-window.active');
                activeModals.forEach(modal => {
                    window.animationModule.closeModal(modal); // Use the animationModule's closeModal
                });
            }
        }
    }; // End window.animationModule

    // Attach open modal listeners directly here, using the animationModule
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

    // Add event listeners for closing regular modals from their close buttons (re-affirmation)
    document.querySelectorAll('.modal-window .close-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const modalToClose = event.target.closest('.modal-window');
            window.animationModule.closeModal(modalToClose);
        });
    });

    // Handle clicks on the modal backdrop overlay using the module's handler
    if (modalBackdropOverlay) {
        modalBackdropOverlay.addEventListener('click', () => {
            window.animationModule.handleBackdropClick();
        });
    }
});