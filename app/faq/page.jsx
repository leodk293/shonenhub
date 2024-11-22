import React from 'react'

export default function Page() {
    return (
        <main className='mt-[280px] flex flex-col items-center mx-5 md:mt-[200px] md:mx-0'>

            <div className=' flex flex-col gap-10 w-auto md:w-[80rem]'>
                <h1 className=' self-start text-white text-4xl font-bold'>FAQ</h1>

                <div
                    className='flex flex-col border border-transparent bg-black p-5 rounded-[5px] gap-10'
                >

                    <div className='flex flex-col gap-5'>
                        <h1 className='text-white font-bold text-3xl'>About ads</h1>
                        <p className='text-xl font-semibold text-gray-500'>Shonenhub does not contain ads.</p>

                    </div>

                    <div className='flex flex-col gap-5'>
                        <h1 className='text-white font-bold text-3xl'>Is Shonenhub safe ?</h1>
                        <p className='text-xl font-semibold text-gray-500'>
                            We haven't received any report regarding the site's security. However, for your utmost safety,
                            you should take precautionary measures such as a VPN to stay anonymous, anti-virus program and
                            AdBlock extension to avoid ads and popups.
                        </p>
                    </div>

                    <div className='flex flex-col gap-5'>
                        <h1 className='text-white font-bold text-3xl'>Is it legal to use Shonenhub ?</h1>
                        <p className='text-xl font-semibold text-gray-500'>
                            Absolutely, using is totally legal.
                        </p>
                    </div>

                </div>

            </div>

        </main>
    )
}
