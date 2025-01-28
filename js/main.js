const themeToggle = document.getElementById('theme-toggle');
const typewriterElement = document.querySelector('.typewriter');
const lightText = typewriterElement.dataset.lightText;
const darkText = typewriterElement.dataset.darkText;

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
