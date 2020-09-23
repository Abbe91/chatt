const socket = io();

let room =""
let name = ""
let isInRoom = false
let availableCommands = ["gif", "weather", "etc"]

window.onload= function (){
    setupLista()
}





function deletTheRooms(){
    alert("All romms is deeted right now")
}

function setupLista(){
    socket.on("deleted room", deletTheRooms)
    socket.on("join is done", loadingChat)
    socket.on("in the room", ifRoomJoined)
    socket.on("message", gotNewMessage)
    socket.on("wrong password", wrongpassword)
}

function loadingChat(){
    const joinUI = document.querySelector(".join.ui")
    const roomUI = document.querySelector(".room.ui")
    joinUI.classList.add("hidden")
    roomUI.classList.remove("hidden")
    
    const input = document.getElementById("input")
    input.addEventListener("input", onInputchange)
}


function onInputchange(event){
    const text = event.target.value
    // console.log(text)
    if (text == "/"){
        //presents users with avalble commands 
        availableCommands.forEach(command => {
            console.log(command);
            let commandsList = document.getElementById("show")
            let showCommands = document.createElement('li')
            showCommands.innerText = command
            commandsList.appendChild(showCommands);
            commandsList.style.display = "block"
            
        });
    } else if (text == ""){
        let commandsList = document.getElementById("show")
        commandsList.innerText = ""
        commandsList.style.display = "none"
    } else if (text.type == "img") {
        let searchWord = text.content
        fetchGif(searchWord)

    }
}

function ifRoomJoined(data){
    socket.emit("in the room")
   
    document.querySelector('h1').innerText = data
   
    console.log(data)

}

function gotNewMessage(data){
    const chatList = document.getElementById("chatList")
    const newMessage = document.createElement("li")
    newMessage.innerText = data.name+ ": "+ data.message
    let message = data.message
    chatList.appendChild(newMessage)

    if (message.value == "/"){
        console.log("hejjj2222")
        
        onSendMessage()
        
        //get the search word from the message and fetch gif 

    } else if(message.startsWith("/gif")) {
        let searchWord = message.substring(5)
        console.log(searchWord)
        console.log("hejjj")
        fetchGif(searchWord)
       
        
    } else {
        console.log(message)
        console.log("message send")
        
    }

}



function wrongpassword(msg){
    socket.emit("all rooms is deleted")
    alert(msg)
}

function onJoinRoom(){
    const [nameInput, roomInput, passwordInput] = document.querySelectorAll('.join.ui input')
    name = nameInput.value
    room = roomInput.value
    let password = passwordInput.value
    socket.emit('join room', { name, room, password})
}

function onSendMessage(){
    const message = document.getElementById("input").value
    socket.emit('message',  { name, room, message})
    deleteInput()
    deleteCommands()
  
}

   /*  // to show who is typing Message
    message.addEventListener('keypress', function(){
        socket.emit('typing', message.value);
      }) */

function deleteInput() {
    let clear = document.getElementById('input').value = ""
}
const chatList = document.getElementById("chatList")

function deleteCommands() {
    let clear = document.getElementById("show").innerHTML = "";
}

function fetchGif(searchWord){
  
    let APIKEY = "Qw9ZKGi62DjSH1HxEHOslCYJYJSvFNa9";
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=1&q=${searchWord}`; 

    let str = document.getElementById("input").value.trim();
    url = url.concat(str);
    console.log(url);
    fetch(url)        
      .then(response => response.json())
      .then(content => {
        //  data, pagination, meta
        console.log(content.data);
        console.log("META", content.meta);
        let chatList = document.getElementById("chatList")

        let fig = document.createElement("figure");
        let img = document.createElement("img");
        let fc = document.createElement("figcaption");
        
        let newMessage = document.createElement("img")

        chatList.appendChild(newMessage)
        img.src = content.data[0].images.downsized.url;
        img.alt = content.data[0].title;
        fc.textContent = content.data[0].title;
        // chatList.appendChild(newMessage)
        chatList.appendChild(img);
        // fig.appendChild(fc);
        let out = document.getElementById("imgBox");
        out.insertAdjacentElement("afterbegin", fig);
        document.querySelector("#input").value = "";
        console.log(url)
        commandsList.style.display = ""
        socket.emit('message', {
            type: "img",
            content: img.url,
            //user: user
          });

      })
      .catch(err => {
        console.error(err);
      });
}

/* var chatEl = document.getElementById("#newMessage");
chatEl.scrollTop = chatEl.scrollHeight; */
