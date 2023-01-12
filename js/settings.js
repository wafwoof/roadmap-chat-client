window.addEventListener('DOMContentLoaded', (event) => {
    console.log('--BROWSER: DOM fully loaded and parsed.');
    
    // dropdown menu code
    // Menu button (later this will be a slideout menu like a burger style)
    var menuButton = document.getElementById("menu-button");
    var nav = document.querySelector("nav");
    menuButton.addEventListener("click", function() {
        nav.classList.toggle("navbar");
    });

    // define settings fields for referencing later
    const textColorSetting = document.getElementById("setting-text-color");
    textColorSetting.addEventListener("input", function() {
        var textColor = textColorSetting.value;
    }, false);

    const displayImageSetting = document.getElementById("setting-display-images");
    const saveButton = document.getElementById("save-button");
    const resetButton = document.getElementById("reset-button");


    function saveUserSettings() {
        alert("All settings saved to local storage.");
        console.log("saving settings...");
    
        localStorage.setItem("textColorSetting", textColorSetting.value);
        console.log("Text Color:", textColorSetting.value);

        localStorage.setItem("displayImageSetting", displayImageSetting.checked);
        console.log("Displaying Images is turned:", displayImageSetting.checked);
    }
    saveButton.addEventListener("click", saveUserSettings);

    function resetUserSettings() {
        alert("Are you sure? This will reset all settings to their defaults.");
        console.log("resetting settings...");

        localStorage.setItem("textColorSetting", "#000000");
        console.log("Text Color:", textColorSetting.value);

        localStorage.setItem("displayImageSetting", true);
        console.log("Displaying Images is turned:", displayImageSetting.checked);
    }  
    resetButton.addEventListener("click", resetUserSettings);
})



