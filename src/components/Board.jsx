import React, { useEffect, useState } from 'react';
import '../styles/Board.css'
import CardList from './CardList'
import CardListPage from '../pages/CardListPage';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link} from 'react-router-dom'



const Board = ({title, description, image, author, id, fetchBoardList}) => {
    const [error, setError] = useState(null)

    const deleteBoard = async (id) => {
        try {
          const response = await fetch( process.env.URL + `/boards/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          if (response.ok) {
            console.log(id, "has been deleted")
          } else {
            console.error('Error deleting board');
          }
        } catch (error) {
          console.error(error);
        }
      };

    const onDelete = (event) => {
      event.preventDefault()
      deleteBoard(id)
      fetchBoardList()

    }

    return (
        <div className="board">
            <img className='image' src={image} alt={description} style={{width: "400px",height: "400px",}}/>
            <div className='title'>{title}</div>
            <div className='description'>{description}</div>
            <div className='author'>by {author}</div>
            <Link to={`/boards/${id}/cards`}>
              <button>View</button>
            </Link>
            <button onClick={onDelete}>Delete</button>
        </div>
    )
}

export default Board;
