import { useState } from "react";

export default function NewTodo() {
    const [ newgroup, setNewGroup ] = useState(false);
    const [ newcategory, setNewCategory ] = useState(false);
    const [ priority, setPriority ] = useState(0);

    // TODO: SideBar Mobile View

    return (
        <div className='flex flex-col justify-center items-start gap-7 bg-white rounded-md shadow-lg p-10 w-[500px]'>
            <div className="flex flex-col justify-start items-start w-full">
                <h2 className="text-xl font-medium border-b-2 border-black">New TODO</h2>
            </div>
            <div className="flex flex-col justify-start items-start gap-6 text-sm w-full">
                <div className="flex flex-col justify-start items-start gap-2 w-full">
                    <div className="flex flex-row justify-start items-center gap-2 w-full">
                        <h3 className="w-[100px] text-md font-medium">Title</h3>
                        <p>:</p>
                        <input type="text" placeholder="TODO Title" className="flex-1 px-3 py-1 border-2 border-gray-400" required />
                    </div>
                    <div className="flex flex-row justify-start items-center gap-2 w-full">
                        <h3 className="w-[100px] text-md font-medium">Description</h3>
                        <p>:</p>
                        <input type="text" placeholder="TODO Description" className="flex-1 px-3 py-1 border-2 border-gray-400" required />
                    </div>
                    <div className="flex flex-row justify-start items-center gap-2 w-full">
                        <h3 className="w-[100px] text-md font-medium">Date</h3>
                        <p>:</p>
                        <input type="date" className="flex-1 px-3 py-1 border-2 border-gray-400 w-full" required />
                    </div>
                </div>
                <div className="flex flex-col justify-start items-start gap-2 w-full">
                    <div className={`flex flex-row justify-start items-center gap-2 w-full`}>
                        <h3 className="w-[100px] text-md font-medium">Group</h3>
                        <p>:</p>
                        <div className="flex-1 flex flex-row justify-center items-center gap-2">
                            <select name="group" className="flex-1 px-3 py-1 border-2 border-gray-400">
                                <option value="None">None</option>
                                <option value="group1">Group 1</option>
                                <option value="group2">Group 2</option>
                                <option value="group3">Group 3</option>
                            </select>
                            <button onClick={() => { setNewGroup(!newgroup); }} className={`${(newgroup) ? "border-red-600 bg-red-300 hover:bg-red-400" : "border-green-600 bg-green-300 hover:bg-green-400"} px-3 py-1 border-2 shadow-lg`}>{(newgroup) ? 'Close' : 'New Group'}</button>
                        </div>
                    </div>
                    <div className={`${(newgroup) ? "block" : "hidden"} flex flex-row justify-start items-center gap-2 w-full`}>
                        <input type="text" placeholder="Group Name" className="flex-1 px-3 py-1 border-2 border-gray-400" required />
                        <button className="px-3 py-1 border-2 border-green-600 bg-green-300 hover:bg-green-400 shadow-lg">Create Group</button>
                    </div>
                </div>
                <div className="flex flex-col justify-start items-start gap-2 w-full">
                    <div className={`flex flex-row justify-start items-center gap-2 w-full`}>
                        <h3 className="w-[100px] text-md font-medium">Category</h3>
                        <p>:</p>
                        <div className="flex-1 flex flex-row justify-center items-center gap-2">
                            <select name="category" className="flex-1 px-3 py-1 border-2 border-gray-400">
                                <option value="None">None</option>
                                <option value="group1">Category 1</option>
                                <option value="group2">Category 2</option>
                                <option value="group3">Category 3</option>
                            </select>
                            <button onClick={() => { setNewCategory(!newcategory); }} className={`${(newcategory) ? "border-red-600 bg-red-300 hover:bg-red-400" : "border-green-600 bg-green-300 hover:bg-green-400"} px-3 py-1 border-2 shadow-lg`}>{(newcategory) ? 'Close' : 'New Category'}</button>
                        </div>
                    </div>
                    <div className={`${(newcategory) ? "block" : "hidden"} flex flex-row justify-start items-center gap-2 w-full`}>
                        <input type="text" placeholder="Category Name" className="flex-1 px-3 py-1 border-2 border-gray-400" required />
                        <button className="px-3 py-1 border-2 border-green-600 bg-green-300 hover:bg-green-400 shadow-lg">Create Category</button>
                    </div>
                </div>
                <div className="flex flex-col justify-start items-start gap-2 w-full">
                    <div className={`flex flex-row justify-start items-center gap-2 w-full`}>
                        <h3 className="w-[100px] text-md font-medium">Priority</h3>
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
                    <button className="px-4 py-1 border-2 border-black text-md font-medium hover:bg-black hover:text-white duration-300 shadow-lg">Add TODO</button>
                </div>
            </div>
        </div>
    )
}