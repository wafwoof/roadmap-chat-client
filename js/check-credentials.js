// User Login Auth Check Script

if (localStorage.getItem("username") === null) {
    window.location.pathname = "./login.html";
}

