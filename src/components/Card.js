import React from 'react'
import './Card.css'

function Card(props) {

    

  return (
    <div className="card">
        <div className='profile'>
            <img src={props.image+'?v='+props.id} alt={props.name} className='img'/>
            <h3 className='name'>{props.name}</h3>
            <p className='title'>{props.title}</p>
        </div>
    </div>
  )
}

export default Card