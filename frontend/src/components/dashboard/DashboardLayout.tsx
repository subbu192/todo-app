import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

export default function DashboardLayout() {

    return (
        <div className="flex-1 flex flex-row gap-2 w-full">
            <SideBar />
            <div className="flex-1 flex flex-col justify-center items-center">
                <Outlet />
            </div>
        </div>
    )
}