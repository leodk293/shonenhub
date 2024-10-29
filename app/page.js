'use client';
import Image from "next/image";
import { Search, Linkedin, Twitter, Facebook } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Typewriter } from 'react-simple-typewriter'

export default function Home() {

  const [animeName, setAnimeName] = useState("");
  const router = useRouter();

  function handleSubmit(event) {
    event.preventDefault();
    if (animeName.trim()) {
      router.push(`/search?anime=${encodeURIComponent(animeName)}`);
    }
  }

  return (
    <main className="flex flex-col mt-10 items-center mx-5 md:mx-0">

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
        <p className="text-2xl text-purple-950 font-bold md:text-2xl">Discover a bunch of anime here</p>
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
        <button style={{ borderRadius: "0 10px 10px 0" }} className="border px-5 border-transparent bg-[#5a2e98] hover:translate-x-1 duration-300">
          <Search className=" invert" size={28} strokeWidth={2.75} />
        </button>
      </form>
      <p className="text-gray-400 text-[16px] font-semibold mt-3">Shonenhub - Just a better place to know about the best anime of the moment for free!</p>

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
        <p className="text-[17px] text-gray-400">Shonenhub is a free anime website where you can be aware about the best anime of the moment.</p>

        <p className="text-[17px] mt-2 text-gray-400">Shonenhub provides users with various genres including Action, Comedy, Demons, Drama, Historical,
          Romance, Samurai, School, Shoujo Ai, Shounen Supernatural, etc. This is the perfect place to expand
          the imagination of children under 12 years old as well as spread beautiful images of friendship, family,
          teammates, magic, etc. Shonenhub is committed to keeping you updated with the latest releases.
        </p>

        <h1 className="text-2xl font-bold mt-5 text-white md:text-3xl">Is there a Shonenhub app?</h1>

        <p className="text-[17px] text-gray-400">Currently there is no app version of Shonenhub, we do not have any ios Shonenhub app or Shonenhub android apk.</p>

        <h1 className="text-2xl font-bold mt-5 text-white md:text-3xl">Is Shonenhub no ads guaranteed?</h1>

        <p className="text-[17px] text-gray-400">Yes, as you can see Shonenhub website currently comes with no Ads.</p>

        <h1 className="text-2xl font-bold mt-5 text-white md:text-3xl">Is Shonenhub safe?</h1>

        <p className="text-[17px] text-gray-400">We haven't received any report regarding the site's security. However, for your utmost safety, you should take precautionary measures such as a VPN to stay anonymous, anti-virus program and AdBlock extension to avoid ads and popups.</p>

        <h1 className="text-2xl font-bold mt-5 text-white md:text-3xl">Best alternative to 9anime</h1>

        <p className="text-[17px] text-gray-400">Although we are confident to provide you with the best informations about best anime, it is only wise to have more options
          in case bad things happen. Some other reliable and safe free anime sites you can bookmark include <Link className="text-gray-100" target="_blank" href={'https://ww8.gogoanimes.org/'}>gogoanime</Link>, <Link className="text-gray-100" target="_blank" href={'https://zorotv.link/'}>zorotv</Link>, and <Link className="text-gray-100" target="_blank" href={'https://animeheaven.me/'}>anime heaven</Link> .
        </p>

      </div>

      <Link className="mt-[80px]" href={'/home'}>
        <button className="text-white outline-none border border-transparent rounded-[5px] px-8 py-3 text-2xl bg-[#5a2e98] hover:translate-x-2 duration-300">Go to home page</button>
      </Link>

    </main>
  );
}
