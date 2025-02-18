document.addEventListener('DOMContentLoaded', () => {
    const totalMoneyElement = document.getElementById('totalMoney');
    const withdrawAmountElement = document.getElementById('withdrawAmount');
    const withdrawalForm = document.getElementById('withdrawalForm');
    const withdrawalStatus = document.getElementById('withdrawalStatus');
    const statusIcon = document.getElementById('statusIcon');
    const statusMessage = document.getElementById('statusMessage');

    let totalMoney = 2750000; // Initial total money in kobo

    withdrawAmountElement.addEventListener('input', () => {
        const withdrawAmount = parseInt(withdrawAmountElement.value) || 0;
        const adminFee = withdrawAmount * 0.02;
        const newTotal = totalMoney - withdrawAmount - adminFee;
        totalMoneyElement.textContent = `₦${(newTotal / 100).toLocaleString()}`;
    });

    withdrawalForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const withdrawAmount = parseInt(withdrawAmountElement.value) || 0;

        if (withdrawAmount > 0 && withdrawAmount <= totalMoney) {
            // Simulate withdrawal processing
            withdrawalStatus.style.display = 'flex';
            statusIcon.className = 'fas fa-info-circle status-pending';
            statusMessage.textContent = 'Withdrawal request is being processed...';

            setTimeout(() => {
                // Simulate approval
                statusIcon.className = 'fas fa-check-circle status-approved';
                statusMessage.textContent = 'Withdrawal approved. Amount will be credited shortly.';
                totalMoney -= withdrawAmount + (withdrawAmount * 0.02);
                totalMoneyElement.textContent = `₦${(totalMoney / 100).toLocaleString()}`;
            }, 3000);
        } else {
            // Show error message
            statusIcon.className = 'fas fa-times-circle status-declined';
            statusMessage.textContent = 'Invalid withdrawal amount. Please try again.';
            withdrawalStatus.style.display = 'flex';
        }
    });
});