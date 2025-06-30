// Chart.js를 사용한 가로 막대 차트
document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('digitalGapChart').getContext('2d');
    
    const digitalGapChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['일반 국민', '고령층', '장애인', '농어민', '저소득층'],
            datasets: [{
                data: [100, 71.4, 83.5, 80, 96.5],
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
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false,
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            animation: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.parsed.x + '%';
                        }
                    }
                }
            },
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
                            
                            ctx.fillText(data + '%', xPos, yPos);
                            ctx.globalAlpha = 1;
                        });
                    });
                }
            }],
            scales: {
                x: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                y: {
                    grid: {
                        display: false
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
    
    // 애니메이션 시작 시간 설정
    digitalGapChart.animationStart = Date.now();
    
    // 애니메이션 업데이트를 위한 반복 실행
    function animateValues() {
        digitalGapChart.update('none');
        requestAnimationFrame(animateValues);
    }
    animateValues();
}); 