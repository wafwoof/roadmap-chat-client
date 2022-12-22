window.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed.');
    
  // All Main Code After This Comment

  var chatboxInput = document.getElementById("chat-box-input");
  var chatboxSendButton = document.getElementById("chat-box-send-button");
  chatboxSendButton.addEventListener("click", clickHandler, false);

  // !hard-coded username string
  var username = "Administrator";

  async function printNewestMessage() {

    let response = await fetch('http://139.177.195.118:8801/chat/log');
    let responseJSON = await response.json();

    // index[0] should be the first message in the log
    let index = 0;

    console.log("--Generating New Message!");

    console.log(responseJSON.messages[index]);

    const messageTemplateHTML = `
      <div class="message">
        <p class="messageUsername">
          ${responseJSON.messages[index].username}
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

  // THIS IS JUST FOR DEMONSTRATION
  // (even the var name is bad)
  function tempMessageWriter(username, content){

    console.log("--Generating New Message!");

    const messageTemplateHTML = `
      <div class="message">
        <p class="messageUsername">
          ${username}
        </p>
        <p class="messageContent">${content}</p>
      </div>
    `;

    const messageContainer = document.getElementById("message-container");
    const newMessage = document.createElement("div");
    newMessage.innerHTML = messageTemplateHTML;
    messageContainer.appendChild(newMessage);

    console.log("--Finished Generating New Message!");
  }

  // Hookup Send Button
  function clickHandler() {

    var message = chatboxInput.value;

    console.log(username, "says:", message);
  
    tempMessageWriter(username, message);
  }      
  
  
  printNewestMessage();
  
})