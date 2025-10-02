// animation.js

// Make sure services.js is loaded first to access servicesOverviewData, renderServicesModal, and renderInspoModal
document.addEventListener('DOMContentLoaded', () => {

    // --- Modal Elements ---
    const servicesModal = document.querySelector('#servicesModal');
    const seeMoreBtn = document.querySelector('#seeMoreBtn');
    const closeServicesBtn = document.querySelector('#closeServicesBtn');
    const modalBackdropOverlay = document.getElementById('modal-backdrop-overlay');
    const body = document.body;

    // =======================================================
    // --- EVENT SECTION: PADDING / SCALE ANIMATION ---
    // The section's side padding changes based on whether it's 
    // in the viewport (close-up) or scrolled away (scrolled-away).
    // =======================================================
    const eventSection = document.querySelector('.event-design-section');
    if (eventSection) {
        // Set the initial state for the animation
        eventSection.classList.add('event-scrolled-away');

        const eventScaleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const visibilityRatio = entry.intersectionRatio; // 0.0 to 1.0

                // Check if the section is within the 30% to 80% visibility range
                if (visibilityRatio >= 0.20 && visibilityRatio <= 0.80) {
                    // State: 'Close-Up' (Narrower/Padded)
                    eventSection.classList.add('event-close-up');
                    eventSection.classList.remove('event-scrolled-away');
                } else {
                    // State: 'Scrolled Away' (Wider/No Padding)
                    // This covers < 30% visibility AND > 80% visibility
                    eventSection.classList.add('event-scrolled-away');
                    eventSection.classList.remove('event-close-up');
                }
            });
        }, {
            // Threshold of 0 means the state changes as soon as the element enters/leaves the viewport
            root: null,
            hreshold: Array.from({ length: 101 }, (_, i) => i / 100) 
        });

        eventScaleObserver.observe(eventSection);
    }


    // =========================================
    // --- NEW: Dynamic Pricing Section Scroll Animation (Class-Based) ---
    // =========================================
    const pricingWrapper = document.querySelector('.pricing-content-wrapper');
    const pricingSection = document.querySelector('.pricing-section');
    const pricingContainer = document.getElementById('pricingSectionContainer'); // Assuming you use this ID on the main wrapper

    if (pricingWrapper && pricingSection && pricingContainer) {
        // We use a high threshold array to get precise visibility changes
        const thresholds = Array.from({ length: 101 }, (_, i) => i / 100);

        const animatePricingSection = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                const visibilityRatio = entry.intersectionRatio;
                
                // GOAL: Width 100% (No Border) between 40% and 60% visibility.
                // Width 90% (With Border) when visible but outside that range.

                if (visibilityRatio >= 0.30 && visibilityRatio <= 0.80) {
                    // Range: 40% to 60% visibility (Ideal View)
                    // Width 100%, No Border/Radius
                    pricingWrapper.classList.add('pricing-ideal-view');
                    pricingWrapper.classList.remove('pricing-edge-view');

                } else if (visibilityRatio > 0 && visibilityRatio < 0.40 || visibilityRatio > 0.60) {
                    // Range: 0% to 40% OR 60% to 100% visibility (Edge View)
                    // Width 90%, With Border/Radius
                    pricingWrapper.classList.add('pricing-edge-view');
                    pricingWrapper.classList.remove('pricing-ideal-view');
                }
                // Note: When visibilityRatio is 0, nothing changes, so the last state persists.
            });
        }, {
            root: null,
            threshold: thresholds // Use the high-resolution thresholds for smooth steps
        });

        // Initial Fade-In (Standard iOS Fade-Up) - KEEP THIS BLOCK
        pricingSection.classList.add('fade-up-hidden'); // Apply initial state
        
        const initialObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove('fade-up-hidden');
                    entry.target.classList.add('fade-up-visible');
                    // Once visible, start observing for the width animation
                    animatePricingSection.observe(pricingWrapper); // <-- Observe the wrapper, not the section
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        initialObserver.observe(pricingSection);
    }

    // --- Image Enlarge Elements ---
    // These elements are no longer used for the enlarged image feature.
    // They are left in for now but could be removed if not needed elsewhere.
    const enlargedLogoOverlay = document.createElement('div');
    const enlargedLogoImg = document.createElement('img');

    enlargedLogoOverlay.id = 'enlarged-logo-overlay';
    enlargedLogoOverlay.classList.add('enlarged-logo-overlay');
    enlargedLogoOverlay.appendChild(enlargedLogoImg);
    document.body.appendChild(enlargedLogoOverlay);

    const servicesModule = {
        lockBodyScroll: function(isLocked) {
            if (isLocked) {
                body.classList.add('modal-open');
            } else {
                body.classList.remove('modal-open');
            }
        },
        updateBackdropState: function(isOpening) {
            if (modalBackdropOverlay) {
                if (isOpening) {
                    modalBackdropOverlay.classList.add('active');
                } else {
                    modalBackdropOverlay.classList.remove('active');
                }
            }
        },
        openServicesModal: function() {
            if (servicesModal) {
                servicesModal.classList.add('active');
            }
            this.updateBackdropState(true);
            this.lockBodyScroll(true);
        },
        closeServicesModal: function() {
            if (servicesModal) {
                servicesModal.classList.remove('active');
            }
            this.updateBackdropState(false);
            this.lockBodyScroll(false);
        },
        // This function is no longer called from the main click handler.
        showEnlargedImage: function(imageUrl) {
            enlargedLogoImg.src = imageUrl;
            enlargedLogoImg.alt = "Enlarged Service Image";
            enlargedLogoOverlay.classList.add('active');
            this.updateBackdropState(true);
            this.lockBodyScroll(true);
        },
        hideEnlargedImage: function() {
            enlargedLogoOverlay.classList.remove('active');
            this.updateBackdropState(false);
            this.lockBodyScroll(false);
        }
    };

    // =========================================
    // --- Master Event Listener for Card Clicks ---
    // =========================================
    document.addEventListener('click', (event) => {
        const card = event.target.closest('.overview-card');

        // Check if the click was inside a card
        if (card) {
            const toggleBtn = event.target.closest('.card-toggle-btn');
            const inspoBtn = event.target.closest('.btn-inspo');
            const detailsBtn = event.target.closest('.btn-details');

            // Find the corresponding service data
            const serviceHeading = card.dataset.serviceHeading;
            const serviceData = servicesOverviewData.find(service => service.heading === serviceHeading);
            
            // Handle the "Inspo" button click
            if (inspoBtn) {
                event.stopPropagation(); // Prevent the parent card click from firing
                if (serviceData && serviceData.images) {
                    renderInspoModal(serviceData.heading, serviceData.images);
                    servicesModule.openServicesModal();
                }
                return;
            }

            // Handle the "+" toggle button click
            if (toggleBtn) {
                event.stopPropagation();
                const cardButtons = card.querySelector('.card-buttons');
                const plusBtn = card.querySelector('.card-toggle-btn');

                plusBtn.style.display = 'none';
                cardButtons.classList.remove('hidden');

                setTimeout(() => {
                    cardButtons.classList.add('hidden');
                    plusBtn.style.display = 'flex';
                }, 10000); // 10 seconds
                return;
            }

            // --- NEW: Handle the "More details" button click ---
            if (detailsBtn) {
                event.stopPropagation();
                if (serviceData) {
                    renderDetailsModal(serviceData); // Call the new render function
                    servicesModule.openServicesModal();
                }
                return;
            }

            // The code block that showed the enlarged image has been completely removed.
            // Clicking on the overview card itself will now do nothing.
        }
    });

    // --- Modal and Backdrop Event Listeners ---
    if (seeMoreBtn) {
        seeMoreBtn.addEventListener('click', (event) => {
            event.preventDefault();
            renderServicesModal();
            servicesModule.openServicesModal();
        });
    }
    
    // Listen for the close button inside the modal
    const servicesModalContentWrapper = document.getElementById('services-modal-content-wrapper');
    if (servicesModalContentWrapper) {
        servicesModalContentWrapper.addEventListener('click', (event) => {
            if (event.target.classList.contains('close-button')) {
                servicesModal.classList.remove('active');
                servicesModule.closeServicesModal();
            }
        });
    }

    if (modalBackdropOverlay) {
        modalBackdropOverlay.addEventListener('click', () => {
            // The logic to close the enlarged image overlay is still here,
            // but the function to open it is no longer called.
            if (enlargedLogoOverlay.classList.contains('active')) {
                servicesModule.hideEnlargedImage();
            } else if (servicesModal.classList.contains('active')) {
                servicesModule.closeServicesModal();
            }
        });
    }

    // --- Fade-Up Animation for Services Gallery ---
    const servicesGallery = document.querySelector('.services-gallery');

    if (servicesGallery) {
        servicesGallery.classList.add('fade-up-hidden');

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove('fade-up-hidden');
                    entry.target.classList.add('fade-up-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        observer.observe(servicesGallery);
    }
});

// Use window.onload or a final DOM check to ensure the dynamically added content is available.
window.onload = function() {
    // --- Fade-Up Animation for Event Design Section ---
    // The .event-design-section is created by services.js and injected into the DOM.
    const eventSection = document.querySelector('.event-design-section');

    if (eventSection) {
        // Observer setup
        const eventObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove('fade-up-hidden');
                    entry.target.classList.add('fade-up-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.15 
        });

        eventObserver.observe(eventSection);
    } else {
        // Optional: Console log to confirm element wasn't found if it still fails
        console.error("Event Based Design Section (.event-design-section) not found for animation.");
    }
};