// Function to load and display salons
function loadSalons() {
    const salons = JSON.parse(localStorage.getItem('salons')) || [];
    const tableBody = document.querySelector('tbody');
    tableBody.innerHTML = '';

    salons.forEach(salon => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${salon.salonName}</td>
            <td>${salon.salonType}</td>
            <td>${salon.ownerName}</td>
            <td>${salon.phoneNo}</td>
            <td>${salon.address}</td>
            <td><span class="status-badge status-${salon.status.toLowerCase()}">${salon.status}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-edit" onclick="editSalon('${salon.id}')">Edit</button>
                    <button class="btn btn-delete" onclick="deleteSalon('${salon.id}')">Delete</button>
                    <button class="btn btn-view" onclick="viewDetails('${salon.id}')">View</button>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to delete salon
function deleteSalon(id) {
    if (confirm('Are you sure you want to delete this salon?')) {
        let salons = JSON.parse(localStorage.getItem('salons')) || [];
        salons = salons.filter(salon => salon.id !== id);
        localStorage.setItem('salons', JSON.stringify(salons));
        loadSalons();
    }
}

// Function to view salon details
function viewDetails(id) {
    const salons = JSON.parse(localStorage.getItem('salons')) || [];
    const salon = salons.find(s => s.id === id);
    
    if (salon) {
        const detailsHTML = `
            <div class="details-modal">
                <h2>${salon.salonName}</h2>
                <p><strong>Type:</strong> ${salon.salonType}</p>
                <p><strong>Operating Days:</strong> ${salon.days.join(', ')}</p>
                <p><strong>Timings:</strong> ${salon.openTime} - ${salon.closeTime}</p>
                <p><strong>Services:</strong> ${salon.services}</p>
                <p><strong>Owner:</strong> ${salon.ownerName}</p>
                <p><strong>Contact:</strong> ${salon.phoneNo}</p>
                <p><strong>Email:</strong> ${salon.ownerEmail}</p>
                <p><strong>Address:</strong> ${salon.address}</p>
            </div>
        `;
        
        // Show in modal or alert for now
        alert(detailsHTML.replace(/<[^>]*>/g, '\n'));
    }
}

// Function to handle search
function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    const salons = JSON.parse(localStorage.getItem('salons')) || [];
    const filteredSalons = salons.filter(salon => 
        salon.salonName.toLowerCase().includes(searchTerm) ||
        salon.salonType.toLowerCase().includes(searchTerm) ||
        salon.address.toLowerCase().includes(searchTerm) ||
        salon.ownerName.toLowerCase().includes(searchTerm)
    );

    displayFilteredSalons(filteredSalons);
}

// Function to display filtered salons
function displayFilteredSalons(filteredSalons) {
    const tableBody = document.querySelector('tbody');
    tableBody.innerHTML = '';

    filteredSalons.forEach(salon => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${salon.salonName}</td>
            <td>${salon.salonType}</td>
            <td>${salon.ownerName}</td>
            <td>${salon.phoneNo}</td>
            <td>${salon.address}</td>
            <td><span class="status-badge status-${salon.status.toLowerCase()}">${salon.status}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-edit" onclick="editSalon('${salon.id}')">Edit</button>
                    <button class="btn btn-delete" onclick="deleteSalon('${salon.id}')">Delete</button>
                    <button class="btn btn-view" onclick="viewDetails('${salon.id}')">View</button>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Add event listeners when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadSalons();
    document.querySelector('.search-input').addEventListener('input', handleSearch);
});