import React from "react";
import '../styles/Card.css';
import { useState } from "react";
import { Link } from "react-router-dom";

const Card = ({title,gif,description,upvotes, id, author, fetchBoardData, boardId}) => {
  const [upvotesNum, setUpvotesNum] = useState(upvotes);
  const [isVisible, setIsVisible] = useState(true);

    const deleteCard = async (id) => {
      setIsVisible(false);
        try {
          const response = await fetch(process.env.URL + `/boards/cards/${boardId}/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          if (response.ok) {
            console.log(id, "has been deleted")
          } else {
            console.error('Error deleting card');
          }
        } catch (error) {
          console.error(error);
          setIsVisible(true);
        }
      };

    const onDelete = (event) => {
      event.preventDefault()
      deleteCard(id)
      fetchBoardData()
    }

    const upvoteCard = async (id) => {
        try {
          const response = await fetch(
            process.env.URL + `/boards/cards/${boardId}/${id}`,
            {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ upvotes: upvotes + 1 })
            }
          );
          if (response.ok) {
            setUpvotesNum(upvotes + 1);
            fetchBoardData();
            console.log(id, "has been upvoted");
          } else {
            console.error('Error upvoting card');
          }
        } catch (error) {
          console.error(error);
        }
      };

      const onUpvote = async (event) => {
        console.log("description: ", description)
        event.preventDefault()
        await upvoteCard(id);
        fetchBoardData();
      };
      if (!isVisible) {
        return null;
      }


    return (
        <div className="card">
            <img className='gif' src={gif} style={{width: "400px",height: "400px",}}/>
            <div className='title'>{title}</div>
            <div className="author">by {author}</div>
            <div className='description'>{description}</div>
            <div><button className="upvote-btn" onClick={onUpvote}>⬆️</button>
            <p className='upvotes'>{upvotesNum}</p></div>
            <button onClick={onDelete} className="delete-btn">Delete 🗑️</button>
            <Link to={`${boardId}/cards/${id}/comments`}>
              <button className="comments">Comments 💬</button>
            </Link>
        </div>
    )
}

export default Card;
