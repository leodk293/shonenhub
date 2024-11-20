import React from 'react'
import Nav from './Nav'
import Image from 'next/image';
import { auth, signIn, signOut } from '../auth'
import { usersTable } from '../../db/schema'
import { eq } from 'drizzle-orm'
import { db } from '../../db'
import Link from 'next/link';

export default async function Header() {

    const session = await auth();
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
    //console.log(users);

    if (session) {
        await storeUserIfNew();
    }


    return (
        <header
            className=' flex flex-wrap p-3 bg-[#000000f3] border border-transparent shadow z-50 fixed top-0 w-full justify-center gap-5 md:justify-evenly md:gap-0'
        >
            <Nav />

            <div className=' flex flex-wrap justify-center gap-3'>
                <Link className='self-center' href='/contact'>
                    <button
                        className='self-center text-[17px] border border-transparent bg-purple-950 w-[120px] rounded-[30px] p-2 font-semibold text-white hover:bg-purple-800 duration-200'
                    >
                        Contact us
                    </button>
                </Link>

                {
                    !session?.user
                        ?
                        <form
                            className=' self-center'
                            action={async () => {
                                "use server";
                                await signIn('google');

                            }}
                        >
                            <button
                                className='self-center text-[17px] border border-transparent bg-red-800 w-[120px] rounded-[30px] p-2 font-semibold text-white hover:bg-red-700 duration-200'
                            >
                                Signin
                            </button>
                        </form>
                        :
                        <div className=' self-center flex flex-wrap justify-center gap-3'>
                            <form
                                className=' self-center'
                                action={async () => {
                                    "use server";
                                    await signOut();
                                }}
                            >
                                <button
                                    className=' self-center border border-transparent text-white rounded-[50px] bg-blue-900 px-5 py-2 font-semibold text-[15px] flex flex-row hover:bg-blue-700 duration-200'
                                >
                                    Signout
                                </button>
                            </form>
                            <div className=' self-center border border-gray-400 px-4 py-2 rounded-[50px] flex flex-wrap gap-2'>
                                <Image
                                    src={session.user?.image}
                                    alt={session.user?.name}
                                    width={35}
                                    height={25}
                                    className=' self-center object-cover rounded-[50%]'
                                />
                                <p className=' font-semibold self-center text-white'>{session?.user?.name}</p>
                            </div>
                        </div>
                }
            </div>

        </header>
    )
}
