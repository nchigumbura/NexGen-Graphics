// services.js

// =========================================
// --- Services Data: Hero Image Gallery ---
// =========================================
const heroGalleryImages = [
    { src: 'services/images/minustwo.jpg', alt: 'Outer-tier poster' },
    { src: 'services/images/minusone.jpg', alt: 'Mid-tier poster' },
    { src: 'services/images/main.jpg', alt: 'Central emotional poster' },
    { src: 'services/images/one.jpg', alt: 'Mid-tier poster' },
    { src: 'services/images/two.jpg', alt: 'Outer-tier poster' },
];

// =========================================
// --- Services Data: Services Overview Cards ---
// =========================================
const servicesOverviewData = [
    {
        heading: 'Brand Kits',
        sentence: 'Unify your brand identity across all platforms with a sleek, professional package that makes you unforgettable.',
        details: [
            'Basic: Starter kit with logo variations, color palette & fonts – perfect for small brands testing their image. $49',
            'Standard: Complete brand kit with style guide, social media templates & print-ready assets – ensures consistency everywhere. $99',
            'Premium: Full premium package with advanced branding strategy, unlimited revisions & lifetime asset updates. $199'
        ],
        images: [
            'services/images/brand-kit-1.jpeg',
            'services/images/brand-kit-2.jpeg',
            'services/images/brand-kit-3.jpeg',
            'services/images/brand-kit-4.jpeg',
            'services/images/brand-kit-5.jpeg',
            'services/images/brand-kit-6.jpeg',
            'services/images/brand-kit-7.jpeg',
            'services/images/brand-kit-8.jpeg'
        ]
    },
    {
        heading: 'Logo Design',
        sentence: 'A timeless logo that tells your story, builds trust, and sets you apart from the competition.',
        details: [
            'Basic: Clean, minimal logo design with 2 concepts & 1 revision. $30',
            'Standard: Professional logo with 3 refined concepts, 3 revisions & color variations. $75',
            'Premium: High-impact logo suite with unlimited revisions, 3D mockups & full branding usage rights. $150'
        ],
        images: [
            'services/images/logo-1.jpeg',
            'services/images/logo-2.jpeg',
            'services/images/logo-3.jpeg',
            'services/images/logo-4.jpeg',
            'services/images/logo-5.jpeg',
            'services/images/logo-6.jpeg',
            'services/images/logo-7.jpeg',
            'services/images/logo-8.jpeg'
        ]
    },
    {
        heading: 'Flyers / Posters',
        sentence: 'Make your events impossible to ignore with stylish, bold designs that capture attention at first glance.',
        details: [
            'Basic: One-page flyer/poster with quick turnaround, simple but sharp. $25',
            'Standard: Creative flyer/poster design with custom illustrations, 2 revisions & print/web formats. $50',
            'Premium: Premium event pack – multiple design versions, unlimited revisions, plus motion flyer for social media. $100'
        ],
        images: [
            'services/images/flyer-1.jpeg',
            'services/images/flyer-2.jpeg',
            'services/images/flyer-3.jpeg',
            'services/images/flyer-4.jpeg',
            'services/images/flyer-5.jpeg',
            'services/images/flyer-6.jpeg',
            'services/images/flyer-7.jpeg',
            'services/images/flyer-8.jpeg'
        ]
    },
    {
        heading: 'Event Stationery',
        sentence: 'Celebrate your milestones with stationery that feels as special as the moment itself.',
        details: [
            'Basic: Invitations or event cards in digital format – quick & elegant. $40',
            'Standard: Full stationery kit (invites, RSVP cards, thank-you cards) with 2 revisions. $85',
            'Premium: Luxury event package with custom illustrations, print-ready designs, and unlimited revisions. $150'
        ],
        images: [
            'services/images/stationery-1.jpeg',
            'services/images/stationery-2.jpeg',
            'services/images/stationery-3.jpeg',
            'services/images/stationery-4.jpeg',
            'services/images/stationery-5.jpeg',
            'services/images/stationery-6.jpeg',
            'services/images/stationery-7.jpeg',
            'services/images/stationery-8.jpeg'
        ]
    },
    {
        heading: 'Business Cards',
        sentence: 'Leave a lasting impression with sleek, professional cards that speak for you when you can’t.',
        details: [
            'Basic: Single design, minimal layout – perfect for startups. $20',
            'Standard: Double-sided design with 2 concepts, print & digital-ready. $40',
            'Premium: Custom luxury cards with metallic/gold mockups & unlimited revisions. $75'
        ],
        images: [
            'services/images/business-card-1.jpeg',
            'services/images/business-card-2.jpeg',
            'services/images/business-card-3.jpeg',
            'services/images/business-card-4.mp4',
            'services/images/business-card-5.jpeg',
            'services/images/business-card-6.jpeg',
            'services/images/business-card-7.jpeg',
            'services/images/business-card-8.jpeg'
        ]
    },
    {
        heading: 'Social Media Kits',
        sentence: 'Transform your online presence with cohesive designs that attract attention and grow.',
        details: [
            'Basic: 5 branded templates optimized for Instagram/Facebook. $50',
            'Standard: 10 branded templates, highlight covers & story backgrounds. $99',
            'Premium: Complete kit with 20+ templates, custom icons, and post scheduling mockups. $150'
        ],
        images: [
            'services/images/social-1.jpeg',
            'services/images/social-2.jpeg',
            'services/images/social-3.mp4',
            'services/images/social-4.jpeg',
            'services/images/social-5.jpeg',
            'services/images/social-6.jpeg',
            'services/images/social-7.jpeg',
            'services/images/social-8.jpeg'
        ]
    },
    {
        heading: 'Web Graphics / Banners',
        sentence: 'Give your website or ads a modern, professional look that turns visitors into customers.',
        details: [
            'Basic: Single clean web banner or ad graphic. $30',
            'Standard: Set of 3 banners/ads optimized for web & mobile. $75',
            'Premium: Full campaign kit with 6+ banners, animated versions, and unlimited revisions. $150'
        ],
        images: [
            'services/images/web-1.jpeg',
            'services/images/web-2.jpeg',
            'services/images/web-3.jpeg', 
            'services/images/web-4.jpeg',
            'services/images/web-5.jpeg',
            'services/images/web-6.jpeg',
            'services/images/web-7.jpeg',
            'services/images/web-8.jpeg'
        ]
    },
    {
        heading: 'Presentations / Pitch Decks',
        sentence: 'Win clients and investors with polished slides that make your message clear and unforgettable.',
        details: [
            'Basic: Simple 5-slide branded presentation. $40',
            'Standard: 10-slide pitch deck with icons, graphics & 2 revisions. $85',
            'Premium: Full professional 20+ slide deck with storytelling design, animations & unlimited revisions. $199'
        ],
        images: [
            'services/images/presentation-1.jpeg',
            'services/images/presentation-2.jpeg',
            'services/images/presentation-3.jpeg',
            'services/images/presentation-4.jpeg',
            'services/images/presentation-5.jpeg',
            'services/images/presentation-6.jpeg',
            'services/images/presentation-7.jpeg',
            'services/images/presentation-8.jpeg'
        ]
    }
];

