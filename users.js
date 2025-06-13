// Function to format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Function to load and display users
function loadUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const tableBody = document.getElementById('usersTableBody');
    tableBody.innerHTML = '';

    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.fullName}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td class="signup-date">${formatDate(user.signupDate)}</td>
            <td class="actions">
                <button class="btn btn-delete" onclick="deleteUser('${user.id}')">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to delete user
function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users = users.filter(user => user.id !== userId);
        localStorage.setItem('users', JSON.stringify(users));
        loadUsers();
    }
}

// Function to handle search
document.getElementById('searchInput').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    const filteredUsers = users.filter(user => 
        user.fullName.toLowerCase().includes(searchTerm) ||
        user.username.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
    );

    const tableBody = document.getElementById('usersTableBody');
    tableBody.innerHTML = '';

    filteredUsers.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.fullName}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td class="signup-date">${formatDate(user.signupDate)}</td>
            <td class="actions">
                <button class="btn btn-delete" onclick="deleteUser('${user.id}')">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
});

// Load users when page loads
document.addEventListener('DOMContentLoaded', loadUsers);