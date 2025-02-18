document.addEventListener('DOMContentLoaded', () => {
    // Load sidebar
    fetch('sidebar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('sidebar-container').innerHTML = data;
        });

    // Initialize Chart.js
    const ctx = document.getElementById('dashboardChart').getContext('2d');
    let chart;

    const createChart = (type, data, options) => {
        if (chart) {
            chart.destroy();
        }
        chart = new Chart(ctx, {
            type: type,
            data: data,
            options: options
        });
    };

    const financialHistoryData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [{
            label: 'Financial History',
            data: [12000, 15000, 14000, 17000, 16000, 18000],
            backgroundColor: 'rgba(0, 77, 64, 0.2)',
            borderColor: 'rgba(0, 77, 64, 1)',
            borderWidth: 1
        }]
    };

    const creditDistributionData = {
        labels: ['Cash', 'Facility', 'Lease'],
        datasets: [{
            label: 'Credit Distribution',
            data: [50, 30, 20],
            backgroundColor: ['rgba(0, 77, 64, 0.6)', 'rgba(0, 150, 136, 0.6)', 'rgba(0, 188, 212, 0.6)'],
            borderColor: ['rgba(0, 77, 64, 1)', 'rgba(0, 150, 136, 1)', 'rgba(0, 188, 212, 1)'],
            borderWidth: 1
        }]
    };

    const totalContributionData = {
        labels: ['Savings', 'Investment', 'Contribution'],
        datasets: [{
            label: 'Total Contribution',
            data: [60, 40, 30],
            backgroundColor: ['rgba(0, 77, 64, 0.6)', 'rgba(0, 150, 136, 0.6)', 'rgba(0, 188, 212, 0.6)'],
            borderColor: ['rgba(0, 77, 64, 1)', 'rgba(0, 150, 136, 1)', 'rgba(0, 188, 212, 1)'],
            borderWidth: 1
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    const graphTypeSelect = document.getElementById('graphType');
    graphTypeSelect.addEventListener('change', (e) => {
        const selectedGraph = e.target.value;
        if (selectedGraph === 'financialHistory') {
            createChart('line', financialHistoryData, options);
        } else if (selectedGraph === 'creditDistribution') {
            createChart('pie', creditDistributionData, options);
        } else if (selectedGraph === 'totalContribution') {
            createChart('doughnut', totalContributionData, options);
        }
    });

    // Initialize with the default graph
    createChart('line', financialHistoryData, options);

    // Handle withdrawal form submission
    const withdrawalForm = document.getElementById('withdrawalForm');
    withdrawalForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const withdrawAmount = document.getElementById('withdrawAmount').value;
        const destinationAccount = document.getElementById('destinationAccount').value;
        const transactionPin = document.getElementById('transactionPin').value;

        const withdrawalRequest = {
            withdrawAmount,
            destinationAccount,
            transactionPin
        };

        // Show the status bar
        const withdrawalStatus = document.getElementById('withdrawalStatus');
        withdrawalStatus.style.display = 'block';
        withdrawalStatus.innerHTML = '<p>Processing your withdrawal request...</p>';

        // Send the withdrawal request to the server (or process it as needed)
        fetch('fund_management.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(withdrawalRequest)
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    withdrawalStatus.innerHTML = '<p>Withdrawal request processed successfully.</p>';
                } else {
                    withdrawalStatus.innerHTML = '<p>Failed to process withdrawal request.</p>';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                withdrawalStatus.innerHTML = '<p>An error occurred while processing the withdrawal request.</p>';
            });
    });

    // Handle loan form submission
    const loanForm = document.getElementById('loanForm');
    loanForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const loanPurpose = document.getElementById('loanPurpose').value;

        if (loanPurpose === 'cash') {
            window.location.href = 'cash_loan.html';
        } else if (loanPurpose === 'facility') {
            window.location.href = 'facility.html';
        } else if (loanPurpose === 'lease') {
            window.location.href = 'lease.html';
        }
    });

    // Download CSV functionality
    window.downloadCSV = function () {
        const rows = document.querySelectorAll('#financial-summary-body tr');
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "Date,Time,Amount,Type,Purpose\n";

        rows.forEach(row => {
            const cols = row.querySelectorAll('td');
            const rowData = Array.from(cols).map(col => col.innerText).join(",");
            csvContent += rowData + "\n";
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "account_history.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
});