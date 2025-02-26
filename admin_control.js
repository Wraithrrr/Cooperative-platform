document.addEventListener('DOMContentLoaded', () => {
    const employees = generateRandomEmployees(40);
    const tableBody = document.querySelector('.employee-table tbody');
    const searchInput = document.getElementById('searchInput');
    const filterByName = document.getElementById('filterByName');
    const filterById = document.getElementById('filterById');
    const filterByDepartment = document.getElementById('filterByDepartment');

    function generateRandomEmployees(count) {
        const departments = ['Finance', 'HR', 'IT', 'Marketing', 'Sales'];
        const names = ['John Doe', 'Jane Smith', 'Alice Johnson', 'Robert Brown', 'Michael Davis'];
        const employees = [];

        for (let i = 0; i < count; i++) {
            const id = `EMP${String(i + 1).padStart(4, '0')}`;
            const name = names[Math.floor(Math.random() * names.length)];
            const department = departments[Math.floor(Math.random() * departments.length)];
            const contribution = Math.floor(Math.random() * 100000) + 1000;
            employees.push({ id, name, department, contribution });
        }

        return employees;
    }

    function populateTable(employees) {
        tableBody.innerHTML = employees.map(employee => `
            <tr>
                <td>${employee.id}</td>
                <td>${employee.name}</td>
                <td>${employee.department}</td>
                <td>₦${employee.contribution.toLocaleString()}</td>
                <td class="actions">
                    <button class="edit-btn" onclick="editEmployee('${employee.id}')"><i class="fas fa-edit"></i> Edit</button>
                    <button class="delete-btn" onclick="deleteEmployee('${employee.id}')"><i class="fas fa-trash"></i> Delete</button>
                </td>
            </tr>
        `).join('');
    }

    function filterEmployees() {
        const query = searchInput.value.toLowerCase();
        const filteredEmployees = employees.filter(employee => {
            const matchesName = filterByName.checked && employee.name.toLowerCase().includes(query);
            const matchesId = filterById.checked && employee.id.toLowerCase().includes(query);
            const matchesDepartment = filterByDepartment.checked && employee.department.toLowerCase().includes(query);
            return matchesName || matchesId || matchesDepartment;
        });
        populateTable(filteredEmployees);
    }

    searchInput.addEventListener('input', filterEmployees);
    filterByName.addEventListener('change', filterEmployees);
    filterById.addEventListener('change', filterEmployees);
    filterByDepartment.addEventListener('change', filterEmployees);

    document.querySelector('.add-employee-btn').addEventListener('click', () => {
        window.location.href = 'add_employee.html';
    });

    window.editEmployee = function (id) {
        // Navigate to edit employee page with the employee ID
        window.location.href = `edit_employee.html?id=${id}`;
    };

    window.deleteEmployee = function (id) {
        if (confirm('Are you sure you want to delete this employee?')) {
            const index = employees.findIndex(employee => employee.id === id);
            if (index !== -1) {
                employees.splice(index, 1);
                filterEmployees();
            }
        }
    };

    populateTable(employees);
});
