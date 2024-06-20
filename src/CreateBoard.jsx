

import React from "react";
import './styles/CreateBoard.css'

const CreateBoard = () => {
    const handleClose = () =>{
        document.querySelector('.new-board-form').style.display = 'none';
    }

  return (
    <div className="new-board-form">
      <button className="close-btn" onClick={handleClose}>X</button>
      <h2>Create a New Board</h2>
      <form>
        <label>
          Title:
          <input type="text" required />
        </label>
        <label>
          Category:
          <select required>
            <option value="">Select a category</option>
            <option value="Recent">Recent</option>
            <option value="Celebration">Celebration</option>
            <option value="Thank You">Thank You</option>
            <option value="Inspiration">Inspiration</option>
          </select>
        </label>
        <label>
          Author:
          <input type="text" />
        </label>
        <button className="submit" type="submit">Create Board</button>
      </form>
    </div>
  );
};

export default CreateBoard;
