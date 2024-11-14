"use client";
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function layout({ children }) {
    const path = usePathname();

    return (
        <main className='flex flex-col mt-[250px] items-center gap-5 md:mt-[150px]'>



            <div className='hidden md:block'>

                <div className=' flex flex-wrap font-semibold text-2xl gap-5 border border-gray-50 bg-[#0000009d] rounded-[50px] p-5'>
                    <Link className={`border border-transparent rounded-[50px] px-10 py-5 hover:bg-[#f1f1f1] duration-500 hover:text-gray-900 ${path === "/home" ? "bg-white text-black" : "text-white"}`} href={'/home'}>Top Anime</Link>
                    <Link className={`border border-transparent rounded-[50px] px-10 py-5 hover:bg-[#f1f1f1] duration-500 hover:text-gray-900 ${path === "/home/popular" ? "bg-white text-black" : "text-white"}`} href={'/home/popular'}>Most Popular</Link>
                    <Link className={`border border-transparent rounded-[50px] px-10 py-5 hover:bg-[#f1f1f1] duration-500 hover:text-gray-900 ${path === "/home/upcoming" ? "bg-white text-black" : "text-white"}`} href={'/home/upcoming'}>Upcoming</Link>
                    <Link className={`border border-transparent rounded-[50px] px-10 py-5 hover:bg-[#f1f1f1] duration-500 hover:text-gray-900 ${path === "/home/airing" ? "bg-white text-black" : "text-white"}`} href={'/home/airing'}>Airing</Link>
                </div>

            </div>

            <div className='block mt-[65px] md:hidden md:mt-0'>

                <div className=' flex flex-row gap-5 border border-gray-50 bg-[#0000009d] rounded-[50px] p-5'>
                    <Link className={`border border-transparent p-1 rounded-[50px] duration-500 ${path === "/home" ? "bg-white text-black" : "text-white"}`} href={'/home'}>Top Anime</Link>
                    <Link className={`border border-transparent p-1 rounded-[50px] duration-500 ${path === "/home/popular" ? "bg-white text-black" : "text-white"}`} href={'/home/popular'}>Most Popular</Link>
                    <Link className={`border border-transparent p-1 rounded-[50px] duration-500 ${path === "/home/upcoming" ? "bg-white text-black" : "text-white"}`} href={'/home/upcoming'}>Upcoming</Link>
                    <Link className={`border border-transparent p-1 rounded-[50px] duration-500 ${path === "/home/airing" ? "bg-white text-black" : "text-white"}`} href={'/home/airing'}>Airing</Link>
                </div>

            </div>



            <div className='m-2'>
                {children}
            </div>

        </main>
    )
}
