const connectToSockets = (io) => {

    let currentRoom = null;

    io.on("connection", (socket) => {

        socket.on("disconnect", () => {
            socket.to(socket.room).emit("leave_match");
            if(currentRoom==socket.room) currentRoom = null;
        });
        
        socket.on("mark_number",(num)=>
        {
            io.in(socket.room).emit("update_boards",num);
        })

        socket.on("opponent_board",(board)=>{
            socket.to(socket.room).emit("set_opponent_board",board);
        })
        
        socket.on("join_room", () => {

            if (currentRoom == null) {
                currentRoom = crypto.randomUUID();

                socket.join(currentRoom);
                socket.room = currentRoom;
                io.in(currentRoom).emit("wait");
            } 
            
            else {
                socket.join(currentRoom);
                socket.room = currentRoom;
                io.in(currentRoom).emit("start_match");
                io.in(currentRoom).emit("start_countdown");

                currentRoom = null;
            }
        });
    });
};

module.exports = connectToSockets;











