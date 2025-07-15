document.addEventListener('DOMContentLoaded', () => {
    // Get references to elements
    const aboutUsLink = document.getElementById('aboutUsLink');
    const adminLoginLink = document.getElementById('adminLoginLink');
    const aboutUsWindow = document.getElementById('aboutUsWindow');
    const adminLoginWindow = document.getElementById('adminLoginWindow');
    const contactInfoModal = document.getElementById('contactInfoModal');

    const closeAboutUs = document.getElementById('closeAboutUs');
    const closeAdminLogin = document.getElementById('closeAdminLogin');
    const closeContactInfo = document.getElementById('closeContactInfo');

    const adminLoginForm = document.getElementById('adminLoginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginMessage = document.getElementById('loginMessage');

    // Get references for section containers (for dynamic content generation)
    const quickServicesSectionContainer = document.getElementById('quickServicesSectionContainer');
    const whyChooseSectionContainer = document.getElementById('whyChooseSectionContainer');
    const imageGallerySectionContainer = document.getElementById('imageGallerySectionContainer');
    const testimonialsSectionContainer = document.getElementById('testimonialsSectionContainer');

    // Function to open a modal
    function openModal(modalElement) {
        if (modalElement) {
            modalElement.classList.add('active'); // Use 'active' class for styling
            document.body.classList.add('modal-open'); // Add class to blur body
        }
    }

    // Function to close a modal
    function closeModal(modalElement) {
        if (modalElement) {
            modalElement.classList.remove('active'); // Remove 'active' class
            document.body.classList.remove('modal-open'); // Remove class to unblur body
        }
    }

    // Event Listeners for opening modals
    if (aboutUsLink) {
        aboutUsLink.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            openModal(aboutUsWindow);
        });
    }

    if (adminLoginLink) {
        adminLoginLink.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            openModal(adminLoginWindow);
            // Optional: Clear form on open
            if (adminLoginForm) adminLoginForm.reset();
            if (loginMessage) loginMessage.style.display = 'none';
        });
    }

    // Event Listeners for closing modals
    if (closeAboutUs) {
        closeAboutUs.addEventListener('click', () => {
            closeModal(aboutUsWindow);
        });
    }

    if (closeAdminLogin) {
        closeAdminLogin.addEventListener('click', () => {
            closeModal(adminLoginWindow);
        });
    }

    if (closeContactInfo) {
        closeContactInfo.addEventListener('click', () => {
            closeModal(contactInfoModal);
        });
    }

    // Close modal if user clicks outside of the modal content
    window.addEventListener('click', (event) => {
        if (event.target === aboutUsWindow) {
            closeModal(aboutUsWindow);
        }
        if (event.target === adminLoginWindow) {
            closeModal(adminLoginWindow);
        }
        if (event.target === contactInfoModal) {
            closeModal(contactInfoModal);
        }
    });

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
                    closeModal(adminLoginWindow);
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

    // --- Function to handle showing the "About Us" flip card's enlarged logo ---
    // This function is globally accessible so index-animation.js can call it
    window.showEnlargedLogo = function(modalElement, imageUrl) {
        if (!modalElement) return;

        let overlay = modalElement.querySelector('.enlarged-logo-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.classList.add('enlarged-logo-overlay');
            overlay.innerHTML = `<img src="${imageUrl}" alt="Enlarged Logo">`;
            modalElement.appendChild(overlay);

            overlay.addEventListener('click', (e) => {
                // Only close if clicking on the overlay itself, not the image
                if (e.target === overlay) {
                    overlay.classList.remove('show');
                    // Delay removal to allow animation
                    setTimeout(() => {
                        overlay.remove(); // Remove overlay from DOM after animation
                    }, 300);
                }
            });
        } else {
            overlay.querySelector('img').src = imageUrl;
        }
        overlay.classList.add('show');
    };


    // --- Dynamic Content Generation Functions ---

    // Function to generate Quick Services Section HTML
    function generateQuickServicesSection() {
        const quickServicesHTML = `
            <section class="quick-services-section">
                <div class="section-header">
                    <h2>Quick Services</h2>
                    <a href="services.html" class="see-more-button">See more</a>
                </div>
                <div class="services-grid">
                    <div class="service-item image-card">
                        <img src="images/mcLaren-image.jpeg" alt="McLaren Senna design">
                        <div class="image-text-overlay">
                            <p class="top-right-text">Quick Services</p>
                            <p class="bottom-right-text">McLaren Senna</p>
                        </div>
                    </div>
                    <div class="service-item content-card">
                        <h3>Posters</h3>
                        <p>Make an impact with eye-catching promotional materials. From business promos to event flyers, we design to captivate.</p>
                        <a href="#" class="bottom-right-link">Graphic Brilliance</a>
                    </div>

                    <div class="service-item content-card">
                        <h3>Event Invitations</h3>
                        <p>Turn heads with bold designs that tell — perfect for your brand, your message, your moment.</p>
                        <a href="#" class="bottom-right-link">Attention Grabber</a>
                    </div>
                    <div class="service-item image-card">
                        <img src="images/event-setup-image.jpg" alt="Event setup with tables and chairs">
                        <div class="image-text-overlay">
                        </div>
                    </div>

                    <div class="service-item image-card">
                        <img src="images/business-branding-blur.jpeg" alt="Blurred business branding materials">
                        <div class="image-text-overlay">
                        </div>
                    </div>
                    <div class="service-item content-card">
                        <h3>Business Branding</h3>
                        <p>A complete package to give your brand consistency and professionalism across all platforms.</p>
                        <a href="#" class="bottom-right-link">Brand Harmony</a>
                    </div>

                    <div class="service-item content-card">
                        <h3>Logos</h3>
                        <p>Your logo is the heart of your brand identity. We create unique, memorable logos that represent your vision — whether you're a startup, a business, or an event.</p>
                        <a href="#" class="bottom-right-link">Symbol Style</a>
                    </div>
                    <div class="service-item image-card">
                        <img src="images/logos-image-blur.jpg" alt="Blurred logo designs">
                        <div class="image-text-overlay">
                        </div>
                    </div>
                </div>
            </section>
        `;
        return quickServicesHTML;
    }

    // Function to generate Why Choose Section HTML
    function generateWhyChooseSection() {
        const whyChooseHTML = `
            <section class="why-choose-section">
                <div class="why-choose-content">
                    <div class="text-and-button">
                        <h2>Why Choose NexGen Graphics?</h2>
                        <p>We offer affordable and flexible packages, available in both digital and printed formats, tailored specifically for Zimbabwean businesses and events. With a fast turnaround time and personalized support, our designs are crafted to make your brand shine without breaking the bank.</p>
                        <button id="contactUsButton" class="contact-us-button">Contact us today!</button>
                    </div>
                    <div class="benefit-cards-grid">
                        <div class="benefit-card">
                            <img src="images/icon-creative.png" alt="Creative Icon" class="benefit-icon">
                            <h3>Creative</h3>
                            <p>We turn bold ideas into beautifully crafted visuals that spark connection and curiosity.</p>
                        </div>
                        <div class="benefit-card">
                            <img src="images/icon-trusted.png" alt="Trusted Icon" class="benefit-icon">
                            <h3>Trusted</h3>
                            <p>Our clients count on us to deliver with care, consistency, and a proven track record of excellence.</p>
                        </div>
                        <div class="benefit-card">
                            <img src="images/icon-polished.png" alt="Polished Icon" class="benefit-icon">
                            <h3>Polished</h3>
                            <p>From concept to final delivery, every detail is fine-tuned to radiate professionalism and clarity.</p>
                        </div>
                        <div class="benefit-card">
                            <img src="images/icon-impactful.png" alt="Impactful Icon" class="benefit-icon">
                            <h3>Impactful</h3>
                            <p>Our designs are built to stand out, engage audiences, and drive real results that matter.</p>
                        </div>
                    </div>
                </div>
            </section>
        `;
        return whyChooseHTML;
    }

    // Data for Image Gallery items, including identifiers and types
    const galleryItemsData = [
        {
            id: 'img-a',
            src: 'images/gallery-image-1-red-boat.jpg', // Corrected path assumption
            alt: 'Red boat on black sand beach',
            subtitle: 'Design Showcase',
            heading: 'Oceanic Horizons',
            type: 'vertical-large' // Corresponds to gallery-item-vertical-large
        },
        {
            id: 'img-b',
            src: 'images/image-2-o66.jpg',
            alt: 'Modern building interiors',
            subtitle: 'Architecture',
            heading: 'Urban Spaces',
            type: 'horizontal-small' // Corresponds to gallery-item-horizontal-small
        },
        {
            id: 'img-c',
            src: 'images/mexico.jpg',
            alt: 'Cityscape with abstract design',
            subtitle: 'City Vibes',
            heading: 'Metropolis Art',
            type: 'square' // Corresponds to gallery-item-square
        },
        {
            id: 'img-d',
            src: 'images/BBC.jpg',
            alt: 'Planet Earth app with leopard',
            subtitle: 'App Design',
            heading: 'Planet Earth',
            type: 'vertical-large'
        },
        {
            id: 'img-e',
            src: 'images/technoman.jpg',
            alt: 'Techno music event design',
            subtitle: 'Event Promo',
            heading: 'Techno Night',
            type: 'vertical' // Standard vertical card
        },
        {
            id: 'img-f',
            src: 'images/gdwoman.jpg',
            alt: 'Graphic design of woman\'s face',
            subtitle: 'Portraits',
            heading: 'Cultural Fusion',
            type: 'vertical'
        },
        {
            id: 'img-g',
            src: 'images/earthy.jpg',
            alt: 'Planet Earth app with chimpanzee',
            subtitle: 'Nature',
            heading: 'Wildlife Focus',
            type: 'vertical'
        },
        {
            id: 'img-h',
            src: 'images/ruin.jpg',
            alt: 'Ancient ruins with sky',
            subtitle: 'History',
            heading: 'Echoes of Time',
            type: 'horizontal-small'
        },
        {
            id: 'img-i',
            src: 'images/we.jpg',
            alt: 'World Environment Day graphic',
            subtitle: 'Campaign',
            heading: 'Eco Awareness',
            type: 'square'
        },
        {
            id: 'img-j',
            src: 'images/run.jpg',
            alt: 'RUN abstract design',
            subtitle: 'Typography',
            heading: 'Dynamic Motion',
            type: 'square'
        },
        {
            id: 'img-k',
            src: 'images/borngreene.jpg',
            alt: 'I Was Born Not Knowing graphic',
            subtitle: 'Inspiration',
            heading: 'Growth Mindset',
            type: 'vertical-small'
        },
        {
            id: 'img-l',
            src: 'images/EUNOIA.jpg',
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

    // Data for Testimonials
    const testimonialsData = [
        {
            stars: 5, // We'll represent stars visually with CSS
            text: "I'm genuinely impressed by the amazing designs and how affordable everything is! You've definitely won me over—I'll be getting in touch again for sure.",
            profileImg: 'images/tafadzwa.jpg',
            name: "Tafadzwa M",
            request: "Business Profile"
        },
        {
            stars: 5,
            text: "They truly made everything effortless. From start to finish, it was smooth sailing—I felt completely taken care of the whole time.",
            profileImg: "images/tariro.jpg",
            name: "Tariro K",
            request: "Business Logo"
        },
        {
            stars: 5,
            text: "Zvese zvakagadzirirwa on time, and the experience was easy handina kana kumbonetseka.also the layout yakandifadza handina kuita stress zvachose.",
            profileImg: "images/chipo.jpg",
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
    // This block runs after all elements are available in the DOM
    // and after the initial modal references have been grabbed.
    if (quickServicesSectionContainer) {
        quickServicesSectionContainer.innerHTML = generateQuickServicesSection();
    }

    if (whyChooseSectionContainer) {
        whyChooseSectionContainer.innerHTML = generateWhyChooseSection();
        // The contact button only exists after the HTML is inserted
        const contactUsButton = document.getElementById('contactUsButton');
        if (contactUsButton) {
            contactUsButton.addEventListener('click', () => {
                openModal(contactInfoModal);
            });
        }
    }

    if (imageGallerySectionContainer) {
        imageGallerySectionContainer.innerHTML = generateImageGallerySection();
    }

    if (testimonialsSectionContainer) {
        testimonialsSectionContainer.innerHTML = generateTestimonialsSection();
    }
});