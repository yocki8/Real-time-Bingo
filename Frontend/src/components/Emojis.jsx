import { useData } from "./DataContext";

export const Angry = () => {
    const { sendEmote } = useData();
    return (
        <img
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Enraged%20Face.png"
            alt="Enraged Face"
            // width="50"
            // height="50"
            onClick={() => sendEmote("angry")}
        />
    );
};
export const Biting = () => {
    const { sendEmote } = useData();
    return (
        <img
        onClick={() => sendEmote("biting")}
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Loudly%20Crying%20Face.png"
            alt="Loudly Crying Face"
            // width="50"
            // height="50"
        />
    );
};
export const Clown = () => {
    const { sendEmote } = useData();
    return (
        <img
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Clown%20Face.png"
            alt="Clown Face"
            // width="50"
            // height="50"
            onClick={() => sendEmote("clown")}
        />
    );
};
export const Smile = () => {
    const { sendEmote } = useData();
    return (
        <img
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Smiling%20Face%20with%20Hearts.png"
            alt="Smiling Face with Hearts"
            // width="50"
            // height="50"
            onClick={() => sendEmote("smile")}
        />
    );
};
export const Laugh = () => {
    const { sendEmote } = useData();
    return (
        <img
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Rolling%20on%20the%20Floor%20Laughing.png"
            alt="Rolling on the Floor Laughing"
            // width="50"
            // height="50"
            onClick={() => sendEmote("laugh")}
        />
    );
};
