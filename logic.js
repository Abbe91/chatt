const socket = io();

let room =""
let name = ""
let isInRoom = false

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
    socket.on("message", sendNewMessage)
    socket.on("wrong password", wrongpassword)

}
function loadingChat(){
    const joinUI = document.querySelector(".join.ui")
    const roomUI = document.querySelector(".room.ui")
    joinUI.classList.add("hidden")
    roomUI.classList.remove("hidden")

}
function ifRoomJoined(message){
    // const list = document.querySelector(".room.ui ul")
    // const listItem = document.createElement("li")
    // listItem.innertext = message
    // list.appendChild(message)
    // isInRoom = true
    // console.log(message)

    //try to solve the problem
    const welcome = document.getElementById("nameWelcome")
    const welcomeList = document.createElement("li")
    welcomeList.innertext = message
    welcome.appendChild(welcomeList)
    isInRoom = true
    console.log(message)

}
function sendNewMessage(data){
    //test new wat to solv the problem
    const chatList = document.getElementById("chatList")
    const newMessage = document.createElement("li")
    newMessage.innerText = data.name+ ": "+ data.message
    chatList.appendChild(newMessage)
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

}







// const chatList = document.getElementById("chatList")

// socket.on("chat message", function(msg){
//     const newMessage = document.createElement("li")
//     console.log(newMessage)
//     newMessage.innerText = msg
//     chatList.appendChild(newMessage)
// });

// function sendMessage(){
//     const message = document.getElementById("m").value
//     socket.emit('chat message', message)
//     console.log(message)
// }