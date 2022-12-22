window.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed.');
    
  // All Main Code After This Comment

  var chatboxInput = document.getElementById("chat-box-input");
  var chatboxSendButton = document.getElementById("chat-box-send-button");
  chatboxSendButton.addEventListener("click", clickHandler, false);

  // hard-coded username string
  var username = "Administrator";

  // Hookup Send Button
  function clickHandler() {
    var message = chatboxInput.value;
    console.log(username, "says:", message);

    // SEND MESSAGE TO SERVER HERE chat/submit
  }      

  async function getMessageLog() {
    let response = await fetch('http://139.177.195.118:8801/chat/log');
    let responseJSON = await response.json()
    return responseJSON;
  }

  function generateMessage(data, index) {
    const messageTemplateHTML = `
      <div class="message">
        <p class="messageUsername">
          ${data.messages[index].username}
        </p>
        <p class="messageContent">${data.messages[index].username}</p>
      </div>
    `;

    const newMessage = document.createElement("div");
    newMessage.innerHTML = messageTemplateHTML;
    console.log("Finished Generating a Message!")
  }
      
  getMessageLog()
    .then(console.log("Test Message Log (index 0):"))
    .then(data => console.log(data.messages[0]))
    .then(data => generateMessage(data, 0));

  
})