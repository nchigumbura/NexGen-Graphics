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
    window.openModal = function (modalElement) {
        if (window.animationModule && window.animationModule.openModal) {
            window.animationModule.openModal(modalElement);
        }
    };

    window.closeModal = function (modalElement) {
        if (window.animationModule && window.animationModule.closeModal) {
            window.animationModule.closeModal(modalElement);
        }
    };

    window.showEnlargedLogo = function (imageUrl) {
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
                icon: 'index/images/icon-impact.png', // Placeholder path
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
            id: 'img-1',
            src: 'index/images/gallery-image-1-red-boat.jpeg',
            alt: 'Red boat on black sand beach',
            subtitle: 'Branding & Identity',
            heading: 'Dynamic Logo Concepts',
            column: 1, // Semantic identifier
            type: 'vertical'
        },
        {
            id: 'img-2',
            src: 'index/images/image-2-o66.jpeg',
            alt: 'Modern building interiors',
            subtitle: 'Web Design',
            heading: 'Sleek UI/UX Solutions',
            column: 2, // Semantic identifier
            type: 'square'
        },
        {
            id: 'img-3',
            src: 'index/images/mexico.jpg',
            alt: 'Cityscape with abstract design',
            subtitle: 'Abstract Art',
            heading: 'Urban Canvas Designs',
            column: 1, // Semantic identifier
            type: 'vertical-extra-tall'
        },
        {
            id: 'img-4',
            src: 'index/images/BBC.jpeg',
            alt: 'Planet Earth app with leopard',
            subtitle: 'Campaign Design',
            heading: 'Nature Doc Promos',
            column: 2, // Semantic identifier
            type: 'square'
        },
        {
            id: 'img-5',
            src: 'index/images/technoman.jpeg',
            alt: 'Techno music event design',
            subtitle: 'Event Graphics',
            heading: 'Vibrant Techno Posters',
            column: 3, // Semantic identifier
            type: 'vertical'
        },
        {
            id: 'img-6',
            src: 'index/images/gdwoman.jpeg',
            alt: 'Graphic design of woman\'s face',
            subtitle: 'Digital Illustration',
            heading: 'Modern Portraiture',
            column: 4, // Semantic identifier
            type: 'vertical'
        },
        {
            id: 'img-7',
            src: 'index/images/earthy.jpeg',
            alt: 'Planet Earth app with chimpanzee',
            subtitle: 'Advertising Campaign',
            heading: 'Earthy Abstract Flyers',
            column: 2, // Semantic identifier
            type: 'vertical'
        },
        {
            id: 'img-8',
            src: 'index/images/ruin.jpeg',
            alt: 'Ancient ruins with sky',
            subtitle: 'Architectural Visuals',
            heading: 'Historical Site Renderings',
            column: 5, // Semantic identifier
            type: 'vertical-tall'
        },
        {
            id: 'img-9',
            src: 'index/images/we.jpeg',
            alt: 'World Environment Day graphic',
            subtitle: 'Social Impact Design',
            heading: 'Eco-Friendly Campaign Art',
            column: 6, // Semantic identifier
            type: 'square'
        },
        {
            id: 'img-10',
            src: 'index/images/run.jpeg',
            alt: 'RUN abstract design',
            subtitle: 'Flyer Layouts',
            heading: 'Dynamic Art',
            column: 7, // Semantic identifier (maps to previous column 3)
            type: 'vertical'
        },
        {
            id: 'img-11',
            src: 'index/images/borngreene.jpeg',
            alt: 'I Was Born Not Knowing graphic',
            subtitle: 'Motivational Graphics',
            heading: 'Inspirational Poster Design',
            column: 8, // Semantic identifier (maps to previous column 2)
            type: 'square'
        },
        {
            id: 'img-12',
            src: 'index/images/EUNOIA.jpg',
            alt: 'Eunoia abstract graphic',
            subtitle: 'Concept Art',
            heading: 'Abstract Mindscapes',
            column: 6, // Semantic identifier (maps to previous column 1)
            type: 'square'
        },
        {
            id: 'img-13',
            src: 'index/images/final-image.jpeg',
            alt: 'Final abstract design card',
            subtitle: 'Creative Portfolio',
            heading: 'Signature Design Work',
            column: 7, // Semantic identifier (maps to previous column 3)
            type: 'vertical'
        },
        {
            id: 'img-1',
            src: 'index/images/mint.jpeg',
            alt: 'Final abstract design card',
            subtitle: 'Creative Portfolio',
            heading: 'Signature Design Work',
            column: 7, // Semantic identifier (maps to previous column 3)
            type: 'vertical'
        }
    ];

    function generateImageGallerySection() {
        const galleryItemsHTML = galleryItemsData.map(item => `
            <div class="gallery-item ${item.type}" id="${item.id}" data-column="${item.column}">
                <img src="${item.src}" alt="${item.alt}">
                <div class="gallery-text-overlay">
                    <p class="subtitle">${item.subtitle}</p>
                    <h3>${item.heading}</h3>
                </div>
            </div>
        `).join('');

        // The overall section structure is handled by the main HTML now,
        // this function generates only the grid and its items.
        const imageGalleryHTML = `
            <div class="image-gallery-grid">
                ${galleryItemsHTML}
            </div>
            <div class="testimonials-section">
                <span class="testimonials-badge">Testimonials</span>
                <h2>Trusted by customers and leaders<br><span class = "transparent-text">communities and loyal fans</span></h2>
            </div>
        `;
        return imageGalleryHTML;
    }

    // Function to add click handlers to the dynamically generated gallery images
    function setupImageGalleryClickHandlers() {
        const galleryImages = document.querySelectorAll('.image-gallery-grid .gallery-item img');
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

        // The structure of the testimonials section is now directly returned
        // including the badge and main text, as per the screenshot.
        const testimonialsHTML = `
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
        // Updated to pass the correct HTML for the combined image gallery and testimonials
        imageGallerySectionContainer.innerHTML = generateImageGallerySection();
        // Setup click handlers for gallery images
        setupImageGalleryClickHandlers();
    }

    // Populate the testimonials section
    if (testimonialsSectionContainer) {
        testimonialsSectionContainer.innerHTML = generateTestimonialsSection();
    }
});