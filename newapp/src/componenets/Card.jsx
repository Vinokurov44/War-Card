import React from 'react'
import './card.css'

export default function Card(props) {
  return (
    <div className='card' style={{ marginLeft: '7%',marginBottom: '20px'}}>
        <p className='h1'>{props.num}</p>
    </div>
  )
}
