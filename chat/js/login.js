function login() {
    console.log("Logging in...");

    var username = document.getElementById("login-username").value;
    if (username == "") {
        alert("Please enter a username.");
        return;
    }
    else if (username.length > 20) {
        alert("Username must be no larger than 20 characters.");
        return;
    }
    else {
        // success! login
        // Write Name to Local Storage
        localStorage.setItem("username", username);

        console.log("logging in as:", username, "and redirecting...");

        window.location.href = "./chat.html";
    }
    
    
}
