import { Outlet } from "react-router-dom";

export default function MainAreaLayout() {

    return (
        <div className="flex-1 flex flex-row gap-2 w-full">
            <Outlet />
        </div>
    )
}