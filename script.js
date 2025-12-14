// ================================
// VALID USER CREDENTIALS (Demo)
// ================================
const VALID_USER = "RKGIT";
const VALID_PASS = "RKGIT123@";

// ================================
// DOM ELEMENTS
// ================================
const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");

const usernameError = document.getElementById("usernameError");
const passwordError = document.getElementById("passwordError");
const loginError = document.getElementById("loginError");
const rememberMe = document.getElementById("rememberMe");

// ================================
// LOAD REMEMBERED USER
// ================================
window.onload = () => {
    const rememberedUser = localStorage.getItem("rememberUser");
    if (rememberedUser) {
        usernameInput.value = rememberedUser;
        rememberMe.checked = true;
    }
};

// ================================
// FORM SUBMISSION HANDLER
// ================================
loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    usernameError.classList.remove("show");
    passwordError.classList.remove("show");
    loginError.classList.remove("show");

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
        if (username === VALID_USER && password === VALID_PASS) {
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("username", username);

            if (rememberMe.checked) {
                localStorage.setItem("rememberUser", username);
            } else {
                localStorage.removeItem("rememberUser");
            }

            window.location.href = "home.html";
        } else {
            loginError.classList.add("show");
            loginBtn.textContent = "Sign In";
            loginBtn.disabled = false;
        }
    }, 1200);
});

// ================================
// CLEAR ERRORS ON INPUT
// ================================
usernameInput.addEventListener("input", () => {
    usernameError.classList.remove("show");
    loginError.classList.remove("show");
});

passwordInput.addEventListener("input", () => {
    passwordError.classList.remove("show");
    loginError.classList.remove("show");
});

// ================================
// SHOW / HIDE PASSWORD
// ================================
function togglePassword() {
    passwordInput.type =
        passwordInput.type === "password" ? "text" : "password";
}
