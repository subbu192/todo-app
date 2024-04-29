import { Link } from "react-router-dom";
import MainLogo from "../assets/mainlogo.svg";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";

export default function NavBar() {
    const user = useSelector((state: RootState) => { return state.user });

    const username: string = 'Subramanyam';

    const isAuthenticated: boolean = false;

    return (
        <div className='flex flex-row justify-between items-center bg-white px-7 py-3 mb-2 rounded-md shadow-lg'>
            <Link to={'/'} className="flex flex-row justify-center items-center gap-2 hover:text-primary duration-300">
                <img src={MainLogo} alt="TODO APP Logo" className="w-7 h-7 object-cover" />
                <p className="text-xl font-bold">TODO</p>
            </Link>

            {
                (user.username != '') ? (
                    <div className="flex flex-row justify-center items-center gap-2 text-sm">
                        <Link to={'/dashboard/profile'} className="flex flex-row justify-center items-center gap-2 font-medium hover:text-primary duration-300">
                            {user.username}
                        </Link>
                        <p>|</p>
                        <button className="font-medium hover:text-primary duration-300">Logout</button>
                    </div>
                ) : (
                    <div className="flex flex-row justify-center items-center gap-1 text-sm">
                        <Link to={'/auth/login'} className="px-3 py-1 font-medium hover:text-primary duration-300">Login</Link>
                        <p>|</p>
                        <Link to={'/auth/register'} className="px-3 py-1 font-medium hover:text-primary duration-300">Register</Link>
                    </div>
                )
            }
        </div>
    )
}