const cardsToShowInitially = 6;

// =========================================
// --- NEW: Global Variables for Slideshow ---
// =========================================
let slideshowInterval;
let currentSlideIndex = 0;

// Function to create a single HTML card from a service object
function createOverviewCard(service) {
    const buttonsHtml = `<div class="card-buttons hidden">
                            <button class="btn btn-inspo" data-service-heading="${service.heading}">Inspo</button>
                            <button class="btn btn-details" data-service-heading="${service.heading}">More details</button>
                        </div>`;

    return `
        <div class="overview-card" data-service-heading="${service.heading}" style="background-image: url('${service.images[0]}');">
            <div class="card-overlay">
                <div class="card-text-content">
                    <h4>${service.heading}</h4>
                    <p>${service.sentence}</p>
                </div>
                ${buttonsHtml}
            </div>
            <button class="card-toggle-btn">+</button>
        </div>
    `;
}

// Function to create and render the full modal content (for "See More")
function renderServicesModal() {
    const modalContentWrapper = document.getElementById('services-modal-content-wrapper');
    if (!modalContentWrapper) return;

    modalContentWrapper.innerHTML = '';

    const headerHtml = `
        <div class="modal-header">
            <h2>Our Full Service Catalog</h2>
        </div>
    `;
    modalContentWrapper.innerHTML += headerHtml;

    const cardsContainer = document.createElement('div');
    cardsContainer.id = 'modal-cards-container';
    cardsContainer.innerHTML = servicesOverviewData.map(createOverviewCard).join('');
    modalContentWrapper.appendChild(cardsContainer);
}

