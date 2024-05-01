import { Link } from "react-router-dom";

import GroupsIcon from "../../../assets/groups.svg";

export default function Groups() {
    const groups: string[] = ['Group 1', 'Group 2', 'Group 3'];

    return (
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
    )
}