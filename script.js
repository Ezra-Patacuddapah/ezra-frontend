// Function to set the active link based on hash
function setActiveFromHash() {
  let currentHash = window.location.hash || '#home';
  setActiveLink(currentHash);
}

// Function to set the active link based on scroll position
function setActiveFromScroll() {
  const sections = document.querySelectorAll('section');
  let currentSection = '#home'; // default

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    // If the section is at the top of the viewport (top <= 0 and bottom > 0)
    if (rect.top <= 100 && rect.bottom >= 100) { // 100px threshold for better UX
      currentSection = '#' + section.id;
    }
  });

  setActiveLink(currentSection);
}

// Helper function to set the active class on the matching nav link
function setActiveLink(targetHash) {
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    if (link.getAttribute('href') === targetHash) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Run the functions when the page loads
document.addEventListener('DOMContentLoaded', () => {
  setActiveFromHash();
  setActiveFromScroll();
});

// Update on hash change
window.addEventListener('hashchange', setActiveFromHash);

// Update on scroll
window.addEventListener('scroll', setActiveFromScroll);

// Set the current year in the footer
document.getElementById('year').textContent = new Date().getFullYear();

const elementsToTranslate = document.querySelectorAll('[data-lang]');

// Function to fetch the correct JSON file and apply translations
async function loadLanguage(lang) {
    const response = await fetch(`./languages/${lang}.json`);
    const translations = await response.json();
    applyTranslations(translations);
    // Update the HTML lang attribute for accessibility/SEO
    document.documentElement.setAttribute('lang', lang);
}

// Function to apply translations to the page elements
function applyTranslations(translations) {
    elementsToTranslate.forEach(element => {
        const key = element.getAttribute('data-lang');
        if (translations[key]) {
            element.textContent = translations[key];
        }
    });
}

// Function to set the language, save to localStorage, and load translations
function setLanguage(lang) {
    localStorage.setItem('selectedLanguage', lang);
    loadLanguage(lang);
}

// Load the saved language preference on page load
window.onload = () => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en'; // Default to English if none saved
    loadLanguage(savedLanguage);
};
