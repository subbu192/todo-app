import { Link } from "react-router-dom";
import MainLogo from "../assets/mainlogo.svg";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { updateUser } from "../state/slices/userSlice";
import { deleteCookie } from "cookies-next";

export default function NavBar() {
    const user = useSelector((state: RootState) => { return state.user });
    const dispatch = useDispatch<AppDispatch>();

    const handleLogout = () => {
        dispatch(updateUser({
            userid: 0,
            username: '',
            usermail: ''
        }));
        deleteCookie('jwt');
    }

    return (
        <div className='flex flex-row justify-between items-center bg-white px-7 py-3 mb-2 rounded-md shadow-lg'>
            <Link to={`${(user.username != '') ? "/dashboard" : "/"}`} className="flex flex-row justify-center items-center gap-2 hover:text-primary duration-300">
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
                        <button onClick={handleLogout} className="font-medium hover:text-primary duration-300">Logout</button>
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