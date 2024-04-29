import { Outlet } from "react-router-dom";

import NavBar from "./NavBar";

export default function MainLayout() {

    return (
        <div className="flex flex-col min-h-screen bg-gray-300 p-3">
            <NavBar />
            <div className='flex-1 flex flex-col justify-center items-center'>
                <Outlet />
            </div>
        </div>
    )
}