import React from 'react'


async function getData(title){
    const res = await fetch(`http://127.0.0.1:8000/api/games/?title=${title}`,  { next: { revalidate: 0 } })
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
     
    return res.json()

}
export default async function Game({params}){
    const data = await getData(params.title)
    return (
        <div>{params.title}</div>
    )
}
