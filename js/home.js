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

window.onload = function() {
  window.scrollTo(0, 0);
  // 페이지 내 첫 번째 iframe 요소 선택
  const iframe = document.querySelector('iframe');
  // iframe이 존재하면 높이 자동 조절 함수 실행
  if (iframe) {
    resizeIframe(iframe);
  }
};