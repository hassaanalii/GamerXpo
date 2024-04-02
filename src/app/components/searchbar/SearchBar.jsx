"use client"
import React from 'react'
import Image from 'next/image';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';


const SearchBar = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const {replace} = useRouter()

  const handleSearch = (searchTerm) =>{
    const params = new URLSearchParams(searchParams)
    if(searchTerm){
      params.set("query", searchTerm)
    }else{
      params.delete("query")
    }
    replace(`${pathname}?${params.toString()}`)

  }
  return (
    <div class="flex items-center rounded-full bg-white shadow-md px-5 py-2">
      <input 
      defaultValue={searchParams.get("query")?.toString()}
      onChange={(e)=> {
        handleSearch(e.target.value)
      }}
      class="w-full text-[14px] rounded-full py-2 pl-2 pr-4 bg-white focus:outline-none" type="search" placeholder="Search by Name" />
      {/* <div className='cursor-pointer flex rounded-full items-center justify-center p-2 bg-[#4F6F52]'>
        <Image src="/search.png" alt="hello" height={14} width={14} />
      </div> */}

    </div>
  )
}

export default SearchBar