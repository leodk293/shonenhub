'use client';
import Link from 'next/link'
import React, { useState, useEffect } from 'react';
import Logo from './logo/Logo';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Nav = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [animeName, setAnimeName] = useState("");
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (animeName.trim()) {
            router.push(`/search?anime=${encodeURIComponent(animeName)}`);
            setAnimeName('');
        }
    };

    return (
        <header
            className={`flex flex-wrap border border-transparent shadow z-50 fixed top-0 w-full justify-center p-3 gap-5 
                ${isScrolled ? "bg-[#000000f3] duration-500" : ""} md:justify-around md:gap-0`}
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

            <div className=' flex flex-row gap-5'>
                <Link className='self-center' href='/signin'>
                    <button
                        className='self-center text-[20px] border border-transparent bg-red-950 w-[120px] rounded-[30px] p-2 font-semibold text-white hover:bg-red-900 duration-200'
                    >
                        Signin
                    </button>
                </Link>

                <Link className='self-center' href='/contact'>
                    <button
                        className='self-center text-[20px] border border-transparent bg-[#0f1855] w-[120px] rounded-[30px] p-2 font-semibold text-white hover:bg-blue-800 duration-200'
                    >
                        Contact us
                    </button>
                </Link>
            </div>

        </header>
    );
};

export default Nav;