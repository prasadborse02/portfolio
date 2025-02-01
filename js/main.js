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

// Enable dark theme by default
// document.body.classList.add('dark-theme');
// themeToggle.textContent = '☀️';
// typewriterElement.textContent = darkText;

themeToggle.addEventListener('click', () => {
    themeToggle.classList.toggle('dark');
    document.body.classList.toggle('dark-theme');
    
    // Only start new typing if previous one is complete
    if (!typingInProgress) {
        typewriterElement.textContent = '';
        const newText = document.body.classList.contains('dark-theme') ? darkText : lightText;
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
