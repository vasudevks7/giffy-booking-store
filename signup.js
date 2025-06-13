// Function to handle form submission
document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    const userData = {
        id: Date.now().toString(),
        fullName: document.getElementById('signupName').value,
        email: document.getElementById('signupEmail').value,
        username: document.getElementById('signupUsername').value,
        password: document.getElementById('signupPassword').value,
        signupDate: new Date().toISOString()
    };

    // Get existing users or initialize empty array
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if username or email already exists
    if (users.some(user => user.username === userData.username)) {
        alert('Username already exists. Please choose another username.');
        return;
    }

    if (users.some(user => user.email === userData.email)) {
        alert('Email already registered. Please use another email.');
        return;
    }

    // Add new user
    users.push(userData);

    // Save to localStorage
    localStorage.setItem('users', JSON.stringify(users));

    // Clear form
    this.reset();

    // Show success message
    alert('Registration successful!');

    // Redirect to users listing page
    window.location.href = 'users.html';
});