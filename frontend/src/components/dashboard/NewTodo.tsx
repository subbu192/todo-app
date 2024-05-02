import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { TodoSchema } from "../../utils/zodSchemas";

import { SERVER_DOMAIN } from "../../assets/config";

export default function NewTodo() {
    const user = useSelector((state: RootState) => { return state.user });

    const [ newgroup, setNewGroup ] = useState(false);
    const [ newcategory, setNewCategory ] = useState(false);
    const [ priority, setPriority ] = useState(0);
    const [ message, setMessage ] = useState('');
    const [ error, setError ] = useState('');

    const titleInput = useRef(null);
    const descInput = useRef(null);
    const dateInput = useRef(null);
    const groupInput = useRef(null);
    const categoryInput = useRef(null);
    const newGroupInput = useRef(null);
    const newCategoryInput = useRef(null);

    const [ groups, setGroups ] = useState([]);
    const [ categories, setCategories ] = useState([]);

    const populateGroups = async () => {
        try {
            const res = await fetch(`http://${SERVER_DOMAIN}/dashboard/getgroups`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user })
            })

            if (res.ok) {
                const resData = await res.json();
                setGroups(resData.groupData);
            } else {
                setGroups([]);
            }
        } catch (err) {
            console.log(err);
            setGroups([]);
        }
    }

    const populateCategories = async () => {
        try {
            const res = await fetch(`http://${SERVER_DOMAIN}/dashboard/getcategories`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user })
            })

            if (res.ok) {
                const resData = await res.json();
                setCategories(resData.categoryData);
            } else {
                setCategories([]);
            }
        } catch (err) {
            console.log(err);
            setCategories([]);
        }
    }

    useEffect(() => {
        populateGroups();
        populateCategories();
    }, []);

    const addNewGroup = async () => {
        try {
            const res = await fetch(`http://${SERVER_DOMAIN}/todo/newgroup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user, groupName: newGroupInput.current.value })
            })

            if (res.ok) {
                const resData = await res.json();
                setGroups([...groups, resData.newGroup]);
                setNewGroup(false);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const addNewCategory = async () => {
        try {
            const res = await fetch(`http://${SERVER_DOMAIN}/todo/newcategory`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user, categoryName: newCategoryInput.current.value })
            })

            if (res.ok) {
                const resData = await res.json();
                setCategories([...categories, resData.newCategory]);
                setNewCategory(false);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleNewTodo = async () => {
        try {
            const newTodo = {
                todo_title: titleInput.current.value,
                todo_desc: descInput.current.value,
                todo_date: dateInput.current.value,
                todo_group: groupInput.current.value,
                todo_category: categoryInput.current.value,
                todo_priority: priority,
                userid: user.userid
            }

            const zodResult = TodoSchema.safeParse(newTodo);
            if (!zodResult.success) {
                setError(zodResult.error.errors[0].message);
                return;
            }

            const res = await fetch(`http://${SERVER_DOMAIN}/todo/newtodo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user, todo: newTodo })
            })

            if (res.ok) {
                setError('');
                setMessage('TODO added.');
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='flex flex-col justify-center items-start gap-7 bg-white rounded-md shadow-lg p-10'>
            <div className="flex flex-col justify-start items-start w-full">
                <h2 className="text-xl font-medium border-b-2 border-black">New TODO</h2>
            </div>
            <div className="flex flex-col justify-start items-start gap-6 text-sm w-full">
                <div className="flex flex-col justify-start items-start gap-2 w-full">
                    <div className="flex flex-row justify-start items-center gap-2 w-full">
                        <h3 className="md:w-[100px] text-md font-medium">Title</h3>
                        <p>:</p>
                        <input ref={titleInput} type="text" placeholder="TODO Title" className="flex-1 px-3 py-1 border-2 border-gray-400" required />
                    </div>
                    <div className="flex flex-row justify-start items-center gap-2 w-full">
                        <h3 className="md:w-[100px] text-md font-medium">Description</h3>
                        <p>:</p>
                        <input ref={descInput} type="text" placeholder="TODO Description" className="flex-1 px-3 py-1 border-2 border-gray-400" required />
                    </div>
                    <div className="flex flex-row justify-start items-center gap-2 w-full">
                        <h3 className="md:w-[100px] text-md font-medium">Date</h3>
                        <p>:</p>
                        <input ref={dateInput} type="date" className="flex-1 px-3 py-1 border-2 border-gray-400 w-full" required />
                    </div>
                </div>
                <div className="flex flex-col justify-start items-start gap-2 w-full">
                    <div className={`flex flex-row justify-start items-center gap-2 w-full`}>
                        <h3 className="md:w-[100px] text-md font-medium">Group</h3>
                        <p>:</p>
                        <div className="flex-1 flex flex-row justify-center items-center gap-2">
                            <select ref={groupInput} name="group" className="flex-1 px-3 py-1 border-2 border-gray-400">
                                <option value={1}>None</option>
                                {
                                    groups.map((group) => {
                                        return (
                                            <option key={group.group_id} value={group.group_id}>{group.group_name}</option>
                                        )
                                    })
                                }
                            </select>
                            <button onClick={() => { setNewGroup(!newgroup); }} className={`${(newgroup) ? "border-red-600 bg-red-300 hover:bg-red-400" : "border-green-600 bg-green-300 hover:bg-green-400"} px-3 py-1 border-2 shadow-lg`}>{(newgroup) ? 'Close' : 'New Group'}</button>
                        </div>
                    </div>
                    <div className={`${(newgroup) ? "block" : "hidden"} flex flex-row justify-start items-center gap-2 w-full`}>
                        <input ref={newGroupInput} type="text" placeholder="Group Name" className="flex-1 px-3 py-1 border-2 border-gray-400" required />
                        <button onClick={addNewGroup} className="px-3 py-1 border-2 border-green-600 bg-green-300 hover:bg-green-400 shadow-lg">Create Group</button>
                    </div>
                </div>
                <div className="flex flex-col justify-start items-start gap-2 w-full">
                    <div className={`flex flex-row justify-start items-center gap-2 w-full`}>
                        <h3 className="md:w-[100px] text-md font-medium">Category</h3>
                        <p>:</p>
                        <div className="flex-1 flex flex-row justify-center items-center gap-2">
                            <select ref={categoryInput} name="category" className="flex-1 px-3 py-1 border-2 border-gray-400">
                                <option value={1}>None</option>
                                {
                                    categories.map((category) => {
                                        return (
                                            <option key={category.category_id} value={category.category_id}>{category.category_name}</option>
                                        )
                                    })
                                }
                            </select>
                            <button onClick={() => { setNewCategory(!newcategory); }} className={`${(newcategory) ? "border-red-600 bg-red-300 hover:bg-red-400" : "border-green-600 bg-green-300 hover:bg-green-400"} px-3 py-1 border-2 shadow-lg`}>{(newcategory) ? 'Close' : 'New Category'}</button>
                        </div>
                    </div>
                    <div className={`${(newcategory) ? "block" : "hidden"} flex flex-row justify-start items-center gap-2 w-full`}>
                        <input ref={newCategoryInput} type="text" placeholder="Category Name" className="flex-1 px-3 py-1 border-2 border-gray-400" required />
                        <button onClick={addNewCategory} className="px-3 py-1 border-2 border-green-600 bg-green-300 hover:bg-green-400 shadow-lg">Create Category</button>
                    </div>
                </div>
                <div className="flex flex-col justify-start items-start gap-2 w-full">
                    <div className={`flex flex-row justify-start items-center gap-2 w-full`}>
                        <h3 className="md:w-[100px] text-md font-medium">Priority</h3>
                        <p>:</p>
                        <div className="flex-1 flex flex-row justify-start items-center gap-2">
                            <button onClick={() => { setPriority(1); }} className={`${(priority == 1) ? "bg-red-400 border-red-600" : "bg-red-300 border-white" } px-3 py-1 border-2 hover:bg-red-400 duration-300 rounded-md`}>High</button>
                            <button onClick={() => { setPriority(2); }} className={`${(priority == 2) ? "bg-orange-400 border-orange-600" : "bg-orange-300 border-white" } px-3 py-1 border-2 hover:bg-orange-400 duration-300 rounded-md`}>Medium</button>
                            <button onClick={() => { setPriority(3); }} className={`${(priority == 3) ? "bg-green-400 border-green-600" : "bg-green-300 border-white" } px-3 py-1 border-2 hover:bg-green-400 duration-300 rounded-md`}>Low</button>
                            <button onClick={() => { setPriority(0); }} className={`${(priority == 0) ? "bg-gray-400 border-gray-600" : "bg-gray-300 border-white" } px-3 py-1 border-2 hover:bg-gray-400 duration-300 rounded-md`}>None</button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-start items-center w-full">
                    <button onClick={handleNewTodo} className="px-4 py-1 border-2 border-black text-md font-medium hover:bg-black hover:text-white duration-300 shadow-lg">Add TODO</button>
                </div>
                <div className={`${(message != '') ? "block" : "hidden"} flex flex-row justify-start items-center w-full`}>
                    <p className="text-green-500">{message}</p>
                </div>
                <div className={`${(error != '') ? "block" : "hidden"} flex flex-row justify-start items-center w-full`}>
                    <p className="text-red-500">{error}</p>
                </div>
            </div>
        </div>
    )
}