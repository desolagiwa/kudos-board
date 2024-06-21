import React, { useState } from "react";

const CreateCard = ({addNewBoard ,boardId, fetchBoardData}) => {
  const [title, setTitle] = useState('')
  const [gif, setGif] = useState('')
  const [description, setDescription] = useState('')
  const [upvotes, setUpvotes] = useState(0)
  const [showForm, setShowForm] = useState(true);
  const [boardData, setBoardData] = useState(null);
  const [error, setError] = useState(null);
  const [newCard, setNewCard] = useState([])

  const url = 'http://localhost:5000/boards/cards/' + boardId

  boardId = parseInt(boardId)

  const fetchNewCardData = async (temp) => {

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(temp)
      });
      if (!response.ok) {
        throw new Error('Failed to create new Card')
      }

      const data = await response.json()
      setNewCard(data)
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


  const handleClose = () =>{
    document.querySelector('.new-board-form').style.display = 'none';
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newInfo = { title, description , gif, upvotes, boardId};
    const data = await fetchNewCardData(newInfo);
    fetchBoardData()
  }





  return (
    <div className="new-board-form">
      <button className="close-btn" onClick={handleClose}>X</button>
      <h2>Create a New Card</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label>
          Description:
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </label>
        <label>
          GIPHY:
          <input value={gif} onChange={(e) => setGif(e.target.value)} type="text"/>
        </label>
        <button className="submit" type="submit">Create Card</button>
      </form>

    </div>

  );
};

export default CreateCard;
