import React from 'react'
import './Card.css'

function Card(props) {

    

  return (
    <div className="card">
        <div className='profile'>
            <img src={props.image+'?v='+props.id} alt={props.name} className='img'/>
            <div className='name-prefix'>
              <h3 className='prefix'>{props.prefix}</h3>
              <h3 className='name'>{props.name}</h3>
            </div>
            <p className='title'>{props.title}</p>
        </div>
    </div>
  )
}

export default Card