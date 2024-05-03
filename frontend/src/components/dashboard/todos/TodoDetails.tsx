import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import { getCookie } from "cookies-next";

export default function TodoDetails() {
    const user = useSelector((state: RootState) => { return state.user });

    const [ todoData, setTodoData ] = useState([]);
    const [ gcData, setGCData ] = useState({});

    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const priorities = ['High', 'Medium', 'Low'];
    const priorityColor = ['red', 'orange', 'green'];

    const jwtToken = getCookie('jwt');

    const handleDeleteTodo = async () => {
        try {
            const res = await fetch('http://localhost:4000/todo/deleteTodo', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwtToken}`
                },
                body: JSON.stringify({ user: user, todo: todoData[0] })
            })

            if (res.ok) {
                navigate(`/dashboard`);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const getGroupAndCategory = async (todo: any) => {
        // getGC -> get Group and Category
        try {
            const res = await fetch('http://localhost:4000/dashboard/getGC', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwtToken}`
                },
                body: JSON.stringify({ user: user, todo: todo })
            })

            if (res.ok) {
                const resData = await res.json();
                setGCData(resData.gcData);
            } else {
                setGCData({});
            }
        } catch (err) {
            console.log(err);
            setGCData({});
        }
    }

    const updateDetails = async () => {
        try {
            const currPath = location.pathname;
            if (currPath.startsWith('/dashboard/todo')) {
                const res = await fetch('http://localhost:4000/dashboard/gettodo', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${jwtToken}`
                    },
                    body: JSON.stringify({ user: user, todoid: params.id })
                })
                if (res.ok) {
                    const resData = await res.json();
                    getGroupAndCategory(resData.todoData[0]);
                    setTodoData(resData.todoData);
                } else {
                    setTodoData([]);
                }
            }
        } catch (err) {
            console.log(err);
            setTodoData([]);
        }
    }

    useEffect(() => {
        updateDetails();
    }, [params]);

    return (
        <div className={`flex-1 flex flex-col justify-center items-center bg-white rounded-md shadow-lg w-full`}>
            {
                (todoData.length != 0) ? (
                    <div className="flex-1 flex flex-col justify-between items-start w-full p-5">
                        <div className="flex flex-col justify-start items-start gap-4 w-full">
                            <div className="flex flex-col justify-start items-start">
                                <h2 className="text-xl font-semibold border-l-4 border-black px-3">TODO Details</h2>
                            </div>
                            <div className="flex flex-col justify-start items-start gap-6">
                                <div className="flex flex-col justify-start items-start">
                                    <h3 className="text-[17px] font-medium">Title:</h3>
                                    <p className="text-[14px]">{todoData[0].todo_title}</p>
                                </div>
                                <div className="flex flex-col justify-start items-start">
                                    <h3 className="text-[17px] font-medium">Description:</h3>
                                    <p className="text-[14px]">{todoData[0].todo_desc}</p>
                                </div>
                                <div className="flex flex-row justify-start items-center gap-3 w-full">
                                    <h3 className="text-[17px] font-medium md:w-[100px]">Date</h3>
                                    <p>:</p>
                                    <Link to={'#'} className={`px-3 py-1 text-[13px] bg-gray-300 hover:bg-gray-400 rounded-lg`}>{todoData[0].todo_date}</Link>
                                </div>
                                <div className="flex flex-row justify-start items-center gap-3 w-full">
                                    <h3 className="text-[17px] font-medium md:w-[100px]">Group</h3>
                                    <p>:</p>
                                    <Link to={`/dashboard/groups/${todoData[0].todo_group}`} className={`px-3 py-1 text-[13px] bg-gray-300 hover:bg-gray-400 rounded-lg`}>{gcData.groupName}</Link>
                                </div>
                                <div className="flex flex-row justify-start items-center gap-3 w-full">
                                    <h3 className="text-[17px] font-medium md:w-[100px]">Category</h3>
                                    <p>:</p>
                                    <Link to={`/dashboard/categories/${todoData[0].todo_category}`} className={`px-3 py-1 text-[13px] bg-gray-300 hover:bg-gray-400 rounded-lg`}>{gcData.categoryName}</Link>
                                </div>
                                <div className="flex flex-row justify-start items-center gap-3 w-full">
                                    <h3 className="text-[17px] font-medium md:w-[100px]">Priority</h3>
                                    <p>:</p>
                                    <Link to={`/dashboard/priority/${todoData[0].todo_priority}`} className={`px-3 py-1 text-[13px] bg-${priorityColor[todoData[0].todo_priority - 1]}-300 hover:bg-${priorityColor[todoData[0].todo_priority - 1]}-400 rounded-lg`}>{priorities[todoData[0].todo_priority - 1]}</Link>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row justify-center items-center w-full">
                            <button onClick={handleDeleteTodo} className="px-3 py-1 bg-red-300 hover:bg-red-400 rounded-md shadow-lg w-full">Delete this TODO</button>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col justify-center items-center">
                        <p>Select a TODO to see details.</p>
                    </div>
                )
            }
        </div>
    )
}