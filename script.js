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
// FORM SUBMIT
// ================================
loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Reset errors
    usernameError.classList.remove("show");
    passwordError.classList.remove("show");
    loginError.classList.remove("show");

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

    try {
        const response = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            throw new Error("Invalid credentials");
        }

        const data = await response.json();

        // LOGIN SUCCESS
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", data.username);

        if (rememberMe.checked) {
            localStorage.setItem("rememberUser", username);
        } else {
            localStorage.removeItem("rememberUser");
        }

        window.location.href = "home.html";

    } catch (err) {
        loginError.classList.add("show");
        loginBtn.textContent = "Sign In";
        loginBtn.disabled = false;
    }
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
