document.addEventListener("DOMContentLoaded", function () {
    checkAuthentication();
});

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Simulate user data (for demonstration purposes)
    const users = { 'user1': 'password1', 'user2': 'password2' };

    if (username in users && users[username] === password) {
        // Successful login
        sessionStorage.setItem("username", username);
        checkAuthentication();
    } else {
        // Failed login
        document.getElementById("error-message").innerText = "Invalid login credentials. Please try again.";
    }
}

function signup() {
    const newUsername = document.getElementById("new-username").value;
    const newPassword = document.getElementById("new-password").value;

    // Simulate user data (for demonstration purposes)
    const users = { 'user1': 'password1', 'user2': 'password2' };

    if (newUsername && newPassword) {
        if (!(newUsername in users)) {
            // New user registration
            users[newUsername] = newPassword;
            sessionStorage.setItem("username", newUsername);
            checkAuthentication();
        } else {
            // Username already exists
            document.getElementById("signup-error-message").innerText = "Username already exists. Choose a different username.";
        }
    } else {
        // Invalid input
        document.getElementById("signup-error-message").innerText = "Please enter both username and password.";
    }
}

function logout() {
    sessionStorage.removeItem("username");
    checkAuthentication();
}

function checkAuthentication() {
    const username = sessionStorage.getItem("username");
    if (username) {
        // User is logged in
        document.getElementById("login-form").style.display = "none";
        document.getElementById("signup-form").style.display = "none";
        document.getElementById("secured-page").style.display = "block";
        document.getElementById("welcome-message").innerText = `Hello, ${username}!`;
    } else {
        // User is not logged in
        document.getElementById("login-form").style.display = "block";
        document.getElementById("signup-form").style.display = "none";
        document.getElementById("secured-page").style.display = "none";
        document.getElementById("error-message").innerText = "";
        document.getElementById("signup-error-message").innerText = "";
    }
}

function showLoginForm() {
    document.getElementById("login-form").style.display = "block";
    document.getElementById("signup-form").style.display = "none";
    document.getElementById("error-message").innerText = "";
    document.getElementById("signup-error-message").innerText = "";
}

function showSignupForm() {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("signup-form").style.display = "block";
    document.getElementById("error-message").innerText = "";
    document.getElementById("signup-error-message").innerText = "";
}
