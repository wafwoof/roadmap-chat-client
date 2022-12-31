window.addEventListener('DOMContentLoaded', (event) => {
  console.log('--BROWSER: DOM fully loaded and parsed.');
    
  // All Main Code After This Comment

  var chatboxInput = document.getElementById("chat-box-input");
  var chatboxSendButton = document.getElementById("chat-box-send-button");
  chatboxSendButton.addEventListener("click", clickHandler, false);

  // set username variable
  var username = localStorage.getItem("username");

  // For checking newest message
  var globalMessageNumber = 1;

  // GET NEWEST MESSAGE
  //
  async function getNewestMessage() {

    // Generate & Send Fetch GET
    try {
      var response = await fetch('http://139.177.195.118:8801/chat/log');
      var responseJSON = await response.json();
    }
    catch (error) {
      console.log("Kazei says: " + "\"Have you tried turning it off-and-on again?\"");
      return error;
    }

    // Bottom of the log file is newest message
    let index = responseJSON.messages.length - 1;
    //console.log(`--DEBUG: Message Index: ${index}`);

    // Generate & Render Client-side
    console.log("    --DEBUG: Message received, displaying message...");

    console.log(responseJSON.messages[index]);

    const messageTemplateHTML = `
      <div class="message">
        <p class="messageUsername">
          ${responseJSON.messages[index].username  + ":"}
        </p>
        <p class="messageContent">${responseJSON.messages[index].content}</p>
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
      var response = await fetch('http://139.177.195.118:8801/chat/log/numberof');
      var responseJSON = await response.json();
    }
    catch (error) {
      console.log("--ERROR: NUMBER OF MESSAGES NOT LOADING");
      return await error;
    }

    let currentMessageNumber = responseJSON.number;

    if (currentMessageNumber != globalMessageNumber) {
      console.log("--SERVER: " + currentMessageNumber + " messages.");
      console.log("--CLIENT: " + globalMessageNumber + " messages.");
      console.log("    --DEBUG: Fetching newest message...");
      getNewestMessage();

    }
    
    globalMessageNumber = currentMessageNumber;

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
      var response = await fetch('http://139.177.195.118:8801/chat/submit', settings);
      var responseJSON = await response.json();
      console.log(responseJSON);
    }
    catch (error) {
      return error;
    }
      
  }
  postMessage(username, "<b><i>has logged onto the server!</i></b>"); // Maybe this should be done server side?

  // Hookup Send Button
  //
  function clickHandler() {
    var message = chatboxInput.value; // defined near the top of this file
    chatboxInput.value = ""; // credit: rajan s.
    postMessage(username, message);
  }      

  // Create Event Listener on text box to trigger on pressing the [Enter] key
  window.addEventListener("keydown", (event) => {
    if (event.code === 'Enter') {
      clickHandler();
    }
  }, true);
  

  // GET NEWEST MESSAGE
  // check periodically if new message is available and if returns TRUE then run getNewestMessage()
  setInterval(function() {
      numberOfMessages();
  }, 1000);
  
})