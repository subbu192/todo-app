import { Outlet, useLocation } from "react-router-dom";
import SideBar from "./SideBar";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { useEffect } from "react";
import { updateViewState } from "../../state/slices/viewstateSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../state/store";

export default function DashboardLayout() {
    // const viewstate = useSelector((state: RootState) => { return state.viewstate });
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation();

    useEffect(() => {
        dispatch(updateViewState({
            sidebar: false,
            todoarea: true,
            tododetails: false
        }))
    }, [location.pathname]);

    return (
        <div className="flex-1 flex flex-row gap-2 w-full">
            <SideBar />
            <div className={`flex-1 flex flex-col justify-center items-center`}>
                <Outlet />
            </div>
        </div>
    )
}