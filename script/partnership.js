document.addEventListener('DOMContentLoaded', () => {
    const partnershipForm = document.getElementById('partnershipForm');
    const investmentAmount = document.getElementById('investmentAmount');
    const memberContribution = document.getElementById('memberContribution');
    const duration = document.getElementById('duration');
    const bcsContribution = document.getElementById('bcsContribution');
    const monthlyPayment = document.getElementById('monthlyPayment');
    const profitRatio = document.getElementById('profitRatio');

    // Calculate partnership details on input change
    [investmentAmount, memberContribution, duration].forEach(input => {
        input.addEventListener('input', calculatePartnership);
    });

    function calculatePartnership() {
        const amount = parseFloat(investmentAmount.value) || 0;
        const contribution = parseFloat(memberContribution.value) || 0;
        const months = parseFloat(duration.value) || 0;

        // Calculate BCS contribution
        const bcsAmount = amount * (1 - contribution / 100);
        bcsContribution.textContent = `₦${bcsAmount.toLocaleString()}`;

        // Calculate monthly payment (simplified)
        const monthly = (amount / months) * 1.1; // 10% markup
        monthlyPayment.textContent = `₦${monthly.toLocaleString()}`;

        // Calculate profit sharing ratio
        const memberRatio = contribution;
        const bcsRatio = 100 - contribution;
        profitRatio.textContent = `${memberRatio}:${bcsRatio}`;
    }

    partnershipForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validate form
        const businessPlan = document.getElementById('businessPlan').value;
        const businessType = document.getElementById('businessType').value;

        if (!businessPlan || !businessType) {
            alert('Please fill in all required fields');
            return;
        }

        // Show success message
        alert('Your partnership application has been submitted successfully! Our team will review your application and contact you soon.');

        // Reset form
        partnershipForm.reset();
        calculatePartnership();
    });

    // Initialize calculations
    calculatePartnership();
});