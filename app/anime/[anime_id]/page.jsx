"use client";
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, ChartLine, Star, ThumbsUp, Clock, Tv } from 'lucide-react';

const Page = ({ params }) => {
  const [animeData, setAnimeData] = useState({
    error: false,
    data: undefined,
    loading: false
  })

  function handleError() {
    setAnimeData({
      error: false,
      data: undefined,
      loading: false
    })
  }

  function setLoader() {
    setAnimeData({
      error: false,
      data: undefined,
      loading: true
    })

  }

  async function fetchAnimeData() {
    setLoader();
    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime/${params.anime_id}/full`);

      if (!response.ok) {
        throw new Error('An error has occured');
      }

      const result = await response.json();
      setAnimeData({
        error: false,
        data: result.data,
        loading: false
      })
    }
    catch (error) {
      console.log(error.message)
      handleError();
    }
  }

  const [characters, setCharacters] = useState({
    error: false,
    loading: false,
    data: undefined
  })

  async function fetchCharacters() {
    setCharacters({
      error: false,
      loading: true,
      data: undefined
    })
    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime/${params.anime_id}/characters`);
      if (!response.ok) {
        throw new Error(`An error has occured`)
      }
      const result = await response.json();
      setCharacters({
        error: false,
        loading: false,
        data: result.data
      })
    }
    catch (error) {
      console.log(error.message);
      setCharacters({
        error: true,
        loading: false,
        data: undefined
      })
    }
  }

  useEffect(() => {
    fetchAnimeData();
    fetchCharacters();
  }, []);


  return (
    <div className='mt-[250px] mx-5 md:mx-0 md:mt-[150px]'>
  
      {
        animeData.error === true ?
          <p className=' text-center mt-10 text-orange-700 font-bold text-3xl h-[35rem]'>Something went wrong</p>
          : animeData.loading === true ?
            <p className=' text-center mt-10 text-red-700 font-bold text-3xl h-[35rem]'>Loading...</p> :
            (
              animeData.data &&

              <main className=' flex flex-col items-center gap-5'>
                <h1 className='text-purple-700 text-xl font-bold text-center md:text-3xl md:w-[1000px] md:leading-9'>{animeData.data.title} ({animeData.data.title_japanese})</h1>
                <div className=' flex flex-wrap justify-center mt-10 gap-5 '>

                  <Image
                    width={400}
                    height={400}
                    className='border bg-gray-100 border-1 border-gray-100 rounded-[5px] object-cover'
                    alt={animeData.data.title}
                    src={animeData.data.images.jpg.large_image_url}
                  />

                  <div className='flex flex-col font-normal mt-2 gap-5 md:font-semibold'>
                    <p className='font-bold text-blue-800 text-3xl'>Number of Episodes : {animeData.data.episodes === null ? "unknown" : animeData.data.episodes}</p>

                    <div className='flex flex-row mt-5 text-xl gap-2 md:text-2xl'>

                      <div className='flex flex-row gap-1'>
                        <Calendar className=' self-center' size={40} color="#0b89fe" strokeWidth={1.5} />
                        <p className='text-[#0b89fe] self-center'>Aired :</p>
                      </div>

                      <p className='text-white self-center'>{animeData.data.aired.string}</p>
                    </div>

                    <div className='flex flex-row text-xl gap-2 md:text-2xl'>
                      <div className='flex flex-row gap-1'>
                        <ChartLine size={40} color="#0b89fe" strokeWidth={1.5} />
                        <p className='text-[#0b89fe] self-center'>Rank :</p>
                      </div>

                      <p className='text-white self-center'>{animeData.data.rank === null ? "unknown" : animeData.data.rank}</p>
                    </div>

                    <div className='flex flex-row text-xl gap-2 md:text-2xl'>
                      <div className='flex flex-row gap-1'>
                        <Star size={40} color="#0b89fe" strokeWidth={1.5} />
                        <p className='text-[#0b89fe] self-center'>Score :</p>
                      </div>

                      <p className='text-white self-center'>{animeData.data.score === null ? "unknown" : animeData.data.score}</p>

                    </div>

                    <div className='flex flex-row text-xl gap-2 md:text-2xl'>
                      <div className='flex flex-row gap-1'>
                        <ThumbsUp size={40} color="#0b89fe" strokeWidth={1.5} />
                        <p className='text-[#0b89fe] self-center'>Popularity :</p>
                      </div>

                      <p className='text-white self-center'>{animeData.data.popularity}</p>
                    </div>

                    <div className='flex flex-row text-xl gap-2 md:text-2xl'>
                      <div className='flex flex-row gap-1'>
                        <Clock size={40} color="#0b89fe" strokeWidth={1.5} />
                        <p className='text-[#0b89fe] self-center'>Duration :</p>
                      </div>

                      <p className='text-white self-center'>{animeData.data.duration}</p>
                    </div>

                    <div className='flex flex-row text-xl gap-2 md:text-2xl'>
                      <div className='flex flex-row gap-1'>
                        <Tv size={40} color="#0b89fe" strokeWidth={1.5} />
                        <p className='text-[#0b89fe] self-center'>Status :</p>
                      </div>

                      <p className='text-white self-center'>{animeData.data.status}</p>
                    </div>

                    {animeData.data.status === "Finished Airing" ?
                      <Link className='mt-5' href={`/anime/${params.anime_id}/episods`}>
                        <button className='border border-transparent bg-purple-800 text-white font-bold text-xl px-5 py-2 rounded-[5px] hover:translate-x-1 duration-200'>Get Episods</button>
                      </Link> :
                      <p className=' text-3xl mt-5 font-bold text-orange-900'>Episodes Not Available Yet</p>
                    }

                  </div>

                </div>

                <div className='flex flex-col md:w-[51rem]'>

                  <div className=' text-white mt-5 flex flex-wrap gap-5'>
                    <p className='text-xl font-bold underline underline-offset-8'>Genres :</p>
                    <div className='flex flex-wrap self-center gap-5'>
                      {animeData.data.genres.map((element) => (
                        <p className={`text-white border font-bold border-transparent bg-orange-700 px-3 py-1 rounded-[25px] ${element.name === "Action" ? 'bg-yellow-800' : element.name === "Drama" ? "bg-red-800" : element.name === "Fantasy" ? 'bg-blue-900' : 'bg-orange-500'}`} key={element.mal_id}>{element.name}</p>
                      ))}
                    </div>

                  </div>

                  <div className=' text-white flex flex-wrap mt-5 gap-5'>
                    <p className='text-xl font-bold underline underline-offset-8'>Studios :</p>
                    <div className='flex flex-wrap self-center gap-5'>
                      {animeData.data.studios.map((element) => (
                        <p className='text-white border font-bold border-transparent bg-red-700 px-3 py-1 rounded-[25px]' key={element.mal_id}>{element.name}</p>
                      ))}
                    </div>

                  </div>

                  <div className='flex flex-col mt-10 gap-3'>
                    <h1 className='text-purple-600 text-4xl underline underline-offset-[10px]'>Synopsis</h1>
                    <p className='text-white text-[18px] leading-8'>{animeData.data.synopsis}</p>

                  </div>

                  <div className='flex flex-col mt-10 gap-3'>
                    {animeData.data.trailer.embed_url ? <h1 className='text-purple-600 underline underline-offset-8 text-4xl'>Trailer</h1> : ''}

                    {animeData.data.trailer.embed_url ?
                      <iframe
                        src={animeData.data.trailer.embed_url}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        title={`${animeData.data.title}`}
                        allowFullScreen
                        height={450}
                        className='shadow border border-purple-200 mt-5 bg-purple-200 rounded-[5px] md:w-[55rem]'
                      >

                      </iframe> : <p className='text-center mt-10 font-bold text-blue-700 text-3xl md:w-[55rem] mx-0'>Trailer not available 😢</p>}
                  </div>

                  {characters.error === true ?
                    <p className=' text-4xl text-center mt-10 text-red-800'>Something went wrong</p> :
                    characters.loading === true ?
                      <p className='text-4xl text-center mt-10 text-orange-700'>Loading</p> :
                      characters.data &&
                      (
                        <div className=' flex flex-col mt-10 items-center gap-5'>
                          <div className=' flex flex-col gap-2'>
                            <h1 className='text-4xl font-bold text-purple-600'>Characters</h1>
                            <span className=' w-auto h-[2px] rounded-[5px] bg-purple-600 md:w-[48rem]'></span>
                          </div>

                          <div className='flex flex-wrap gap-5 justify-center'>
                            {characters.data.map((chrt) => (
                              <Link
                                className='hover:scale-105 duration-300'
                                key={chrt.character.mal_id}
                                href={`/anime/${params.anime_id}/characters/${chrt.character.mal_id}`}
                              >
                                <div className={`flex flex-col gap-1 border border-slate-500 rounded-[5px] p-2 ${chrt.role === "Main" ? "bg-[#070736]" : "bg-slate-800"}`}>
                                  <Image
                                    className=' object-cover border border-slate-700 rounded-[5px]'
                                    src={chrt.character.images.jpg.image_url}
                                    width={150}
                                    height={150}
                                    alt={chrt.character.name}
                                  />
                                  <p className='text-white font-semibold w-[150px]'>{chrt.character.name}</p>
                                  <p className='text-white font-semibold'>{chrt.role}</p>
                                </div>
                              </Link>
                            ))}

                          </div>

                        </div>
                      )
                  }
                </div>

              </main>
            )
      }

    </div>
  )
}

export default Page