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
        data: []
    });

    function handleError() {
        setSearchedAnime({
            error: true,
            loading: false,
            data: []
        });
    }

    function setLoading() {
        setSearchedAnime({
            error: false,
            loading: true,
            data: []
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
                <p className='text-center mt-[100px] text-red-700 font-bold text-5xl h-[35rem]'>
                    Something went wrong
                </p>
            ) : searchedAnime.loading === true ? (
                <p className='text-center mt-[100px] text-orange-700 font-bold text-5xl h-[35rem]'>Loading...</p>
            ) : (
                <div className='flex flex-col mt-[240px] items-center gap-5 md:mt-[150px]'>
                    <div className=' flex flex-col gap-3'>
                        <h1 className='text-2xl text-violet-700 font-bold md:text-4xl'>Search results for <span className=' uppercase font-extrabold'>{animeName}</span></h1>
                        <span className=' w-auto h-[3px] rounded-[5px] bg-violet-700 md:w-[65rem]'></span>
                    </div>

                    {searchedAnime.data.length > 0 ?

                        <div className='w-auto mt-[50px] flex flex-wrap gap-5 justify-center md:w-[70rem]'>
                            {searchedAnime.data && Array.isArray(searchedAnime.data) && searchedAnime.data.map((anime) => (
                                <div key={anime.mal_id} className='flex flex-col hover:translate-y-[-5px] duration-300'>
                                    <Link key={anime.mal_id} href={`/anime/${anime.mal_id}`}>

                                        <Image
                                            className='border-2 border-gray-400 w-[150px] hover:brightness-50 duration-300 object-cover md:rounded-tl-[5px] md:rounded-tr-[5px] md:w-[250px] md:h-[23rem]'
                                            width={250}
                                            height={200}
                                            src={anime.images.jpg.large_image_url}
                                            alt={anime.title}
                                        />

                                    </Link>

                                    <div
                                        className="border border-t-transparent border-gray-400 bg-slate-950 text-white p-2 h-[60px] radius hidden overflow-hidden overflow-y-scroll md:block"
                                    >
                                        <p className="w-[230px] text-slate-200 font-semibold">
                                            {anime.title}
                                        </p>
                                    </div>

                                    <p className=' text-white w-[100px] block md:hidden'>{anime.title}</p>

                                </div>
                            ))}
                        </div> :
                        <p className=' text-white mt-10 text-2xl font-bold md:text-4xl md:h-[15rem]'>Sorry, no results found</p>

                    }

                </div>
            )}
        </>
    );
}