// --- NEW FUNCTION: Renders the "Inspo" Gallery Modal ---
function renderInspoModal(serviceHeading, mediaFiles) {
    const modalContentWrapper = document.getElementById('services-modal-content-wrapper');
    if (!modalContentWrapper) return;

    modalContentWrapper.innerHTML = '';

    const headerHtml = `
        <div class="modal-header">
            <h2 class="inspo-heading">Inspiration for <br>${serviceHeading}</h2>
        </div>
    `;

    // Map through the media files and create either an <img> or a <video> tag
    const galleryHtml = mediaFiles.map(mediaSrc => {
        // Check if the file is a video by its extension
        if (mediaSrc.endsWith('.mp4')) {
            return `
                <div class="inspo-gallery-item">
                    <video controls muted autoplay loop playsinline>
                        <source src="${mediaSrc}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </div>
            `;
        } else {
            return `
                <div class="inspo-gallery-item">
                    <img src="${mediaSrc}" alt="Inspiration image for ${serviceHeading}">
                </div>
            `;
        }
    }).join('');

    modalContentWrapper.innerHTML = `
        ${headerHtml}
        <div class="inspo-gallery-container">
            ${galleryHtml}
        </div>
    `;
}

// Function to load the initial, limited set of cards
function loadInitialServices() {
    const container = document.getElementById('overview-cards-container');
    if (!container) return;

    const cardsToDisplay = servicesOverviewData.slice(0, cardsToShowInitially);
    container.innerHTML = cardsToDisplay.map(createOverviewCard).join('');
}

// Function to load the hero gallery
function loadHeroGallery() {
    const galleryContainer = document.getElementById('services-hero-gallery');
    if (!galleryContainer) return;
    galleryContainer.innerHTML = heroGalleryImages.map((image, index) => {
        return `<div class="services-column col-${index + 1}">
                    <img src="${image.src}" alt="${image.alt}" class="services-poster poster-${index + 1}">
                </div>`;
    }).join('');
}

// =========================================
// --- NEW FUNCTION: Renders the "More Details" Modal ---
// =========================================
function renderDetailsModal(service) {
    const modalContentWrapper = document.getElementById('services-modal-content-wrapper');
    if (!modalContentWrapper) return;

    modalContentWrapper.innerHTML = '';

    const detailsContentHtml = `
        <div class="details-content">
            <h2 class="details-heading">${service.heading}</h2>
            <p class="details-sentence">${service.sentence}</p>
            <ul class="details-list">
                ${service.details.map(detail => {
                    const parts = detail.split(':');
                    const boldPart = parts[0] + ':';
                    const remainingPart = parts.slice(1).join(':');
                    return `<li><strong>${boldPart}</strong>${remainingPart}</li>`;
                }).join('')}
            </ul>
        </div>
    `;

    const slideshowHtml = `
        <div class="slideshow-container">
            <div class="slideshow-inner-wrapper">
                ${service.images.map((mediaSrc, index) => {
                    const isActive = index === 0 ? 'active' : '';
                    if (mediaSrc.endsWith('.mp4')) {
                        return `
                            <div class="slide ${isActive}" data-type="video">
                                <video src="${mediaSrc}" muted playsinline></video>
                            </div>
                        `;
                    } else {
                        return `
                            <div class="slide ${isActive}" data-type="image">
                                <img src="${mediaSrc}" alt="${service.heading} slide ${index + 1}">
                            </div>
                        `;
                    }
                }).join('')}
            </div>
        </div>
    `;

    modalContentWrapper.innerHTML = `
        <div class="details-modal-grid">
            ${detailsContentHtml}
            ${slideshowHtml}
        </div>
    `;

    startSlideshow(service.images);
}

