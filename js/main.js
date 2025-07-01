// iframe의 src를 변경하여 페이지를 동적으로 로드하는 함수
function loadPage(url) {
    document.getElementById('mainFrame').src = url;
    window.scrollTo(0, 0); // 페이지 이동 시 스크롤 맨 위로 이동
}

// 팝업(로그인) 창을 웹브라우저 중앙에 띄우는 함수
function openLoginModal() {
  // 팝업 창 크기
  const width = 400;
  const height = 500;
  // 현재 브라우저 창의 위치와 크기
  const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
  const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth || screen.width;
  const windowHeight = window.innerHeight || document.documentElement.clientHeight || screen.height;
  // 중앙 위치 계산
  const left = dualScreenLeft + (windowWidth - width) / 2;
  const top = dualScreenTop + (windowHeight - height) / 2;
  // 팝업 창 열기
  window.open(
    'login.html',
    '로그인/회원가입',
    `width=${width},height=${height},left=${left},top=${top},scrollbars=yes`
  );
}
window.openLoginModal = openLoginModal;

// (필요시) iframe 높이 자동 조절 함수
function resizeIframe(iframe) {
    iframe.onload = function() {
        try {
            const innerDoc = iframe.contentDocument || iframe.contentWindow.document;
            const newHeight = innerDoc.body.scrollHeight;
            iframe.style.height = newHeight + 'px';
        } catch (e) {
            console.warn('iframe 자동 높이 조절 실패 (다른 도메인?)', e);
        }
    };
}

// 팝업(모달) 열기/닫기 함수 (디지털 기기 지원 안내용)
function showPopup() {
    document.getElementById('popup').style.display = 'flex';
}
function closePopup() {
    document.getElementById('popup').style.display = 'none';
}
