const elements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
        entry.target.classList.add('show');
    }
    });
}, { threshold: 0.7 });

elements.forEach(el => observer.observe(el));


    function loadPage(url) {
        document.getElementById('mainFrame').src = url;
    }