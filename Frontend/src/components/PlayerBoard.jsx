import clsx from "clsx";
import { useData } from "./DataContext";
import smile from "/smile.svg";
import cry from "/cry.svg";


const PlayStatus = ({ className, status, svgProp = null }) => {
    return (
        <div className={className}>
            <p>{status}</p>
            {svgProp && <img className="h-12 w-12 invert" src={svgProp}></img>}
        </div>
    );
};
export default function PlayerBoard(){
    const { active, myLines, remountLoader, oppLines } = useData();

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
                "relative m-auto my-10 flex h-10 whitespace-nowrap text-[5.5dvw] font-bold uppercase transition-all duration-200 *:transition-all *:duration-200 sm:text-4xl",
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
                    "relative text-center *:transition-all *:duration-200",
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
