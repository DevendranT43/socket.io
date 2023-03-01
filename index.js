const app = require('express')();
const server = require('http').createServer(app);

const {Server} = require('socket.io');
const io = new Server(server);

app.get('/home',(req, res)=>{
    res.sendFile(__dirname + '/index.html')
})

io.on('connection',(socket)=>{
    console.log('user connected : ', socket.id);
    socket.on('disconnect',()=>{
        console.log('user disconnected : ', socket.id);
    });

    socket.on('chat_1',(msg)=>{
        console.log("message received: ", msg);
        io.emit("chat_1", msg)
    });

})

server.listen(3000,()=>{
    console.log("server listening on port 3000");
})
