document.addEventListener('DOMContentLoaded', () => {
    // Chart Initialization
    const financialCtx = document.getElementById('financialChart').getContext('2d');
    const demographicCtx = document.getElementById('demographicChart').getContext('2d');

    // Financial Chart Configuration
    let financialChart = new Chart(financialCtx, {
        type: 'line',
        data: {
            labels: generateTimeLabels('30d'),
            datasets: [{
                label: 'Total Assets (₦)',
                data: generateFinancialData('30d'),
                borderColor: '#004d40',
                backgroundColor: 'rgba(0, 77, 64, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: financialChartOptions('Line Chart')
    });

    // Demographic Chart Configuration
    let demographicChart = new Chart(demographicCtx, {
        type: 'pie',
        data: {
            labels: ['18-30 Years', '31-45 Years', '46-60 Years', '60+ Years'],
            datasets: [{
                data: [35, 45, 15, 5],
                backgroundColor: [
                    '#004d40',
                    '#00796b',
                    '#009688',
                    '#b2dfdb'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'bottom' },
                tooltip: { enabled: true }
            }
        }
    });

    // Chart Type Switcher
    document.getElementById('chartType').addEventListener('change', function () {
        financialChart.destroy();
        financialChart = new Chart(financialCtx, {
            type: this.value,
            data: {
                labels: generateTimeLabels(document.getElementById('timeRange').value),
                datasets: [{
                    label: 'Total Assets (₦)',
                    data: generateFinancialData(document.getElementById('timeRange').value),
                    borderColor: '#004d40',
                    backgroundColor: this.value === 'pie' ? [
                        '#004d40', '#00796b', '#009688', '#b2dfdb'
                    ] : 'rgba(0, 77, 64, 0.1)',
                    tension: 0.4,
                    fill: this.value !== 'pie'
                }]
            },
            options: financialChartOptions(`${this.value.charAt(0).toUpperCase() + this.value.slice(1)} Chart`)
        });
    });

    // Time Range Filter
    document.getElementById('timeRange').addEventListener('change', function () {
        financialChart.data.labels = generateTimeLabels(this.value);
        financialChart.data.datasets[0].data = generateFinancialData(this.value);
        financialChart.update();
    });

    // Report Generation
    document.querySelector('.report-btn').addEventListener('click', () => {
        // In real implementation, this would trigger report generation logic
        console.log('Generating comprehensive report...');
        alert('Report generation started. You will be notified when ready.');
    });

    // Sample Data Population
    populateTransactionTable();
    populatePendingActions();

    // Helper Functions
    function financialChartOptions(title) {
        return {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top' },
                title: {
                    display: true,
                    text: title,
                    font: { size: 16 }
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return `₦${context.parsed.y.toLocaleString()}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function (value) {
                            return `₦${value.toLocaleString()}`;
                        }
                    }
                }
            }
        };
    }

    function generateTimeLabels(range) {
        const now = new Date();
        switch (range) {
            case '7d': return Array.from({ length: 7 }, (_, i) =>
                new Date(now - 86400000 * (6 - i)).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }));
            case '30d': return Array.from({ length: 4 }, (_, i) =>
                `Week ${i + 1}`);
            case '1y': return ['Q1', 'Q2', 'Q3', 'Q4'];
            default: return [];
        }
    }

    function generateFinancialData(range) {
        const baseValues = {
            '7d': () => Array.from({ length: 7 }, () => Math.random() * 5000000 + 10000000),
            '30d': () => Array.from({ length: 4 }, () => Math.random() * 15000000 + 30000000),
            '1y': () => Array.from({ length: 4 }, () => Math.random() * 50000000 + 100000000)
        };
        return baseValues[range] ? baseValues[range]().map(n => Math.round(n)) : [];
    }

    function populateTransactionTable() {
        const transactions = [
            { date: '2024-03-15', member: 'A. Bello', type: 'Loan Repayment', amount: 250000, status: 'Completed' },
            { date: '2024-03-14', member: 'C. Adekunle', type: 'Contribution', amount: 50000, status: 'Pending' },
            { date: '2024-03-13', member: 'D. Mohammed', type: 'Withdrawal', amount: 1500000, status: 'Completed' }
        ];

        const tbody = document.querySelector('.admin-table tbody');
        tbody.innerHTML = transactions.map(transaction => `
            <tr>
                <td>${transaction.date}</td>
                <td>${transaction.member}</td>
                <td>${transaction.type}</td>
                <td>₦${transaction.amount.toLocaleString()}</td>
                <td><span class="status-badge ${transaction.status.toLowerCase()}">${transaction.status}</span></td>
            </tr>
        `).join('');
    }

    function populatePendingActions() {
        const pendingActions = [
            { type: 'Loan Application', member: 'F. Mahmoud', amount: 5000000, days: 2 },
            { type: 'Withdrawal Request', member: 'A. Yusuf', amount: 1200000, days: 1 },
            { type: 'Account Update', member: 'B. Okon', days: 3 }
        ];

        const approvalList = document.querySelector('.approval-list');
        approvalList.innerHTML = pendingActions.map(action => `
            <div class="approval-item">
                <div class="action-info">
                    <h4>${action.type}</h4>
                    <p>Member: ${action.member}</p>
                    ${action.amount ? `<p>Amount: ₦${action.amount.toLocaleString()}</p>` : ''}
                </div>
                <div class="action-controls">
                    <span class="days-ago">${action.days}d ago</span>
                    <button class="approve-btn">Approve</button>
                    <button class="decline-btn">Decline</button>
                </div>
            </div>
        `).join('');
    }
});

// Add CSS for status badges if not already present
const style = document.createElement('style');
style.textContent = `
.status-badge {
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 0.8rem;
}
.status-badge.completed { background: #e8f5e9; color: #2e7d32; }
.status-badge.pending { background: #fff3e0; color: #ef6c00; }
.approval-item {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    border-bottom: 1px solid #eee;
}
.action-controls { display: flex; align-items: center; gap: 1rem; }
.days-ago { color: #666; font-size: 0.9rem; }
`;
document.head.appendChild(style);