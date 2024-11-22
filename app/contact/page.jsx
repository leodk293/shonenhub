"use client";
import React from 'react'
import Image from 'next/image'
import kakashi from '../public/kakahi.png'
import { useState } from 'react'
import { Phone, Mail, SendHorizontal } from 'lucide-react';

const Page = () => {
    const [result, setResult] = useState("");
    console.log(process.env.NEXT_PUBLIC_WEB3_API)

    const onSubmit = async (event) => {
        event.preventDefault();
        setResult("Sending....");
        const formData = new FormData(event.target);

        formData.append("access_key", process.env.NEXT_PUBLIC_WEB3_API);

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            setResult("Form Submitted Successfully");
            event.target.reset();
        } else {
            console.log("Error", data);
            setResult(data.message);
        }
    };

    return (
        <main className='flex flex-col mt-[280px] items-center gap-10 md:mt-[150px]'>
            <h1 className=' text-white text-4xl font-bold'>Contact Us</h1>

            <div className=' flex flex-wrap gap-8'>

                <div className='border border-[#ffffff6f] rounded-[10px] bg-[#0000003f] p-5 flex flex-wrap justify-center gap-10 mx-2 md:mx-0'>
                    <div className='flex flex-col text-white gap-5 pt-5'>
                        <h1 className=' text-4xl font-bold text-white'>Let's stay in touch</h1>

                        <div className=' flex flex-row gap-1'>
                            <Phone size={36} color="#ffffff" strokeWidth={1.75} />
                            <p className='self-center text-xl font-bold'>+212 0619965635</p>
                        </div>

                        <div className=' flex flex-row gap-2'>
                            <Mail size={36} color="#ffffff" strokeWidth={1.75} />
                            <p className='self-center text-xl font-bold'>shonenhub047@gmail.com</p>
                        </div>

                    </div>

                    <div className=' self-center flex flex-col gap-1'>
                        <form className='flex flex-col gap-7 w-auto md:w-[500px]' onSubmit={onSubmit}>
                            <input
                                className=' border border-white bg-transparent p-2 text-white text-[20px] rounded-[5px]'
                                type="text" name="name" required
                                placeholder='Enter Your Name...'
                            />

                            <input
                                className=' border border-white bg-transparent p-2 text-white text-[20px] rounded-[5px]'
                                type="email"
                                name="email"
                                placeholder='Enter Your Email...'
                                required
                            />

                            <textarea
                                className=' border border-white bg-transparent p-2 text-white text-[20px] rounded-[5px]'
                                name="message" required
                                placeholder='Enter Your Message...'
                            >

                            </textarea>

                            <button
                                className=' w-[200px] flex flex-row 
                                justify-center gap-2 border border-transparent font-semibold bg-violet-950 px-5
                                 py-2 rounded-[5px] text-white hover:translate-x-1 duration-300'
                                type="submit"
                            >
                                <span className='text-xl'>Send</span>
                                <SendHorizontal
                                    size={25}
                                    color="#ffffff"
                                    strokeWidth={2}
                                    className=' self-center'
                                />
                            </button>

                        </form>
                        <span className='text-green-800 font-bold self-start'>{result}</span>
                    </div>

                </div>

                <Image
                    src={kakashi}
                    width={200}
                    height={100}
                    className=' object-cover hidden md:block'
                    alt='Kakashi'
                />

            </div>

        </main>
    )
}

export default Page