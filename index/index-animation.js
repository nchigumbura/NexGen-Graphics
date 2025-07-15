document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const companyName = document.querySelector('.company-name');
    const adminLink = document.querySelector('.admin-link');
    const aboutUsLinkElement = document.getElementById('aboutUsLink');
    const aboutUsClickHint = document.getElementById('aboutUsClickHint');
    const mainNavUl = document.querySelector('.main-nav ul');
    const activeNavLink = document.querySelector('.main-nav li.active');
    const homeIcon = document.querySelector('.main-nav .home-icon'); // Corrected selector to match your HTML

    // Hero Section elements
    const heroSection = document.querySelector('.hero-section');
    const heroTextOverlay = document.querySelector('.hero-text-overlay');

    // Flip Cards - Select them within their respective modal windows
    const aboutUsFlipCard = document.querySelector('#aboutUsWindow .flip-card');
    const adminFlipCard = document.querySelector('#adminLoginWindow .flip-card');

    // Modal Backdrop Overlay
    const modalBackdropOverlay = document.getElementById('modal-backdrop-overlay');

    let shimmerObserver;
    let headerHideTimeout;
    let headerHovering = false;
    let lastScrollTop = 0;
    let navAnimationPlayedOnLoad = false;
    const topThreshold = 50; // Pixels from top to trigger header behavior changes

    // Calculate scrollbar width for body overflow compensation
    function getScrollbarWidth() {
        const outer = document.createElement('div');
        outer.style.visibility = 'hidden';
        outer.style.overflow = 'scroll'; // Force scrollbar to appear
        outer.style.msOverflowStyle = 'scrollbar'; // Needed for Windows 8
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

    function hideHeader() {
        if (header) {
            // Only hide if not at the very top AND not hovering AND no modal is open
            if (!document.body.classList.contains('modal-open') && !headerHovering && window.pageYOffset > topThreshold) {
                header.classList.add('hide-header');
                removeGlassmorphism(); // Ensure it clears blur when hidden
            }
        }
    }

    function showHeader() {
        if (header) {
            header.classList.remove('hide-header');
            clearTimeout(headerHideTimeout); // Clear any pending hide timeouts

            // Apply glassmorphism only if scrolled down OR currently hovering OR a modal is open
            if (window.pageYOffset > topThreshold || headerHovering || document.body.classList.contains('modal-open')) {
                applyGlassmorphism();
            } else {
                // If at top, ensure no glassmorphism is applied (initial state)
                removeGlassmorphism();
            }
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
        z-index: 1004; /* Lower than header's z-index (1005) */
        pointer-events: auto; /* Allow hover detection for header visibility */
    `;
    document.body.appendChild(headerTriggerArea);

    headerTriggerArea.addEventListener('mouseenter', () => {
        headerHovering = true;
        showHeader();
    });

    headerTriggerArea.addEventListener('mouseleave', () => {
        headerHovering = false;
        if (window.pageYOffset > topThreshold && !document.body.classList.contains('modal-open')) {
            headerHideTimeout = setTimeout(() => {
                if (!header.matches(':hover') && !headerHovering) {
                    hideHeader();
                }
            }, 100);
        }
    });

    if (header) {
        header.addEventListener('mouseenter', () => {
            headerHovering = true;
            showHeader();
        });

        header.addEventListener('mouseleave', () => {
            headerHovering = false;
            if (window.pageYOffset > topThreshold && !document.body.classList.contains('modal-open')) {
                headerHideTimeout = setTimeout(() => {
                    if (!headerHovering && !headerTriggerArea.matches(':hover')) {
                        hideHeader();
                    }
                }, 100);
            }
        });
    }

    // Main scroll event handler
    window.addEventListener('scroll', () => {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScrollTop > lastScrollTop && currentScrollTop > topThreshold) {
            // Scrolling down past threshold, hide header if not hovered and no modal
            if (!headerHovering && !document.body.classList.contains('modal-open')) {
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
        // Do not hide header immediately on load if already scrolled down, just apply glassmorphism.
        // Hiding logic will be handled by the scroll event if user scrolls further down.
    }


    // --- Text Sparkle (Shimmer) Effect for NexGen Graphics and Admin ---
    function startShimmer(element) {
        const linkElement = element.querySelector('a');
        if (linkElement && !element.classList.contains('shimmer-active')) {
            element.classList.add('shimmer-active');
            // Remove the class after 8 seconds to reset to original color
            setTimeout(() => {
                element.classList.remove('shimmer-active');
            }, 8000); // Shimmer duration
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
        }, { threshold: 0.5 }); // Trigger when 50% of the element is visible

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
            }, 3000); // Hint disappears after 3 seconds
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
    // Function to show enlarged logo (this should be a global function or passed down)
    window.showEnlargedLogo = function(modalElement, imageUrl) {
        let enlargedLogoOverlay = document.querySelector('.enlarged-logo-overlay');
        let enlargedLogoImg;

        if (!enlargedLogoOverlay) {
            enlargedLogoOverlay = document.createElement('div');
            enlargedLogoOverlay.classList.add('enlarged-logo-overlay');
            document.body.appendChild(enlargedLogoOverlay);

            enlargedLogoImg = document.createElement('img');
            enlargedLogoOverlay.appendChild(enlargedLogoImg);

            enlargedLogoOverlay.addEventListener('click', () => {
                enlargedLogoOverlay.classList.remove('show');
            });
        } else {
            enlargedLogoImg = enlargedLogoOverlay.querySelector('img');
        }

        enlargedLogoImg.src = imageUrl;
        enlargedLogoOverlay.classList.add('show');
    };

    function setupFlipCardAnimation(flipCardElement, backImageSrc, frontImageSrcForHover, stopOnFlippedState = false) {
        if (!flipCardElement) return;

        let flipInterval;
        const flipDuration = 3000; // 3 seconds per side
        const totalAnimationDuration = 15000; // 15 seconds total for auto-flip

        function startAutoFlip() {
            clearInterval(flipInterval); // Clear any existing interval

            // Initial flip after a short delay to start the sequence
            setTimeout(() => {
                if (flipCardElement && !flipCardElement.classList.contains('flipped')) {
                    flipCardElement.classList.add('flipped'); // Show 'nate.png' first
                }
            }, 500); // Small delay before first flip

            flipInterval = setInterval(() => {
                if (flipCardElement) {
                    flipCardElement.classList.toggle('flipped');
                }
            }, flipDuration); // Flip every 3 seconds

            // Stop auto-flipping after totalAnimationDuration
            setTimeout(() => {
                clearInterval(flipInterval);
                if (flipCardElement) {
                    // Ensure it stops on the desired side
                    // For About Us: stopOnFlippedState = false (stops on front - black-logo.png)
                    // For Admin: stopOnFlippedState = true (stops on back - nate.png)
                    if (flipCardElement.classList.contains('flipped') && !stopOnFlippedState) {
                        flipCardElement.classList.remove('flipped'); // Unflip to show front
                    } else if (!flipCardElement.classList.contains('flipped') && stopOnFlippedState) {
                        flipCardElement.classList.add('flipped'); // Flip to show back
                    }
                }
            }, totalAnimationDuration);
        }

        // Initially start auto-flipping
        startAutoFlip();

        // Hover/Click to show enlarged logo & control auto-flip
        flipCardElement.addEventListener('mouseenter', () => {
            clearInterval(flipInterval); // Stop auto-flip on hover
        });

        flipCardElement.addEventListener('mouseleave', () => {
            const modalParent = flipCardElement.closest('.modal-window');
            // Resume auto-flip only if no modal is active and not showing enlarged logo
            const enlargedLogoActive = document.querySelector('.enlarged-logo-overlay.show');
            if ((!modalParent || !modalParent.classList.contains('active')) && !enlargedLogoActive) {
                startAutoFlip(); // Restart if not in a modal and not enlarging
            }
        });

        // Click event for the flip card to show enlarged logo
        flipCardElement.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent modal from closing if click is on card

            clearInterval(flipInterval); // Stop auto-flip on click/tap

            let imageUrlToEnlarge = frontImageSrcForHover;
            // Determine which image to show enlarged based on the 'flipped' class on the PARENT
            if (flipCardElement.classList.contains('flipped')) {
                imageUrlToEnlarge = backImageSrc;
            }

            if (typeof window.showEnlargedLogo === 'function') {
                window.showEnlargedLogo(flipCardElement.closest('.modal-window'), imageUrlToEnlarge);
            }
        });
    }

    // Setup for About Us Flip Card
    const aboutUsFrontImgSrc = aboutUsFlipCard ? aboutUsFlipCard.querySelector('.flip-card-front img')?.src : '';
    const aboutUsBackImgSrc = aboutUsFlipCard ? aboutUsFlipCard.querySelector('.flip-card-back img')?.src : '';
    if (aboutUsFlipCard) {
        // For About Us, stopOnFlippedState is false (stops on company logo - front)
        setupFlipCardAnimation(aboutUsFlipCard, aboutUsBackImgSrc, aboutUsFrontImgSrc, false); 
    }

    // Setup for Admin Flip Card
    const adminFrontImgSrc = adminFlipCard ? adminFlipCard.querySelector('.flip-card-front img')?.src : '';
    const adminBackImgSrc = adminFlipCard ? adminFlipCard.querySelector('.flip-card-back img')?.src : '';
    if (adminFlipCard) {
        // For Admin, stopOnFlippedState is true (stops on NC side - back)
        setupFlipCardAnimation(adminFlipCard, adminBackImgSrc, adminFrontImgSrc, true); 
    }

    // --- Modal Opening/Closing Logic (Integrate with modalBackdropOverlay) ---
    const aboutUsWindow = document.getElementById('aboutUsWindow');
    const adminLoginWindow = document.getElementById('adminLoginWindow');
    const contactUsWindow = document.getElementById('contactInfoModal'); // Corrected ID to match HTML
    const closeButtons = document.querySelectorAll('.modal-window .close-button');

    function openModal(modalElement) {
        if (modalElement) {
            document.body.classList.add('modal-open');
            modalElement.classList.add('active');
            if (modalBackdropOverlay) { // NEW: Activate the backdrop
                modalBackdropOverlay.classList.add('active');
            }
            clearTimeout(headerHideTimeout);
            showHeader();
        }
    }

    function closeModal(modalElement) {
        if (modalElement) {
            modalElement.classList.remove('active');
            setTimeout(() => {
                const activeModals = document.querySelectorAll('.modal-window.active');
                if (activeModals.length === 0) { // Only remove if no other modals are open
                    document.body.classList.remove('modal-open');
                    if (modalBackdropOverlay) { // NEW: Deactivate the backdrop
                        modalBackdropOverlay.classList.remove('active');
                    }
                    if (!headerHovering && window.pageYOffset > topThreshold) {
                        headerHideTimeout = setTimeout(hideHeader, 100);
                    } else {
                        showHeader();
                    }
                }
            }, 300); // Match modal fade-out transition duration
        }
    }

    // Attach click listeners to open buttons (e.g., your header links)
    if (aboutUsLinkElement && aboutUsWindow) {
        aboutUsLinkElement.addEventListener('click', (event) => {
            event.preventDefault();
            openModal(aboutUsWindow);
        });
    }

    if (adminLink && adminLoginWindow) {
        // Ensure adminLink is the container for the <a>, and target the <a>
        adminLink.querySelector('a').addEventListener('click', (event) => {
            event.preventDefault();
            openModal(adminLoginWindow);
        });
    }

    // Attach click listeners to close buttons
    closeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const modalToClose = event.target.closest('.modal-window');
            closeModal(modalToClose);
        });
    });

    // Close modal if clicking outside the modal-content
    document.querySelectorAll('.modal-window').forEach(modal => {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal(modal);
            }
        });
    });
});