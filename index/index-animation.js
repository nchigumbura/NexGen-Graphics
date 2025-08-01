// animation.js
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

    // New: Select all why-choose-card elements
    const whyChooseCards = document.querySelectorAll('.why-choose-card');

    // Select all gallery items and testimonials section
    const imageGalleryGrid = document.querySelector('.image-gallery-grid'); // Renamed for clarity
    const galleryItems = document.querySelectorAll('.gallery-item');
    const testimonialsSection = document.querySelector('.testimonials-section');

    let shimmerObserver;
    let lastScrollTop = 0;
    let navAnimationPlayedOnLoad = false;
    const topThreshold = 50;

    // Gallery specific variables
    let scrollSpeed = 0.5; // Pixels per frame
    let galleryAnimationFrameId;
    let isGalleryPaused = false; // Flag to control gallery scrolling (mainly for mobile)
    let galleryIntervalId; // For automatic active image transition
    let currentActiveIndex = 0; // To keep track of the active image


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

        // IntersectionObserver for Why Choose Cards
        const whyChooseCardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!entry.target.classList.contains('animate-glow-played')) {
                        entry.target.classList.add('animate-glow');
                        entry.target.classList.add('animate-glow-played');
                        setTimeout(() => {
                            entry.target.classList.remove('animate-glow');
                        }, 8000);
                    }
                }
            });
        }, { threshold: 0.4 });

        whyChooseCards.forEach(card => {
            whyChooseCardObserver.observe(card);
        });

        // IntersectionObserver for Image Gallery items (no longer for simple visibility, but to manage carousel)
        const galleryItemObserver = new IntersectionObserver((entries) => {
             entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                } else {
                    // Only remove if not currently expanded, to avoid flicker
                    if (!entry.target.classList.contains('is-expanded')) {
                        entry.target.classList.remove('is-visible');
                    }
                }
            });
        }, { threshold: 0.3 }); // Trigger when 30% of the item is visible

        galleryItems.forEach(item => {
            galleryItemObserver.observe(item);
        });

        // IntersectionObserver for Testimonials Section
        const testimonialsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                } else {
                    entry.target.classList.remove('is-visible'); // Reset for re-animation
                }
            });
        }, { threshold: 0.2 }); // Trigger when 20% of the section is visible

        if (testimonialsSection) {
            testimonialsSection.classList.add('animate-on-scroll'); // Add initial class
            testimonialsObserver.observe(testimonialsSection);
        }


    } else {
        // Fallback for browsers without IntersectionObserver
        if (companyName) startShimmer(companyName);
        if (adminLink) startShimmer(adminLink);
        if (aboutUsClickHint) showAboutUsHint();

        // Fallback for whyChooseCards (won't have "on view" trigger)
        whyChooseCards.forEach(card => {
            card.classList.add('animate-glow'); // Apply animation immediately if no IntersectionObserver
        });

        // Fallback for gallery items and testimonials (no scroll animation)
        galleryItems.forEach(item => {
            item.classList.add('is-visible'); // Show immediately
        });
        if (testimonialsSection) {
            testimonialsSection.classList.add('is-visible'); // Show immediately
        }
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

            // NEW: Pause gallery scrolling when enlarged image is opened on small screens
            if (window.matchMedia('(max-width: 768px)').matches) {
                isGalleryPaused = true;
                stopGalleryScrolling();
                clearInterval(galleryIntervalId); // Stop auto-advance too
            }

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
                        // NEW: Resume gallery scrolling if it was paused for the enlarged logo
                        if (window.matchMedia('(max-width: 768px)').matches && isGalleryPaused) {
                            isGalleryPaused = false;
                            startGalleryScrolling();
                            autoAdvanceGallery(); // Resume auto-advance
                        }
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

    // --- NEW: Image Gallery Carousel and Interaction Logic (for imagegallery media query - small screens/tablets) ---
    // Function to start the continuous scrolling animation (ONLY FOR SMALL SCREENS)
    
    // Function to stop the continuous scrolling animation
    function stopGalleryScrolling() {
        if (galleryAnimationFrameId) {
            cancelAnimationFrame(galleryAnimationFrameId);
            galleryAnimationFrameId = null;
        }
    }

    // Function to update the active image and trigger its animations
    function updateActiveGalleryImage(index) {
        
        if (!galleryItems || galleryItems.length === 0) return;

        // Remove active and animation classes from previous active item
        galleryItems.forEach((item, idx) => {
            item.classList.remove('active', 'side-image');
            const morphOverlay = item.querySelector('.morph-overlay');
            const textOverlay = item.querySelector('.gallery-text-overlay');
            if (morphOverlay) {
                morphOverlay.classList.remove('active-morph');
            }
            if (textOverlay) {
                textOverlay.classList.remove('gallery-active-text');
            }
            // Set non-active items to 'side-image' state for visual distinction
            if (idx !== index) {
                item.classList.add('side-image');
            }
        });

        // Add active class to the new active item
        const activeItem = galleryItems[index];
        if (activeItem) {
            activeItem.classList.add('active');
            activeItem.classList.remove('side-image'); // Ensure it's not a side-image

            // Smoothly scroll the grid to bring the active item into view
            if (imageGalleryGrid && activeItem) {
                // *** MODIFIED LOGIC HERE FOR INITIAL POSITIONING ***
                if (index === 0) {
                    // For the very first image, always start at scrollLeft = 0
                    imageGalleryGrid.scrollTo({
                        left: 0,
                        behavior: 'smooth'
                    });
                } else {
                    // For all other images, continue to center them
                    imageGalleryGrid.scrollTo({
                        left: activeItem.offsetLeft + (activeItem.offsetWidth / 2) - (imageGalleryGrid.clientWidth / 2),
                        behavior: 'smooth'
                    });
                }
            }

            const morphOverlay = activeItem.querySelector('.morph-overlay');
            const textOverlay = activeItem.querySelector('.gallery-text-overlay');
            const imgElement = activeItem.querySelector('img'); // Get the image element

            //step 1: Get the dominat color from the image
            if (imgElement && morphOverlay) {
                // Wait for the image to load to ensure color can be picked
                imgElement.onload = () => {
                    const dominantColor =getDominantColor( imgElement);

                    // Set the gradient background dynamically
                    morphOverlay.style.background = `linear-gradient(to top, ${dominantColor} 0%, transparent 100%)`;
                    morphOverlay.classList.add('active-morph'); // Add the active class
                }
                // If the image is already loaded, run the logic immediately
                if (imgElement.complete) {
                   const dominantColor = getDominantColor(imgElement);
                   morphOverlay.style.background = `linear-gradient(to top, ${dominantColor} 0%, transparent 100%)`;
                   morphOverlay.classList.add('active-morph');
                }
            }
            // Step 1: Image becomes active (handled by .active class in CSS)
            // Step 2: Morph effect after 2 seconds
            if (morphOverlay) {
                setTimeout(() => {
                    morphOverlay.classList.add('active-morph');
                }, 0); // 2 seconds after becoming active
            }

            // Step 3: Text overlay after morph effect completes (approx 3 seconds after image becomes active)
            if (textOverlay) {
                setTimeout(() => {
                    textOverlay.classList.add('gallery-active-text');
                }, 0); // 3 seconds after image becomes active (1s after morph starts)
            }
        }
    }

    // Function to transition to the next slide automatically
    function autoAdvanceGallery() {
        clearInterval(galleryIntervalId); // Clear any existing interval

        // Only auto-advance if on a small screen
        if (window.matchMedia('(max-width: 768px)').matches) {
            galleryIntervalId = setInterval(() => {
                currentActiveIndex = (currentActiveIndex + 1) % galleryItems.length;
                updateActiveGalleryImage(currentActiveIndex);
            }, 5000); // Transition every 5 seconds (this includes the 3s for animations)
        }
    }

    // Add interaction listeners for each gallery item
    galleryItems.forEach((item, index) => {
        let lastClickTime = 0;
        item.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default behavior for clicks on gallery items

            // Stop the auto-advancing when a user interacts, regardless of screen size
            clearInterval(galleryIntervalId);

            if (window.matchMedia('(max-width: 768px)').matches) {
                // Mobile/Tablet specific behavior: Tap to activate, Double tap to enlarge
                const currentTime = new Date().getTime();
                const timeDiff = currentTime - lastClickTime;

                if (timeDiff > 0 && timeDiff < 300) { // Double click detected (within 300ms)
                    // Double click action: Open enlarged image
                    const imgElement = item.querySelector('img');
                    if (imgElement && window.animationModule && typeof window.animationModule.showEnlargedLogo === 'function') {
                        window.animationModule.showEnlargedLogo(imgElement.src);
                        // isGalleryPaused is handled within showEnlargedLogo
                        stopGalleryScrolling(); // Stop continuous scroll
                    }
                    lastClickTime = 0; // Reset for next sequence
                } else {
                    // Single click action: Make this item active and trigger its animations
                    currentActiveIndex = index; // Set clicked item as active
                    updateActiveGalleryImage(currentActiveIndex);
                    // After user interaction, restart auto-advance
                    autoAdvanceGallery();
                    lastClickTime = currentTime;
                }
            } else {
                // Desktop behavior: Single click directly opens enlarged image
                const imgElement = item.querySelector('img');
                if (imgElement && window.animationModule && typeof window.animationModule.showEnlargedLogo === 'function') {
                    window.animationModule.showEnlargedLogo(imgElement.src);
                    // No need to pause auto-scrolling here, as it's not active on large screens
                }
            }
        });

        // On larger screens, handle hover for "is-expanded" if needed (CSS takes care of visual)
        // If you need JS for hover on larger screens to do something specific:
        if (!window.matchMedia('(max-width: 768px)').matches) {
            item.addEventListener('mouseenter', () => {
                // Potentially add a class or trigger an effect on hover for desktop
                // item.classList.add('is-hovered-desktop');
            });
            item.addEventListener('mouseleave', () => {
                // item.classList.remove('is-hovered-desktop');
            });
        }
    });


    // Initial setup for gallery scrolling based on screen size
    function initializeGalleryBasedOnScreenSize() {
        if (window.matchMedia('(max-width: 768px)').matches) {
            // Small screen (tablet/mobile)

            // 1. Reset scroll position to the very beginning
            if (imageGalleryGrid) {
                imageGalleryGrid.scrollLeft = 0; // Force scroll to the start
            }

            // 2. Ensure currentActiveIndex starts at 0 for initial setup
            currentActiveIndex = 0; 
            
            if (!galleryIntervalId) {
                if (galleryItems.length > 0) {
                    updateActiveGalleryImage(currentActiveIndex); // Ensure an active image is set
                }
                autoAdvanceGallery(); // Always ensure auto-advance for active images is running
            }
        } else {
            // Larger screen (desktop)
            stopGalleryScrolling(); // Stop any running continuous animation
            clearInterval(galleryIntervalId); // Also stop auto-advance for active images
            galleryIntervalId = null; // Clear the interval ID

            // Ensure all images are reset from active/side-image states for larger screens
            galleryItems.forEach(item => {
                item.classList.remove('active', 'side-image');
                const morphOverlay = item.querySelector('.morph-overlay');
                const textOverlay = item.querySelector('.gallery-text-overlay');
                if (morphOverlay) morphOverlay.classList.remove('active-morph');
                if (textOverlay) textOverlay.classList.remove('gallery-active-text');
            });
            
        }
    }

    // Call on initial load
    initializeGalleryBasedOnScreenSize();

    // Call on resize
    window.addEventListener('resize', initializeGalleryBasedOnScreenSize);

    // Function to get the dominant color from an image using a canvas
    function getDominantColor(imgElement) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = imgElement.width;
        canvas.height = imgElement.height;
        ctx.drawImage(imgElement, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        const colorCounts = {};
        let dominantColor = { r: 0, g: 0, b: 0 };
        let maxCount = 0;

        for (let i = 0; i < data.length; i += 4) {
           const r = data[i];
           const g = data[i + 1];
           const b = data[i + 2];
           const rgb = `rgb(${r},${g},${b})`;
           colorCounts[rgb] = (colorCounts[rgb] || 0) + 1;
           if (colorCounts[rgb] > maxCount) {
               maxCount = colorCounts[rgb];
               dominantColor = { r, g, b };
            }
    }
    return `rgba(${dominantColor.r}, ${dominantColor.g}, ${dominantColor.b}, 0.8)`;

    // Function to determine if a color is "dark" based on its luminance
    function isColorDark(rgbString) {
       const rgb = rgbString.split(',').map(Number);
       const r = rgb[0];
       const g = rgb[1];
       const b = rgb[2];

       // Calculate perceived luminance (a common formula)
       const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
       // Return true if the color is dark, false if it's light
       return luminance <= 0.5;
    }
}

}); // End DOMContent