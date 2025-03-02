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
        } else if (loanPurpose === 'partnership') {
            window.location.href = 'partnership.html';
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

    const notifications = [
        {
            header: 'New Credit Application',
            content: 'New credit application received',
            time: '10 minutes ago'
        },
        {
            header: 'Monthly Contribution',
            content: 'Monthly contribution added',
            time: '1 hour ago'
        },
        {
            header: 'Withdrawal Approved',
            content: 'Withdrawal request approved',
            time: '2 hours ago'
        }
    ];

    const notificationTray = document.getElementById('notificationTray');
    notifications.forEach(notification => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="notification-header">${notification.header}</div>
            <div class="notification-content">${notification.content}</div>
            <div class="notification-time">${notification.time}</div>
            <button class="mark-as-read-btn">Mark as Read</button>
        `;
        notificationTray.querySelector('ul').appendChild(li);
    });

    const notificationBell = document.getElementById('notificationBell');
    notificationBell.addEventListener('click', () => {
        notificationTray.style.display = notificationTray.style.display === 'none' || notificationTray.style.display === '' ? 'block' : 'none';
    });

    // Close the notification tray when clicking outside
    document.addEventListener('click', (event) => {
        if (!notificationBell.contains(event.target) && !notificationTray.contains(event.target)) {
            notificationTray.style.display = 'none';
        }
    });

    // Mark as read functionality
    notificationTray.addEventListener('click', (event) => {
        if (event.target.classList.contains('mark-as-read-btn')) {
            const notificationItem = event.target.closest('li');
            notificationItem.remove();
        }
    });

    // Add employee photo and contribution amount in fund management section
    const fundManagementSection = document.querySelector('.fund-management .finance-actions');
    // const employeePhoto = document.createElement('img');
    // employeePhoto.src = '../images/employee_photo.jpg'; // Replace with actual path to employee photo
    // employeePhoto.alt = 'Employee Photo';
    // employeePhoto.classList.add('employee-photo');
    // fundManagementSection.insertBefore(employeePhoto, fundManagementSection.firstChild);

    // Remove this code as we're now adding the contribution amount directly in HTML
    // const contributionAmount = document.createElement('div');
    // contributionAmount.classList.add('contribution-amount');
    // contributionAmount.textContent = 'Contribution Amount: ₦500,000'; // Replace with actual contribution amount
    // fundManagementSection.appendChild(contributionAmount);

    // Add mobile menu toggle functionality
    const addMobileMenuToggle = () => {
        const header = document.querySelector('.header');
        const menuToggle = document.createElement('div');
        menuToggle.classList.add('menu-toggle');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';

        // Only add on small screens
        if (window.innerWidth <= 576) {
            header.prepend(menuToggle);

            menuToggle.addEventListener('click', () => {
                const sidebar = document.querySelector('.sidebar');
                sidebar.classList.toggle('active');
            });
        }
    };

    // Call the function
    addMobileMenuToggle();

    // Update on resize
    window.addEventListener('resize', () => {
        const existingToggle = document.querySelector('.menu-toggle');
        if (existingToggle) {
            existingToggle.remove();
        }
        addMobileMenuToggle();
    });
});