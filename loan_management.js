document.addEventListener('DOMContentLoaded', () => {
    // Get the agreement checkbox and apply button
    const agreementCheckbox = document.getElementById('agreementCheckbox');
    const creditTypeButtons = document.querySelectorAll('.credit-type-btn');
    const forms = ['facilityForm', 'leaseForm', 'cashForm'];

    // Handle credit type selection
    creditTypeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            if (!agreementCheckbox.checked) {
                alert('Please confirm that you have read and agree to the BCS Credit Policy Agreement Framework.');
                return;
            }

            const creditType = e.target.getAttribute('data-type');
            if (creditType === 'cash') {
                window.location.href = 'cash_loan.html';
            } else if (creditType === 'facility') {
                window.location.href = 'facility.html';
            } else if (creditType === 'lease') {
                window.location.href = 'lease.html';
            }
        });
    });

    // Handle form submissions for each credit type
    forms.forEach(formId => {
        const form = document.getElementById(formId);
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                // Get form values
                const fullName = document.getElementById('fullName').value;
                const email = document.getElementById('email').value;
                const phone = document.getElementById('phone').value;
                const amount = document.getElementById(`${formId.replace('Form', '')}Amount`).value;
                const purpose = document.getElementById(`${formId.replace('Form', '')}Purpose`).value;
                const guarantorName = document.getElementById('guarantorName').value;
                const guarantorContact = document.getElementById('guarantorContact').value;

                // Validate form
                if (fullName && email && phone && amount && purpose && guarantorName && guarantorContact) {
                    // Hide form and show submission status
                    form.style.display = 'none';
                    const submissionStatus = document.getElementById('submissionStatus');
                    submissionStatus.style.display = 'block';

                    // Show success message
                    submissionStatus.innerHTML = `
                        <h3>Application Submitted</h3>
                        <p>
                            Thank you, <strong>${fullName}</strong>! Your credit application has been received and is under review.
                            We will contact you soon with further details.
                        </p>
                        <div class="status-details">
                            <p><strong>Credit Type:</strong> ${formId.replace('Form', '')}</p>
                            <p><strong>Amount:</strong> ₦${amount}</p>
                            <p><strong>Purpose:</strong> ${purpose}</p>
                            <p><strong>Application Status:</strong> <span class="status-pending">Pending</span></p>
                        </div>
                    `;

                    // Store application data (you might want to send this to a server)
                    const applicationData = {
                        fullName,
                        email,
                        phone,
                        amount,
                        purpose,
                        guarantorName,
                        guarantorContact,
                        type: formId.replace('Form', ''),
                        status: 'pending',
                        timestamp: new Date().toISOString()
                    };

                    // Save to localStorage (temporary storage)
                    const applications = JSON.parse(localStorage.getItem('creditApplications') || '[]');
                    applications.push(applicationData);
                    localStorage.setItem('creditApplications', JSON.stringify(applications));

                    // Redirect to dashboard after 3 seconds
                    setTimeout(() => {
                        window.location.href = 'Dashboard.html';
                    }, 3000);
                } else {
                    alert('Please fill in all the required fields.');
                }
            });
        }
    });

    // Handle application cancellation
    const cancelButtons = document.querySelectorAll('.cancel-btn');
    cancelButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (confirm('Are you sure you want to cancel this application?')) {
                window.location.href = 'Dashboard.html';
            }
        });
    });

    // Handle cash form submission with additional fields
    const cashForm = document.getElementById('cashForm');
    if (cashForm) {
        cashForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Check if the agreement checkbox is ticked
            if (!agreementCheckbox.checked) {
                alert('Please confirm that you have read and agree to the BCS Credit Policy Agreement Framework.');
                return;
            }

            // Get form values
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const loanAmount = document.getElementById('loanAmount').value;
            const guarantorName = document.getElementById('guarantorName').value;
            const guarantorEmail = document.getElementById('guarantorEmail').value;
            const guarantorContact = document.getElementById('guarantorContact').value;
            const accountNumber = document.getElementById('accountNumber').value;
            const bankName = document.getElementById('bankName').value;

            // Validate form
            if (fullName && email && phone && loanAmount && guarantorName && guarantorEmail && guarantorContact && accountNumber && bankName) {
                // Hide form and show submission status
                cashForm.style.display = 'none';
                const submissionStatus = document.getElementById('submissionStatus');
                submissionStatus.style.display = 'block';

                // Show success message
                submissionStatus.innerHTML = `
                    <h3>Application Submitted</h3>
                    <p>
                        Thank you, <strong>${fullName}</strong>! Your cash credit application has been received and is under review.
                        We will contact you soon with further details.
                    </p>
                    <div class="status-details">
                        <p><strong>Credit Amount:</strong> ₦${loanAmount}</p>
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
                    loanAmount,
                    guarantorName,
                    guarantorEmail,
                    guarantorContact,
                    accountNumber,
                    bankName,
                    status: 'pending',
                    timestamp: new Date().toISOString()
                };

                // Save to localStorage (temporary storage)
                const applications = JSON.parse(localStorage.getItem('cashApplications') || '[]');
                applications.push(applicationData);
                localStorage.setItem('cashApplications', JSON.stringify(applications));

                // Redirect to dashboard after 3 seconds
                setTimeout(() => {
                    window.location.href = 'Dashboard.html';
                }, 3000);
            } else {
                alert('Please fill in all the required fields.');
            }
        });
    }
});
