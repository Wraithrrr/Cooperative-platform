document.addEventListener('DOMContentLoaded', () => {
    const transactions = [
        { date: '2025-01-15', time: '10:30 AM', amount: '₦5000', type: 'Added', purpose: 'Monthly Contribution' },
        { date: '2025-01-20', time: '02:45 PM', amount: '₦2000', type: 'Removed', purpose: 'Credit Repayment' },
        { date: '2025-02-15', time: '09:15 AM', amount: '₦5000', type: 'Added', purpose: 'Monthly Contribution' },
        { date: '2025-02-28', time: '11:30 AM', amount: '₦15000', type: 'Removed', purpose: 'Withdrawal' },
        { date: '2025-03-15', time: '10:45 AM', amount: '₦5000', type: 'Added', purpose: 'Monthly Contribution' },
        // 10 additional transactions
        { date: '2025-03-22', time: '01:15 PM', amount: '₦3500', type: 'Removed', purpose: 'Credit Repayment' },
        { date: '2025-04-15', time: '09:30 AM', amount: '₦5000', type: 'Added', purpose: 'Monthly Contribution' },
        { date: '2025-04-28', time: '03:45 PM', amount: '₦8000', type: 'Removed', purpose: 'Withdrawal' },
        { date: '2025-05-15', time: '11:00 AM', amount: '₦5000', type: 'Added', purpose: 'Monthly Contribution' },
        { date: '2025-05-23', time: '02:30 PM', amount: '₦2500', type: 'Removed', purpose: 'Credit Repayment' },
        { date: '2025-06-15', time: '10:15 AM', amount: '₦5000', type: 'Added', purpose: 'Monthly Contribution' },
        { date: '2025-06-30', time: '04:00 PM', amount: '₦12000', type: 'Removed', purpose: 'Withdrawal' },
        { date: '2025-07-15', time: '09:45 AM', amount: '₦5000', type: 'Added', purpose: 'Monthly Contribution' },
        { date: '2025-08-15', time: '11:20 AM', amount: '₦5000', type: 'Added', purpose: 'Monthly Contribution' },
        { date: '2025-09-15', time: '10:05 AM', amount: '₦5000', type: 'Added', purpose: 'Monthly Contribution' }
    ];

    const transactionTableBody = document.querySelector('#transactionTable tbody');
    const filterButton = document.getElementById('filterButton');
    const typeFilter = document.getElementById('typeFilter');
    
    // Initial display of all transactions
    displayTransactions(transactions);

    // Filter transactions based on date range and type
    filterButton.addEventListener('click', () => {
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        const selectedType = typeFilter.value;
        
        let filteredTransactions = transactions;
        
        // Filter by date range if dates are provided
        if (startDate && endDate) {
            filteredTransactions = filteredTransactions.filter(transaction => {
                const transactionDate = new Date(transaction.date);
                if (selectedType === 'credit') return transaction.purpose === 'Credit Repayment';
                return true;
            });
        }
        
        displayTransactions(filteredTransactions);
    });
    
    // Function to display transactions in the table
    function displayTransactions(transactionsToDisplay) {
        // Clear existing table rows
        transactionTableBody.innerHTML = '';
        
        if (transactionsToDisplay.length === 0) {
            const emptyRow = document.createElement('tr');
            emptyRow.innerHTML = '<td colspan="5">No transactions found</td>';
            transactionTableBody.appendChild(emptyRow);
            return;
        }
        
        transactionsToDisplay.forEach(transaction => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${transaction.date}</td>
                <td>${transaction.time}</td>
                <td>${transaction.amount}</td>
                <td>${transaction.type}</td>
                <td>${transaction.purpose}</td>
            `;
            transactionTableBody.appendChild(row);
        });
    }
});
