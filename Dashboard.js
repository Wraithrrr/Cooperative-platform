// Loan Application Form
document.getElementById('loanForm').addEventListener('submit', function(e) {
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
document.getElementById('withdrawalForm').addEventListener('submit', function(e) {
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

window.onclick = function(event) {
    const modal = document.getElementById('confirmationModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

document.querySelector('.confirm-btn').addEventListener('click', function() {
    alert('Withdrawal processed successfully!');
    document.getElementById('confirmationModal').style.display = 'none';
    document.getElementById('withdrawalForm').reset();
    
    // Add to transaction history
    const transactionList = document.querySelector('.transaction-list');
    const newTransaction = document.createElement('li');
    newTransaction.textContent = `₦${document.getElementById('withdrawAmount').value} - Withdrawal - ${new Date().toLocaleDateString()}`;
    transactionList.prepend(newTransaction);
});