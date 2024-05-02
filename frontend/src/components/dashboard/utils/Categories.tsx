import { Link } from "react-router-dom";

import CategoriesIcon from "../../../assets/category.svg";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/store";

import { SERVER_DOMAIN } from "../../../assets/config";

export default function Categories() {
    const user = useSelector((state: RootState) => { return state.user });
    const [ categories, setCategories ] = useState([]);

    const populateCategories = async () => {
        try {
            const res = await fetch(`http://${SERVER_DOMAIN}/dashboard/getcategories`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user })
            })

            if (res.ok) {
                const resData = await res.json();
                setCategories(resData.categoryData);
            } else {
                setCategories([]);
            }
        } catch (err) {
            console.log(err);
            setCategories([]);
        }
    }

    useEffect(() => {
        populateCategories();
    }, []);

    return (
        <div className="flex flex-col justify-center items-start gap-2 p-2 w-full">
            <div className="flex flex-row justify-center items-center gap-2">
                <img src={CategoriesIcon} alt="Groups" className="w-5" />
                <h3 className="text-md font-medium">Categories</h3>
            </div>
            <div className="flex flex-col justify-center items-start w-full pl-4">
                {
                    (categories.length != 0) ? (
                        categories.map((category) => {
                            return (
                                <Link key={category.category_id} to={`/dashboard/categories/${category.category_id}`} className="text-[14px] px-3 py-1 rounded-md hover:bg-gray-300 duration-300 w-full">{category.category_name}</Link>
                            )
                        })
                    ) : (
                        <div className="flex flex-col justify-center items-center px-3">
                            <p className="text-[12px]">No Groups</p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}