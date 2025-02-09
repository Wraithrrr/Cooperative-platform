document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.querySelector('.login-form');
  loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      
      // Get input values
      const email = document.getElementById('loginEmail').value.trim();
      const password = document.getElementById('loginPassword').value.trim();

      // Check if either field is empty
      if (email === '' || password === '') {
          // Redirect immediately if any field is empty
          window.location.href = 'Dashboard.html';
          return;
      }

      // Existing login logic for non-empty fields
      fetch('/login-endpoint', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
      })
      .then(response => response.json())
      .then(data => {
          if (data.success) {
              window.location.href = 'Dashboard.html';
          } else {
              alert('Login failed: ' + data.message);
          }
      })
      .catch(error => {
          console.error('Error:', error);
          alert('An error occurred during login.');
      });
  });
});