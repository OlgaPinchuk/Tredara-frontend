import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/components/item.css'

export default function Item ({item}) {
  return (
    <Link to={`/read/${item.userID}`} className='item-link'>
        <div className='item'>
            <img src={item.image_url} className="item-image"/>
            <div className='item-title'>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
            </div>
        </div>
    </Link>
  );
}