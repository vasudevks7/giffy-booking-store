// Array to store registered users
let users = JSON.parse(localStorage.getItem('users')) || [];

// Signup Form Submission
document.getElementById('signupForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;

    // Check if username is already taken
    if (users.some(user => user.username === username)) {
        alert('Username already taken. Please choose another one.');
        return;
    }

    // Add new user to the array
    users.push({ name, email, username, password });

    // Save users array to localStorage
    localStorage.setItem('users', JSON.stringify(users));

    alert('Sign up successful! Please login.');
    window.location.href = 'index.html';
});

// Login Form Submission
document.getElementById('loginForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    // Find the user in the array
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        alert('Login successful!');
        // Redirect to another page or perform other actions
    } else {
        alert('Invalid username or password.');
    }
});
