import { Outlet, useLocation } from "react-router-dom";
import TodosArea from "./TodosArea";

export default function TodosLayout() {
    const location = useLocation();

    const isTodoDetails = location.pathname.startsWith('/dashboard/todo');

    return (
        <div className="flex-1 flex flex-row gap-2 w-full">
            <div className={`${(isTodoDetails) ? 'hidden md:flex' : 'flex'} flex-1 flex-col justify-center items-center w-full`}>
                <TodosArea />
            </div>
            <div className={`${(isTodoDetails) ? 'flex' : 'hidden md:flex'} flex-1 flex-col justify-center items-center w-full`}>
                <Outlet />
            </div>
        </div>
    )
}