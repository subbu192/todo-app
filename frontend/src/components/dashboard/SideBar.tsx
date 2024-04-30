import { Link } from "react-router-dom";

import GroupsIcon from "../../assets/groups.svg";
import CategoriesIcon from "../../assets/category.svg";
import PriorityIcon from "../../assets/priority.svg";
import SettingsIcon from "../../assets/settings.svg";

export default function SideBar() {

    const groups: string[] = ['Group 1', 'Group 2', 'Group 3'];
    const categories: string[] = ['Category 1', 'Category 2', 'Category 3'];

    return (
        <div className='flex flex-col justify-between items-start bg-white rounded-md shadow-lg p-3'>
            <div className="flex flex-col justify-center items-start w-full">
                <div className="flex flex-col justify-center items-start gap-2 p-2 w-full">
                    <div className="flex flex-row justify-center items-center gap-2">
                        <img src={GroupsIcon} alt="Groups" className="w-5" />
                        <h3 className="text-md font-medium">Groups</h3>
                    </div>
                    <div className="flex flex-col justify-center items-start w-full pl-4">
                        {
                            groups.map((group) => {
                                return (
                                    <Link to={'#'} className="text-[14px] px-3 py-1 rounded-md hover:bg-gray-300 duration-300 w-full">{group}</Link>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="flex flex-col justify-center items-start gap-2 p-2 w-full">
                    <div className="flex flex-row justify-center items-center gap-2">
                        <img src={CategoriesIcon} alt="Groups" className="w-5" />
                        <h3 className="text-md font-medium">Categories</h3>
                    </div>
                    <div className="flex flex-col justify-center items-start w-full pl-4">
                        {
                            categories.map((category) => {
                                return (
                                    <Link to={'#'} className="text-[14px] px-3 py-1 rounded-md hover:bg-gray-300 duration-300 w-full">{category}</Link>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="flex flex-col justify-center items-start gap-4 p-2 w-full">
                    <div className="flex flex-row justify-center items-center gap-2">
                        <img src={PriorityIcon} alt="Groups" className="w-5" />
                        <h3 className="text-md font-medium">Priority</h3>
                    </div>
                    <div className="flex flex-row justify-evenly items-center gap-2 w-full text-[12px]">
                        <button className="px-3 py-1 bg-red-300 hover:bg-red-400 rounded-md duration-300">High</button>
                        <button className="px-3 py-1 bg-orange-300 hover:bg-orange-400 rounded-md duration-300">Medium</button>
                        <button className="px-3 py-1 bg-green-300 hover:bg-green-400 rounded-md duration-300">Low</button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center items-start gap-4 p-2 w-full">
                <div className="flex flex-row justify-center items-center gap-2">
                    <img src={SettingsIcon} alt="Groups" className="w-5" />
                    <Link to={'/dashboard/settings'} className="text-md font-medium hover:text-primary duration-300">Settings</Link>
                </div>
            </div>
        </div>
    )
}