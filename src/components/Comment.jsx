import React from "react";
import '../styles/Comment.css'
import { useState } from "react";

const Comment = ({message, author, cardId, boardId,id, fetchComments}) => {
    const [isVisible, setIsVisible] = useState(true);

    const deleteComment = async (id) => {
        setIsVisible(false);
          try {
            const response = await fetch(`http://localhost:5000/boards/cards/comments/${boardId}/${cardId}/${id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json'
              }
            });
            if (response.ok) {
              console.log(id, "has been deleted")
            } else {
              console.error('Error deleting comment');
            }
          } catch (error) {
            console.error(error);
            setIsVisible(true);
          }
        };

        const onDelete = (event) => {
            event.preventDefault()
            deleteComment(id)
            fetchComments()
          }
          if (!isVisible) {
            return null;
          }

    return (
    <div className="comment">
        <img src={`https://ui-avatars.com/api/?name=${author}`}/>
        <span>
            <p>"{message}"</p>
            <p>by {author}</p>
        </span>
        <button onClick={onDelete} className="delete-btn">delete</button>
    </div>
    )
}

export default Comment
