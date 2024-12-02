import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Eye from './eye.png'
import { Luckiest_Guy } from 'next/font/google'

const lucky = Luckiest_Guy({
    weight:'400',
    subsets:['latin']
})

const Logo = () => {
    return (
        <Link className='text-4xl font-bold text-white' href={'/'}>
            <div className='flex flex-row gap-2'>
                <h1 className={` ${lucky.className} self-center`}>Shonenhub</h1>
                <Image
                    src={Eye}
                    alt='LOGO'
                    width={50}
                    height={50}
                    className=' object-cover'
                />
            </div>
        </Link>
    )
}

export default Logo