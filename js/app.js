window.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed.');
    
  // All Main Code After This Comment

  var chatboxInput = document.getElementById("chat-box-input");
  var chatboxSendButton = document.getElementById("chat-box-send-button");
  chatboxSendButton.addEventListener("click", clickHandler, false);

  // !hard-coded username string
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
    //let index = 5;

    // Generate & Render Client-side
    console.log("--Generating New Message!");

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

    console.log("--Finished Generating New Message!");
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

    //console.log("--DEBUG: number of messages: " + responseJSON.number)

    let currentMessageNumber = responseJSON.number;

    if (currentMessageNumber != globalMessageNumber) {
      console.log(currentMessageNumber);
      console.log(globalMessageNumber);
      console.log("not the same, fetching new message...");
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
    console.log(settings.body)
    // Generate & Send Fetch POST
    try {
      var response = await fetch('http://139.177.195.118:8801/chat/submit', settings);
      var responseJSON = await response.json();
      console.log(responseJSON);
    }
    catch (error) {
      return error;
    }
      
    // FOR THE FUTURE: between the post and the client-side rendering, we need to check if the message
    // has been accepted properly by the server, then move on to displaying our new message.

    // Generate & Render Client-side
    //console.log("--Generating New Message!");

    //const messageTemplateHTML = `
    //  <div class="message">
    //    <p class="messageUsername">
    //      ${username + ":"}
    //    </p>
    //    <p class="messageContent">${content}</p>
    //  </div>
    //`;

    //const messageContainer = document.getElementById("message-container");
    //const newMessage = document.createElement("div");
    //newMessage.innerHTML = messageTemplateHTML;
    //messageContainer.appendChild(newMessage);

    //console.log("--Finished Generating New Message!");
  }
  // Hookup Send Button
  //
  function clickHandler() {
    var message = chatboxInput.value;
    postMessage(username, message);
  }      
  

  // GET NEWEST MESSAGE
  // check periodically if new message is available and if returns TRUE then run getNewestMessage()
  setInterval(function() {
      // test
      numberOfMessages();
  }, 1000);
  
})