// Chart.js를 사용한 가로 막대 차트 생성 및 애니메이션 처리
// DOMContentLoaded: 문서가 완전히 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
    // 차트가 그려질 canvas 요소의 2D 컨텍스트 가져오기
    const ctx = document.getElementById('digitalGapChart').getContext('2d');
    
    // Chart.js를 이용해 가로 막대 차트 생성
    const digitalGapChart = new Chart(ctx, {
        type: 'bar', // 차트 타입: 가로 막대
        data: {
            labels: ['일반 국민', '고령층', '장애인', '농어민', '저소득층'], // 각 그룹 라벨
            datasets: [{ // 데이터 설정
                data: [100, 71.4, 83.5, 80, 96.5], // 각 그룹별 수치(%)
                backgroundColor: [
                    'rgba(102, 126, 234, 0.8)',
                    'rgba(118, 75, 162, 0.8)',
                    'rgba(102, 126, 234, 0.8)',
                    'rgba(118, 75, 162, 0.8)',
                    'rgba(102, 126, 234, 0.8)'
                ],
                borderColor: [
                    'rgba(102, 126, 234, 1)',
                    'rgba(118, 75, 162, 1)',
                    'rgba(102, 126, 234, 1)',
                    'rgba(118, 75, 162, 1)',
                    'rgba(102, 126, 234, 1)'
                ],
                borderWidth: 2, // 막대 테두리 두께
                borderRadius: 8, // 막대 모서리 둥글게
                borderSkipped: false, // 테두리 생략 없음
            }]
        },
        options: {
            indexAxis: 'y', // 가로 막대 차트로 설정
            responsive: true,
            maintainAspectRatio: false, // 반응형, 비율 고정 해제
            animation: false, // Chart.js 기본 애니메이션 비활성화(직접 구현)
            plugins: {
                legend: {
                    display: false // 범례 숨김
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.parsed.x + '%'; // 툴크에 % 표시
                        }
                    }
                }
            },
            // 커스텀 플러그인: 막대 옆에 값 직접 표시
            plugins: [{
                afterDraw: function(chart) {
                    var ctx = chart.ctx;
                    ctx.textAlign = 'left';
                    ctx.textBaseline = 'middle';
                    ctx.font = '14px Pretendard';
                    ctx.fillStyle = '#4a5568';
                    
                    chart.data.datasets.forEach(function(dataset, i) {
                        chart.getDatasetMeta(i).data.forEach(function(bar, index) {
                            var data = dataset.data[index];
                            var xPos = bar.x + 10;
                            var yPos = bar.y;
                            // 애니메이션을 위한 투명도 계산
                            var progress = Math.min(1, (Date.now() - chart.animationStart) / 1000);
                            if (chart.animationStart) {
                                ctx.globalAlpha = progress;
                            }
                            ctx.fillText(data + '%', xPos, yPos); // 막대 옆에 값 표시
                            ctx.globalAlpha = 1;
                        });
                    });
                }
            }],
            scales: {
                x: {
                    beginAtZero: true, // 0부터 시작
                    max: 100, // 최대값 100
                    ticks: {
                        callback: function(value) {
                            return value + '%'; // x축 눈금에 % 표시
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                y: {
                    grid: {
                        display: false // y축 그리드 숨김
                    },
                    ticks: {
                        font: {
                            size: 14,
                            weight: '600'
                        },
                        color: '#4a5568'
                    }
                }
            }
        }
    });
    
    // 애니메이션 시작 시간 기록
    digitalGapChart.animationStart = Date.now();
    
    // 애니메이션 효과를 위한 반복 실행 함수
    function animateValues() {
        digitalGapChart.update('none'); // 차트 갱신
        requestAnimationFrame(animateValues); // 다음 프레임 요청
    }
    animateValues(); // 애니메이션 시작
}); 