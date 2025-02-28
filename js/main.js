const themeToggle = document.getElementById('theme-toggle');
const typewriterElement = document.querySelector('.typewriter');
const lightText = typewriterElement.dataset.lightText;
const darkText = typewriterElement.dataset.darkText;
const flipTrigger = document.getElementById("flipTrigger");
const flipBack = document.getElementById("flipBack");
const resumeButton = document.getElementById('resume-button');
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

// Typewriter settings
const TYPING_SPEED = 50; // Increased speed (lower number = faster)
let typingInProgress = false;

// Theme management functions
function setTheme(isDark) {
    if (isDark) {
        document.body.classList.add('dark-theme');
        themeToggle.classList.add('dark');
        typewriterElement.textContent = darkText;
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-theme');
        themeToggle.classList.remove('dark');
        typewriterElement.textContent = lightText;
        localStorage.setItem('theme', 'light');
    }
}

// Initialize theme based on stored preference or default to dark
const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme === 'dark');

// Update theme toggle event listener
themeToggle.addEventListener('click', () => {
    const isDark = !document.body.classList.contains('dark-theme');
    setTheme(isDark);
    
    if (!typingInProgress) {
        typewriterElement.textContent = '';
        const newText = isDark ? darkText : lightText;
        typeNewText(newText);
    }
});

function typeNewText(text) {
    typingInProgress = true;
    let i = 0;
    
    function type() {
        if (i < text.length) {
            typewriterElement.textContent += text.charAt(i);
            i++;
            setTimeout(type, TYPING_SPEED);
        } else {
            typingInProgress = false;
        }
    }
    
    type();
}

// Add scroll event listener
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.classList.add('nav-scrolled');
    } else {
        nav.classList.remove('nav-scrolled');
    }
});

flipTrigger.addEventListener("click", function () {
    businessCard.classList.add("flipped");
});

flipBack.addEventListener("click", function () {
    businessCard.classList.remove("flipped");
});

// Update Resume button click event
resumeButton.addEventListener('click', () => {
    window.open('assets/Prasad_s_resume.pdf', '_blank');
});

// Improved menu toggle for mobile with animation
menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navMenu.classList.toggle('open');
    menuToggle.classList.toggle('open');
    menuToggle.textContent = navMenu.classList.contains('open') ? '×' : '☰';
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        navMenu.classList.remove('open');
        menuToggle.classList.remove('open');
        menuToggle.textContent = '☰';
    }
});

// Close menu when clicking on a link or scrolling
const closeMenu = () => {
    navMenu.classList.remove('open');
    menuToggle.classList.remove('open');
    menuToggle.textContent = '☰';
};

document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', closeMenu);
});

window.addEventListener('scroll', () => {
    if (window.innerWidth <= 768) {
        closeMenu();
    }
});

// Project carousel data
const carouselItems = [
    {
        title: "Portfolio Website",
        description: "A modern, responsive portfolio website built with HTML, CSS, and JavaScript. Features dark mode, smooth animations, and dynamic content loading.",
        link: "https://github.com/prasadborse02/portfolio",
        type: "project"
    },
    {
        title: "Data Pipeline System",
        description: "Developed robust data pipelines using Python, integrating BigQuery, Redshift, and MySQL for efficient data processing and analytics.",
        link: "#",
        type: "project"
    },
    {
        title: "API Integration Framework",
        description: "Created a scalable framework for integrating third-party APIs, including Google Ads and Facebook Graph API, with extensive documentation.",
        link: "#",
        type: "project"
    },
    {
        title: "Event-Driven Android App",
        description: "Architected an Android application using Kotlin and Firebase, implementing event-driven architecture and real-time updates.",
        link: "#",
        type: "project"
    }
];

// Initialize carousel
document.addEventListener('DOMContentLoaded', () => {
    const carouselCards = document.querySelector('.carousel-cards');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    
    if (!carouselCards || !prevButton || !nextButton) return;

    let currentPosition = 0;
    let cardWidth = 0;
    let maxPosition = 0;

    function updateCarouselMetrics() {
        const card = document.querySelector('.card');
        if (!card) return;
        
        cardWidth = card.offsetWidth + 20; // Include gap
        let visibleCards;
        if (window.innerWidth >= 1200) {
            visibleCards = 3;
        } else if (window.innerWidth >= 768) {
            visibleCards = 2;
        } else {
            visibleCards = 1;
        }
        maxPosition = -(cardWidth * (carouselItems.length - visibleCards));
    }

    function updateCarousel(direction) {
        updateCarouselMetrics();
        
        if (direction === 'next' && currentPosition > maxPosition) {
            currentPosition = Math.max(maxPosition, currentPosition - cardWidth);
        } else if (direction === 'prev' && currentPosition < 0) {
            currentPosition = Math.min(0, currentPosition + cardWidth);
        }
        
        carouselCards.style.transform = `translateX(${currentPosition}px)`;
    }

    // Create and append cards
    carouselItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <a href="${item.link}" target="_blank">Learn more →</a>
        `;
        carouselCards.appendChild(card);
    });

    // Event listeners
    prevButton.addEventListener('click', () => updateCarousel('prev'));
    nextButton.addEventListener('click', () => updateCarousel('next'));

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') updateCarousel('prev');
        if (e.key === 'ArrowRight') updateCarousel('next');
    });

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            currentPosition = 0;
            carouselCards.style.transform = `translateX(0)`;
            updateCarouselMetrics();
        }, 100);
    });

    // Initial setup
    updateCarouselMetrics();
});
