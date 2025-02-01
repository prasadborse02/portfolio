const themeToggle = document.getElementById('theme-toggle');
const typewriterElement = document.querySelector('.typewriter');
const lightText = typewriterElement.dataset.lightText;
const darkText = typewriterElement.dataset.darkText;
const flipTrigger = document.getElementById("flipTrigger");
const flipBack = document.getElementById("flipBack");

// Enable dark theme by default
// document.body.classList.add('dark-theme');
// themeToggle.textContent = '☀️';
// typewriterElement.textContent = darkText;

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    themeToggle.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';

    // Reset typewriter text
    typewriterElement.textContent = '';
    const newText = document.body.classList.contains('dark-theme') ? darkText : lightText;

    let i = 0;
    function typeNewText() {
        if (i < newText.length) {
            typewriterElement.textContent += newText.charAt(i);
            i++;
            setTimeout(typeNewText, 100);
        }
    }
    typeNewText();
});

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
