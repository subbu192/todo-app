import { Outlet } from "react-router-dom";

export default function MainLayout() {

    return (
        <div className="p-10 bg-white rounded-md shadow-lg">
            <Outlet />
        </div>
    )
}