import { Outlet } from "react-router-dom";
import TodosArea from "./TodosArea";
// import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/store";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../../../state/store";
// import { useLocation } from "react-router-dom";
// import { updateViewState } from "../../../state/slices/viewstateSlice";

export default function TodosLayout() {
    const viewstate = useSelector((state: RootState) => { return state.viewstate });
    
    return (
        <div className="flex-1 flex flex-row gap-2 w-full">
            <TodosArea />
            <div className={`${(viewstate.sidebar) ? "hidden md:flex" : "flex"} flex-1 flex-col justify-center items-center w-full`}>
                <Outlet />
            </div>
        </div>
    )
}