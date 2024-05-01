import { Link } from "react-router-dom";

import SettingsIcon from "../../assets/settings.svg";
import NewTodoIcon from "../../assets/newtodo.svg";
import Groups from "./utils/Groups";
import Categories from "./utils/Categories";
import Priorities from "./utils/Priorities";

export default function SideBar() {
    // TODO: SideBar Mobile View

    return (
        <div className='flex flex-col justify-between items-start bg-white rounded-md shadow-lg p-3'>
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
                <div className="flex flex-row justify-center items-center gap-2">
                    <img src={SettingsIcon} alt="Groups" className="w-5" />
                    <Link to={'/dashboard/settings'} className="text-md font-medium hover:text-primary duration-300">Settings</Link>
                </div>
            </div>
        </div>
    )
}