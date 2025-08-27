// =========================================
// --- Services hero Animations ---
// =========================================
document.addEventListener('DOMContentLoaded', () => {

    // --- Services Modal Elements ---
    const servicesSection = document.querySelector('.services-overview-section');
    const seeMoreBtn = document.querySelector('.see-more-btn');
    const servicesHeaderContainer = document.querySelector('.services-header-container');
    const closeBtnText = 'Close X';

    // --- Image Enlarge Elements ---
    const overviewCards = document.querySelectorAll('.overview-card');
    const modalBackdropOverlay = document.getElementById('modal-backdrop-overlay');
    const enlargedLogoOverlay = document.createElement('div');
    const enlargedLogoImg = document.createElement('img');

    // Dynamically create the enlarged image overlay
    enlargedLogoOverlay.id = 'enlarged-logo-overlay';
    enlargedLogoOverlay.classList.add('enlarged-logo-overlay');
    enlargedLogoOverlay.appendChild(enlargedLogoImg);
    document.body.appendChild(enlargedLogoOverlay);

    // --- Global State & Helper Functions ---
    const servicesModule = {
        // Function to update the body class and backdrop state
        updateOverlayState: function() {
            const isServicesModalActive = servicesSection && servicesSection.classList.contains('modal-window');
            const isEnlargedActive = enlargedLogoOverlay.classList.contains('active');

            // Handle backdrop and body scroll based on active state
            if (isServicesModalActive || isEnlargedActive) {
                document.body.classList.add('modal-active');
                if (modalBackdropOverlay) {
                    modalBackdropOverlay.classList.add('active');
                }
            } else {
                document.body.classList.remove('modal-active');
                if (modalBackdropOverlay) {
                    modalBackdropOverlay.classList.remove('active');
                }
            }

            // Adjust z-index based on which overlay is on top
            if (isEnlargedActive) {
                if (modalBackdropOverlay) {
                    modalBackdropOverlay.style.zIndex = '9998'; // Behind enlarged image
                }
            } else if (isServicesModalActive) {
                if (modalBackdropOverlay) {
                    modalBackdropOverlay.style.zIndex = '10'; // Above main content, below enlarged image
                }
            } else {
                if (modalBackdropOverlay) {
                    modalBackdropOverlay.style.zIndex = '';
                }
            }
        },

        // Function to open the main services modal
        openServicesModal: function() {
            if (servicesSection) {
                servicesSection.classList.add('modal-window');
                servicesSection.classList.add('active');
            }
            this.updateOverlayState();

            // Change "See More" button text to "Close X"
            if (seeMoreBtn) {
                seeMoreBtn.innerHTML = closeBtnText;
                seeMoreBtn.classList.add('is-close-btn');
            }
        },

        // Function to close the main services modal
        closeServicesModal: function() {
            if (servicesSection) {
                servicesSection.classList.remove('modal-window');
                servicesSection.classList.remove('active');
            }
            
            // Give a brief delay for CSS transition before updating state
            setTimeout(() => {
                this.updateOverlayState();
            }, 600); // Matches CSS transition duration

            // Change "Close X" button text back to "See More"
            if (seeMoreBtn) {
                seeMoreBtn.innerHTML = "See More";
                seeMoreBtn.classList.remove('is-close-btn');
            }
        },

        // Function to show the enlarged card image
        showEnlargedImage: function(imageUrl) {
            enlargedLogoImg.src = imageUrl;
            enlargedLogoImg.alt = "Enlarged Service Image";
            enlargedLogoOverlay.classList.add('active');
            this.updateOverlayState();
        },

        // Function to hide the enlarged card image
        hideEnlargedImage: function() {
            enlargedLogoOverlay.classList.remove('active');
            
            // Wait for fade-out to complete before updating state
            setTimeout(() => {
                this.updateOverlayState();
            }, 300);
        }
    };

    // --- Event Listeners for Services Modal ---

    // Toggle the services modal with the "See More" button
    if (seeMoreBtn && servicesSection) {
        seeMoreBtn.addEventListener('click', (event) => {
            event.preventDefault();
            // Check the current state of the button to determine action
            if (seeMoreBtn.classList.contains('is-close-btn')) {
                servicesModule.closeServicesModal();
            } else {
                servicesModule.openServicesModal();
            }
        });
    }

    // --- Event Listeners for Individual Cards ---

    // Open enlarged view when clicking a card
    overviewCards.forEach(card => {
        card.addEventListener('click', (event) => {
            // Prevent the click if it's on a button inside the card
            if (event.target.closest('.card-buttons') || event.target.closest('.card-toggle-btn')) {
                return;
            }
            
            // Get the background image URL from the card's style
            const style = window.getComputedStyle(card);
            const bgImage = style.getPropertyValue('background-image');
            const imageUrlMatch = /url\("?(.+?)"?\)/.exec(bgImage);
            
            if (imageUrlMatch && imageUrlMatch[1]) {
                const imageUrl = imageUrlMatch[1];
                servicesModule.showEnlargedImage(imageUrl);
            }
        });
    });

    // Close enlarged view when clicking the backdrop or the enlarged image itself
    enlargedLogoOverlay.addEventListener('click', () => {
        servicesModule.hideEnlargedImage();
    });

    // Close enlarged image or modal when clicking the backdrop
    if (modalBackdropOverlay) {
        modalBackdropOverlay.addEventListener('click', () => {
            if (enlargedLogoOverlay.classList.contains('active')) {
                servicesModule.hideEnlargedImage();
            } else if (servicesSection.classList.contains('modal-window')) {
                servicesModule.closeServicesModal();
            }
        });
    }

    // Handle "See More" button for mobile
    // This part is for the smaller "+" button on mobile to show buttons
    document.querySelectorAll('.card-toggle-btn').forEach(btn => {
        btn.addEventListener('click', (event) => {
            event.stopPropagation();
            const card = event.target.closest('.overview-card');
            const cardButtons = card.querySelector('.card-buttons');
            
            if (cardButtons) {
                cardButtons.style.display = 'flex';
                // Hide again after a short delay
                setTimeout(() => {
                    cardButtons.style.display = 'none';
                }, 3000); // Hide after 3 seconds
            }
        });
    });

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