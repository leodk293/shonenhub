import React from 'react'
import Link from 'next/link'
import logo from './shonenhub.png'
import Image from 'next/image'

const Logo = () => {
    return (
        <Link className='text-4xl font-bold text-white' href={'/'}>
            <div className='flex flex-row gap-2'>
                <h1 className=' self-center'>Shonenhub</h1>
                <Image
                    src={logo}
                    alt='SHONENHUB LOGO'
                    width={60}
                    height={50}
                    className=' rounded-[50%] object-cover'
                />
            </div>
        </Link>
    )
}

export default Logo