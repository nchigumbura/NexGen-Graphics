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
            'services/images/brand-kit-5.jpeg'
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
            'services/images/logo-5.jpeg'
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
            'services/images/flyer-5.jpeg'
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
            'services/images/stationery-2.jpg',
            'services/images/stationery-3.jpg',
            'services/images/stationery-4.jpg',
            'services/images/stationery-5.jpg'
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
            'services/images/business-card-1.jpg',
            'services/images/business-card-2.jpg',
            'services/images/business-card-3.jpg',
            'services/images/business-card-4.jpg',
            'services/images/business-card-5.jpg'
        ]
    },
    {
        heading: 'Social Media Kits',
        sentence: 'Transform your online presence with cohesive designs that attract attention and grow your following.',
        details: [
            'Basic: 5 branded templates optimized for Instagram/Facebook. $50',
            'Standard: 10 branded templates, highlight covers & story backgrounds. $99',
            'Premium: Complete kit with 20+ templates, custom icons, and post scheduling mockups. $150'
        ],
        images: [
            'services/images/social-1.jpg',
            'services/images/social-2.jpg',
            'services/images/social-3.jpg',
            'services/images/social-4.jpg',
            'services/images/social-5.jpg'
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
            'services/images/web-1.jpg',
            'services/images/web-2.jpg',
            'services/images/web-3.jpg',
            'services/images/web-4.jpg',
            'services/images/web-5.jpg'
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
            'services/images/presentation-2.jpg',
            'services/images/presentation-3.jpg',
            'services/images/presentation-4.jpg',
            'services/images/presentation-5.jpg'
        ]
    }
];

const cardsToShowInitially = 6;
let isFullCatalogShown = false;

function createOverviewCard(service) {
    const buttonsHtml = `<div class="card-buttons">
                                <button class="btn btn-inspo">Inspo</button>
                                <button class="btn btn-details">More details</button>
                            </div>`;

    return `
        <div class="overview-card" data-service-heading="${service.heading}">
            <div class="card-overlay">
                <div class="card-text-content">
                    <h4>${service.heading}</h4>
                    <p>${service.sentence}</p>
                </div>
                ${buttonsHtml}
            </div>
        </div>
    `;
}

function loadServicesOverview() {
    const container = document.getElementById('overview-cards-container');
    const seeMoreBtn = document.getElementById('seeMoreBtn');
    
    if (!container || !seeMoreBtn) return; 

    const cardsToDisplay = isFullCatalogShown ? servicesOverviewData : servicesOverviewData.slice(0, cardsToShowInitially);

    container.innerHTML = ''; 
    cardsToDisplay.forEach((service) => {
        container.innerHTML += createOverviewCard(service);
    });

    seeMoreBtn.textContent = isFullCatalogShown ? 'Close' : 'See more';

    const overviewCards = document.querySelectorAll('.overview-card');
    overviewCards.forEach((card, index) => {
        const service = cardsToDisplay[index];
        const imageUrl = service.images[0];
        card.style.backgroundImage = `url('${imageUrl}')`;
    });

    seeMoreBtn.removeEventListener('click', toggleServicesView);
    seeMoreBtn.addEventListener('click', toggleServicesView);

    document.querySelectorAll('.btn-inspo').forEach(btn => {
        btn.addEventListener('click', () => alert('Inspo button clicked!'));
    });
    document.querySelectorAll('.btn-details').forEach(btn => {
        btn.addEventListener('click', () => alert('More details button clicked!'));
    });
}

function toggleServicesView() {
    isFullCatalogShown = !isFullCatalogShown;
    const servicesSection = document.getElementById('services-overview-section');
    const body = document.body;
    
    // Toggle the 'modal-active' class on the body to trigger modal-related styles
    body.classList.toggle('modal-active', isFullCatalogShown);
    
    // Toggle the 'modal-window' and 'modal-content' classes on the services section
    servicesSection.classList.toggle('modal-window', isFullCatalogShown);
    servicesSection.classList.toggle('modal-content', isFullCatalogShown);

    loadServicesOverview();
}

function loadHeroGallery() {
    const galleryContainer = document.getElementById('services-hero-gallery');
    if (!galleryContainer) return;

    galleryContainer.innerHTML = ''; 

    heroGalleryImages.forEach((image, index) => {
        const columnDiv = document.createElement('div');
        columnDiv.classList.add('services-column', `col-${index + 1}`);

        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.alt;
        img.classList.add('services-poster', `poster-${index + 1}`);

        columnDiv.appendChild(img);
        galleryContainer.appendChild(columnDiv);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadHeroGallery();
    loadServicesOverview();
});