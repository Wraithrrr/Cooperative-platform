document.getElementById('signupForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const formElements = {
        firstName: document.getElementById('firstName'),
        lastName: document.getElementById('lastName'),
        email: document.getElementById('email'),
        phone: document.getElementById('phone'),
        password: document.getElementById('password'),
        confirmPassword: document.getElementById('confirmPassword'),
        contribution: document.getElementById('contribution')
    };

    // Validation checks
    let isValid = true;

    // Check empty fields
    Object.entries(formElements).forEach(([key, element]) => {
        if (!element.value.trim()) {
            element.parentElement.classList.add('error');
            isValid = false;
        } else {
            element.parentElement.classList.remove('error');
        }
    });

    // Password match check
    if (formElements.password.value !== formElements.confirmPassword.value) {
        alert('Passwords do not match');
        formElements.confirmPassword.parentElement.classList.add('error');
        isValid = false;
    }

    // Email validation
    if (!validateEmail(formElements.email.value)) {
        alert('Please enter a valid official email address');
        formElements.email.parentElement.classList.add('error');
        isValid = false;
    }

    // Contribution amount validation
    if (!formElements.contribution.value || isNaN(formElements.contribution.value) || formElements.contribution.value <= 0) {
        alert('Please enter a valid contribution amount in Naira');
        formElements.contribution.parentElement.classList.add('error');
        isValid = false;
    }

    if (isValid) {
        const userData = {
            firstName: formElements.firstName.value,
            lastName: formElements.lastName.value,
            email: formElements.email.value,
            phone: formElements.phone.value,
            password: formElements.password.value,
            contribution: formElements.contribution.value
        };

        console.log('Registration Data:', userData);
        alert('Account created successfully!\nYou will be redirected to the dashboard.');
        // window.location.href = '/dashboard';
    }
});

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
}

function checkPasswordStrength(password) {
    const strengthBar = document.querySelector('.registration-strength-bar');
    const strengthText = document.querySelector('.strength-text');
    let strength = 0;

    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[\W]/.test(password)) strength++;

    if (strength <= 2) {
        strengthBar.className = 'registration-strength-bar weak';
        strengthText.textContent = 'Weak';
    } else if (strength <= 4) {
        strengthBar.className = 'registration-strength-bar medium';
        strengthText.textContent = 'Medium';
    } else {
        strengthBar.className = 'registration-strength-bar strong';
        strengthText.textContent = 'Strong';
    }
}

document.getElementById('password').addEventListener('input', function () {
    checkPasswordStrength(this.value);
});

document.getElementById('relationship').addEventListener('change', function () {
    const otherRelationship = document.querySelector('.other-relationship');
    if (this.value === 'Other') {
        otherRelationship.classList.add('active');
    } else {
        otherRelationship.classList.remove('active');
    }
});

// In script.js, replace the success alert with:
window.location.href = 'Dashboard.html';