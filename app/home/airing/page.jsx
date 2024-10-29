"use client";
import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import '../../globals.css'

export default function page() {
  const [airingAnime, setAiringAnime] = useState({
    error: false,
    loading: false,
    data: undefined
  });

  function setLoading() {
    setAiringAnime({
      error: false,
      loading: true,
      data: undefined
    })
  }

  function handleError() {
    setAiringAnime({
      error: true,
      loading: false,
      data: undefined
    })
  }

  async function fetchAiringAnime() {
    setLoading();
    try {
      const response = await fetch('https://api.jikan.moe/v4/top/anime?filter=airing');
      if (!response.ok) {
        throw new Error('Something went wrong')
      }
      const result = await response.json();
      console.log(result);

      setAiringAnime({
        error: false,
        loading: false,
        data: result.data
      })
    }
    catch (error) {
      console.log(error.message)
      handleError();
    }

  }

  useEffect(() => {
    fetchAiringAnime();
  }, []);


  return (
    <main className='flex flex-col items-center'>
      <div className=' flex flex-col gap-2'>
        <h1 className='text-white text-4xl mt-10 font-extrabold'>Animes On Air</h1>
        <span className=' w-auto h-[2px] bg-white md:w-[65rem]'></span>
      </div>


      {
        airingAnime.loading === true
          ? <p className=' text-center mt-10 text-white font-bold text-3xl h-[20rem]'>Loading...</p>
          : airingAnime.error === true
            ? <p className=' text-center mt-10 text-white font-bold text-2xl h-[20rem]'>Something went wrong</p>
            :
            (
              airingAnime.data &&
              <div className='w-auto mt-[50px] flex flex-wrap gap-5 justify-center md:w-[70rem]'>

                {airingAnime.data.map((anime) => (
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
            )
      }
    </main>
  )
}