// User Login Auth Check Script

if (localStorage.getItem("username") === null) {
    window.location.pathname = "./chat/login.html";
}
else {
    var username = localStorage.getItem("username")
    console.log("Logged in as: " + username);
}

