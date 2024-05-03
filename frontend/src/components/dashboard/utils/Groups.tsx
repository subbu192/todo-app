import { Link } from "react-router-dom";

import GroupsIcon from "../../../assets/groups.svg";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/store";

import { SERVER_DOMAIN } from "../../../assets/config";
import { getCookie } from "cookies-next";

export default function Groups() {
    const user = useSelector((state: RootState) => { return state.user });

    const populateGroups = async () => {
        try {
            const jwtToken = getCookie('jwt');

            const res = await fetch(`${SERVER_DOMAIN}/dashboard/getgroups`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwtToken}`
                },
                body: JSON.stringify({ user })
            })

            if (res.ok) {
                const resData = await res.json();
                setGroups(resData.groupData);
            } else {
                setGroups([]);
            }
        } catch (err) {
            console.log(err);
            setGroups([]);
        }
    }

    const [ groups, setGroups ] = useState([]);

    useEffect(() => {
        populateGroups();
    }, []);

    return (
        <div className="flex flex-col justify-center items-start gap-2 p-2 w-full">
            <div className="flex flex-row justify-center items-center gap-2">
                <img src={GroupsIcon} alt="Groups" className="w-5" />
                <h3 className="text-md font-medium">Groups</h3>
            </div>
            <div className="flex flex-col justify-center items-start w-full pl-4">
                {
                    (groups.length != 0) ? (
                        groups.map((group) => {
                            return (
                                <Link key={group.group_id} to={`/dashboard/groups/${group.group_id}`} className="text-[14px] px-3 py-1 rounded-md hover:bg-gray-300 duration-300 w-full">{group.group_name}</Link>
                            )
                        })
                    ) : (
                        <div className="flex flex-col justify-center items-center px-3">
                            <p className="text-[12px]">No Groups</p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}