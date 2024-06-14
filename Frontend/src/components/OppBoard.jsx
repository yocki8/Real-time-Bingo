import clsx from "clsx";
import { useData } from "./DataContext";
import { Angry, Biting, Clown, Laugh, Smile } from "./Emojis";

export default function OppBoard() {
    const { oppBoard, emote, remountEmote } = useData();

    return (
        <div className="absolute  left-5  top-6 sm:left-10 sm:top-10">
            <ul className="grid  w-fit grid-cols-5 gap-1">
                {oppBoard.map((num, index) => (
                    <OppCell key={index} num={num} />
                ))}
            </ul>
            <div
                key={remountEmote}
                className="emoji absolute -bottom-20 left-1/2  grid h-full w-full -translate-x-1/2  place-items-center *:h-[50px] *:w-[50px] sm:top-auto"
            >
                {emote == "angry" && <Angry />}
                {emote == "biting" && <Biting />}
                {emote == "clown" && <Clown />}
                {emote == "laugh" && <Laugh />}
                {emote == "smile" && <Smile />}
            </div>
        </div>
    );
}

const OppCell = ({ num }) => {
    return (
        <li
            className={clsx(
                "h-3 w-3 rounded-sm",
                num < 0 ? "bg-white" : "bg-white/20",
            )}
        ></li>
    );
};
