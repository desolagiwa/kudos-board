import { useState } from 'react'
import { useEffect } from 'react'
import '../styles/BoardListPage.css'
import BoardList from '../components/BoardList'
import CreateBoard from '../components/CreateBoard'
import { useNavigate } from 'react-router-dom'

function BoardListPage() {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [boardList, setBoardList] = useState([])
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const navigate = useNavigate()

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

  const handleSearch = async () => {
    const searchUrl = 'http://localhost:5000/boards/search';
    console.log(searchQuery)
    const temp = {"searchQuery": searchQuery};
    try {
      const response = await fetch(searchUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(temp)
      });
      if (!response.ok) {
        throw new Error('Failed to complete search');
      }
      const data = await response.json();
      console.log(data)
      setSearchResults(data);

      setError(null);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    try {
      await handleSearch();
      // console.log(searchResults);
    } catch (error) {
      console.error(error);
    }
  };

  return (
   <div><div>
        <header>
          <h1>KUDOS BOARD</h1>
          <form onSubmit={handleSearchSubmit}>
            <input className='search-bar' type="text" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
            <button type='submit'>Search</button>
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
            searchResults.length > 0 ? (
              <BoardList data={searchResults} fetchBoardList={fetchBoardList} />
            ) : (
              <BoardList data={boardList} fetchBoardList={fetchBoardList} />
            )
            ) : (
              <div>Loading...</div>
            )}
        </main>
        <footer>

        </footer>
    </div></div>
  )
}

export default BoardListPage
