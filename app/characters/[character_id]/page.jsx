'use client';
import React from 'react'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Page({ params }) {
    const [character, setCharacter] = useState({
        error: false,
        data: undefined,
        loading: false
    })

    function setLoader() {
        setCharacter({
            error: false,
            data: undefined,
            loading: true
        })
    }

    function handleError() {
        setCharacter({
            error: true,
            data: undefined,
            loading: false
        })
    }

    async function getCharactersDetails() {
        setLoader();
        try {
            const response = await fetch(`https://api.jikan.moe/v4/characters/${params.character_id}/full`);
            if (!response.ok) {
                throw new Error(`An error has occured : ${response.status}`)
            }

            const result = await response.json();
            setCharacter({
                error: false,
                data: result.data,
                loading: false
            })

        }
        catch (error) {
            console.log(error.message);
            handleError();
        }
    }

    useEffect(() => {
        getCharactersDetails();
    }, [])
    return (
        <div className="mt-[300px] mx-5 md:mx-0 md:mt-[180px]">
            {/* {params.character_id} */}

            {character.error === true
                ?
                <p className=' text-center text-2xl mt-2 font-bold text-red-700'>Somerthing went wrong...</p>
                :
                character.loading === true ?
                    <p className=' text-center mt-2 text-orange-700 font-bold text-2xl'>Loaing...</p>
                    :
                    (
                        character.data &&
                        <div className=' flex flex-col items-center'>

                            {/* <h1 className=' text-center font-bold text-white w-auto text-2xl md:text-3xl md:w-[45rem]'>
                                {character.data.name} of <span className=' text-purple-950'>{character.data.anime[0].anime.title}</span>
                            </h1> */}

                            <div className=' flex flex-col gap-4'>
                                <h1 className=' font-bold text-white w-auto text-2xl md:text-3xl md:w-[45rem]'>{character.data.name}</h1>
                                <p className='text-white font-semibold text-[17px] md:text-xl'>Character of
                                    <Link
                                        className='text-purple-900 ml-2 underline underline-offset-[6px] hover:text-purple-700 duration-200'
                                        href={`/anime/${character.data.anime[0].anime.mal_id}`}>
                                        {character.data.anime[0].anime.title}
                                    </Link>
                                </p>

                            </div>

                            <div className=' mt-10 flex flex-col border border-slate-900 bg-[#0000005c] p-10 rounded-[10px] gap-5 items-center'>
                                <div className=' w-auto md:w-[50rem]'>

                                </div>
                                <Image
                                    src={character.data.images.jpg.image_url}
                                    alt={character.data.name}
                                    width={200}
                                    height={200}
                                    className=' border border-white rounded-[5px]'

                                />
                                <p className=" text-white text-[17px] text-center w-auto leading-8 md:w-[50rem]">
                                    {character.data.about}
                                </p>
                            </div>


                        </div>
                    )
            }


        </div>
    )
}
