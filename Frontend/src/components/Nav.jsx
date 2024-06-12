import React from "react";
import { useData } from "./DataContext";
import { Link } from "react-router-dom";

const Btn = ({ name, pageNum, goToPage }) => {
    const { page, handlePage } = useData();

    return (
        <li onClick={() => handlePage(pageNum)}>
            <Link to={goToPage}>
                <button
                    className={`py-5 ${pageNum == page ? "text-blue-500" : ""}`}
                >
                    {name}
                </button>
            </Link>
        </li>
    );
};
export default function Nav() {
    const { toggleDarkMode } = useData();
    return (
        <nav className="text-lighty bg-chinese mx-4 flex translate-y-4 items-center  justify-between rounded border-[0.1px] border-gray-500 px-8">
            <h1 className="text-3xl font-semibold">Blogify</h1>
            <ul className="mr-10 flex gap-10 text-lg">
                <div className="flex items-center gap-4">
                    <label>Toggle Dark</label>
                    <input
                        type="checkbox"
                        onClick={toggleDarkMode}
                        className="opacity-50 scale-150 dark:opacity-100"
                    />
                </div>
                <Btn name={"Home"} pageNum={1} goToPage={"/"} />
                <Btn name={"Sign Up"} pageNum={2} goToPage={"/signup"} />
                <Btn name={"Sign In"} pageNum={3} goToPage={"/signin"} />
            </ul>
        </nav>
    );
}
