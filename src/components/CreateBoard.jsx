import React, { useState } from "react";
import '../styles/CreateBoard.css'

const CreateBoard = ({addNewBoard, fetchBoardList}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [showForm, setShowForm] = useState(true);
  const [newBoard, setNewBoard] = useState([]);
  const [error, setError] = useState(null);
  const [image, setImage] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [gifs, setGifs] = useState([]);


  const url = 'http://localhost:5000/boards'
  const apiKey = import.meta.env.API_KEY
  console.log(apiKey)
  const fetchGifs = async () => {
    try {
      const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=7PbJfYXavCnYa4eiAL5F4d2cNMGKJ4Sy&q=${searchKeyword}`);
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
    setImage(gif.images.original.url);
  };

  const fetchNewBoardData = async (temp) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(temp)
      });
      if (!response.ok) {
        throw new Error('Failed to create new board')
      }
      const data = await response.json()
      setNewBoard(data)
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
    const newInfo = { title, category, author, description ,image};
    const data = await fetchNewBoardData(newInfo);
    fetchBoardList()
    handleClose()
  }

  return (
    <div className="new-board-form">
      <button className="close-btn" onClick={handleClose}>X</button>
      <h2>Create a New Board</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label>
          Category:
          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">Select a category</option>
            <option value="Celebration">Celebration</option>
            <option value="Thank You">Thank You</option>
            <option value="Inspiration">Inspiration</option>
          </select>
        </label>
        <label>
          Description:
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </label>
        <label>
          Author:
          <input value={author} onChange={(e) => setAuthor(e.target.value)} type="text"/>
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
                {gifs.map((gif) => (
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
        <button className="submit" type="submit">Create Board</button>
      </form>
    </div>
  );
};

export default CreateBoard;
