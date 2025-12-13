// Login credentials
const validCredentials = {
    username: "rajdeep",
    password: "rinkibabu"
};

// Get form elements
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const usernameError = document.getElementById('usernameError');
const passwordError = document.getElementById('passwordError');
const loginError = document.getElementById('loginError');

// Handle form submission
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Reset error messages
    usernameError.classList.remove('show');
    passwordError.classList.remove('show');
    loginError.classList.remove('show');
    
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    
    let hasError = false;
    
    // Validate username
    if (username === '') {
        usernameError.classList.add('show');
        hasError = true;
    }
    
    // Validate password length
    if (password.length < 4) {
        passwordError.classList.add('show');
        hasError = true;
    }
    
    // If validation passes, check credentials
    if (!hasError) {
        if (username === validCredentials.username && password === validCredentials.password) {
            // Successful login
            alert('Login successful! Redirecting to home page...');
            // Redirect to home page
            window.location.href = 'home.html';
        } else {
            // Invalid credentials
            loginError.classList.add('show');
        }
    }
});

// Clear error messages on input
usernameInput.addEventListener('input', function() {
    usernameError.classList.remove('show');
    loginError.classList.remove('show');
});

passwordInput.addEventListener('input', function() {
    passwordError.classList.remove('show');
    loginError.classList.remove('show');
});
