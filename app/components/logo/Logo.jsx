import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Eye from './eye.png'

const Logo = () => {
    return (
        <Link className='text-4xl font-bold text-white' href={'/'}>
            <div className='flex flex-row gap-2'>
                <h1 className=' self-center'>Shonenhub</h1>
                <Image
                    src={Eye}
                    alt='SHONENHUB LOGO'
                    width={50}
                    height={50}
                    className=' object-cover'
                />
            </div>
        </Link>
    )
}

export default Logo