import { GiCow } from "react-icons/gi";
import { Link } from "react-router-dom";
function Card({ key, icon, bgicon, titel, nbr, unit, link }) {

    return (
        <>
            <div key={key} className="w-full md:w-fit mb-2 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="flex items-center justify-between gap-10 ">
                    <div className="w-[40%] ">
                        <div className={` ${bgicon}  w-fit p-5 rounded-full`}>
                            {icon}
                        </div>
                    </div>
                    <div className="w-[60%]">
                        <div className="">
                            <div>
                                <a href="#">
                                    <h5 className="mb-2  font-bold tracking-tight text-gray-900 dark:text-white">{titel}</h5>
                                </a>

                                <div className="flex items-end gap-2">
                                    <p className=" text-2xl font-normal text-gray-700 dark:text-gray-400">{nbr}</p>
                                    <div className=" text-sm font-normal  text-gray-700 dark:text-gray-400">{unit}</div>
                                </div>
                            </div>

                            <Link to={link} className="w-full md:w-fit inline-flex items-center px-3 py-2 mt-3 text-sm font-medium text-center  text-blue-700 sm sm:text-white  bg-blue-100 hover:bg-blue-200 sm:bg-blue-700 rounded-lg sm:hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">

                                <h3 className="block">
                                    Show more
                                </h3>
                                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Card
