import React, { useEffect, useMemo, useRef, useState } from "react";
import { useData } from "./components/DataContext";
import { ScaleLoader } from "react-spinners";
import Board from "./components/Board";

export default function App() {

    const {gameState,joinRoom} = useData();
    return (
        <div
            className="relative select-none cursor-arrow overflow-hidden grid h-dvh place-items-center bg-black  text-white"
        >
            {gameState == "home" && (
                <button
                    onClick={joinRoom}
                    className="border bg-black w-2/3 py-4 transition duration-200 hover:bg-white hover:text-black"
                >
                    Play
                </button>
            )}

            {gameState == "waiting" && (
                <div>
                    <ScaleLoader color="white" />
                </div>
            )}

            {gameState == "playing" && <Board />}
        </div>
    );
}

