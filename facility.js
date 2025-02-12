document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('facilityForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Check if the agreement checkbox is ticked
        const agreementCheckbox = document.getElementById('agreementCheckbox');
        if (!agreementCheckbox.checked) {
            alert('Please confirm that you have read and agree to the BCS Credit Policy Agreement Framework.');
            return;
        }

        // Get form values
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const facilityAmount = document.getElementById('facilityAmount').value;
        const guarantorName = document.getElementById('guarantorName').value;
        const guarantorEmail = document.getElementById('guarantorEmail').value;
        const guarantorContact = document.getElementById('guarantorContact').value;
        const accountNumber = document.getElementById('accountNumber').value;
        const bankName = document.getElementById('bankName').value;
        const invoiceUpload = document.getElementById('invoiceUpload').files[0];

        // Validate form
        if (fullName && email && phone && facilityAmount && guarantorName && guarantorEmail && guarantorContact && accountNumber && bankName && invoiceUpload) {
            // Hide form and show submission status
            form.style.display = 'none';
            const submissionStatus = document.getElementById('submissionStatus');
            submissionStatus.style.display = 'block';

            // Show success message
            submissionStatus.innerHTML = `
                <h3>Application Submitted</h3>
                <p>
                    Thank you, <strong>${fullName}</strong>! Your facility credit application has been received and is under review.
                    We will contact you soon with further details.
                </p>
                <div class="status-details">
                    <p><strong>Facility Amount:</strong> ₦${facilityAmount}</p>
                    <p><strong>Guarantor:</strong> ${guarantorName} (${guarantorEmail}, ${guarantorContact})</p>
                    <p><strong>Account:</strong> ${accountNumber} (${bankName})</p>
                    <p><strong>Application Status:</strong> <span class="status-pending">Pending</span></p>
                </div>
            `;

            // Store application data (you might want to send this to a server)
            const applicationData = {
                fullName,
                email,
                phone,
                facilityAmount,
                guarantorName,
                guarantorEmail,
                guarantorContact,
                accountNumber,
                bankName,
                invoiceUpload: invoiceUpload.name,
                status: 'pending',
                timestamp: new Date().toISOString()
            };

            // Save to localStorage (temporary storage)
            const applications = JSON.parse(localStorage.getItem('facilityApplications') || '[]');
            applications.push(applicationData);
            localStorage.setItem('facilityApplications', JSON.stringify(applications));

            // Redirect to dashboard after 3 seconds
            setTimeout(() => {
                window.location.href = 'Dashboard.html';
            }, 3000);
        } else {
            alert('Please fill in all the required fields.');
        }
    });
});