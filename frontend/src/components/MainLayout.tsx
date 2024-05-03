import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import NavBar from "./NavBar";
import { Navigate } from "react-router-dom";

export default function MainLayout() {
    const user = useSelector((state: RootState) => { return state.user });
    const location = useLocation();
    
    const currPath = location.pathname;

    return (
        <div className="flex flex-col h-screen bg-gray-300 p-3">
            <NavBar />
            <div className='flex-1 flex flex-col justify-center items-center'>
                {
                    (currPath.startsWith('/auth') && user.username == '') ? <Outlet /> : (user.username != '') ? (currPath.startsWith('/auth') || currPath == '/') ? (<Navigate to="/dashboard" />) : <Outlet /> : (currPath.startsWith('/auth') || currPath == '/') ? <Outlet /> : <Navigate to="/auth/login" />
                }
            </div>
        </div>
    )
}