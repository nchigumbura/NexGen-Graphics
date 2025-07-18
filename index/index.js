// index.js
document.addEventListener('DOMContentLoaded', () => {
    // Get references to elements
    const aboutUsLink = document.getElementById('aboutUsLink');
    const adminLoginLink = document.getElementById('adminLoginLink');
    const aboutUsWindow = document.getElementById('aboutUsWindow');
    const adminLoginWindow = document.getElementById('adminLoginWindow');
    const contactInfoModal = document.getElementById('contactInfoModal');

    const closeButtons = document.querySelectorAll('.modal-window .close-button'); // Simplified selection for all close buttons

    const adminLoginForm = document.getElementById('adminLoginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginMessage = document.getElementById('loginMessage');

    // Get references for section containers (for dynamic content generation)
    const quickServicesSectionContainer = document.getElementById('quickServicesSectionContainer');
    const whyChooseSectionContainer = document.getElementById('whyChooseSectionContainer');
    const imageGallerySectionContainer = document.getElementById('imageGallerySectionContainer');
    const testimonialsSectionContainer = document.getElementById('testimonialsSectionContainer');

    // Modal Backdrop Overlay - This will be managed by animation.js
    const modalBackdropOverlay = document.getElementById('modal-backdrop-overlay');

    // Create the single enlarged logo overlay once on DOMContentLoaded
    // Note: Z-index, visibility, and click handling will be managed by animation.js
    const enlargedLogoOverlay = document.createElement('div');
    enlargedLogoOverlay.classList.add('enlarged-logo-overlay');
    enlargedLogoOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8); /* Dark overlay */
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease;
        z-index: 9999; /* Ensure it's on top of everything else */
    `;
    const imgElement = document.createElement('img');
    imgElement.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
        transform: scale(0.8); /* Initial scale for animation */
        opacity: 0; /* Initial opacity for animation */
        transition: transform 0.3s ease, opacity 0.3s ease;
    `;
    enlargedLogoOverlay.appendChild(imgElement);
    document.body.appendChild(enlargedLogoOverlay); // Append to body

    // --- Global functions to be called by other scripts (like animation.js) ---
    // These functions now delegate directly to the animationModule.
    // Ensure animationModule is loaded before these are called.
    window.openModal = function(modalElement) {
        if (window.animationModule && window.animationModule.openModal) {
            window.animationModule.openModal(modalElement);
        }
    };

    window.closeModal = function(modalElement) {
        if (window.animationModule && window.animationModule.closeModal) {
            window.animationModule.closeModal(modalElement);
        }
    };

    window.showEnlargedLogo = function(imageUrl) {
        if (window.animationModule && window.animationModule.showEnlargedLogo) {
            window.animationModule.showEnlargedLogo(imageUrl);
        }
    };


    // Event Listeners for opening modals (using the globally defined openModal)
    // These will now trigger the animationModule's logic via window.openModal
    if (aboutUsLink) {
        aboutUsLink.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            window.openModal(aboutUsWindow);
        });
    }

    if (adminLoginLink) {
        adminLoginLink.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            window.openModal(adminLoginWindow);
            // Optional: Clear form on open
            if (adminLoginForm) adminLoginForm.reset();
            if (loginMessage) loginMessage.style.display = 'none';
        });
    }

    // Event Listeners for closing modals (using the general closeButtons selector)
    // These will now trigger the animationModule's logic via window.closeModal
    closeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const modalToClose = event.target.closest('.modal-window');
            window.closeModal(modalToClose);
        });
    });

    // Close modal if user clicks outside of the modal content or on the backdrop
    document.querySelectorAll('.modal-window').forEach(modal => {
        modal.addEventListener('click', (event) => {
            // Check if the clicked element is the modal container itself (not its content)
            if (event.target === modal) {
                window.closeModal(modal);
            }
        });
    });

    // Handle clicks on the modal backdrop overlay
    if (modalBackdropOverlay) {
        modalBackdropOverlay.addEventListener('click', () => {
            // Let animation.js handle the logic for closing based on what's active
            if (window.animationModule && window.animationModule.handleBackdropClick) {
                window.animationModule.handleBackdropClick();
            }
        });
    }

    // Admin Login Form Submission (basic client-side validation example)
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent actual form submission

            const username = usernameInput.value;
            const password = passwordInput.value;

            // Basic validation (replace with actual backend authentication)
            if (username === 'admin' && password === 'password123') { // Example credentials
                if (loginMessage) {
                    loginMessage.style.color = 'green';
                    loginMessage.textContent = 'Login successful! Redirecting...';
                    loginMessage.style.display = 'block';
                }
                setTimeout(() => {
                    window.closeModal(adminLoginWindow);
                    window.location.href = 'admin.html'; // Redirect to admin page
                }, 1000);
            } else {
                if (loginMessage) {
                    loginMessage.style.color = 'red';
                    loginMessage.textContent = 'Invalid username or password.';
                    loginMessage.style.display = 'block';
                }
            }
        });
    }


    // --- Dynamic Content Generation Functions ---

    // Function to generate Quick Services Section HTML
    function generateQuickServicesSection() {
        // Define service card data with custom background colors
        const serviceCardsData = [
            {
                type: 'image-card',
                imgSrc: 'index/images/mcLaren-image.jpeg',
                alt: 'McLaren Senna design',
                linkText: 'Graphic Brilliance',
                linkHref: 'services.html',
                bgColor: '#F0F0F0' // Light gray for image cards
            },
            {
                type: 'content-card',
                heading: 'Posters',
                text: 'Make an impact with eye-catching promotional materials. From business promos to event flyers, we design to captivate.',
                linkText: 'Graphic Brilliance',
                linkHref: 'services.html',
                bgColor: '#929292' // Light blue

            },
            {
                type: 'image-card',
                imgSrc: 'index/images/event-setup.jpeg',
                alt: 'Event setup with tables and chairs',
                linkHref: 'services.html',
                bgColor: '#F0F0F0' // Light gray for image cards
            },
            {
                type: 'content-card',
                heading: 'Event Invitations',
                text: 'Turn heads with bold designs that tell — perfect for your brand, your message, your moment.',
                linkText: 'Attention Grabber',
                linkHref: 'services.html',
                bgColor: '#758184' // Light gray for image cards

                   // Light pink with 75% opacity
            },
            {
                type: 'content-card',
                heading: 'Business Branding',
                text: 'A complete package to give your brand consistency and professionalism across all platforms.',
                linkText: 'Brand Harmony',
                linkHref: 'services.html',
                bgColor: 'rgba(71, 61, 53, 0.75)' // 75% transparent
            },
            {
                type: 'image-card',
                imgSrc: 'index/images/business-branding-blur.jpeg',
                alt: 'Blurred business branding materials',
                linkText: 'Brand Harmony',
                linkHref: 'services.html',
                // Light gray for image cards
            },
            {
                type: 'content-card',
                heading: 'Logos',
                text: 'Your logo is the heart of your brand identity. We create unique, memorable logos that represent your vision — whether you\'re a startup, a business, or an event.',
                linkText: 'Symbol Style',
                linkHref: 'services.html',
                bgColor: 'rgba(46, 46, 46, 0.75)' // 75% opacity
            },
            {
                type: 'image-card',
                imgSrc: 'index/images/buzz.jpeg',
                alt: 'Blurred logo designs',
                linkText: 'Symbol Style',
                linkHref: 'services.html',
                bgColor: '#F0F0F0' // Light gray for image cards
            }
        ];

        const serviceItemsHTML = serviceCardsData.map(item => {
            if (item.type === 'image-card') {
                return `
                    <div class="service-item image-card" style="background-color: ${item.bgColor || 'transparent'};">
                        <img src="${item.imgSrc}" alt="${item.alt}">
                        <div class="image-text-overlay"></div>
                    </div>
                `;
            } else {
                return `
                    <div class="service-item content-card" style="background-color: ${item.bgColor};">
                        <h3>${item.heading}</h3>
                        <p>${item.text}</p>
                        <a href="${item.linkHref}" class="bottom-left-link">${item.linkText}</a>
                    </div>
                `;
            }
        }).join('');

        const quickServicesHTML = `
            <section class="quick-services-section">
                <div class="section-header">
                    <h2>Quick Services</h2>
                    <a href="services.html" class="see-more-button">See more</a>
                </div>
                <div class="services-grid">
                    ${serviceItemsHTML}
                </div>
            </section>
        `;
        return quickServicesHTML;
    }

    // Data for the Why Choose Section
    const whyChooseData = {
        heading: "Why Choose NexGen Graphics?",
        paragraph: "We offer affordable and flexible packages, available in both digital and printed formats, tailored specifically for Zimbabwean businesses and events. With a fast turnaround time and personalized support, our designs are crafted to make your brand shine without breaking the bank.",
        buttonText: "Contact us today!",
        cards: [
            {
                icon: 'index/images/icon-creative.png', // Placeholder path for your icons
                title: "Creative",
                description: "We turn bold ideas into beautifully crafted visuals that spark connection and curiosity."
            },
            {
                icon: 'index/images/icon-trusted.png', // Placeholder path
                title: "Trusted",
                description: "Our clients count on us to deliver with care, consistency, and a proven track record of excellence."
            },
            {
                icon: 'index/images/icon-polished.png', // Placeholder path
                title: "Polished",
                description: "From concept to final delivery, every detail is fine-tuned to radiate professionalism and clarity."
            },
            {
                icon: 'index/images/icon-impactful.png', // Placeholder path
                title: "Impactful",
                description: "Our designs are built to stand out, engage audiences, and drive real results that matter."
            }
        ]
    };

    // Function to generate Why Choose Section HTML
    // This function now only returns the INNER HTML for the #whyChooseSectionContainer
    function generateWhyChooseSection() {
        const cardItemsHTML = whyChooseData.cards.map(card => `
            <div class="why-choose-card">
                <div class="why-choose-card-header">
                    <img src="${card.icon}" alt="${card.title} Icon" class="icon">
                    <h3>${card.title}</h3>
                </div>
                <p>${card.description}</p>
            </div>
        `).join('');

        // Return only the direct children that will be laid out by the grid on #whyChooseSectionContainer
        return `
            <div class="why-choose-left-content">
                <h2>${whyChooseData.heading}</h2>
                <p>${whyChooseData.paragraph}</p>
                <a href="#contact" class="why-choose-contact-button">${whyChooseData.buttonText}</a>
            </div>
            <div class="why-choose-grid-container">
                ${cardItemsHTML}
            </div>
        `;
    }

    // Data for Image Gallery items, including identifiers and types
    const galleryItemsData = [
        {
            id: 'img-a',
            src: 'index/images/gallery-image-1-red-boat.jpg',
            alt: 'Red boat on black sand beach',
            subtitle: 'Design Showcase',
            heading: 'Oceanic Horizons',
            type: 'vertical-large' // Corresponds to gallery-item-vertical-large
        },
        {
            id: 'img-b',
            src: 'index/images/image-2-o66.jpg',
            alt: 'Modern building interiors',
            subtitle: 'Architecture',
            heading: 'Urban Spaces',
            type: 'horizontal-small' // Corresponds to gallery-item-horizontal-small
        },
        {
            id: 'img-c',
            src: 'index/images/mexico.jpg',
            alt: 'Cityscape with abstract design',
            subtitle: 'City Vibes',
            heading: 'Metropolis Art',
            type: 'square' // Corresponds to gallery-item-square
        },
        {
            id: 'img-d',
            src: 'index/images/BBC.jpg',
            alt: 'Planet Earth app with leopard',
            subtitle: 'App Design',
            heading: 'Planet Earth',
            type: 'vertical-large'
        },
        {
            id: 'img-e',
            src: 'index/images/technoman.jpg',
            alt: 'Techno music event design',
            subtitle: 'Event Promo',
            heading: 'Techno Night',
            type: 'vertical' // Standard vertical card
        },
        {
            id: 'img-f',
            src: 'index/images/gdwoman.jpg',
            alt: 'Graphic design of woman\'s face',
            subtitle: 'Portraits',
            heading: 'Cultural Fusion',
            type: 'vertical'
        },
        {
            id: 'img-g',
            src: 'index/images/earthy.jpg',
            alt: 'Planet Earth app with chimpanzee',
            subtitle: 'Nature',
            heading: 'Wildlife Focus',
            type: 'vertical'
        },
        {
            id: 'img-h',
            src: 'index/images/ruin.jpg',
            alt: 'Ancient ruins with sky',
            subtitle: 'History',
            heading: 'Echoes of Time',
            type: 'horizontal-small'
        },
        {
            id: 'img-i',
            src: 'index/images/we.jpg',
            alt: 'World Environment Day graphic',
            subtitle: 'Campaign',
            heading: 'Eco Awareness',
            type: 'square'
        },
        {
            id: 'img-j',
            src: 'index/images/run.jpg',
            alt: 'RUN abstract design',
            subtitle: 'Typography',
            heading: 'Dynamic Motion',
            type: 'square'
        },
        {
            id: 'img-k',
            src: 'index/images/borngreene.jpg',
            alt: 'I Was Born Not Knowing graphic',
            subtitle: 'Inspiration',
            heading: 'Growth Mindset',
            type: 'vertical-small'
        },
        {
            id: 'img-l',
            src: 'index/images/EUNOIA.jpg',
            alt: 'Eunoia abstract graphic',
            subtitle: 'Abstract',
            heading: 'Pure Thought',
            type: 'square'
        },
    ];

    function generateImageGallerySection() {
        const galleryItemsHTML = galleryItemsData.map(item => `
            <div class="gallery-item gallery-item-${item.type}" id="${item.id}">
                <img src="${item.src}" alt="${item.alt}">
                <div class="gallery-text-overlay">
                    <p class="subtitle">${item.subtitle}</p>
                    <h3>${item.heading}</h3>
                </div>
            </div>
        `).join('');

        const imageGalleryHTML = `
            <section class="image-gallery-section">
                <div class="gallery-grid">
                    ${galleryItemsHTML}
                </div>
            </section>
        `;
        return imageGalleryHTML;
    }

    // Function to add click handlers to the dynamically generated gallery images
    function setupImageGalleryClickHandlers() {
        const galleryImages = document.querySelectorAll('.image-gallery-section .gallery-item img');
        galleryImages.forEach(img => {
            img.addEventListener('click', () => {
                // When an image is clicked, call the globally defined showEnlargedLogo function
                // which will now delegate to animationModule.
                window.showEnlargedLogo(img.src);
            });
        });
    }


    // Data for Testimonials
    const testimonialsData = [
        {
            stars: 5, // We'll represent stars visually with CSS
            text: "I'm genuinely impressed by the amazing designs and how affordable everything is! You've definitely won me over—I'll be getting in touch again for sure.",
            profileImg: 'index/images/tafadzwa.jpg',
            name: "Tafadzwa M",
            request: "Business Profile"
        },
        {
            stars: 5,
            text: "They truly made everything effortless. From start to finish, it was smooth sailing—I felt completely taken care of the whole time.",
            profileImg: "index/images/tariro.jpg",
            name: "Tariro K",
            request: "Business Logo"
        },
        {
            stars: 5,
            text: "Zvese zvakagadzirirwa on time, and the experience was easy handina kana kumbonetseka.also the layout yakandifadza handina kuita stress zvachose.",
            profileImg: "index/images/chipo.jpg",
            name: "Chipo H",
            request: "Graduation Party Invite"
        }
    ];

    function generateTestimonialsSection() {
        const testimonialCardsHTML = testimonialsData.map(testimonial => `
            <div class="testimonial-card">
                <div class="stars" data-rating="${testimonial.stars}">
                    <span class="star">&#9733;</span><span class="star">&#9733;</span><span class="star">&#9733;</span><span class="star">&#9733;</span><span class="star">&#9733;</span>
                </div>
                <p class="testimonial-text">${testimonial.text}</p>
                <div class="customer-info">
                    <img src="${testimonial.profileImg}" alt="${testimonial.name} Profile" class="customer-profile-img">
                    <div class="customer-details">
                        <p class="customer-name">${testimonial.name}</p>
                        <p class="customer-request">${testimonial.request}</p>
                    </div>
                </div>
            </div>
        `).join('');

        const testimonialsHTML = `
            <section class="testimonials-section">
                <div class="section-header-top-right">
                    <p>Testimonials</p>
                </div>
                <div class="testimonials-content">
                    <h2>Trusted by customers and leaders</h2>
                    <p class="sub-heading">communities and loyal fans</p>
                    <div class="testimonials-grid">
                        ${testimonialCardsHTML}
                    </div>
                </div>
            </section>
        `;
        return testimonialsHTML;
    }


    // Call the functions to insert the HTML when the DOM is fully loaded
    if (quickServicesSectionContainer) {
        quickServicesSectionContainer.innerHTML = generateQuickServicesSection();
    }

    if (whyChooseSectionContainer) {
        // Corrected: Set innerHTML directly to the content divs, not a new section.
        whyChooseSectionContainer.innerHTML = generateWhyChooseSection();
        // The contact button only exists after the HTML is inserted
        const contactUsButton = document.querySelector('.why-choose-contact-button'); // Changed to class selector
        if (contactUsButton) {
            contactUsButton.addEventListener('click', (event) => {
                event.preventDefault(); // Prevent default link behavior if it's an <a> tag
                window.openModal(contactInfoModal); // Use window.openModal to delegate to animationModule
            });
        }
    }

    if (imageGallerySectionContainer) {
        imageGallerySectionContainer.innerHTML = generateImageGallerySection();
        // Setup click handlers for gallery images
        setupImageGalleryClickHandlers();
    }

    if (testimonialsSectionContainer) {
        testimonialsSectionContainer.innerHTML = generateTestimonialsSection();
    }
});