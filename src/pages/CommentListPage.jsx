import { useEffect, useState } from "react";
import CommentList from '../components/CommentList'
import CreateComment from '../components/CreateComment'
import { useParams } from "react-router-dom";

const CommentListPage = ({}) => {
    const [comments, setComments] = useState([])
    const {id, boardId} = useParams()
    const [showCreateForm, setShowCreateForm] = useState(false)
    const cardId = parseInt(id)


    const openCreateForm = () => {
      setShowCreateForm(!showCreateForm)
    }


    const fetchComments = async () => {
        try {
          const response = await fetch(process.env.URL + `/boards/cards/comments/${boardId}/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          if (response.ok) {
            const data = await response.json();
            setComments(data)
          } else {
            console.error('Error fetching comments');
          }
        } catch (error) {
          console.error(error);
        }
      }
      useEffect(() => {
        fetchComments();
      }, []);
      const addComment = (newComment) => {
        setComments((prevComments) => [...prevComments, newComment]);
        fetchComments();
    }


    return (
        <>
        <button onClick={openCreateForm}>Create New Comment</button>
        {comments && <CommentList data={comments} boardId={boardId} cardId={id} fetchComments={fetchComments}/>}
        {showCreateForm &&(
            <CreateComment boardId={boardId} cardId={cardId} fetchComments={fetchComments} comments={comments} addComment={addComment}/>
          )}
        </>
    )
}

export default CommentListPage
