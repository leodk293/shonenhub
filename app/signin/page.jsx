import React from 'react'
import signInImg from '../public/contact.jpeg'
import signOutImg from '../public/sasuke.jpeg'
import Image from 'next/image'
import { auth, signIn, signOut } from '../auth'
import { redirect } from 'next/navigation'
import { usersTable } from '../../db/schema'
import { eq } from 'drizzle-orm'
import { db } from '../../db'


const Page = async () => {
    const session = await auth();
    //console.log(session?.user)

    async function storeUserIfNew() {
        if (session?.user) {
            const { name, email } = session.user;
            const age = 30;

            const existingUser = await db
                .select()
                .from(usersTable)
                .where(eq(usersTable.email, email))
                .get();

            if (!existingUser) {
                await db.insert(usersTable).values({ name, age, email });
            }
        }
    }

    async function getAllUsers() {
        const users = await db.select().from(usersTable);
        return users;
    }

    const users = await getAllUsers();
    console.log(users);

    if (session) {
        await storeUserIfNew();
    }

    return (
        <main className='mt-[240px] flex flex-col items-center md:mt-[200px]'>

            {!session?.user ?
                <>
                    <h1 className=' text-white font-bold text-xl md:text-4xl'>Signin to your account</h1>

                    <div className='flex flex-row mt-10 border border-[#d9d9d94e]'>

                        <div className='flex flex-col items-center justify-center text-white shadow bg-[#000000e2] gap-7 p-10'>

                            <form
                                action={async () => {
                                    "use server";
                                    await signIn('google', { callbackUrl: '/' });
                                    redirect('/');
                                }}
                            >
                                <button
                                    className=' border border-transparent rounded-[2px] bg-red-800 p-2 font-bold text-xl flex flex-row hover:rounded-[50px] duration-200'>
                                    <p>Signin with Google</p>
                                </button>
                            </form>

                            <div className='flex flex-row gap-1 text-white'>
                                <span className='w-[90px] self-center h-[1px] bg-white'></span>
                                <p className=' text-xl font-semibold'>or</p>
                                <span className='w-[90px] self-center h-[1px] bg-white'></span>
                            </div>

                            <form
                                action={async () => {
                                    "use server";
                                    await signIn("github", { callbackUrl: '/' });
                                    redirect('/');
                                }}
                            >
                                <button
                                    className=' border border-transparent rounded-[2px] bg-blue-950 p-2 font-bold text-xl flex flex-row hover:rounded-[50px] duration-200'>
                                    <p>Signin with Github</p>
                                </button>
                            </form>

                        </div>

                        <Image
                            src={signInImg}
                            alt='AVATAR'
                            width={300}
                            height={150}
                            className='object-contain brightness-50 hidden md:block'
                        />

                    </div>
                </>
                :
                <>
                    <h1 className=' text-white font-bold text-xl md:text-4xl'>Signout</h1>

                    <div className='flex flex-row mt-10 border border-[#d9d9d94e]'>

                        <div className='flex flex-col items-center justify-center text-white w-[280px] shadow bg-[#000000e2] gap-7 p-10'>

                            <form
                                action={async () => {
                                    "use server";
                                    await signOut();
                                }}
                            >
                                <button
                                    className=' border border-transparent rounded-[2px] bg-[#161616] px-5 py-2 font-bold text-2xl flex flex-row hover:rounded-[50px] duration-200'>
                                    <p>Signout</p>
                                </button>
                            </form>

                        </div>

                        <Image
                            src={signOutImg}
                            alt='AVATAR'
                            width={300}
                            height={150}
                            className='object-contain brightness-50 hidden md:block'
                        />

                    </div>
                </>
            }

        </main>
    )
}

export default Page