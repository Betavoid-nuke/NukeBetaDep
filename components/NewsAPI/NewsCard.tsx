import Link from 'next/link'
import React from 'react'

interface props {
    title: string
    urlarticle: string
}

export const NewsCard = ({title, urlarticle}:props) => {
  return (
    <Link href={urlarticle} target="_blank" rel="noopener noreferrer">
        <div style={{marginBottom:'30px', color:'white', fontWeight:'lighter'}} >{title}</div>
    </Link>
  )
}
