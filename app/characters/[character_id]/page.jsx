import React from 'react'

export default function Page({params}) {
  return (
    <div className="mt-[230px] text-white mx-5 md:mx-0 md:mt-[180px]">
        {params.character_id}
    </div>
  )
}
