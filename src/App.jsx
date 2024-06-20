import { useState } from 'react'
import { useEffect } from 'react'
import './styles/App.css'
import BoardList from './BoardList'
import CreateBoard from './CreateBoard'

function App() {
  const [count, setCount] = useState(0)
  const [showCreateForm, setShowCreateForm] = useState(false)


  const openCreateForm = () => {
    setShowCreateForm(!showCreateForm)
  }


  return (
    <>
        <header>
          <h1>KUDOS BOARD</h1>
          <form>
            <input type="text" placeholder="Search" />
          </form>
        </header>
        <main>
          <div>
            <button>All</button>
            <button>Recent</button>
            <button>Celebration</button>
            <button>Thank You</button>
            <button>Inspiration</button>
          </div>
          <button onClick={openCreateForm}>Create New Board</button>
          {showCreateForm &&(
            <CreateBoard/>
          )}
          <BoardList />
        </main>
        <footer>

        </footer>
    </>
  )
}

export default App
