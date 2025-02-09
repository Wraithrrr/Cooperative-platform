// Profile Photo Preview
document.getElementById('profilePhoto').addEventListener('change', function (e) {
    const reader = new FileReader();
    reader.onload = function () {
      document.getElementById('profilePreview').src = reader.result;
    };
    reader.readAsDataURL(e.target.files[0]);
  });
  
  // Form Submission and Validation
  document.getElementById('employeeForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    // Example: You can add additional validation logic here
    const formData = new FormData(this);
    
    // Simulate form submission delay
    setTimeout(() => {
      alert('Employee registered successfully!');
      this.reset();
      document.getElementById('profilePreview').src = '#';
    }, 1000);
  });
  
  // Real-time Input Validation
  document.querySelectorAll('input, select').forEach(element => {
    element.addEventListener('input', () => {
      if (element.checkValidity()) {
        element.style.borderColor = '#97bc62';
      } else {
        element.style.borderColor = '#ff4444';
      }
    });
  });
  