import { useState } from "react"
import { Link } from "react-router-dom"

export default function TodosArea() {
    const [ showNav, setShowNav ] = useState(false);

    return (
        <div className='flex-1 flex flex-col justify-start items-start gap-5 bg-white rounded-md shadow-lg p-5 w-full'>
            <div className="flex flex-col justify-start items-start">
                <h2 className="text-xl font-semibold border-l-4 border-black px-3">Your TODOs</h2>
            </div>
            <div className="flex-1 flex flex-col justify-start items-start gap-2 w-full">
                <Link to={'/dashboard/todos/1'} className="flex flex-col justify-center items-start gap-1 border-2 border-gray-400 p-3 w-full hover:bg-gray-200 duration-300">
                    <div className="flex flex-row justify-between items-center w-full">
                        <h3 className="text-lg font-medium">TODO Title</h3>
                        <p className="text-[13px]">01-05-2024</p>
                    </div>
                    <p className="text-sm">TODO Description</p>
                </Link>
                <Link to={'/dashboard/todos/1'} className="flex flex-col justify-center items-start gap-1 border-2 border-gray-400 p-3 w-full hover:bg-gray-200 duration-300">
                    <div className="flex flex-row justify-between items-center w-full">
                        <h3 className="text-lg font-medium">TODO Title</h3>
                        <p className="text-[13px]">01-05-2024</p>
                    </div>
                    <p className="text-sm">TODO Description</p>
                </Link>
                <Link to={'/dashboard/todos/1'} className="flex flex-col justify-center items-start gap-1 border-2 border-gray-400 p-3 w-full hover:bg-gray-200 duration-300">
                    <div className="flex flex-row justify-between items-center w-full">
                        <h3 className="text-lg font-medium">TODO Title</h3>
                        <p className="text-[13px]">01-05-2024</p>
                    </div>
                    <p className="text-sm">TODO Description</p>
                </Link>
                <Link to={'/dashboard/todos/1'} className="flex flex-col justify-center items-start gap-1 border-2 border-gray-400 p-3 w-full hover:bg-gray-200 duration-300">
                    <div className="flex flex-row justify-between items-center w-full">
                        <h3 className="text-lg font-medium">TODO Title</h3>
                        <p className="text-[13px]">01-05-2024</p>
                    </div>
                    <p className="text-sm">TODO Description</p>
                </Link>
                <Link to={'/dashboard/todos/1'} className="flex flex-col justify-center items-start gap-1 border-2 border-gray-400 p-3 w-full hover:bg-gray-200 duration-300">
                    <div className="flex flex-row justify-between items-center w-full">
                        <h3 className="text-lg font-medium">TODO Title</h3>
                        <p className="text-[13px]">01-05-2024</p>
                    </div>
                    <p className="text-sm">TODO Description</p>
                </Link>
            </div>
            <div className="flex flex-row justify-center items-center gap-4 w-full">
                <button className={`${(showNav) ? "block" : "hidden"} border-2 border-gray-400 px-3 py-1 hover:bg-gray-200 duration-300`}>Load more.</button>
            </div>
        </div>
    )
}