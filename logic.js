const socket = io();

let room =""
let name = ""
let isInRoom = false

window.onload= function (){
    setupLista()
}
function deletTheRooms(){

}
function setupLista(){
    socket.on("deleted room", deletTheRooms)
    socket.on("join is done", loadingChat)
    socket.on("in the room", ifRoomJoined)
    socket.on("message", sendNewMessage)
    socket.on("wrong password", wrongpassword)

}
function loadingChat(){
    console.log("loadingChat")
    const joinUI = document.querySelector(".join.ui")
    const roomUI = document.querySelector(".room.ui")
    joinUI.classList.add("hidden")
    roomUI.classList.remove("hidden")
    console.log("hej the chat should appear")
    console.log( joinUI.classList)

}
function ifRoomJoined(message){
    const list = document.querySelector(".room.ui ul")
    const listItem = document.createElement("li")
    listItem.innertext = message

    list.appendChild(listItem)
    isInRoom = true
}
function sendNewMessage(data){
    const list = document.querySelector(".room.ui ul")
    const listItem = document.createElement("li")
    listItem.innertext =data.name+ ""+ data.message

    list.appendChild(listItem)
}
function wrongpassword(msg){
    alert(msg)
}
function onJoinRoom(){
    const [nameInput, roomInput, passwordInput] = document.querySelectorAll('.join.ui input')
    name = nameInput.value
    room = roomInput.value
    let password = passwordInput.value
    socket.emit('join room', { name, room, password})
    console.log("went to the room")
    console.log(name,room , password)
}
function onSendMessage(){
    const messageInput = document.querySelector('.room.ui input')
    const message = messageInput.value
    socket.emit('message', { name, room, message})
    messageInput.value= ""
    console.log(message)
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