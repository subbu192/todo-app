import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import { Link, useLocation, useParams } from "react-router-dom"
import { getCookie } from "cookies-next";

import { SERVER_DOMAIN } from "../../../assets/config";

export default function TodosArea() {
    const user = useSelector((state: RootState) => { return state.user });
    const viewstate = useSelector((state: RootState) => { return state.viewstate });

    const params = useParams();
    const location = useLocation();

    const [ todos, setTodos ] = useState([]);

    const jwtToken = getCookie('jwt');

    const populateTodos = async () => {
        try {
            const currPath = location.pathname;
            if (currPath.startsWith('/dashboard/groups')) {
                const res = await fetch(`${SERVER_DOMAIN}/dashboard/groups`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${jwtToken}`
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
                const res = await fetch(`${SERVER_DOMAIN}/dashboard/categories`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${jwtToken}`
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
                const res = await fetch(`${SERVER_DOMAIN}/dashboard/priority`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${jwtToken}`
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

    const populateTodosInit = async () => {
        const res = await fetch(`${SERVER_DOMAIN}/dashboard/todos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwtToken}`
            },
            body: JSON.stringify({ user: user })
        })
        if (res.ok) {
            const resData = await res.json();
            setTodos(resData.todosData);
        } else {
            console.log('Hello ');
            setTodos([]);
        }
    }

    useEffect(() => {
        populateTodosInit();
    }, [])

    return (
        <div className={`flex-1 flex flex-col justify-start items-start gap-5 bg-white rounded-md shadow-lg p-5 w-full`}>
            <div className="flex flex-col justify-start items-start w-full">
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
                                        <p className={`${((viewstate.sidebar) ? "hidden md:block" : "block")} text-[13px]`}>{todo.todo_date}</p>
                                    </div>
                                    <p className={`text-sm`}>{todo.todo_desc}</p>
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