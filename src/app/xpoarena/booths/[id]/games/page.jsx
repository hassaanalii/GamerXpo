import React from 'react'

export default async function page({params}){
  return (
    <div>{params.id}</div>
  )
}

