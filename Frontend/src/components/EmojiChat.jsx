import clsx from "clsx";
import sticker from "/sticker.svg";
import { Angry, Biting, Smile, Clown, Laugh } from "./Emojis";
import { useState } from "react";
export default function EmojiChat() {
    const [showEmoji, setShowEmoji] = useState(true);
    return (
        <div
            className={clsx(
                " absolute -left-1 top-1/2 hidden   w-20 -translate-x-full -translate-y-1/2  overflow-hidden rounded-full border-matte  transition-all duration-500 sm:grid",
                showEmoji ? "h-20 border-4 py-0" : "h-[90%] border-2",
            )}
        >
            <img
                onClick={() => setShowEmoji(!showEmoji)}
                className=" h-20 w-20 rounded-full bg-chinese p-4  transition duration-300"
                src={sticker}
                draggable={false}
            ></img>
            <div
                className={clsx(
                    " grid justify-center py-2  transition-all duration-500 *:h-[50px] *:w-[50px] *:transition-all *:duration-200 hover:*:scale-125",
                )}
            >
                <Angry />
                <Biting />
                <Clown />
                <Smile />
                <Laugh />
            </div>
        </div>
    );
}