// =========================================
// --- FIXED & IMPROVED: Manages the Slideshow Logic ---
// =========================================
function startSlideshow(mediaFiles) {
    const slides = document.querySelectorAll('.slideshow-container .slide');
    const slideshowContainer = document.querySelector('.slideshow-container');
    const slideshowWrapper = document.querySelector('.slideshow-inner-wrapper');

    // Clear any previous slideshow timers
    clearInterval(slideshowInterval);
    currentSlideIndex = 0;

    // Reset the slideshow wrapper's position to the beginning
    slideshowWrapper.style.transform = `translateX(0%)`;

    // Ensure the first slide is active
    slides.forEach(s => s.classList.remove('active'));
    if (slides.length > 0) {
        slides[0].classList.add('active');
        const firstVideo = slides[0].querySelector('video');
        if (firstVideo) {
            firstVideo.currentTime = 0;
            firstVideo.play();
        }
    }

    function nextSlide() {
        if (slides.length <= 1) {
            clearInterval(slideshowInterval);
            return;
        }

        const currentSlideEl = slides[currentSlideIndex];
        currentSlideEl.classList.remove('active');

        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        const nextSlideEl = slides[currentSlideIndex];
        nextSlideEl.classList.add('active');

        // Apply the transform to the wrapper to slide the content
        slideshowWrapper.style.transform = `translateX(-${currentSlideIndex * 100}%)`;

        // Handle video playback
        const activeVideo = nextSlideEl.querySelector('video');
        if (activeVideo) {
            clearInterval(slideshowInterval); // Pause timer for video
            activeVideo.currentTime = 0;
            activeVideo.play();

            // When video ends, immediately go to the next slide and restart the timer
            activeVideo.onended = () => {
                nextSlide();
                startSlideshowTimer();
            };
        }
    }
    
    function startSlideshowTimer() {
        // Only start the timer if the current slide isn't a video
        if (slides[currentSlideIndex].dataset.type !== 'video') {
            slideshowInterval = setInterval(nextSlide, 5000);
        }
    }
    
    // Initial start
    startSlideshowTimer();

    // Pause on hover
    slideshowContainer.addEventListener('mouseenter', () => {
        clearInterval(slideshowInterval);
        const activeVideo = slideshowContainer.querySelector('.slide.active video');
        if (activeVideo) {
            activeVideo.pause();
        }
    });

    // Resume on mouseleave
    slideshowContainer.addEventListener('mouseleave', () => {
        const activeVideo = slideshowContainer.querySelector('.slide.active video');
        if (!activeVideo || activeVideo.paused) {
            startSlideshowTimer();
        }
    });
}

// =========================================
// --- Services Data: Pricing Section Data ---
// =========================================
const pricingData = {
    header: 'Pricing',
    subtitle: 'We work with a simple, flexible three-tier model — keeping things transparent and easy to understand.',
    cards: [
        {
            title: 'Basic',
            description: 'Perfect for online use. Clients receive high-res files via WhatsApp or email.',
            icon: '🌍', // Globe icon
            buttonText: 'Get Started',
            buttonClass: 'basic-btn',
            items: [
                { service: 'Logo', price: '$20' },
                { service: 'Flyer', price: '$10' },
                { service: 'Poster', price: '$15' },
                { service: 'Business Card', price: '$10' },
                { service: 'Social Media Post', price: '$7' },
                { service: 'Invoice/Letterhead', price: '$10' }
            ]
        },
        {
            title: 'Standard',
            description: 'Includes extra design concepts, minor revisions, font/format selection for printing, etc.',
            icon: '🚀', // Rocket icon
            badge: 'Most Popular',
            buttonText: 'Upgrade Now',
            buttonClass: 'standard-btn',
            items: [
                { service: 'Logo + 2 Concepts', price: '$30' },
                { service: 'Flyer + Caption Support', price: '$15' },
                { service: 'Poster + Print-Ready Setup', price: '$20' },
                { service: 'Business Card + QR Code', price: '$15' },
                { service: 'Basic Brand Kit (logo, colors, fonts)', price: '$50' },
                { service: 'Invitations', price: '$20' }
            ]
        },
        {
            title: 'Premium',
            description: 'Client receives printed pieces in sleek branded packaging.',
            icon: '✨', // Sparkle icon
            buttonText: 'Go Premium',
            buttonClass: 'premium-btn',
            items: [
                { service: 'Logo + Basic Brand Kit (Digital only)', price: '$50' },
                { service: 'Flyer (50 copies A5)', price: '$25-$30' },
                { service: 'Poster (5 A2 Posters)', price: '$30-$40' },
                { service: 'Business Cards (100 cards)', price: '$35-$40' },
                { service: 'Company Profile (10 pages)', price: '$45-$55' }
            ]
        }
    ]
};

// =========================================
// --- Function to Render Pricing Section ---
// =========================================

