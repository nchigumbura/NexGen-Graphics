// Get references to elements (existing modal code remains)
const aboutUsLink = document.getElementById('aboutUsLink');
const aboutUsWindow = document.getElementById('aboutUsWindow');
const closeAboutUs = document.getElementById('closeAboutUs');

const adminLoginLink = document.getElementById('adminLoginLink');
const adminLoginWindow = document.getElementById('adminLoginWindow');
const closeAdminLogin = document.getElementById('closeAdminLogin');
const adminLoginForm = document.getElementById('adminLoginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginMessage = document.getElementById('loginMessage');

// Get references for Contact Info Modal
const contactInfoModal = document.getElementById('contactInfoModal');
const closeContactInfo = document.getElementById('closeContactInfo');

// Get references for section containers
const quickServicesSectionContainer = document.getElementById('quickServicesSectionContainer');
const whyChooseSectionContainer = document.getElementById('whyChooseSectionContainer');
const imageGallerySectionContainer = document.getElementById('imageGallerySectionContainer');
const testimonialsSectionContainer = document.getElementById('testimonialsSectionContainer');


// Function to open a modal window
function openModal(modalElement) {
    modalElement.style.display = 'block';
    // document.body.classList.add('modal-open'); // Uncomment when CSS is ready
}

// Function to close a modal window
function closeModal(modalElement) {
    modalElement.style.display = 'none';
    // document.body.classList.remove('modal-open'); // Uncomment when CSS is ready
}

// Event Listeners for About Us
aboutUsLink.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(aboutUsWindow);
});

closeAboutUs.addEventListener('click', () => {
    closeModal(aboutUsWindow);
});

window.addEventListener('click', (e) => {
    if (e.target == aboutUsWindow) {
        closeModal(aboutUsWindow);
    }
});


// Event Listeners for Admin Login
adminLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(adminLoginWindow);
    loginMessage.textContent = '';
    loginMessage.style.display = 'none';
    usernameInput.value = '';
    passwordInput.value = '';
});

closeAdminLogin.addEventListener('click', () => {
    closeModal(adminLoginWindow);
});

window.addEventListener('click', (e) => {
    if (e.target == adminLoginWindow) {
        closeModal(adminLoginWindow);
    }
});

// Handle Admin Login Form Submission
adminLoginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = usernameInput.value;
    const password = passwordInput.value;

    if (username === 'admin' && password === 'password123') {
        loginMessage.textContent = 'Login successful! Redirecting...';
        loginMessage.style.display = 'block';
        loginMessage.style.color = 'green';
        setTimeout(() => {
            window.location.href = 'admin.html';
        }, 1000);
    } else {
        loginMessage.textContent = 'Invalid username or password.';
        loginMessage.style.display = 'block';
        loginMessage.style.color = 'red';
    }
});


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
                    <img src="path/to/your/logos-image-blur.jpg" alt="Blurred logo designs">
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
        src: 'image/gallery-image-1-red-boat.jpg',
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
document.addEventListener('DOMContentLoaded', () => {
    // Insert Quick Services Section
    if (quickServicesSectionContainer) {
        quickServicesSectionContainer.innerHTML = generateQuickServicesSection();
    }

    // Insert Why Choose Section
    if (whyChooseSectionContainer) {
        whyChooseSectionContainer.innerHTML = generateWhyChooseSection();
        const contactUsButton = document.getElementById('contactUsButton');
        if (contactUsButton) {
            contactUsButton.addEventListener('click', () => {
                openModal(contactInfoModal);
            });
        }
    }

    // Insert Image Gallery Section
    if (imageGallerySectionContainer) {
        imageGallerySectionContainer.innerHTML = generateImageGallerySection();
    }

    // Insert Testimonials Section
    if (testimonialsSectionContainer) {
        testimonialsSectionContainer.innerHTML = generateTestimonialsSection();
    }

    // Event listeners for the Contact Info modal
    if (closeContactInfo) {
        closeContactInfo.addEventListener('click', () => {
            closeModal(contactInfoModal);
        });
    }
    window.addEventListener('click', (e) => {
        if (e.target == contactInfoModal) {
            closeModal(contactInfoModal);
        }
    });

    // All section generation functions are now called here
});