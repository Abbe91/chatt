const socket = io();

let room =""
let name = ""
let isInRoom = false
let availableCommands = ["gif" , "weather" ,"etc"]

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
    console.log(text)
    if (text == "/"){
        //presents users with avalble commands 
        availableCommands.forEach(command => {
            console.log(command);
            let commandsList = document.getElementById("show")
            let showCommands = document.createElement('li')
            showCommands.innerText = command
            commandsList.appendChild(showCommands);
        });
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
        sendMessage()
        //get the search word from the message and fetch gif 
        
    } else if(message.startsWith("/gif")) {
        const searchWord = message.substring(5)
        console.log(searchWord)
        console.log("hejjj")
        fetchGif(searchWord)
        //socket.emit('message', message)
        //console.log(message)
        
    } else {
        console.log("didn't sea any thing")
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

function sendMessage(){
    const message = document.getElementById("m").value

    if (message.startsWith("/gif")){
        //get the search word from the message and fetch gif 
        const searchWord = message.value.substring(5)
        fetchGif(searchWord)
    } else {
        socket.emit('message', message)
        console.log(message)
    }
}

function fetchGif(searchWord){
    console.log("cat")
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
        let fig = document.createElement("figure");
        let img = document.createElement("img");
        let fc = document.createElement("figcaption");
        img.src = content.data[0].images.downsized.url;
        img.alt = content.data[0].title;
        fc.textContent = content.data[0].title;
        fig.appendChild(img);
        fig.appendChild(fc);
        let out = document.querySelector(".out");
        out.insertAdjacentElement("afterbegin", fig);
        document.querySelector("#input").value = "";
        console.log(url)
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