function createPricingCardHTML(card) {
    const badgeHtml = card.badge ? `<span class="pricing-badge">${card.badge}</span>` : '';

    const itemsHtml = card.items.map(item => `
        <div class="pricing-item">
            <span class="pricing-service">${item.service}</span>
            <span class="pricing-divider">|</span>
            <span class="pricing-price-wrapper">
                <span class="pricing-price">${item.price}</span>
            </span>
        </div>
    `).join('');

    return `
        <div class="pricing-card ${card.title.toLowerCase()}">
            ${badgeHtml}
            <div class="card-header">
                <span class="card-icon">${card.icon}</span>
                <h3 class="card-title">${card.title}</h3>
                <p class="card-description">${card.description}</p>
            </div>
            <div class="card-items-list">
                ${itemsHtml}
            </div>
            <a href="#" class="pricing-card-btn ${card.buttonClass}">${card.buttonText}</a>
        </div>
    `;
}

function renderPricingSection() {
    const container = document.getElementById('pricingSectionContainer');
    if (!container) return;

    const cardsHtml = pricingData.cards.map(createPricingCardHTML).join('');

    container.innerHTML = `
        <section class="pricing-section">
            <div class="pricing-content-wrapper">
                <div class="pricing-header">
                    <h2>${pricingData.header}</h2>
                    <p>${pricingData.subtitle}</p>
                </div>
                <div class="download-pdf-wrapper">
                    <a href="services/images/price.pdf" download class="download-pdf-btn">Download PDF</a>
                </div>
                <div class="pricing-cards-container">
                    ${cardsHtml}
                </div>
            </div>
        </section>
    `;
}

// =========================================
// --- Services Data: Event Based Design Gallery ---
// =========================================
const eventGalleryImages = [
    // Use placeholder names for now - replace with your actual image paths
    { src: 'services/images/event-1.jpeg', alt: 'Tropical event backdrop' },
    { src: 'services/images/event-2.png', alt: 'Wedding invitation price card' },
    { src: 'services/images/event-3.jpeg', alt: 'Wedding invitation suite flat lay' },
    { src: 'services/images/event-4.jpeg', alt: 'Close-up of engraved invitation' },
    { src: 'services/images/event-5.jpeg', alt: 'Dark green event stationery' },
    { src: 'services/images/event-6.jpeg', alt: 'Clear acrylic invitation' },
    { src: 'services/images/event-7.jpeg', alt: 'Small thank you card collection' }
];

// =========================================
// --- Function to Render Event Based Design Section ---
// =========================================
function renderEventBasedDesignSection() {
    const container = document.getElementById('eventBasedDesignSectionContainer');
    // If the element isn't found, the function stops right here and doesn't inject content.
    if (!container) {
        console.error("ERROR: Could not find container ID 'eventBasedDesignSectionContainer'");
        return;
    }
    // Map the images to create grid items
    const gridItemsHtml = eventGalleryImages.map((image, index) => {
        // We'll apply the specific grid placement classes in the CSS, 
        // but we need a unique class for each item here.
        return `
            <div class="event-grid-item item-${index + 1}">
                <img src="${image.src}" alt="${image.alt}">
            </div>
        `;
    }).join('');

    container.innerHTML = `
        <section class="event-design-section fade-up-hidden">
            <div class="event-content-wrapper">
                <h2 class="event-header">Event Based Design</h2>
                <div class="event-grid-container">
                    ${gridItemsHtml}
                </div>
            </div>
        </section>
    `;
}


// =========================================
// --- DOMContentLoaded Listener with all event handlers ---
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    loadHeroGallery();
    loadInitialServices();
    renderPricingSection();
    renderEventBasedDesignSection();


    const overviewSection = document.getElementById('services-overview-section');
    if (overviewSection) {
        overviewSection.addEventListener('click', (event) => {
            const targetButton = event.target.closest('.btn-details, .btn-inspo');
            if (targetButton) {
                const serviceHeading = targetButton.dataset.serviceHeading;
                const service = servicesOverviewData.find(s => s.heading === serviceHeading);
                if (service) {
                    if (targetButton.classList.contains('btn-details')) {
                        renderDetailsModal(service);
                        document.getElementById('servicesModal').classList.add('active');
                    } else if (targetButton.classList.contains('btn-inspo')) {
                        renderInspoModal(service.heading, service.images);
                        document.getElementById('servicesModal').classList.add('active');
                    }
                }
            }
        });
    }

    const modalWindow = document.getElementById('servicesModal');
    if (modalWindow) {
        modalWindow.addEventListener('click', (event) => {
            if (event.target.classList.contains('close-button')) {
                modalWindow.classList.remove('active');
            }
        });
    }
});