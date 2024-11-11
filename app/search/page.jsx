'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import '../globals.css';

export default function Page() {
    const searchParams = useSearchParams();
    const [animeName, setAnimeName] = useState('');

    const [searchedAnime, setSearchedAnime] = useState({
        error: false,
        loading: false,
        data: undefined
    });

    function handleError() {
        setSearchedAnime({
            error: true,
            loading: false,
            data: undefined
        });
    }

    function setLoading() {
        setSearchedAnime({
            error: false,
            loading: true,
            data: undefined
        });
    }

    useEffect(() => {
        const animeQuery = searchParams.get('anime') || '';
        setAnimeName(animeQuery);

        if (animeQuery) {
            const cachedData = localStorage.getItem(`animeData_${animeQuery}`);

            if (cachedData) {
                // Load from localStorage if available
                setSearchedAnime({
                    error: false,
                    loading: false,
                    data: JSON.parse(cachedData)
                });
            } else {
                // If no cache, fetch new data
                fetchSearchedAnime(animeQuery);
            }
        }
    }, [searchParams]);

    async function fetchSearchedAnime(query) {
        setLoading();
        try {
            const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&order_by=popularity&sort=asc&sfw`);
            if (!response.ok) {
                throw new Error('An error has occurred');
            }

            const result = await response.json();

            // Save the data in localStorage
            localStorage.setItem(`animeData_${query}`, JSON.stringify(result.data));

            setSearchedAnime({
                error: false,
                loading: false,
                data: result.data
            });
        } catch (error) {
            console.log(error.message);
            handleError();
        }
    }

    return (
        <>
            {searchedAnime.error === true ? (
                <p className='text-center mt-[100px] text-orange-700 font-bold text-5xl h-[35rem]'>
                    Something went wrong
                </p>
            ) : searchedAnime.loading === true ? (
                <p className='text-center mt-[100px] text-red-700 font-bold text-5xl h-[35rem]'>Loading...</p>
            ) : (
                <div className='flex flex-col mt-[150px] items-center gap-5'>
                    <div className=' flex flex-col gap-3'>
                        <h1 className='text-2xl text-violet-700 font-bold md:text-4xl'>Search results for <span className=' uppercase font-extrabold'>{animeName}</span></h1>
                        <span className=' w-auto h-[3px] rounded-[5px] bg-violet-700 md:w-[65rem]'></span>
                    </div>

                    <div className='w-auto mt-[50px] flex flex-wrap gap-5 justify-center md:w-[70rem]'>
                        {searchedAnime.data && Array.isArray(searchedAnime.data) && searchedAnime.data.map((anime) => (
                            <div key={anime.mal_id} className='flex flex-col hover:translate-y-[-5px] duration-300'>
                                <Link key={anime.mal_id} href={`/anime/${anime.mal_id}`}>

                                    <Image
                                        style={{ borderRadius: "5px 5px 0 0" }}
                                        className='border-2 border-gray-400 object-cover hover:brightness-50 duration-300 md:h-[23rem]'
                                        width={250}
                                        height={200}
                                        src={anime.images.jpg.large_image_url}
                                        alt={anime.title}
                                    />

                                </Link>

                                <div
                                    style={{ borderRadius: "0 0 5px 5px" }}

                                    className="border border-t-transparent border-gray-400 bg-slate-950 text-white p-2 h-[60px] overflow-hidden overflow-y-scroll"
                                >
                                    <p className="w-[230px] text-slate-200 font-semibold">
                                        {anime.title}
                                    </p>
                                </div>


                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
