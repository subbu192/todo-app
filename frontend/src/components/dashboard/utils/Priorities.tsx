import { Link } from "react-router-dom";

import PriorityIcon from "../../../assets/priority.svg";

export default function Priorities() {

    return (
        <div className="flex flex-col justify-center items-start gap-4 p-2 w-full">
            <div className="flex flex-row justify-center items-center gap-2">
                <img src={PriorityIcon} alt="Groups" className="w-5" />
                <h3 className="text-md font-medium">Priority</h3>
            </div>
            <div className="flex flex-row justify-evenly items-center gap-2 w-full text-[12px]">
                <Link to={'/dashboard/priority/1'} className="px-3 py-1 bg-red-300 hover:bg-red-400 rounded-md duration-300">High</Link>
                <Link to={'/dashboard/priority/2'} className="px-3 py-1 bg-orange-300 hover:bg-orange-400 rounded-md duration-300">Medium</Link>
                <Link to={'/dashboard/priority/3'} className="px-3 py-1 bg-green-300 hover:bg-green-400 rounded-md duration-300">Low</Link>
            </div>
        </div>
    )
}