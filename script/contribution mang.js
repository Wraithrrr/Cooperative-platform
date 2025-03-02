document.getElementById('contributionForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const employeeId = event.target[0].value;
    const contributionAmount = event.target[1].value;
  
    // Logic to add the contribution amount to the employee's record
    // This could involve updating the table or sending the data to a server
  
    alert(`Contribution of ₦${contributionAmount} added for Employee ID: ${employeeId}`);
    
    // Clear the form
    event.target.reset();
  });