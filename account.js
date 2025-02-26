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
});