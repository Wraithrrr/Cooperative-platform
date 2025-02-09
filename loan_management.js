document.addEventListener('DOMContentLoaded', () => {
    const loanForm = document.getElementById('loanForm');
    const submissionStatus = document.getElementById('submissionStatus');
  
    loanForm.addEventListener('submit', (e) => {
      e.preventDefault();
  
      // Retrieve the user's full name from the form to personalize the message
      const fullName = document.getElementById('fullName').value;
  
      // Hide the form and display the submission status area
      loanForm.style.display = 'none';
      submissionStatus.style.display = 'block';
  
      // Insert the status message into the submission status area
      submissionStatus.innerHTML = `
        <h3>Application Submitted</h3>
        <p>
          Thank you, <strong>${fullName}</strong>! Your loan application has been received and is under review.
          We will contact you soon with further details.
        </p>
      `;
    });
  });
  