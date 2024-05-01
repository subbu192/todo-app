import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import { Link, useLocation, useParams } from "react-router-dom"

export default function TodosArea() {
    const user = useSelector((state: RootState) => { return state.user });
    const params = useParams();
    const location = useLocation();

    const [ showNav, setShowNav ] = useState(false);
    const [ todos, setTodos ] = useState([]);

    const populateTodos = async () => {
        try {
            const currPath = location.pathname;
            if (currPath.startsWith('/dashboard/groups')) {
                const res = await fetch('http://localhost:4000/dashboard/groups', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ user: user, groupid: params.id })
                })
                if (res.ok) {
                    const resData = await res.json();
                    setTodos(resData.groupTodos);
                } else {
                    setTodos([]);
                }
            } else if (currPath.startsWith('/dashboard/categories')) {
                const res = await fetch('http://localhost:4000/dashboard/categories', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ user: user, categoryid: params.id })
                })
                if (res.ok) {
                    const resData = await res.json();
                    setTodos(resData.categoryTodos);
                } else {
                    setTodos([]);
                }
            } else if (currPath.startsWith('/dashboard/priority')) {
                const res = await fetch('http://localhost:4000/dashboard/priority', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ user: user, priorityid: params.id })
                })
                if (res.ok) {
                    const resData = await res.json();
                    setTodos(resData.priorityTodos);
                } else {
                    setTodos([]);
                }
            }
        } catch (err) {
            console.log(err);
            setTodos([]);
        }
    }

    useEffect(() => {
        populateTodos();
    }, [params]);

    return (
        <div className='flex-1 flex flex-col justify-start items-start gap-5 bg-white rounded-md shadow-lg p-5 w-full'>
            <div className="flex flex-col justify-start items-start">
                <h2 className="text-xl font-semibold border-l-4 border-black px-3">Your TODOs</h2>
            </div>
            <div className="flex-1 flex flex-col justify-start items-start gap-2 w-full">
                {
                    (todos.length != 0) ? (
                        todos.map((todo) => {
                            return (
                                <Link key={todo.todo_id} to={`/dashboard/todo/${todo.todo_id}`} className="flex flex-col justify-center items-start gap-1 border-2 border-gray-400 p-3 w-full hover:bg-gray-200 duration-300">
                                    <div className="flex flex-row justify-between items-center w-full">
                                        <h3 className="text-lg font-medium">{todo.todo_title}</h3>
                                        <p className="text-[13px]">{todo.todo_date}</p>
                                    </div>
                                    <p className="text-sm">{todo.todo_desc}</p>
                                </Link>
                            )
                        })
                    ) : (
                        <div className="flex-1 flex flex-col justify-center items-center w-full">
                            <p className="text-sm">No todos to show.</p>
                        </div>
                    )
                }
            </div>
            <div className="flex flex-row justify-center items-center gap-4 w-full">
                <button className={`${(todos.length > 6) ? "block" : "hidden"} border-2 border-gray-400 px-3 py-1 hover:bg-gray-200 duration-300`}>Load more.</button>
            </div>
        </div>
    )
}