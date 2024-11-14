'use client';
import { useState, useEffect } from "react";
import React from 'react'
import Image from "next/image";
import Link from "next/link";
import { MoveLeft } from "lucide-react";

import '../../../../globals.css'

export default function Page({ params }) {

    const [characterData, setCharacterData] = useState({
        error: false,
        loading: false,
        data: undefined
    })

    function setLoading() {
        setCharacterData({
            error: false,
            loading: true,
            data: undefined
        })
    }

    function handleError() {
        setCharacterData({
            error: true,
            loading: false,
            data: undefined
        })
    }

    async function fetchCharacterData() {
        setLoading();
        try {
            const response = await fetch(`https://api.jikan.moe/v4/characters/${params.character_id}/full`);
            if (!response.ok) {
                throw new Erro('An error has occured');
            }
            const result = await response.json();
            setCharacterData({
                error: false,
                loading: false,
                data: result.data
            })

        }
        catch (error) {
            console.log(error.message);
            handleError();
        }
    }

    useEffect(() => {
        const characterDataTimeOut = setTimeout(() => fetchCharacterData(), 1000)
        //fetchCharacterData();
        return () => {
            clearTimeout(characterDataTimeOut);

        };
    }, [params.character_id]);


    return (
        <>
            <Link className=" hidden md:block" href={'/home'}>
                <button className='border border-transparent flex flex-row gap-2 px-5 py-2 bg-sky-950 text-xl font-bold rounded-[5px] fixed text-white md:ml-10 hover:translate-x-[-10px] duration-200'>
                    <MoveLeft className=" self-center" size={20} color="#ffffff" strokeWidth={3} />
                    <p className=" self-center">Go Back Home</p>
                </button>
            </Link>
            <div className="mt-[290px] mx-5 md:mx-0 md:mt-[180px]">
                {characterData.error === true ?
                    <p className=" text-center text-red-700 h-[20rem] text-3xl">Something went wrong, refresh the page</p> :
                    characterData.loading === true ?
                        <p className=" text-center text-orange-700 h-[20rem] text-3xl">Loading</p> :
                        (
                            characterData.data &&
                            <div className="flex flex-col items-center">

                                <div className=" flex flex-col gap-3 text-center text-violet-700 text-3xl font-bold md:text-5xl">
                                    <h1>{characterData.data.name}</h1>
                                    <p>({characterData.data.name_kanji})</p>
                                </div>

                                <div className="flex flex-col border border-slate-900 bg-[#0000005c] p-10 rounded-[10px] gap-5 mt-10 items-center">
                                    <Image
                                        src={characterData.data.images.jpg.image_url}
                                        alt={characterData.data.name}
                                        width={200}
                                        height={200}
                                        className=" border border-zinc-300 rounded-[5px] object-cover"

                                    />
                                    <p className=" text-white text-[17px] text-center w-auto leading-8 md:w-[50rem]">{characterData.data.about}</p>

                                </div>

                                <div className="flex flex-col mt-10 gap-5 items-center">
                                    <h1 className="text-center text-blue-900 font-extrabold text-5xl">Voice Actors</h1>
                                    <div className="flex flex-wrap justify-center gap-5">
                                        {characterData.data.voices.slice(0, 5).map((actor) => (
                                            <div key={actor.person.mal_id} className="flex flex-col border border-slate-700 bg-slate-950 p-3 rounded-[5px] gap-2">
                                                <Image
                                                    src={actor.person.images.jpg.image_url}
                                                    alt={actor.person.name}
                                                    width={150}
                                                    height={150}
                                                    className=" border border-violet-950 rounded-[5px] object-cover"
                                                />
                                                <p className="text-white w-[150px] text-xl">{actor.person.name}</p>
                                                <p className="text-white w-[150px] ">Language : {actor.language}</p>

                                            </div>
                                        ))}

                                    </div>

                                </div>
                            </div>
                        )
                }

            </div>
        </>
    )
}
