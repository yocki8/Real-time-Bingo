import clsx from "clsx";
import { useData } from "./DataContext";

export default function MyBoard(){
    const { myBoard, myLines, oppLines, active } = useData();

    return (
        <ul
            className={clsx(
                "m-auto grid w-full grid-cols-5 border-[1px] border-matte",
                (!active || myLines == 5 || oppLines == 5) &&
                    "cursor-notAllowed brightness-50",
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
                if (num < 0 || !active || myLines == 5 || oppLines == 5) {
                    return;
                }
                userClicked(num);
            }}
            className={clsx(
                "grid  aspect-square place-items-center border border-matte bg-black text-lg font-bold",
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
