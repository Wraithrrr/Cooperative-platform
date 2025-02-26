document.addEventListener('DOMContentLoaded', () => {
    // Example data for cash applications
    const cashApplications = [
        {
            employeeId: 'EMP001',
            name: 'John Doe',
            amount: '₦500,000',
            duration: '10 months',
            guarantor: 'EMP002'
        },
        {
            employeeId: 'EMP003',
            name: 'Jane Smith',
            amount: '₦300,000',
            duration: '8 months',
            guarantor: 'EMP004'
        }
    ];

    const cashTableBody = document.querySelector('#cashApplicationsTable tbody');

    cashApplications.forEach(application => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${application.employeeId}</td>
            <td>${application.name}</td>
            <td>${application.amount}</td>
            <td>${application.duration}</td>
            <td>${application.guarantor}</td>
            <td>
                <button class="approve-btn">Approve</button>
                <button class="decline-btn">Decline</button>
            </td>
        `;

        cashTableBody.appendChild(row);
    });

    // Example data for facility applications
    const facilityApplications = [
        {
            employeeId: 'EMP005',
            name: 'Alice Johnson',
            amount: '₦1,000,000',
            purpose: 'Office Renovation',
            duration: '10 months',
            guarantor: 'EMP006'
        },
        {
            employeeId: 'EMP007',
            name: 'Bob Brown',
            amount: '₦750,000',
            purpose: 'New Equipment',
            duration: '9 months',
            guarantor: 'EMP008'
        }
    ];

    const facilityTableBody = document.querySelector('#facilityApplicationsTable tbody');

    facilityApplications.forEach(application => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${application.employeeId}</td>
            <td>${application.name}</td>
            <td>${application.amount}</td>
            <td>${application.purpose}</td>
            <td>${application.duration}</td>
            <td>${application.guarantor}</td>
            <td>
                <button class="approve-btn">Approve</button>
                <button class="decline-btn">Decline</button>
            </td>
        `;

        facilityTableBody.appendChild(row);
    });

    // Example data for lease applications
    const leaseApplications = [
        {
            employeeId: 'EMP009',
            name: 'Charlie Davis',
            amount: '₦2,000,000',
            purpose: 'Vehicle Lease',
            duration: '10 months',
            guarantor: 'EMP010'
        },
        {
            employeeId: 'EMP011',
            name: 'Diana Evans',
            amount: '₦1,500,000',
            purpose: 'Equipment Lease',
            duration: '7 months',
            guarantor: 'EMP012'
        }
    ];

    const leaseTableBody = document.querySelector('#leaseApplicationsTable tbody');

    leaseApplications.forEach(application => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${application.employeeId}</td>
            <td>${application.name}</td>
            <td>${application.amount}</td>
            <td>${application.purpose}</td>
            <td>${application.duration}</td>
            <td>${application.guarantor}</td>
            <td>
                <button class="approve-btn">Approve</button>
                <button class="decline-btn">Decline</button>
            </td>
        `;

        leaseTableBody.appendChild(row);
    });

    // Example data for partnership applications
    const partnershipApplications = [
        {
            employeeId: 'EMP013',
            name: 'Eve Foster',
            amount: '₦500,000',
            businessType: 'Retail Business',
            contribution: '50%',
            duration: '12 months'
        },
        {
            employeeId: 'EMP014',
            name: 'Frank Green',
            amount: '₦1,000,000',
            businessType: 'Property Investment',
            contribution: '40%',
            duration: '24 months'
        }
    ];

    const partnershipTableBody = document.querySelector('#partnershipApplicationsTable tbody');

    partnershipApplications.forEach(application => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${application.employeeId}</td>
            <td>${application.name}</td>
            <td>${application.amount}</td>
            <td>${application.businessType}</td>
            <td>${application.contribution}</td>
            <td>${application.duration}</td>
            <td>
                <button class="approve-btn">Approve</button>
                <button class="decline-btn">Decline</button>
            </td>
        `;

        partnershipTableBody.appendChild(row);
    });

    // Handle approve/decline actions
    document.querySelectorAll('tbody').forEach(tbody => {
        tbody.addEventListener('click', (e) => {
            if (e.target.classList.contains('approve-btn')) {
                const row = e.target.closest('tr');
                row.style.backgroundColor = '#e8f5e9'; // Green background for approved
                alert('Application approved.');
            } else if (e.target.classList.contains('decline-btn')) {
                const row = e.target.closest('tr');
                row.style.backgroundColor = '#ffebee'; // Red background for declined
                alert('Application declined.');
            }
        });
    });
});