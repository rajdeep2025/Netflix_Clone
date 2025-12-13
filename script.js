function login() {
    // Get values from input fields
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Simple validation (fake auth)
    if (username === "rajdeep" && password === "rinkibabu") {

        // Save login state in browser
        localStorage.setItem("loggedIn", "true");

        // Redirect to home page
        window.location.href = "home.html";

    } else {
        // Show error message
        document.getElementById("error").innerText =
            "Invalid username or password";
    }
}
