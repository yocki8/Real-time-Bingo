import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { io } from "socket.io-client";
const DataContext = createContext();

const getRandomBoard = () => {
    let numbers = Array.from({ length: 25 }, (_, i) => i + 1);

    for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }

    return numbers;
};

export const DataProvider = ({ children }) => {
    const socket = useMemo(
        () =>
            io.connect("https://real-time-bingo.onrender.com/", {
                autoConnect: false,
            }),
        [],
    );
    const [myBoard, setMyBoard] = useState(getRandomBoard());
    const [oppBoard, setOppBoard] = useState([]);
    const [gameState, setGameState] = useState("home");
    const [active, setActive] = useState(0);
    const [myLines, setMyLines] = useState(0);
    const [oppLines, setOppLines] = useState(0);

    let countdown = null;
    const resetGame = () => {
        setMyBoard(getRandomBoard());
        setOppBoard([]);
        setGameState("home");
        setActive(false);
        setMyLines(0);
        setOppLines(0);
        clearInterval(countdown);
    };

     const joinRoom = () => {
        socket.emit("join_room");
    };

    const startCountdown = () =>{

        // also resets if previous timer is in action
        if(countdown) clearInterval(countdown);
        countdown = setInterval(() => {
            setActive((active) => !active);
        }, 15000);
    }

    const checkLines = (board, player) => {
        let validLines = 0;

        const checkLine = (indices) => {
            const lineComplete = indices.every((index) => board[index] <= 0);
            if (lineComplete) {
                indices.forEach((index) => {
                    board[index] -= 26;
                });
                validLines++;
            }
        };

        // Check rows and columns
        for (let i = 0; i < 5; i++) {
            checkLine([0, 1, 2, 3, 4].map((j) => i * 5 + j)); // row
            checkLine([0, 1, 2, 3, 4].map((j) => j * 5 + i)); // column
        }

        // Check diagonals
        checkLine([0, 6, 12, 18, 24]);
        checkLine([4, 8, 12, 16, 20]);

        if (player === 1) setMyLines(validLines);
        if (player === 2) setOppLines(validLines);
    };

    const updateBoard = (board,num,player) =>{
        const boardIndex = board.findIndex((ele) => ele == num);
        const boardCpy = [...board];
        if (boardIndex !== -1) boardCpy[boardIndex] *= -1;

        checkLines(boardCpy, player);
        if (player === 1) setMyBoard(boardCpy);
        if (player === 2) setOppBoard(boardCpy);
    }
    //this only executes at first render
    useEffect(() => {
        socket.connect();

        //when player 1 is waiting for player 2
        socket.on("wait", () => {
            setActive(true);
            setGameState("waiting");
        });

        //if another player disconnects, this client resets
        socket.on("leave_match", () => {
            resetGame();
        });

        //executes when opponent send its board
        socket.on("set_opponent_board", (board) => {
            setOppBoard(board);
        });

        socket.on("start_countdown",startCountdown);

        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(()=>{
        //updates board upon getting a number checked either by player 1 or player 2
        socket.on("update_boards", (num) => {
            setActive(!active);
            startCountdown();
            updateBoard(myBoard,num,1);
            updateBoard(oppBoard,num,2);
        });

        socket.on("start_match", () => {
            socket.emit("opponent_board", myBoard);
            setGameState("playing");
        });

    },[myBoard,oppBoard,active]);

    const markClicked = (num) => {
        socket.emit("mark_number", num);
    };

    return (
        <DataContext.Provider
            value={{
                socket,
                myBoard,
                oppBoard,
                gameState,
                joinRoom,
                markClicked,
                myLines,
                active,
                oppLines,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
