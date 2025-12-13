// ==========================================
// SIMPLE HASH FUNCTION (DEMO PURPOSE ONLY)
// ==========================================
function hashPassword(password) {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
        hash = (hash << 5) - hash + password.charCodeAt(i);
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString();
}

// ==========================================
// USER DATABASE (LOCAL STORAGE BASED)
// ==========================================
const DEFAULT_USERS = [
    { username: "RKGIT", password: hashPassword("RKGIT123@") },
    { username: "rajdeep", password: hashPassword("rajdeep123@") },
    { username: "rahul", password: hashPassword("rahul123@") }
    { username: "prithvi", password: hashPassword("prithvi123@") }
];

// Load users from storage or init default
let USERS = JSON.parse(localStorage.getItem("users")) || DEFAULT_USERS;
localStorage.setItem("users", JSON.stringify(USERS));

// ==========================================
// DOM ELEMENTS
// ==========================================
const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");

const usernameError = document.getElementById("usernameError");
const passwordError = document.getElementById("passwordError");
const loginError = document.getElementById("loginError");
const rememberMe = document.getElementById("rememberMe");

// ==========================================
// LOGIN ATTEMPT LIMIT
// ==========================================
let attempts = Number(localStorage.getItem("loginAttempts")) || 0;
const MAX_ATTEMPTS = 3;

// ==========================================
// LOAD REMEMBERED USER
// ==========================================
window.onload = () => {
    const rememberedUser = localStorage.getItem("rememberUser");
    if (rememberedUser) {
        usernameInput.value = rememberedUser;
        rememberMe.checked = true;
    }
};

// ==========================================
// FORM SUBMISSION
// ==========================================
loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Reset errors
    usernameError.classList.remove("show");
    passwordError.classList.remove("show");
    loginError.classList.remove("show");

    if (attempts >= MAX_ATTEMPTS) {
        loginError.textContent = "Too many failed attempts. Try again later.";
        loginError.classList.add("show");
        return;
    }

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    let hasError = false;

    if (username === "") {
        usernameError.classList.add("show");
        hasError = true;
    }

    if (password.length < 4) {
        passwordError.classList.add("show");
        hasError = true;
    }

    if (hasError) return;

    loginBtn.textContent = "Signing In...";
    loginBtn.disabled = true;

    setTimeout(() => {
        const hashedPassword = hashPassword(password);

        const validUser = USERS.find(
            user => user.username === username && user.password === hashedPassword
        );

        if (validUser) {
            // Success
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("username", username);
            localStorage.setItem("loginAttempts", "0");

            if (rememberMe.checked) {
                localStorage.setItem("rememberUser", username);
            } else {
                localStorage.removeItem("rememberUser");
            }

            window.location.href = "home.html";
        } else {
            // Failure
            attempts++;
            localStorage.setItem("loginAttempts", attempts.toString());

            loginError.textContent =
                attempts >= MAX_ATTEMPTS
                    ? "Account temporarily locked."
                    : "Invalid username or password.";

            loginError.classList.add("show");
            loginBtn.textContent = "Sign In";
            loginBtn.disabled = false;
        }
    }, 1200);
});

// ==========================================
// CLEAR ERRORS ON INPUT
// ==========================================
usernameInput.addEventListener("input", () => {
    usernameError.classList.remove("show");
    loginError.classList.remove("show");
});

passwordInput.addEventListener("input", () => {
    passwordError.classList.remove("show");
    loginError.classList.remove("show");
});

// ==========================================
// SHOW / HIDE PASSWORD
// ==========================================
function togglePassword() {
    passwordInput.type =
        passwordInput.type === "password" ? "text" : "password";
}

// ==========================================
// SIGN UP (BASIC DEMO FUNCTION)
// ==========================================
function signUp() {
    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    if (username === "" || password.length < 4) {
        alert("Enter valid username and password");
        return;
    }

    const userExists = USERS.some(user => user.username === username);
    if (userExists) {
        alert("User already exists");
        return;
    }

    USERS.push({
        username: username,
        password: hashPassword(password)
    });

    localStorage.setItem("users", JSON.stringify(USERS));
    alert("Sign up successful. You can now log in.");
}
