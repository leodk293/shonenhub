'use client';
import Image from "next/image";
import { Search, Linkedin, Twitter, Facebook } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Typewriter } from 'react-simple-typewriter'
import { useState, useEffect } from "react";
import './globals.css'

export default function Home() {

  const [animeName, setAnimeName] = useState("");
  const router = useRouter();

  const [recommendedAnime, setRecommendedAnime] = useState({
    error: false,
    data: undefined,
    loading: false
  })

  const [topChrts, setTopChrts] = useState({
    error: false,
    data: undefined,
    loading: false
  })

  function handleError() {
    setRecommendedAnime({
      error: true,
      data: undefined,
      loading: false
    })
  }

  function setLoader() {
    setRecommendedAnime({
      error: false,
      data: undefined,
      loading: true
    })
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (animeName.trim()) {
      router.push(`/search?anime=${encodeURIComponent(animeName)}`);
    }
  }

  async function getRecommendedAnime() {
    setLoader();
    try {
      const resp = await fetch('https://api.jikan.moe/v4/recommendations/anime');
      if (!resp.ok) {
        throw new Error(`An error has occured : ${resp.status}`)
      }
      const result = await resp.json();

      setRecommendedAnime({
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

  async function getTopChrts() {
    setTopChrts({
      error: false,
      data: undefined,
      loading: true
    })
    try {
      const resp = await fetch('https://api.jikan.moe/v4/top/characters');
      if (!resp.ok) {
        throw new Error(`An error has occured : ${resp.status}`)
      }
      const result = await resp.json();
      setTopChrts({
        error: false,
        data: result.data,
        loading: false
      })
    }
    catch (error) {
      console.log(error.message);
      setTopChrts({
        error: true,
        data: undefined,
        loading: false
      })
    }
  }

  useEffect(() => {
    getRecommendedAnime();
    getTopChrts();
  }, [])

  return (
    <main className="flex flex-col mt-[200px] items-center mx-5 md:mx-0 md:mt-10">

      <div className=" flex flex-col mt-[100px] items-center gap-5 text-white">
        <h1 className="text-3xl text-violet-950 mt-10 font-extrabold md:text-5xl md:mt-0">

          <Typewriter
            words={['Welcome to Shonenhub']}
            loop={1}
            cursor
            cursorStyle='/'
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />

        </h1>
        <p className="text-2xl text-violet-950 font-bold md:text-2xl">Discover a bunch of anime here</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-row mt-5 " action="">
        <input
          style={{ borderRadius: "10px 0 0 10px" }}
          className=" text-white uppercase font-bold outline-none text-[20px] w-auto py-5 px-8 border-transparent bg-[#1c1c1c] placeholder:capitalize md:w-[600px]"
          type="text"
          placeholder="Enter anime name..."
          value={animeName}
          onChange={(e) => setAnimeName(e.target.value)}
        />
        <button style={{ borderRadius: "0 10px 10px 0" }} className="border px-5 border-transparent bg-[#5a2e98] hover:bg-violet-800 duration-300">
          <Search className=" invert" size={28} strokeWidth={2.75} />
        </button>
      </form>

      <p className="text-gray-100 text-[16px] font-semibold mt-3">Shonenhub - Just a better place to know about the best anime of the moment for free!</p>

      <div className="flex flex-col items-center gap-5 mt-10">
        <p className="text-white text-[17px]">Connect with us</p>

        <div className=" flex flex-wrap gap-2">
          <Link className="border border-transparent p-1 bg-[#0A66C2] rounded-[5px] hover:bg-[#16165c] duration-200" href={'/'}>
            <Linkedin size={30} color="#ffffff" strokeWidth={1.25} />
          </Link>
          <Link className="border border-transparent p-1 bg-[#1DA1F2] rounded-[5px] hover:bg-[#16165c] duration-200" href={'/'}>
            <Twitter size={30} color="#ffffff" strokeWidth={1.25} />
          </Link>
          <Link className="border border-transparent p-1 bg-[#1877F2] rounded-[5px] hover:bg-[#16165c] duration-200" href={'/'}>
            <Facebook size={30} color="#ffffff" strokeWidth={1.25} />
          </Link>
        </div>

      </div>

      <Link className="mt-10" href={'/home'}>
        <button className="text-white outline-none border border-transparent rounded-[5px] px-8 py-3 text-2xl bg-[#5a2e98] hover:translate-x-2 duration-300">Go to home page</button>
      </Link>

      <div className="flex flex-col gap-2 w-auto mt-[50px] md:w-[1000px]">
        <p className="text-[19px] font-semibold text-gray-100">Shonenhub is a free anime website where you can be aware about the best anime of the moment.</p>

        <p className="text-[17px] mt-2 text-gray-200">Shonenhub provides users with various genres including Action, Comedy, Demons, Drama, Historical,
          Romance, Samurai, School, Shoujo Ai, Shounen Supernatural, etc. This is the perfect place to expand
          the imagination of children under 12 years old as well as spread beautiful images of friendship, family,
          teammates, magic, etc. Shonenhub is committed to keeping you updated with the latest releases.
        </p>

        <div className=" mt-10 flex flex-col gap-5">
          <h1 className=" text-white font-bold text-xl md:text-3xl">Most recommended anime ⛩️</h1>
          {
            recommendedAnime.error === true ?
              <p className=' text-center mt-2 text-white font-bold text-xl'>Something went wrong</p>
              :
              recommendedAnime.loading === true ?
                <p className=' text-center mt-2 text-white font-bold text-xl'>Loading...</p>
                :
                (
                  <div
                    className=" flex flex-row w-[400px] pb-5 overflow-hidden overflow-x-scroll gap-5 scrollbar-custom md:w-auto "
                  >
                    {
                      recommendedAnime.data &&
                      recommendedAnime.data.map((anime) => (
                        anime.entry.map((element) => (
                          <Link
                            key={element.mal_id}
                            href={`/anime/${element.mal_id}`}
                          >
                            <div className="w-[150px] h-[200px]">
                              <Image
                                width={150}
                                height={250}
                                alt={element.title}
                                src={element.images.jpg.large_image_url}
                                className="object-cover bg-white rounded-[5px] p-[1px] border border-transparent h-full hover:bg-blue-600 duration-300"
                              />
                            </div>
                          </Link>
                        ))
                      ))
                    }
                  </div>
                )
          }

          <div className=" mt-10 flex flex-col gap-5">
            <h1 className="text-white font-bold text-xl md:text-3xl">Discover some amazing characters ㊝</h1>

            {topChrts.error === true ?
              <p className=' text-center mt-2 text-red-700 font-bold text-xl'>Something went wrong</p> :
              topChrts.loading === true ?
                <p className=' text-center mt-2 text-orange-700 font-bold text-xl'>Loading...</p> :
                (
                  topChrts.data &&
                  <div
                    className=" flex flex-row w-[400px] pb-5 overflow-hidden overflow-x-scroll gap-5 scrollbar-custom md:w-auto"
                  >

                    {topChrts.data.map((character) => (
                      <Link
                        key={character.mal_id}
                        href={`/characters/${character.mal_id}`}
                      >
                        <div className="w-[150px] h-[200px]">
                          <Image
                            width={150}
                            height={250}
                            alt={character.name}
                            src={character.images.jpg.image_url}
                            className="object-cover bg-white rounded-[5px] p-[1px] border border-transparent h-full hover:bg-purple-500 duration-300"
                          />
                        </div>
                      </Link>
                    ))}


                  </div>
                )

            }
          </div>

        </div>


      </div>

      <Link className="mt-[80px]" href={'/home'}>
        <button className="text-white outline-none border border-transparent rounded-[5px] px-8 py-3 text-2xl bg-[#5a2e98] hover:translate-x-2 duration-300">Go to home page</button>
      </Link>

      <h1
       className=" mt-10 text-white font-bold text-xl">
        For any further information, please <Link className="text-purple-700 hover:text-purple-600 duration-200" href={'/contact'}>Contact us</Link>
        </h1>

    </main>
  );
}
