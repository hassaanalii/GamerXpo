import React from 'react'

const SearchBar = () => {
  return (
    <div class="flex items-center rounded-full bg-white shadow-md"> 
        <svg class="w-5 h-5 ml-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10a4 4 0 11-2 3.464m2-3.464v-4m0 4H6" />
        </svg>
        <input class="w-full text-sm rounded-full py-2 pl-2 pr-4 bg-white focus:outline-none" type="search" placeholder="Search by Name" />
    </div>
  )
}

export default SearchBar