"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var socket = io();
var room = "";
var name = "";
var isInRoom = false;

window.onload = function () {
  setupLista();
};

function deletTheRooms() {
  alert("All romms is deeted right now");
}

function setupLista() {
  socket.on("deleted room", deletTheRooms);
  socket.on("join is done", loadingChat);
  socket.on("in the room", ifRoomJoined);
  socket.on("message", gotNewMessage);
  socket.on("wrong password", wrongpassword);
}

function loadingChat() {
  var joinUI = document.querySelector(".join.ui");
  var roomUI = document.querySelector(".room.ui");
  joinUI.classList.add("hidden");
  roomUI.classList.remove("hidden");
}

function ifRoomJoined(message) {
  // const list = document.querySelector(".room.ui ul")
  // const listItem = document.createElement("li")
  // listItem.innertext = message
  // list.appendChild(message)
  // isInRoom = true
  // console.log(message)
  //try to solve the problem
  var welcome = document.getElementById("nameWelcome");
  var welcomeList = document.createElement("li");
  welcomeList.innertext = message;
  welcome.appendChild(welcomeList);
  isInRoom = true;
  console.log(message);
}

function gotNewMessage(data) {
  //test new wat to solv the problem
  var chatList = document.getElementById("chatList");
  var newMessage = document.createElement("li");
  newMessage.innerText = data.name + ": " + data.message;
  chatList.appendChild(newMessage);
}

function wrongpassword(msg) {
  socket.emit("all rooms is deleted");
  alert(msg);
}

function onJoinRoom() {
  var _document$querySelect = document.querySelectorAll('.join.ui input'),
      _document$querySelect2 = _slicedToArray(_document$querySelect, 3),
      nameInput = _document$querySelect2[0],
      roomInput = _document$querySelect2[1],
      passwordInput = _document$querySelect2[2];

  name = nameInput.value;
  room = roomInput.value;
  var password = passwordInput.value;
  socket.emit('join room', {
    name: name,
    room: room,
    password: password
  });
}


// below code is to know when typing is there
var timeout;
function timeoutFunction() {
  typing = false;
  socket.emit('typing', {
    text: "" 
  });
}
$('#input').keyup(function() {
  console.log('happening');
  typing = true;
  $("#icon-type").removeClass();
  socket.emit('typing', {
    text: name + " is typing ..."
  });
  clearTimeout(timeout);
  timeout = setTimeout(timeoutFunction, 1000);
});


function onSendMessage() {
  var message = document.getElementById("input").value;
  socket.emit('message', {
    name: name,
    room: room,
    message: message
  });
} 

