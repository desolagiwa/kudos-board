import React, { useState } from "react";
import '../styles/CreateCard.css'

const CreateCard = ({addNewBoard ,boardId, fetchBoardData, boardData}) => {
  const [title, setTitle] = useState('')
  const [gif, setGif] = useState('')
  const [description, setDescription] = useState('')
  const [upvotes, setUpvotes] = useState(0)
  const [author, setAuthor] = useState('')
  const [showForm, setShowForm] = useState(true);
  const [error, setError] = useState(null);
  const [newCard, setNewCard] = useState([])
  const [searchKeyword, setSearchKeyword] = useState('');
  const [gifs, setGifs] = useState([]);
  const [selectedGif, setSelectedGif] = useState(null);

  const url = 'http://localhost:5000/boards/cards/' + boardId

  boardId = parseInt(boardId)
  const apiKey = import.meta.env.VITE_API_KEY

  const fetchGifs = async () => {
    try {
      const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchKeyword}`);
      const data = await response.json();
      setGifs(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault()
    await fetchGifs();
  };

  const handleGifSelect = (gif) => {
  setSelectedGif(gif.images.original.url);
  setGif(gif.images.original.url);
  };


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
    document.querySelector('.new-card-form').style.display = 'none';
    fetchBoardData()
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newInfo = { title, description, gif: selectedGif, upvotes, boardId , author};

    try {
      const response = await fetchNewCardData(newInfo);
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


  return (
    <div className="new-card-form">
      <button className="close-btn" onClick={handleClose}>X</button>
      <h2>Create a New Card</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label>
          Author:
          <input value={author} onChange={(e) => setAuthor(e.target.value)} type="text"/>
        </label>
        <label>
          Message:
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </label>
        <label>
              Search for a GIF:
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
              <button type='search' onClick={handleSearch}>Search</button>
            </label>
            {gifs.length > 0 && (
              <div className="gif-grid">
                {gifs.slice(0,22).map((gif) => (
                  <img
                    src={gif.images.original.url}
                    key={gif.id}
                    onClick={() => handleGifSelect(gif)}
                    style={{width: "60px",
                    height: "60px",}}
                  />
                ))}
              </div>
            )}
        <button className="submit" type="submit">Create Card</button>
      </form>

    </div>

  );
};

export default CreateCard;
