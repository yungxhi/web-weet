// 페이지 내 fade-in 애니메이션을 적용할 요소들을 선택
const elements = document.querySelectorAll('.fade-in');

// IntersectionObserver를 사용하여 요소가 화면에 보일 때 애니메이션 클래스(show)를 추가
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
        entry.target.classList.add('show'); // 요소가 화면에 보이면 show 클래스 추가
    }
    });
}, { threshold: 0.7 }); // 70% 이상 보일 때 동작

elements.forEach(el => observer.observe(el)); // 모든 fade-in 요소에 observer 적용

// iframe의 src를 변경하여 페이지를 동적으로 로드하는 함수
    function loadPage(url) {
        document.getElementById('mainFrame').src = url;
    }

// 페이지가 로드될 때 스크롤을 맨 위로 올리고, 첫 번째 iframe이 있으면 크기 조절 함수 호출
window.onload = function() {
  window.scrollTo(0, 0); // 스크롤을 맨 위로 이동
  // 페이지 내 첫 번째 iframe 요소 선택
  const iframe = document.querySelector('iframe');
  // iframe이 존재하면 높이 자동 조절 함수 실행
  if (iframe) {
    resizeIframe(iframe);
  }
};