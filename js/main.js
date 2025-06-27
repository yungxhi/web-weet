// 팝업창 위치 계산
function getPopupPosition(width, height) {
    // 현재 브라우저 창의 위치를 기준으로 팝업창 위치 계산
    const dualScreenLeft = window.screenLeft || window.screenX;
    const dualScreenTop = window.screenTop || window.screenY;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth || screen.width;
    const windowHeight = window.innerHeight || document.documentElement.clientHeight || screen.height;
    const left = parseInt(dualScreenLeft + (windowWidth - width) / 2, 10);
    const top = parseInt(dualScreenTop + (windowHeight - height) / 2, 10);
    return { left, top };
}

// 로그인 팝업창 열기
function loginpopup() {
    const width = 500;
    const height = 400;
    const { left, top } = getPopupPosition(width, height);
    window.open(
        "login.html",
        "로그인/회원가입",
        `width=${width},height=${height},left=${left},top=${top},scrollbars=yes`
    );
}

// 팝업창 닫기 (login.html에서도 사용)
function loginclose() {
    window.close();
}

// // iframe 높이를 내부 콘텐츠 길이에 맞게 자동 조절하는 함수
// function resizeIframe(iframe) {
//   // iframe이 로드되면 실행되는 이벤트 핸들러 설정
//     iframe.onload = function() {
//     try {
//       // iframe 내부 문서 객체 가져오기 (동일 출처에서만 접근 가능)
//         const innerDoc = iframe.contentDocument || iframe.contentWindow.document;

//       // 내부 문서의 전체 높이 측정
//         const newHeight = innerDoc.body.scrollHeight;

//       // iframe 높이를 내부 콘텐츠 높이에 맞게 설정
//         iframe.style.height = newHeight + 'px';
//     } catch (e) {
//       // 만약 다른 도메인일 경우 (CORS 제한), 접근 불가 → 오류 처리
//         console.warn('iframe 자동 높이 조절 실패 (다른 도메인?)', e);
//     }
//     };
// }

// DOM이 완전히 로드된 후에 실행
window.addEventListener('DOMContentLoaded', () => {
  // 페이지 내 첫 번째 iframe 요소 선택
    const iframe = document.querySelector('iframe');

  // iframe이 존재하면 높이 자동 조절 함수 실행
    if (iframe) {
    resizeIframe(iframe);
    }
});
