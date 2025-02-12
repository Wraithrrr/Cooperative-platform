document.getElementById('resetPasswordForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    if (newPassword && confirmPassword) {
        if (newPassword === confirmPassword) {
            // Simulate password reset
            alert('Password reset successfully');
            // Redirect to login page
            window.location.href = 'login_page.html';
        } else {
            alert('Passwords do not match');
        }
    } else {
        alert('Please fill in all fields');
    }
});