"use client";
import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import { MoveLeft } from 'lucide-react';
import { Outfit } from 'next/font/google';

const outfit = Outfit({
    weight:'800',
    subsets:['latin-ext']
})

export default function Page({ params }) {
    const [episodData, setEpisodData] = useState({
        error: true,
        episod: null,
        animeTitle: null
    });

    const [summaryData, setSummaryData] = useState({
        error: true,
        episodTitle: undefined,
        synopsis: undefined
    })

    const [tabEpisod, setTabEpisod] = useState([]);
    const [currentEpisod, setCurrentEpisod] = useState(1);

    async function fetchMangaData() {
        try {
            const response = await fetch(`https://api.jikan.moe/v4/anime/${params.anime_id}`);
            const result = await response.json();

            let target = [];
            setEpisodData({
                error: false,
                animeTitle: result.data.title,
                episod: result.data.episodes
            });

            for (let i = 1; i <= result.data.episodes; i++) {
                target.push(i);
            }
            setTabEpisod(target)
        }
        catch (error) {
            console.log(error.message);
            setEpisodData({
                error: true,
                episod: null,
                animeTitle: null
            });
        }
    }

    async function fetchEpisodData() {
        try {
            const response = await fetch(`https://api.jikan.moe/v4/anime/${params.anime_id}/episodes/${currentEpisod}`);
            const result = await response.json();

            setSummaryData({
                error: false,
                episodTitle: result.data.title,
                synopsis: result.data.synopsis
            });
        }
        catch (error) {
            console.log(error.message);
            setSummaryData({
                error: true,
                episodTitle: undefined,
                synopsis: undefined
            });
        }
    }

    useEffect(() => {
        fetchMangaData();
    }, [params.anime_id]);

    useEffect(() => {
        fetchEpisodData();
    }, [currentEpisod]);

    return (
        <>
            <Link className=" hidden md:block" href={'/home'}>
                <button className='border border-transparent px-5 py-2 bg-sky-950 text-xl flex flex-row gap-2 font-bold rounded-[5px] fixed text-white md:ml-10 hover:translate-x-[-10px] duration-200'>
                    <MoveLeft className=" self-center" size={20} color="#ffffff" strokeWidth={3} />
                    <p className=" self-center">Go Back Home</p>
                </button>
            </Link>
            {!episodData.error ? (
                <main className='flex flex-col items-center gap-10 mt-[200px] md:mt-[150px]'>

                    <h1 className={`text-center ${outfit.className} font-extrabold font-sans text-2xl mx-5 translate-y-[100px] text-purple-700 md:text-5xl md:w-[50rem] md:mx-0 md:translate-y-0`}>
                        {episodData.animeTitle}
                    </h1>
                    <div className='flex flex-col mt-[100px] gap-5 w-auto self-center mx-3 md:mx-0 md:w-[50rem]'>
                        <div className='flex flex-row gap-3'>
                            <h1 className='text-white font-semibold self-center text-2xl'>Filter Episod : </h1>
                            <select
                                onChange={(event) => setCurrentEpisod(parseInt(event.target.value))}
                                className='self-center p-1 text-white text-[20px] border border-transparent bg-slate-900 rounded-[5px] cursor-pointer'>
                                {tabEpisod.map((element) => (
                                    <option value={element} key={element}>{element}</option>
                                ))}
                            </select>
                        </div>

                        {(summaryData.error === false && summaryData.episodTitle) ? (
                            <p className='text-left text-xl text-white md:text-3xl md:text-center'>Episod {currentEpisod} : <span className='text-sky-800 font-bold'>{summaryData.episodTitle}</span></p>
                        ) : (
                            <p className='text-white font-bold text-center text-3xl'>Waiting for a response</p>
                        )}


                        <div className='flex flex-row justify-between border border-transparent bg-[#09093b91] p-2 rounded-[5px]'>
                            <button
                                disabled={currentEpisod === 1}
                                onClick={() => setCurrentEpisod(prev => prev - 1)}
                                className='text-[#f1f1f1] bg-[#17248a52] text-[20px] font-bold rounded-[5px] p-1 cursor-pointer hover:bg-[#17248a9d] duration-200'>
                                Prev ⬅️
                            </button>
                            <button
                                disabled={currentEpisod === tabEpisod.length}
                                onClick={() => setCurrentEpisod(prev => prev + 1)}
                                className='text-[#f1f1f1] bg-[#17248a52] text-[20px] font-bold rounded-[5px] p-1 cursor-pointer hover:bg-[#17248a9d] duration-200'>
                                Next ➡️
                            </button>
                        </div>

                        {(summaryData.error === false && summaryData.synopsis) ? (
                            <p className='text-white text-[20px] px-5 leading-8'>{summaryData.synopsis}</p>
                        ) : (
                            <p className='text-white font-bold h-[15rem] text-[20px]'>Waiting for a response...</p>
                        )}



                        <div className='flex flex-row justify-between border border-transparent bg-[#09093b91] p-2 rounded-[5px]'>
                            <button
                                disabled={currentEpisod === 1}
                                onClick={() => setCurrentEpisod(prev => prev - 1)}
                                className='text-[#f1f1f1] bg-[#17248a52] text-[20px] font-bold rounded-[5px] p-1 cursor-pointer hover:bg-[#17248a9d] duration-200'>
                                Prev ⬅️
                            </button>
                            <button
                                disabled={currentEpisod === tabEpisod.length}
                                onClick={() => setCurrentEpisod(prev => prev + 1)}
                                className='text-[#f1f1f1] bg-[#17248a52] text-[20px] font-bold rounded-[5px] p-1 cursor-pointer hover:bg-[#17248a9d] duration-200'>
                                Next ➡️
                            </button>
                        </div>

                    </div>
                </main>
            ) : (
                <p className='text-5xl text-yellow-700 font-bold h-[20rem] translate-y-10 text-center mt-[100px]'>Loading</p>
            )}
        </>
    );
}

