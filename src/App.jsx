import { useState } from 'react'
import { useEffect } from 'react'
import './styles/App.css'
import CreateBoard from './components/CreateBoard'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BoardListPage from './pages/BoardListPage'
import CardListPage from './pages/CardListPage'

function App() {
  // const []


  return (
    <Router>
      <Routes>
        <Route index element={<BoardListPage/>}/>
        <Route path="/boards/:id/cards" element={<CardListPage />} />
      </Routes>
    </Router>
  )
}

export default App
