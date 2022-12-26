function login() {
    console.log("Logging in...");

    var username = document.getElementById("login-username").value;
    
    // Write Name to Local Storage
    localStorage.setItem("username", username);

    console.log("logging in as:", username, "and redirecting...");

    window.location.href = "./chat.html";
}
