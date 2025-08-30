// animation.js

// Make sure services.js is loaded first to access servicesOverviewData, renderServicesModal, and renderInspoModal
document.addEventListener('DOMContentLoaded', () => {

    // --- Modal Elements ---
    const servicesModal = document.querySelector('#servicesModal');
    const seeMoreBtn = document.querySelector('#seeMoreBtn');
    const closeServicesBtn = document.querySelector('#closeServicesBtn');
    const modalBackdropOverlay = document.getElementById('modal-backdrop-overlay');
    const body = document.body;

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