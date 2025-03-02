document.addEventListener('DOMContentLoaded', () => {
    // Load sidebar
    fetch('sidebar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('sidebar-container').innerHTML = data;
        });

    // Handle personal information form submission
    const personalInfoForm = document.getElementById('personalInfoForm');
    personalInfoForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;

        const personalInfo = {
            fullName,
            email,
            phone
        };

        // Send the personal information to the server (or process it as needed)
        fetch('update_personal_info.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(personalInfo)
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Personal information updated successfully.');
                } else {
                    alert('Failed to update personal information.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while updating personal information.');
            });
    });

    // Handle bank information form submission
    const bankInfoForm = document.getElementById('bankInfoForm');
    bankInfoForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const accountNumber = document.getElementById('accountNumber').value;
        const bankName = document.getElementById('bankName').value;

        const bankInfo = {
            accountNumber,
            bankName
        };

        // Send the bank information to the server (or process it as needed)
        fetch('update_bank_info.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bankInfo)
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Bank information updated successfully.');
                } else {
                    alert('Failed to update bank information.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while updating bank information.');
            });
    });

    // Handle contribution form submission
    const contributionForm = document.getElementById('contributionForm');
    contributionForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const contributionAmount = document.getElementById('contributionAmount').value;

        const contributionInfo = {
            contributionAmount
        };

        // Send the contribution information to the server (or process it as needed)
        fetch('update_contribution.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contributionInfo)
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Contribution updated successfully.');
                } else {
                    alert('Failed to update contribution.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while updating contribution.');
            });
    });

    // Handle password reset form submission
    const passwordResetForm = document.getElementById('passwordResetForm');
    passwordResetForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (newPassword !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        const passwordInfo = {
            newPassword
        };

        // Send the password information to the server (or process it as needed)
        fetch('update_password.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(passwordInfo)
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Password updated successfully.');
                } else {
                    alert('Failed to update password.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while updating password.');
            });
    });
});