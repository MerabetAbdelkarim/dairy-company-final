import { useEffect, useRef, useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import logoImg from '../../assets/images/logo.svg'
import logoDarkImg from '../../assets/images/logo-darkmode.svg'
import userImg from '../../assets/images/user.webp'
import { Link, NavLink } from 'react-router-dom';
import Dropdown from "../UI/Dropdown"

import { BiMoon, BiSun } from 'react-icons/bi';
import { useTheme } from '../../ctxapi/ThemeContext';


const Navbar = () => {



    const [nav, setNav] = useState(false);


    const handleNav = () => {
        setNav(!nav);
    };


    const navItems = [
        { id: 1, text: 'Cows', link: '/cows' },
        { id: 2, text: 'milk', link: '/milk' },
        { id: 3, text: 'Medical', link: '/medical' },
    ];

    const { theme, toggleTheme } = useTheme();
    return (
        <>
            <div className='sticky  top-0 z-50  shadow-md bg-white dark:bg-[#162336] w-full  min-h-[50px]' >
                <div className='container  flex justify-between items-center  h-16 text-black'>

                    <Link to={'/'}>
                        {
                            theme === 'light'
                                ?
                                <img src={logoImg} width={'40px'} color='red' alt="logo" />
                                :
                                <img src={logoDarkImg} width={'40px'} color='red' alt="logo" />
                        }
                        
                        
                    </Link>


                    <ul className='hidden md:flex items-center space-x-4 capitalize text-gray-700 dark:text-[#f2f2f2]'>
                        {navItems.map(item => (
                            <li
                                key={item.id}
                                className="nav-item"
                            >
                                <NavLink className={({ isActive }) => (isActive ? 'p-4  dark:text-[#e1e1e1] rounded-xl m-2 cursor-pointer duration-300 hover:text-black dark:hover:text-[#fff] nav-link text-blue-700 active:' : 'p-4 text-gray-600 dark:text-[#e1e1e1] rounded-xl m-2 cursor-pointer duration-300 hover:text-black dark:hover:text-[#fff] nav-link')} to={item.link}>{item.text}</NavLink>
                            </li>
                        ))}
                        <li>
                            <button className='toggleTheme flex items-center h-full' onClick={toggleTheme}>
                                {theme === 'light' ? <BiMoon /> : <BiSun />}
                            </button>
                        </li>
                        <Dropdown
                            item={<img className="w-10 h-10 rounded-full" src={userImg} alt="user photo" />}
                            className={'flex  items-center'}
                        >
                            <div className='bg-white rounded-md shadow text-gray-700 p-2'>

                                <Link to="/">Dashboard</Link>

                                <hr />
                                <div>Sign out</div>
                            </div>

                        </Dropdown>
                    </ul>
                    {/* Mobile Navigation Icon */}
                    <div className='flex items-center gap-3 md:hidden'>
                        <div >
                            <Dropdown
                                item={<img className="w-10 h-10 rounded-full" src={userImg} alt="user photo" />}
                                className={'flex  items-center'}
                            >
                                <div className='bg-white rounded-md shadow text-gray-700 p-2'>

                                    <Link to="/">Dashboard</Link>

                                    <hr />
                                    <div>Sign out</div>
                                </div>

                            </Dropdown>
                        </div>
                        <div onClick={handleNav} className=' text-gray-700 dark:text-[#f2f2f2] '>
                            {nav ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
                        </div>
                    </div>
                    {/* Mobile Navigation Menu */}
                    <ul
                        className={
                            nav
                                ? 'fixed md:hidden left-0 top-0 w-[60%] h-full   bg-gray-100 dark:bg-[#162336]  ease-in-out duration-500'
                                : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]'
                        }
                    >
                        <div
                            onClick={handleNav}
                            className='relative mt-2 left-[80%] block md:hidden text-gray-700 dark:text-[#f2f2f2] '
                        >
                            {nav && <AiOutlineClose size={20} />}
                        </div>
                        <li className='pl-4  rounded-xl m-2 cursor-pointer duration-300 '>
                            <div className='p-4  dark:text-[#e1e1e1] rounded-xl m-2 cursor-pointer duration-300 hover:text-black dark:hover:text-[#fff] nav-link '>
                                <Link to={'/'}>
                                    <img src={logoImg} width={'40px'} color='red' alt="logo" />
                                </Link>
                            </div>
                        </li>
                        {/* Mobile Logo */}


                        {/* Mobile Navigation Items */}
                        {navItems.map(item => (
                            <li
                                key={item.id}
                                className='p-4  rounded-xl m-2 cursor-pointer duration-300 '
                            >
                                <NavLink
                                    className={({ isActive }) => (isActive ? 'p-4  dark:text-[#e1e1e1] rounded-xl m-2 cursor-pointer duration-300 hover:text-black dark:hover:text-[#fff] nav-link text-blue-700 active:' : 'p-4 text-gray-600 dark:text-[#e1e1e1] rounded-xl m-2 cursor-pointer duration-300 hover:text-black dark:hover:text-[#fff] nav-link')}
                                    to={item.link}
                                >
                                    {item.text}
                                </NavLink>
                            </li>
                        ))}
                        <li className='pl-4  rounded-xl m-2 cursor-pointer duration-300 '>
                            <button className='p-4  dark:text-[#e1e1e1] rounded-xl m-2 cursor-pointer duration-300 hover:text-black dark:hover:text-[#fff] nav-link   toggleTheme flex items-center h-full' onClick={toggleTheme}>
                                {theme === 'light' ? <BiMoon /> : <BiSun />}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Navbar;