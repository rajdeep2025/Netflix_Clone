// ==========================================
// SIMPLE HASH FUNCTION (DEMO ONLY)
// ==========================================
function hashPassword(password) {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
        hash = (hash << 5) - hash + password.charCodeAt(i);
        hash |= 0;
    }
    return hash.toString();
}

// ==========================================
// INITIAL USER SETUP (RUNS ONLY ONCE)
// ==========================================
if (!localStorage.getItem("users")) {
    const defaultUsers = [
        { username: "RKGIT", password: hashPassword("RKGIT123@") },
        { username: "rajdeep", password: hashPassword("rajdeep@123") },
        { username: "admin", password: hashPassword("admin123") }
    ];
    localStorage.setItem("users", JSON.stringify(defaultUsers));
}

// Load users
const USERS = JSON.parse(localStorage.getItem("users"));

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
// LOGIN ATTEMPTS
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
// LOGIN HANDLER
// ==========================================
loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Reset errors
    usernameError.classList.remove("show");
    passwordError.classList.remove("show");
    loginError.classList.remove("show");

    if (attempts >= MAX_ATTEMPTS) {
        loginError.textContent = "Too many failed attempts. Refresh page.";
        loginError.classList.add("show");
        return;
    }

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    if (username === "") {
        usernameError.classList.add("show");
        return;
    }

    if (password.length < 4) {
        passwordError.classList.add("show");
        return;
    }

    loginBtn.textContent = "Signing In...";
    loginBtn.disabled = true;

    setTimeout(() => {
        const hashed = hashPassword(password);

        const validUser = USERS.find(
            u => u.username === username && u.password === hashed
        );

        if (validUser) {
            // SUCCESS
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
            // FAIL
            attempts++;
            localStorage.setItem("loginAttempts", attempts.toString());

            loginError.textContent = "Invalid username or password";
            loginError.classList.add("show");

            loginBtn.textContent = "Sign In";
            loginBtn.disabled = false;
        }
    }, 1000);
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
