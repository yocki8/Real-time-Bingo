const connectToSockets = (io) => {
    let vacantRoom = null;

    // I am delaying intentionally to check if my app is prone to server respond delay
    const delay = () => new Promise((resolve) => setTimeout(resolve, 1500));

    io.on("connection", (socket) => {


        socket.on("disconnect", async() => {
            // await delay();
            socket.to(socket.room).emit("leave_match");
            if (vacantRoom == socket.room) vacantRoom = null;
        });

        socket.on("mark_number", async (num) => {
            // await delay();
            socket.to(socket.room).emit("mark_number", num);
            io.in(socket.room).emit("restart_countdown");
        });
        
        socket.on("send_emote",(emote)=>{
            socket.to(socket.room).emit("emote",emote);
        })
        
        socket.on("join_room", async(board) => {
            
            // await delay();
            
            if (vacantRoom == null) {
                vacantRoom = { id: crypto.randomUUID(), board };

                socket.join(vacantRoom.id);
                socket.room = vacantRoom.id;
                io.in(vacantRoom.id).emit("player 1");
            } else {
                socket.join(vacantRoom.id);
                socket.room = vacantRoom.id;
                io.in(vacantRoom.id).emit("start_match");
                io.in(socket.id).emit("set_opponent_board", vacantRoom.board);
                socket.to(socket.room).emit("set_opponent_board", board);
                vacantRoom = null;
            }
        });
    });
};

module.exports = connectToSockets;
