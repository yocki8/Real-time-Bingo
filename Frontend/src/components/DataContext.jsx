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
            // io.connect("http://localhost:3000", {
                autoConnect: false,
            }),
        [],
    );
    const [myBoard, setMyBoard] = useState(getRandomBoard());
    const [oppBoard, setOppBoard] = useState(new Array(25).fill(0));
    const [gameState, setGameState] = useState("home");
    const [active, setActive] = useState(false);
    const [myLines, setMyLines] = useState(0);
    const [oppLines, setOppLines] = useState(0);
    const [emote,setEmote] = useState(null);
    const [remountLoader,setRemountLoader] = useState(0); // just for toggling
    const [remountEmote,setRemountEmote] = useState(0); // just for toggling
    let countdown = null;

    const resetGame = () => {
        setMyBoard(getRandomBoard());
        setOppBoard(new Array(25).fill(0));
        setGameState("home");
        setActive(false);
        setMyLines(0);
        setOppLines(0);
        setEmote(null);
        clearInterval(countdown);
    };

    const joinRoom = () => {
        setGameState("waiting");
        socket.emit("join_room", myBoard);
    };

    const startCountdown = () => {
        // also resets if previous timer is in action
        if (countdown) clearInterval(countdown);
        countdown = setInterval(() => {
            setActive((active) => !active);
            setRemountLoader((remountLoader) => !remountLoader);
        }, 15000);
    };

    const updateBoard = (num, player) => {
        let board;
        if (player == 1) board = [...myBoard];
        if (player == 2) board = [...oppBoard];

        const boardIndex = board.findIndex((ele) => ele == num);
        if (boardIndex !== -1) board[boardIndex] *= -1;

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

        if (player === 1) {
            setMyBoard(board);
            setMyLines(validLines);
        }
        if (player === 2) {
            setOppBoard(board);
            setOppLines(validLines);
        }
    };
    //this only executes at first render
    useEffect(() => {
        socket.connect();

        //when player 1 is waiting for player 2
        socket.on("player 1", () => {
            setActive(true);
        });

        //if another player disconnects, this client resets
        socket.on("leave_match", resetGame);

        //start match and starts countdown
        socket.on("start_match", () => {
            setGameState("playing");
            startCountdown();
        });

        socket.on("restart_countdown", () => {
            startCountdown();
            setRemountLoader((remountLoader) => !remountLoader);
        });

        socket.on("set_opponent_board", (board) => {
            setOppBoard(board);
        });

        socket.on("emote",(oppEmote)=>{
            setEmote(oppEmote);
            setRemountEmote((remountEmote)=>!remountEmote);
        })

        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        //updates board upon getting a number checked either by player 1 or player 2
        socket.on("mark_number", (num) => {
            markNumber(num);
        });
    }, [myBoard,oppBoard,active]);

    const markNumber = (num) => {
        updateBoard(num, 1);
        updateBoard(num, 2);
        setActive(!active);
    };

    const userClicked = (num) => {
        markNumber(num);
        socket.emit("mark_number", num);
    };

    const sendEmote = (emoteClicked)=>{
        socket.emit("send_emote",emoteClicked);
    }

    return (
        <DataContext.Provider
            value={{
                socket,
                myBoard,
                oppBoard,
                gameState,
                joinRoom,
                userClicked,
                myLines,
                active,
                oppLines,
                remountLoader,
                emote,
                sendEmote,
                remountEmote
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
