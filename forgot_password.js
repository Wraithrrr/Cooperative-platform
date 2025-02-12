document.getElementById('sendOtpBtn').addEventListener('click', function() {
    const phoneNumber = document.getElementById('phoneNumber').value;
    if (phoneNumber) {
        // Simulate sending OTP
        alert('OTP sent to ' + phoneNumber);
        document.getElementById('forgotPasswordForm').style.display = 'none';
        document.getElementById('otpForm').style.display = 'block';
    } else {
        alert('Please enter your phone number');
    }
});

document.getElementById('verifyOtpBtn').addEventListener('click', function() {
    const otp = document.getElementById('otp').value;
    if (otp) {
        // Simulate OTP verification
        alert('OTP verified');
        document.getElementById('otpForm').style.display = 'none';
        document.getElementById('newPasswordForm').style.display = 'block';
    } else {
        alert('Please enter the OTP');
    }
});

document.getElementById('newPasswordForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    if (newPassword && confirmPassword) {
        if (newPassword === confirmPassword) {
            // Simulate password reset
            alert('Password reset successfully');
            // Redirect to login page or another appropriate action
        } else {
            alert('Passwords do not match');
        }
    } else {
        alert('Please fill in all fields');
    }
});