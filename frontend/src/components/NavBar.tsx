import { Link, useLocation, useNavigate } from "react-router-dom";
import MainLogo from "../assets/mainlogo.svg";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { updateUser } from "../state/slices/userSlice";
import { deleteCookie } from "cookies-next";

import MenuIcon from "../assets/menu.svg";
import BackIcon from "../assets/back.svg";
import { updateViewState } from "../state/slices/viewstateSlice";

export default function NavBar() {
    const user = useSelector((state: RootState) => { return state.user });
    const viewstate = useSelector((state: RootState) => { return state.viewstate });
    const dispatch = useDispatch<AppDispatch>();

    const navigate = useNavigate();
    const location = useLocation();

    const currPath = location.pathname;

    const handleLogout = () => {
        dispatch(updateUser({
            userid: 0,
            username: '',
            usermail: ''
        }));
        deleteCookie('jwt');
    }

    const handleSidebar = () => {
        dispatch(
            updateViewState({
                sidebar: !viewstate.sidebar,
                todoarea: viewstate.todoarea,
                tododetails: viewstate.tododetails
            })
        )
    }

    const handleBack = () => {
        navigate(-1);
    }

    return (
        <div className='flex flex-row justify-between items-center bg-white px-4 py-3 mb-2 rounded-md shadow-lg'>
            <div className="flex flex-row justify-center items-center gap-2">
                {
                    (user.username != '') ? (
                        <>
                        <button onClick={handleBack} className={`${(!currPath.startsWith('/dashboard/todo')) ? "hidden" : "flex md:hidden"} flex-row justify-center items-center p-1 rounded-full gap-2 hover:bg-gray-300 duration-300`}>
                            <img src={BackIcon} alt="Menu" className="w-5 h-5 object-cover" />
                        </button>
                        <button onClick={handleSidebar} className="md:hidden flex flex-row justify-center items-center p-1 rounded-full gap-2 hover:bg-gray-300 duration-300">
                            <img src={MenuIcon} alt="Menu" className="w-5 h-5 object-cover" />
                        </button>
                        </>
                    ) : (
                        <></>
                    )
                }
                <Link to={`${(user.username != '') ? "/dashboard" : "/"}`} className="flex flex-row justify-center items-center gap-2 hover:text-primary duration-300">
                    <img src={MainLogo} alt="TODO APP Logo" className="w-7 h-7 object-cover" />
                    <p className="text-xl font-bold">TODO</p>
                </Link>
            </div>
            {
                (user.username != '') ? (
                    <div className="flex flex-row justify-center items-center gap-2 text-sm">
                        <Link to={'/dashboard'} className="flex flex-row justify-center items-center gap-2 font-medium hover:text-primary duration-300">
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