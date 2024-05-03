import { Link } from "react-router-dom"

export default function ErrorPage() {

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-300">
            <div className="flex flex-col justify-center items-center gap-4 bg-white rounded-md p-5 shadow-lg text-black">
                <p>Error 404: Page not found.</p>
                <Link to={'/'} className="px-3 py-1 border-2 border-primary rounded-md hover:bg-primary hover:text-white duration-300">Go to Home</Link>
            </div>
        </div>
    )
}