import { Link } from "react-router-dom"

export default function Register() {

    return (
        <div className='flex flex-col justify-center items-center gap-2'>
            <div className="flex flex-col justify-center items-start">
                <h2 className="text-2xl font-semibold">Register</h2>
                <p className="text-sm">Welcome to TODO! Create an account.</p>
            </div>
            <form className="flex flex-col justify-center items-start gap-1 text-sm">
                <input type="text" placeholder="Username" name="username" className="px-4 py-2 border-2 border-gray-300 w-[240px]" required />
                <input type="email" placeholder="Email Address" name="usermail" className="px-4 py-2 border-2 border-gray-300 w-[240px]" required />
                <input type="password" placeholder="Password" name="userpass" className="px-4 py-2 border-2 border-gray-300 w-[240px]" required />
                <p className="text-[12px] text-red-500">Error Message</p>
                <button type="submit" className="mt-1 px-3 py-1 font-medium border-2 border-primary hover:bg-primary hover:text-white duration-300">Register</button>
            </form>
            <div className="flex flex-row justify-center items-start gap-1 text-[14px] text-gray-500">
                <p>Already have an account?</p>
                <Link to={'/auth/login'} className="text-black font-medium hover:text-primary duration-300">Login here.</Link>
            </div>
        </div>
    )
}