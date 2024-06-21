import { useState } from 'react'
import { useEffect } from 'react'
import '../styles/App.css'
import BoardList from '../components/BoardList'
import CreateBoard from '../components/CreateBoard'

function BoardListPage() {
  const [count, setCount] = useState(0)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [boardList, setBoardList] = useState([])
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('')


  const openCreateForm = () => {
    setShowCreateForm(!showCreateForm)
  }

 const  API_ENDPOINT = 'http://localhost:5000/boards'

  const fetchBoardList = async () => {
    try {
      let url = API_ENDPOINT;
      if (category !== '') {
        url += `?category=${category}`;
      }
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          accept: 'application/json'
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch board data');
      }
      const data = await response.json();
      setBoardList(data);
      setError(null);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  useEffect(() => {
    setBoardList(null);
    fetchBoardList();
  }, [category]);

  const addNewBoard = (newBoard) => {
    setBoardList([...boardList, newBoard]);
    console.log(setBoardList)
  };

  return (
   <>
        <header>
          <h1>KUDOS BOARD</h1>
          <form>
            <input type="text" placeholder="Search" />
          </form>
        </header>
        <main>
          <div className='category'>
            <button onClick={() => {setCategory("")}}>All</button>
            <button>Recent</button>
            <button onClick={() => {setCategory("Celebration")}}>Celebration</button>
            <button onClick={() => {setCategory("Thank You")}}>Thank You</button>
            <button onClick={() => {setCategory("Inspiration")}}>Inspiration</button>
          </div>
          <button onClick={openCreateForm}>Create New Board</button>
          {showCreateForm &&(
            <CreateBoard addNewBoard={addNewBoard} fetchBoardList={fetchBoardList} />
          )}
          {boardList !== null ? (
              <>
                <BoardList data={boardList} />
              </>
            ) : (
              <div>Loading...</div>
            )}
        </main>
        <footer>

        </footer>
    </>
  )
}

export default BoardListPage
