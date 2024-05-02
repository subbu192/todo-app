import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AppDispatch } from "../../state/store";
import { useDispatch } from "react-redux";
import { updateUser } from "../../state/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { setCookie } from "cookies-next";
import { UserLoginSchema } from "../../utils/zodSchemas";

import { SERVER_DOMAIN } from "../../assets/config";

export default function Login() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const inputUserMail = useRef(null);
    const inputUserPass = useRef(null);

    const [ error, setError ] = useState('');

    const handleLogin = async () => {
        try {
            const usermail = inputUserMail.current.value;
            const userpass = inputUserPass.current.value;

            const zodResult = UserLoginSchema.safeParse({ usermail, userpass });
            if (!zodResult.success) {
                setError(zodResult.error.errors[0].message);
                return;
            }

            const res = await fetch(`http://${SERVER_DOMAIN}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ usermail, userpass })
            });

            const resData = await res.json();

            if (res.ok) {
                dispatch(updateUser(resData.user));
                setCookie('jwt', resData.jwt);
                navigate('/dashboard');
            } else {
                setError(resData.error);
            }
        } catch (err) {
            console.log(err);
            setError('Internal Error. Please try again.');
        }
    }

    return (
        <div className='flex flex-col justify-center items-center gap-2'>
            <div className="flex flex-col justify-center items-start">
                <h2 className="text-2xl font-semibold">Login</h2>
                <p className="text-sm">Welcome back! Login to your account.</p>
            </div>
            <div className="flex flex-col justify-center items-start gap-1 text-sm">
                <input ref={inputUserMail} type="email" placeholder="Email Address" name="usermail" className="px-4 py-2 border-2 border-gray-300 w-[240px]" required />
                <input ref={inputUserPass} type="password" placeholder="Password" name="userpass" className="px-4 py-2 border-2 border-gray-300 w-[240px]" required />
                <p className="text-[12px] text-red-500">{error}</p>
                <div className="flex flex-row justify-end items-center w-full">
                    <Link to={'/auth/forget'} className="text-[12px] hover:text-primary duration-300">Forget Password?</Link>
                </div>
                <button onClick={handleLogin} className="px-3 py-1 font-medium border-2 border-primary hover:bg-primary hover:text-white duration-300">Login</button>
            </div>
            <div className="flex flex-row justify-center items-start gap-1 text-[14px] text-gray-500">
                <p>Didn't have an account?</p>
                <Link to={'/auth/register'} className="text-black font-medium hover:text-primary duration-300">Register here.</Link>
            </div>
        </div>
    )
}