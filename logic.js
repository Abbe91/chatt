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
function ifRoomJoined(data){
    socket.emit("in the room")
   
    document.querySelector('h1').innerText = data
   
    console.log(data)

}

function sendNewMessage(data){
        const chatList = document.getElementById("chatList")
        const newMessage = document.createElement("li")
        newMessage.innerText = data.name+ ": "+ data.message
        chatList.appendChild(newMessage)
        console.log(data.message)
        myMessage = data.message
        if(myMessage.type == Number){
            console.log("ffff")
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
}
function deleteInput() {
    let clear = document.getElementById('input').value = ""
    
}
const chatList = document.getElementById("chatList")

socket.on("chat message", function(msg){
    const newMessage = document.createElement("li")
    console.log(newMessage)
    newMessage.innerText = msg
    chatList.appendChild(newMessage)
});

function sendMessage(){
    const message = document.getElementById("m").value
    socket.emit('chat message', message)
    console.log(message)
}