window.addEventListener('DOMContentLoaded', (event) => {
  console.log('--BROWSER: DOM fully loaded and parsed.');
    
  // All Main Code After This Comment

  var chatboxInput = document.getElementById("chat-box-input");
  var chatboxSendButton = document.getElementById("chat-box-send-button");
  const scrollSpacer = document.getElementById("scroll-spacer");
  chatboxSendButton.addEventListener("click", clickHandler, false);

  // Menu button (later this will be a slideout menu like a burger style)
  var menuButton = document.getElementById("menu-button");
  var nav = document.querySelector("nav");
  menuButton.addEventListener("click", function() {
    nav.classList.toggle("navbar");
  });

  // set username variable
  var username = localStorage.getItem("username");
  // For checking newest message
  var globalMessageNumber = 1;
  // Check Users Preferences on Loading Images
  var displayImages = localStorage.getItem("displayImageSetting");

  // Check for existence of serviceWorker
  var disableWorker = false;

  if ('serviceWorker' in navigator && disableWorker === true) {
    navigator.serviceWorker.register("./service-worker.js").then(registration => {
      console.log("--PWA: serviceWorker Registered");
      console.log(registration);
    }).catch(error => {
      console.log("--PWA: serviceWorker Registration Failed");
      console.log(error);
    });
  }

  //GET ALL MESSAGES
  //
  async function getAllMessages() {

    // Generate & Send Fetch GET
    try {
      var response = await fetch('https://rdmap.dev/chat/log');
      var responseJSON = await response.json();
    }
    catch (error) {
      console.log("--SERVER: Can not get messages.");
      return error;
    }

    // Loop Through Last i Messages
    for (let i = 15; i >= 1; i--) {
      // Bottom of the log file is newest message
      let index = (responseJSON.length - i);
      // Generate & Render Client-side

      var messageColor = localStorage.getItem("textColorSetting");
      console.log("custom message color:", messageColor);
      const messageTemplateHTML = `
        <div class="message">
          <p class="messageUsername" style="color:${messageColor}">
            ${responseJSON[index].username  + ":"}
          </p>
          <p class="messageContent" style="color:${messageColor}">${responseJSON[index].content}</p>
        </div>
      `;

      const messageContainer = document.getElementById("message-container");
      const newMessage = document.createElement("div");
      newMessage.innerHTML = messageTemplateHTML;
      messageContainer.appendChild(newMessage);

      // Scroll down to reveal the new message
      newMessage.scrollIntoView();
    }
    scrollSpacer.scrollIntoView(); // doesn't work every time
  }

  // GET NEWEST MESSAGE
  //
  async function getNewestMessage() {

    // Generate & Send Fetch GET
    try {
      var response = await fetch('https://rdmap.dev/chat/log');
      var responseJSON = await response.json();
    }
    catch (error) {
      console.log("--SERVER: Can not get messages.");
      return error;
    }

    // Bottom of the log file is newest message
    let index = responseJSON.length - 1;
    //console.log(`--DEBUG: Message Index: ${index}`);

    // Generate & Render Client-side
    console.log("    --DEBUG: Message received, displaying message...");
    console.log(responseJSON[index]);

    var messageColor = localStorage.getItem("textColorSetting");
    console.log("custom message color:", messageColor);
    const messageTemplateHTML = `
      <div class="message">
        <p class="messageUsername" style="color:${messageColor}">
          ${responseJSON[index].username  + ":"}
        </p>
        <p class="messageContent" style="color:${messageColor}">${responseJSON[index].content}</p>
      </div>
    `;

    const messageContainer = document.getElementById("message-container");
    const newMessage = document.createElement("div");
    newMessage.innerHTML = messageTemplateHTML;
    messageContainer.appendChild(newMessage);

    // Scroll down to reveal the new message
    newMessage.scrollIntoView();

    console.log("    --DEBUG: Finished displaying message!");
  }
  // GET numberOfMessages
  //
  async function numberOfMessages(){
    // Generate & Send Fetch GET
    try {
      var response = await fetch('https://rdmap.dev/chat/log/numberof');
      var responseJSON = await response.json();
    }
    catch (error) {
      console.log("--ERROR: NUMBER OF MESSAGES NOT LOADING");
      return await error;
    }

    let serverMessageNumber = responseJSON.number;
    
    if (serverMessageNumber != globalMessageNumber) {
      console.log("--SERVER: has " + serverMessageNumber + " messages.");
      console.log("--CLIENT: has " + globalMessageNumber + " messages.");
      console.log("    --DEBUG: Fetching newest message...");
      if (globalMessageNumber == 1) {
        console.log("    --CLIENT: First time, fetching all messages...");
        getAllMessages();
      }
      else {
        getNewestMessage();
      }
    }
    // update globalMessageNumber
    globalMessageNumber = serverMessageNumber;
  }
  // POST MESSAGE
  //
  async function postMessage(username, content){
    // settings for fetch post
    const settings = {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        content: content
      }),
    };

    // Generate & Send Fetch POST
    try {
      console.log("--CLIENT: Begin sending message...");
      var response = await fetch('https://rdmap.dev/chat/submit', settings);
      var responseJSON = await response.json();
      console.log(responseJSON); // server response code
    }
    catch (error) {
      return error;
    }
      
  }
  
  // POST IMAGE URL - MENU BUTTON
  //
  function postImageURL() {
    let url = prompt("Paste your image URL here:");
    let regexCheckURL = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;
    // Test for invalid image URL
    if (url != null && regexCheckURL.test(url) === true) {
      // Attach proper HTML syntax for img
      url = ("<img src=\"" + url + "\">");
      postMessage(username, url);
      console.log(url);
      console.log("VALID IMAGE URL SUBMITTED!");
    }
    else {
      alert("Invalid Image URL.")
    }
  }

  var postImageURLButton = document.getElementById("postImageURLButton");
  postImageURLButton.addEventListener("click", postImageURL, false);


  // Hookup Send Button
  //
  function clickHandler() {
    var message = chatboxInput.value; // defined near the top of this file
    chatboxInput.value = ""; // credit: rajan s.
    postMessage(username, message);
  }      

  // [Enter] Key Listner
  window.addEventListener("keydown", (event) => {
    if (event.code === 'Enter') {
      clickHandler();
    }
  }, true);
  

  // GET NEWEST MESSAGE
  // check periodically if new message is available and if returns TRUE then run getNewestMessage()
  // This is a really really bad bad way of doing this.
  // I will rewrite this soon I promise.
  setInterval(function() { numberOfMessages(); }, 1000);
  
})