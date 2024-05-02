import { Link } from "react-router-dom";
import { useRef, useState } from "react";

import { UserRegisterSchema } from "../../utils/zodSchemas";

import { SERVER_DOMAIN } from "../../assets/config";

export default function Register() {
    const inputUserName = useRef(null);
    const inputUserMail = useRef(null);
    const inputUserPass = useRef(null);

    const [ error, setError ] = useState('');
    const [ message, setMessage ] = useState('');

    const handleRegister = async () => {
        try {
            const username = inputUserName.current.value;
            const usermail = inputUserMail.current.value;
            const userpass = inputUserPass.current.value;

            const zodResult = UserRegisterSchema.safeParse({ username, usermail, userpass });
            if (!zodResult.success) {
                setError(zodResult.error.errors[0].message);
                return;
            }

            const res = await fetch(`http://${SERVER_DOMAIN}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, usermail, userpass })
            });

            const resData = await res.json();

            if (res.ok) {
                setMessage(resData.message);
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
                <h2 className="text-2xl font-semibold">Register</h2>
                <p className="text-sm">Welcome to TODO! Create an account.</p>
            </div>
            <div className="flex flex-col justify-center items-start gap-1 text-sm">
                <input ref={inputUserName} type="text" placeholder="Username" name="username" className="px-4 py-2 border-2 border-gray-300 w-[240px]" required />
                <input ref={inputUserMail} type="email" placeholder="Email Address" name="usermail" className="px-4 py-2 border-2 border-gray-300 w-[240px]" required />
                <input ref={inputUserPass} type="password" placeholder="Password" name="userpass" className="px-4 py-2 border-2 border-gray-300 w-[240px]" required />
                <p className="text-[12px] text-red-500">{error}</p>
                <p className="text-[12px] text-green-500">{message}</p>
                <button onClick={handleRegister} className="mt-1 px-3 py-1 font-medium border-2 border-primary hover:bg-primary hover:text-white duration-300">Register</button>
            </div>
            <div className="flex flex-row justify-center items-start gap-1 text-[14px] text-gray-500">
                <p>Already have an account?</p>
                <Link to={'/auth/login'} className="text-black font-medium hover:text-primary duration-300">Login here.</Link>
            </div>
        </div>
    )
}