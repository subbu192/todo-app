import { Outlet } from "react-router-dom";
import TodosArea from "./TodosArea";

export default function TodosLayout() {

    return (
        <div className="flex-1 flex flex-row gap-2 w-full">
            <TodosArea />
            <div className="flex flex-col justify-center items-center">
                <Outlet />
            </div>
        </div>
    )
}