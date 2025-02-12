document.addEventListener('DOMContentLoaded', () => {
    // Example data for demonstration
    const cashApplications = [
        { employeeId: 'NITDA-001', name: 'John Doe', amount: '₦500,000', purpose: 'Medical', guarantor: 'Jane Smith', contact: '08012345678' },
        { employeeId: 'NITDA-002', name: 'Alice Johnson', amount: '₦300,000', purpose: 'Education', guarantor: 'Bob Brown', contact: '08087654321' }
    ];

    const facilityApplications = [
        { employeeId: 'NITDA-003', name: 'Michael Johnson', amount: '₦1,000,000', purpose: 'Business Expansion', guarantor: 'Sarah White', contact: '08023456789' }
    ];

    const leaseApplications = [
        { employeeId: 'NITDA-004', name: 'Emily Davis', amount: '₦750,000', purpose: 'Car Lease', guarantor: 'David Green', contact: '08034567890' }
    ];

    // Function to load applications into the table
    function loadApplications(applications, tableId) {
        const tableBody = document.querySelector(`#${tableId} tbody`);
        applications.forEach(application => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${application.employeeId}</td>
                <td>${application.name}</td>
                <td>${application.amount}</td>
                <td>${application.purpose}</td>
                <td>${application.guarantor}</td>
                <td>${application.contact}</td>
                <td>
                    <button class="approve-btn">Approve</button>
                    <button class="decline-btn">Decline</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        // Handle approve and decline actions
        tableBody.querySelectorAll('.approve-btn').forEach(button => {
            button.addEventListener('click', () => {
                alert('Application approved');
                button.closest('tr').remove();
            });
        });

        tableBody.querySelectorAll('.decline-btn').forEach(button => {
            button.addEventListener('click', () => {
                alert('Application declined');
                button.closest('tr').remove();
            });
        });
    }

    // Load applications into respective tables
    loadApplications(cashApplications, 'cashApplicationsTable');
    loadApplications(facilityApplications, 'facilityApplicationsTable');
    loadApplications(leaseApplications, 'leaseApplicationsTable');
});