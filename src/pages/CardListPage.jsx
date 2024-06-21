import React, { useEffect, useState } from 'react';
import CardList from '../components/CardList'
import { useParams } from 'react-router-dom';
import CreateCard from '../components/CreateCard';

const CardListPage = () => {
    const [boardData, setBoardData] = useState(null)
    const [cards, setCards] = useState(null)
    const [error, setError] = useState(null)
    const [showCreateForm, setShowCreateForm] = useState(false)
    const {id} = useParams()

    let  url = 'http://localhost:5000/boards/cards/' + id

    const openCreateForm = () => {
        setShowCreateForm(!showCreateForm)
      }

    const fetchBoardData = async () => {
        try {
        //url += id;
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
        setBoardData(data);
        setError(null);
        } catch (error) {
        console.error(error);
        setError(error.message);
        }
        };

        useEffect(() => {
            //setBoardData(null)
            fetchBoardData();
          }, [id]);


    return (

            <>
                <button onClick={openCreateForm}>Create New Card</button>
                <div>{boardData && <CardList data={boardData} boardId={id} />}</div>
                {showCreateForm &&(
            <CreateCard boardId={id} fetchBoardData={() =>{fetchBoardData}}/>
          )}
            </>


    )
}

export default CardListPage;
