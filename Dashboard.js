// Loan Application Form
document.getElementById('loanForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const loanAmount = document.getElementById('loanAmount').value;
    const loanPurpose = document.getElementById('loanPurpose').value;
    const repaymentPeriod = document.getElementById('repaymentPeriod').value;

    if (!loanAmount || !loanPurpose || !repaymentPeriod) {
        alert('Please fill all loan application fields');
        return;
    }

    const loanData = {
        amount: loanAmount,
        purpose: loanPurpose,
        period: repaymentPeriod
    };

    console.log('Loan Application:', loanData);
    alert('Loan application submitted successfully!');
    this.reset();
});

// Withdrawal Form Handling
document.getElementById('withdrawalForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const amount = parseFloat(document.getElementById('withdrawAmount').value);
    const account = document.getElementById('destinationAccount').value;
    const pin = document.getElementById('transactionPin').value;

    if (!amount || !account || !pin) {
        alert('Please fill all withdrawal details');
        return;
    }

    if (pin.length !== 4) {
        alert('PIN must be 4 digits');
        return;
    }

    // Show confirmation modal
    const modal = document.getElementById('confirmationModal');
    document.getElementById('confirmAmount').textContent = `₦${amount.toLocaleString()}`;
    document.getElementById('confirmAccount').textContent = account;
    document.getElementById('confirmTotal').textContent = `₦${(amount + 50).toLocaleString()}`;
    modal.style.display = 'block';
});

// Modal Handling
document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('confirmationModal').style.display = 'none';
});

window.onclick = function (event) {
    const modal = document.getElementById('confirmationModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

document.querySelector('.confirm-btn').addEventListener('click', function () {
    alert('Withdrawal processed successfully!');
    document.getElementById('confirmationModal').style.display = 'none';
    document.getElementById('withdrawalForm').reset();

    // Add to transaction history
    const transactionList = document.querySelector('.transaction-list');
    const newTransaction = document.createElement('li');
    newTransaction.textContent = `₦${document.getElementById('withdrawAmount').value} - Withdrawal - ${new Date().toLocaleDateString()}`;
    transactionList.prepend(newTransaction);
});
// Add transaction to history
function addTransaction(amount, type) {
    const transactionList = document.querySelector('.transaction-list ul');
    const newTransaction = document.createElement('li');
    const date = new Date().toLocaleDateString('en-GB', {
        day: 'numeric', month: 'short', year: 'numeric'
    });

    newTransaction.innerHTML = `
        <span class="transaction-amount">₦${parseFloat(amount).toLocaleString()}</span>
        <span class="transaction-type">${type}</span>
        <span class="transaction-date">${date}</span>
    `;

    transactionList.prepend(newTransaction);
}

// Update the confirmation button click handler
document.querySelector('.confirm-btn').addEventListener('click', function () {
    // ... existing code ...

    // Add to transaction history
    addTransaction(document.getElementById('withdrawAmount').value, 'Withdrawal');
});

// Load Sidebar Dynamically
fetch("sidebar.html")
    .then(response => response.text())
    .then(data => document.getElementById("sidebar-container").innerHTML = data);

const ctx = document.getElementById('dashboardChart').getContext('2d');
let chart;

function loadFinancialHistory() {
    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
            datasets: [{
                label: 'Credit Repayments (₦)',
                data: [50000, 60000, 45000, 70000, 65000, 80000, 90000, 75000, 85000, 95000],
                borderColor: 'blue',
                backgroundColor: 'rgba(0, 0, 255, 0.1)',
                borderWidth: 2,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

function loadCreditDistribution() {
    return new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ["Business", "Education", "Emergency", "Home Improvement"],
            datasets: [{
                data: [40, 30, 20, 10],
                backgroundColor: ["#FF5733", "#33FF57", "#5733FF", "#FF33A1"]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

function loadTotalContribution() {
    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["IT", "HR", "Finance", "Marketing"],
            datasets: [{
                label: 'Total Contribution (₦)',
                data: [200000, 150000, 300000, 250000],
                backgroundColor: ["#FF5733", "#33FF57", "#5733FF", "#FF33A1"],
                borderColor: ["#FF5733", "#33FF57", "#5733FF", "#FF33A1"],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

function updateChart() {
    if (chart) {
        chart.destroy();
    }
    const selectedGraph = document.getElementById("graphType").value;
    if (selectedGraph === "financialHistory") {
        chart = loadFinancialHistory();
    } else if (selectedGraph === "creditDistribution") {
        chart = loadCreditDistribution();
    } else {
        chart = loadTotalContribution();
    }
}

document.getElementById("graphType").addEventListener("change", updateChart);

window.onload = function () {
    chart = loadFinancialHistory();
};

// Toggle balance visibility
document.getElementById("toggleBalance").addEventListener("click", function () {
    const balanceAmount = document.getElementById("balanceAmount");
    if (balanceAmount.style.display === "none") {
        balanceAmount.style.display = "block";
        this.classList.remove("fa-eye-slash");
        this.classList.add("fa-eye");
    } else {
        balanceAmount.style.display = "none";
        this.classList.remove("fa-eye");
        this.classList.add("fa-eye-slash");
    }
});

// Handle withdrawal form submission
document.getElementById('withdrawalForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const withdrawAmount = document.getElementById('withdrawAmount').value;
    const maxWithdrawAmount = 1650000; // 60% of total balance
    if (withdrawAmount > maxWithdrawAmount) {
        alert('You can only request up to 60% of your total balance.');
        return;
    }
    document.getElementById('withdrawalStatus').style.display = 'block';
    setTimeout(() => {
        alert('Withdrawal request approved');
        document.getElementById('withdrawalStatus').style.display = 'none';
    }, 3000); // Simulate approval delay
});