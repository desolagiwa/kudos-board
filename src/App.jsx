import { useState } from 'react'
import { useEffect } from 'react'
import './styles/App.css'
import CreateBoard from './components/CreateBoard'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BoardListPage from './pages/BoardListPage'
import CardListPage from './pages/CardListPage'
import CommentListPage from './pages/CommentListPage'

function App() {

  return (
    <Router>
      <Routes>
        <Route index element={<BoardListPage/>}/>
        <Route path="/boards/:id/cards" element={<CardListPage />} />
        <Route path="/boards/:boardId/cards/:id/cards/:id/comments" element={<CommentListPage />} />
      </Routes>
    </Router>
  )
}

export default App
