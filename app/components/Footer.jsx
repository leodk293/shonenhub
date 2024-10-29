import React from 'react'
import Link from 'next/link'
import Logo from './logo/Logo'
import { Linkedin, Twitter, Facebook } from 'lucide-react'
import Image from 'next/image'
import footer from '../public/footer.png'

const Footer = () => {
    return (
        <footer className='flex flex-wrap w-full relative bottom-0 mt-[100px] justify-start gap-[50px] border border-transparent p-10 bg-[#000000f3] md:justify-evenly md:gap-0'>

            <div className='flex flex-col  gap-3'>
                <Logo />

                <p className='text-gray-200'>Copyright © <span className='font-extrabold'>Shonenhub</span>. All Rights Reserved</p>

                <div className=" flex flex-row gap-2 self-start">
                    <Link
                        className="border border-transparent p-1 bg-[#0A66C2] rounded-[5px] hover:bg-[#16165c] duration-200"
                        href={'/'}>
                        <Linkedin size={30} color="#ffffff" strokeWidth={1.25}
                        />
                    </Link>

                    <Link
                        className="border border-transparent p-1 bg-[#1DA1F2] rounded-[5px] hover:bg-[#16165c] duration-200"
                        href={'/'}
                    >
                        <Twitter size={30} color="#ffffff" strokeWidth={1.25} />
                    </Link>

                    <Link
                        className="border border-transparent p-1 bg-[#1877F2] rounded-[5px] hover:bg-[#16165c] duration-200"
                        href={'/'}
                    >
                        <Facebook size={30} color="#ffffff" strokeWidth={1.25} />
                    </Link>
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                <p className='text-3xl text-white font-bold'>Help</p>
                <Link className='mt-2 text-xl font-semibold text-gray-400 hover:text-white duration-200' href={'/contact'}>Contact</Link>
                <Link className='text-gray-400 font-semibold text-xl hover:text-white duration-200' href={'/faq'}>FAQ</Link>
            </div>

            <div className='flex flex-col gap-2'>
                <p className='text-3xl text-white font-bold'>Links</p>
                <Link className='mt-2 text-gray-400 font-semibold text-xl hover:text-white duration-200' href={'/home/popular'}>Most Popular</Link>
                <Link className='text-gray-400 font-semibold text-xl hover:text-white duration-200' href={'/home/upcoming'}>Upcoming</Link>
                <Link className='text-gray-400 font-semibold text-xl hover:text-white duration-200' href={'/home/airing'}>Airing</Link>
            </div>

            <Image
                src={footer}
                width={90}
                height={100}
                className=' self-center object-contain hidden md:block'
                alt='LUFFY'
            />

        </footer>
    )
}

export default Footer