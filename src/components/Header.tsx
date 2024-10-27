import React from 'react';
import { IoSearch } from "react-icons/io5";
import { LuLogOut, LuShoppingCart } from "react-icons/lu";
import { LuChevronLeft } from "react-icons/lu";
import { LuChevronRight } from "react-icons/lu";
import { useDispatch } from 'react-redux';
import { RootState,AppDispatch } from '../redux/store/store';
import { useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlices';


const Header: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { isAuthenticated,user } = useSelector((state: RootState) => state.auth);

    const handleLogout = () =>{
        const confirm = window.confirm('Are you sure you want to logout?');
        if(!confirm){
            return;
        }
        dispatch(logout());
    }
    return (
        <header className="w-full bg-white flex flex-col space-y-2">
            {isAuthenticated &&
                <div className="text-sm space-x-4 flex justify-end items-center px-6 font-light text-gray-600 py-4">
                <a href="#" className="hover:underline">Help</a>
                <a href="#" className="hover:underline">Orders & Returns</a>
                <span className="">Hi,{user?.name}</span>
                <LuLogOut  onClick={handleLogout}/>
            </div>
            }
            <div className={`w-full mx-auto flex items-center justify-between px-8 ${isAuthenticated ?  '':'mt-10'}`}>
                <h1 className="text-3xl font-bold"><a href="/">ECOMMERCE</a></h1>
                <nav className="space-x-6 text-md font-semibold text-gray-700">
                    <a href="#" className="hover:underline">Categories</a>
                    <a href="#" className="hover:underline">Sale</a>
                    <a href="#" className="hover:underline">Clearance</a>
                    <a href="#" className="hover:underline">New Stock</a>
                    <a href="#" className="hover:underline">Trending</a>
                </nav>
                <div className='flex space-x-8 text-gray-500'>
                    <IoSearch className='text-2xl' />
                    <LuShoppingCart className='text-2xl' />
                </div>
            </div>
            <div className='flex justify-center items-center space-x-4 bg-[#F4F4F4] p-2 text-sm'>
                <LuChevronLeft />
                <p>
                    Get 10% off on business sign up
                </p>
                <LuChevronRight />
            </div>

        </header>
    );
};

export default Header;
