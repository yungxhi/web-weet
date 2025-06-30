// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', function() {
    // 스크롤 애니메이션 효과
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 애니메이션 대상 요소들
    const animatedElements = document.querySelectorAll('.policy-card, .org-card, .step, .contact-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // 부드러운 스크롤 효과
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 카드 호버 효과 강화
    const cards = document.querySelectorAll('.policy-card, .org-card, .contact-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // 버튼 클릭 효과
    const buttons = document.querySelectorAll('.action-button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // 클릭 효과
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // 문의 카드 클릭 이벤트
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            const info = this.querySelector('p').textContent;
            
            // 클립보드에 복사 (실제 구현 시)
            if (navigator.clipboard) {
                navigator.clipboard.writeText(info).then(() => {
                    showNotification(`${title} 정보가 복사되었습니다.`);
                });
            } else {
                showNotification(`${title}: ${info}`);
            }
        });
    });
});

// 알림 표시 함수
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #6F93FF;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-size: 14px;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // 애니메이션
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 자동 제거
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// 스크롤 진행률 표시
window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    // 스크롤 진행률 바 (선택사항)
    let progressBar = document.getElementById('scroll-progress');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.id = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: #6F93FF;
            z-index: 1001;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
    }
    
    progressBar.style.width = scrollPercent + '%';
});

// 반응형 네비게이션 (모바일용)
function initMobileNavigation() {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    
    if (mediaQuery.matches) {
        // 모바일에서 추가 기능 구현
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        section.style.opacity = '1';
                        section.style.transform = 'translateY(0)';
                    }
                });
            }, { threshold: 0.3 });
            
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(section);
        });
    }
}

// 페이지 로드 완료 후 모바일 네비게이션 초기화
window.addEventListener('load', initMobileNavigation); 