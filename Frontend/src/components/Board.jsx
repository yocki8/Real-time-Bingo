import React, { useEffect, useRef, useState } from "react";

import OppBoard from "./OppBoard";
import MyBoard from "./MyBoard";
import BingoLine from "./BingoLine";
import PlayerBoard from "./PlayerBoard";
import EmojiChat from "./EmojiChat";

export default function Board() {
    return (
        <div className=" w-full sm:self-start ">
            <div className="relative grid w-full gap-2">
                <PlayerBoard />
                <div className="relative m-auto grid w-[min(90%,450px)] gap-2">
                    <BingoLine />
                    <div className="relative">
                        <MyBoard />
                        <EmojiChat />
                    </div>
                </div>
            </div>
            <OppBoard />
        </div>
    );
}
