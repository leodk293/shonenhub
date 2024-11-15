'use client';
import Link from 'next/link'
import React, { useState, useEffect } from 'react';
import Logo from './logo/Logo';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';


const Nav = () => {
    const [animeName, setAnimeName] = useState("");

    const router = useRouter();
    
    const handleSubmit = (event) => {
        event.preventDefault();
        if (animeName.trim()) {
            router.push(`/search?anime=${encodeURIComponent(animeName)}`);
            setAnimeName('');
        }
    };

    return (
        <div
            className=' flex flex-wrap gap-5 justify-center md:gap-[5rem]'
        >
            <Logo />

            <form
                className='self-center flex flex-row gap-2'
                onSubmit={handleSubmit}
            >
                <Search
                    className="self-center border border-transparent bg-white p-1 rounded-[50%]"
                    size={30}
                    strokeWidth={3}
                />
                <input
                    className='outline-none font-bold uppercase text-[16px] bg-transparent text-white placeholder:uppercase md:text-xl'
                    type="text"
                    placeholder='Search for an anime...'
                    onChange={(e) => setAnimeName(e.target.value)}
                    value={animeName}
                />
            </form>

            {/* <div className=' flex flex-wrap justify-center gap-5'>
                <div className=' self-center'>
                    
                </div>
                <Link className='self-center' href='/signin'>
                    <button
                        className='self-center text-[20px] border border-transparent bg-red-800 w-[120px] rounded-[30px] p-2 font-semibold text-white hover:bg-red-700 duration-200'
                    >
                        Signin
                    </button>
                </Link>

                <Link className='self-center' href='/contact'>
                    <button
                        className='self-center text-[20px] border border-transparent bg-[#1a2a8d] w-[120px] rounded-[30px] p-2 font-semibold text-white hover:bg-blue-700 duration-200'
                    >
                        Contact us
                    </button>
                </Link>
            </div> */}

        </div>
    );
};

export default Nav;