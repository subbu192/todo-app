import { Link } from "react-router-dom";

import NewTodoIcon from "../../assets/newtodo.svg";
import Groups from "./utils/Groups";
import Categories from "./utils/Categories";
import Priorities from "./utils/Priorities";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";

export default function SideBar() {
    const viewstate = useSelector((state: RootState) => { return state.viewstate });

    return (
        <div className={`${(viewstate.sidebar) ? "flex" : "hidden md:flex"} z-10 flex flex-col justify-between items-start bg-white rounded-md shadow-lg p-3`}>
            <div className="flex flex-col justify-center items-start w-full">
                <Groups />
                <Categories />
                <Priorities />
            </div>
            <div className="flex flex-col justify-center items-start gap-4 p-2 w-full">
                <div className="flex flex-row justify-center items-center gap-2">
                    <img src={NewTodoIcon} alt="Groups" className="w-5" />
                    <Link to={'/dashboard/newtodo'} className="text-md font-medium hover:text-primary duration-300">New TODO</Link>
                </div>
            </div>
        </div>
    )
}