'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Logo from './logo/Logo';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import tabAnime from './animeList'

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
        <div className='flex flex-wrap gap-5 justify-center md:gap-[5rem]'>
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
                    required
                    list='anime'
                    className='outline-none font-bold uppercase text-[16px] bg-transparent text-white placeholder:uppercase md:text-xl'
                    type="text"
                    placeholder='Search for an anime...'
                    onChange={(e) => setAnimeName(e.target.value)}
                    value={animeName}
                />
                <datalist id='anime'>
                    {/* {animeList.map((anime, index) => (
                        <option
                            value={anime}
                            key={index}
                        />
                    ))} */}

                    {tabAnime.map((anime, index) => (
                        <option
                            value={anime}
                            key={index}
                        />
                    ))}
                </datalist>
            </form>
        </div>
    );
};

export default Nav;
