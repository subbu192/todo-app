import MainLogo from "../assets/mainlogo.svg";

export default function Home() {

    return (
        <div className='flex flex-col justify-center items-center gap-3 bg-white rounded-md shadow-lg p-5'>
            <img src={MainLogo} alt="Main Logo" className="w-[100px] h-[100px]" />
            <h1 className="text-3xl font-bold">TODO APP</h1>
            <div className="flex flex-row justify-center items-center gap-1">
                <p className="text-sm hidden md:block">Welcome to TODO</p>
                <p className="text-sm hidden md:block">-</p>
                <p className="text-sm">Your Gateway to Productive Living</p>
            </div>
        </div>
    )
}