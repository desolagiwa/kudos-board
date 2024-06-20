import React, { useState } from 'react';
import './styles/Board.css'
import BoardModal from './BoardModal';
import CardList from './CardList'

const Board = (props) => {
    const [isClicked, setIsClicked] = useState(false)

    const handleCardClick = () => {
        setIsClicked(true)
    }
    return (
        <div className="board" onClick={handleCardClick}>
            <div className='title'>{props.title}</div>
            <img className='image' src={props.image} alt={props.description}/>
            <div className='description'>{props.description}</div>
            <div className='author'>{props.author}</div>
            {isClicked && (
                <CardList />
            )}
        </div>
    )
}

export default Board;
