import clsx from "clsx";
import { useData } from "./DataContext";
export default function BingoLine(){
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
