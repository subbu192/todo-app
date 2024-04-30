import MainLogo from "../assets/mainlogo.svg";

export default function Home() {

    return (
        <div className='flex flex-col justify-center items-center gap-3 bg-white rounded-md shadow-lg p-10'>
            <img src={MainLogo} alt="Main Logo" className="w-[100px] h-[100px]" />
            <h1 className="text-3xl font-bold">TODO APP</h1>
            <p className="text-sm">Welcome to TODO - Your Gateway to Productive Living</p>
        </div>
    )
}