import React, { useEffect, useState } from 'react';
import '../styles/Board.css'
import CardList from './CardList'
import CardListPage from '../pages/CardListPage';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link} from 'react-router-dom'



const Board = (props) => {
    const [error, setError] = useState(null)


    return (
        <div className="board">
            <img className='image' src={props.image} alt={props.description}/>
            <div className='title'>{props.title}</div>
            <div className='description'>{props.description}</div>
            <div className='author'>{props.author}</div>
            <Link to={`/boards/${props.id}/cards`}>
              <button>View</button>
            </Link>
        </div>
    )
}

export default Board;
