import { useState } from "react";
import '../styles/CreateComment.css'

const CreateComment = ({boardId, cardId, fetchComments}) => {
    const [author, setAuthor] = useState('')
    const [message, setMessage] = useState('')
    const [newComment, setNewComment] = useState([])
    const [error, setError] = useState(null);
    const url = `http://localhost:5000/boards/cards/comments/${boardId}/${cardId}`



    const createNewComment = async (commentInfo) => {


      try {
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(commentInfo)
          });
          if (!response.ok) {
            throw new Error('Failed to create new Comment')
          }

          const data = await response.json()
          setNewComment(data)
          setError(null)
        } catch (error) {
          if (error) {
            console.error(error)
            setError(error.message)
          } else {
            setError('An unknown error occurred')
          }
        }
      }

      const handleSubmit = async (event) => {
        event.preventDefault();
        const newInfo = { author, cardId, message};

        try {
          const response = await createNewComment(newInfo);
          if (!response) {
            throw new Error('No response from server');
          }
          if (!response.ok) {
            throw new Error('Failed to create new card');
          }
          const data = await response.json();
          const updatedBoardData = [...boardData, data];
          fetchBoardData(updatedBoardData);
          handleClose();
          setError(null);
        } catch (error) {
          console.error(error);
          setError('Failed to create card: ' + error.message);
        }
      };

      const handleClose = () =>{
        document.querySelector('.new-comment-form').style.display = 'none';
        fetchComments()
      }

      return (
        <div className="new-comment-form">
          <button className="close-btn" onClick={handleClose}>X</button>
          <h2>Create a New Comment</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Author:
              <input value={author} onChange={(e) => setAuthor(e.target.value)} type="text"/>
            </label>
            <label>
              Message:
              <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} required />
            </label>
            <button className="submit" type="submit">Create Card</button>
          </form>

        </div>

      );

}

export default CreateComment
