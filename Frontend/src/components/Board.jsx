import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { useData } from "./DataContext";
import smile from "/smile.svg";
import cry from "/cry.svg";
import { act } from "react";

export default function Board() {
    return (
        <div className=" w-full cursor-pointer sm:self-start ">
            <div className=" grid  w-full justify-center gap-2">
                <PlayerBoard />
                <div className="relative m-auto grid w-fit gap-2 p-2">
                    <BingoLine />
                    <MyBoard />
                </div>
            </div>
            <OppBoard />
        </div>
    );
}

const PlayStatus = ({ className, status, svgProp = null }) => {
    return (
        <div className={className}>
            <p>{status}</p>
            {svgProp && <img className="h-12 w-12 invert" src={svgProp}></img>}
        </div>
    );
};
const PlayerBoard = () => {
    const { active, myLines,remountLoader, oppLines } = useData();

    let flag = "continue";
    if (myLines == 5) {
        if (oppLines == 5) flag = "draw";
        else flag = "win";
    } else if (oppLines == 5) {
        if (myLines == 5) flag = "draw";
        else flag = "lose";
    }

    return (
        <div
            className={clsx(
                "relative m-auto my-10 flex h-10 whitespace-nowrap px-5 text-center text-4xl font-bold uppercase  transition-all duration-200 *:transition-all *:duration-200",
            )}
        >
            <PlayStatus
                className={clsx(
                    "absolute flex items-center gap-2",
                    flag == "win"
                        ? "left-1/2 -translate-x-1/2 opacity-100"
                        : "-left-1/2 opacity-0",
                )}
                status={"you won"}
                svgProp={smile}
            />
            <PlayStatus
                className={clsx(
                    "absolute flex items-center gap-2",
                    flag == "lose"
                        ? "right-1/2 translate-x-1/2 opacity-100"
                        : "-right-1/2 opacity-0",
                )}
                status={"you lose"}
                svgProp={cry}
            />

            <PlayStatus
                className={clsx(
                    "absolute left-1/2 flex -translate-x-1/2 items-center gap-2",
                    flag == "draw"
                        ? "top-1/2  -translate-y-1/2 opacity-100"
                        : "-top-1/2 opacity-0",
                )}
                status={"Draw"}
            />

            <div
                className={clsx(
                    "relative *:transition-all *:duration-200",
                    flag != "continue" && "translate-y-full opacity-0",
                )}
            >
                <p className={clsx(!active && "-translate-y-full opacity-0")}>
                    Your Turn
                </p>
                <p className={clsx(active ? "opacity-0" : "-translate-y-full")}>
                    wait for Opponent
                </p>
                {myLines < 5 && (
                    <div className="*:absolute *:-bottom-2  *:left-0  *:w-full *:rounded-3xl">
                        <div
                            key={remountLoader}
                            className="timeout z-10 h-[8px] translate-y-[1px]  bg-white"
                        ></div>
                        <div className="h-[6px] bg-matte"></div>
                    </div>
                )}
            </div>
        </div>
    );
};
const OppBoard = () => {
    const { oppBoard } = useData();
    return (
        <ul className="absolute left-10 top-10 grid w-fit grid-cols-5 gap-1">
            {oppBoard.map((num, index) => (
                <OppCell key={index} num={num} />
            ))}
        </ul>
    );
};

const OppCell = ({ num }) => {
    return (
        <li
            className={clsx(
                "h-3 w-3 rounded-sm",
                num < 0 ? "bg-white" : "bg-white/20",
            )}
        >
        </li>
    );
};
const BingoLine = () => {
    const { myLines } = useData();
    const word = "BINGO";
    return (
        <ul className="flex w-full justify-around">
            {word.split("").map((char, index) => {
                return (
                    <li
                        className={clsx(
                            "grid h-8 w-8 place-items-center rounded-lg text-xl font-bold transition-all duration-500",
                            index < myLines && " bg-white  text-black",
                        )}
                        key={char}
                    >
                        <h1>{char}</h1>
                    </li>
                );
            })}
        </ul>
    );
};

const MyBoard = () => {
    const { myBoard, myLines, oppLines, active } = useData();

    return (
        <ul
            className={clsx(
                "m-auto grid w-fit grid-cols-5 gap-2",
                (!active || myLines == 5 || oppLines == 5) &&
                    "cursor-not-allowed brightness-50",
            )}
        >
            {myBoard.map((num) => (
                <Cell key={num} num={num} />
            ))}
        </ul>
    );
};
const Cell = ({ num, checked, handleChecked }) => {
    const { userClicked, myLines, oppLines, active } = useData();

    return (
        <li
            onClick={(e) => {
                if (num<0 || !active || myLines == 5 || oppLines == 5) {
                    return;
                }
                userClicked(num);
            }}
            className={clsx(
                "grid h-16 w-16  place-items-center border border-matte bg-black text-lg font-bold sm:h-20 sm:w-20 ",
                num < 0
                    ? num < -26
                        ? "bg-white text-black blur-sm"
                        : "bg-white text-black"
                    : "sm:hover:border-white",
            )}
        >
            {Math.abs(num % 26)}
        </li>
    );
};
