import { Link } from "react-router-dom";

import CategoriesIcon from "../../../assets/category.svg";

export default function Categories() {
    const categories: string[] = ['Category 1', 'Category 2', 'Category 3'];

    return (
        <div className="flex flex-col justify-center items-start gap-2 p-2 w-full">
            <div className="flex flex-row justify-center items-center gap-2">
                <img src={CategoriesIcon} alt="Groups" className="w-5" />
                <h3 className="text-md font-medium">Categories</h3>
            </div>
            <div className="flex flex-col justify-center items-start w-full pl-4">
                {
                    categories.map((category) => {
                        return (
                            <Link to={'#'} className="text-[14px] px-3 py-1 rounded-md hover:bg-gray-300 duration-300 w-full">{category}</Link>
                        )
                    })
                }
            </div>
        </div>
    )
}