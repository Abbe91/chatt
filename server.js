const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {pingTimeout: 25000});
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/'));

let roomWithPassword =[{
  
}]
function connectionOn(socket){
  console.log('connection ' + socket.id)
  socket.on("join room", (data)=> {

    let roomToJoin = roomWithPassword.find((room) => room.roomName == data.room)
    if(roomToJoin){
      //password matchar
      if(data.password == roomToJoin.password){
        socket.join(data.room, () =>{
          io.to(socket.id).emit("join is done", "success")

          io.to(data.room).emit("in the room", `${data.name} has joined the room`)

        })
      }else{
        socket.emit("wrong password", "try again, password is not correct")
      }
      //skapa och join nytt rum
    }else{
      socket.join(data.room, ()=> {
        roomWithPassword.push({
          roomName: data.room,
          password: data.password
        })
      })
      console.log("join")
      io.to(socket.id).emit("join is done", "success")

      io.to(data.room).emit("in the room", `${data.name} has joined the room`)
    }
    //skicka ut meddelande till alla klienter i det aktuella rummet
    socket.on("message", (data)=>{
      io.to(data.room).emit("message", data)
    })
   
  })
  
  socket.on("all rooms is deleted", () =>{
    roomWithPassword =[]
    socket.emit("all rooms is deleted", "All the rooms has been deleted....")
  })
  
}

// io.on('connection', (socket) => {
//   console.log('a user connected');
//   socket.on('disconnect', ()=>{
//     console.log( "user disconnected" );
//   });
//   socket.on("chat message", (msg) =>{
//     console.log("message: " + msg);
//     io.emit("chat message", msg);
//   })
// });
io.on( "connection",connectionOn) 


http.listen(port, ()=> console.log('listening on ' + port));