document.getElementById('signupForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const formElements = {
        firstName: document.getElementById('firstName'),
        lastName: document.getElementById('lastName'),
        email: document.getElementById('email'),
        phone: document.getElementById('phone'),
        password: document.getElementById('password'),
        confirmPassword: document.getElementById('confirmPassword')
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

    if (isValid) {
        const userData = {
            firstName: formElements.firstName.value,
            lastName: formElements.lastName.value,
            email: formElements.email.value,
            phone: formElements.phone.value,
            password: formElements.password.value
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

// In script.js, replace the success alert with:
window.location.href = 'Dashboard.html';