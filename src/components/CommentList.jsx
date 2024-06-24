import React from "react";
import Comment from './Comment'

const CommentList = ({data, fetchComments, boardId, cardId}) => {
    return (
        <div className="comment-list">
            {data.map(comment  => (
              <Comment message={comment.message} author={comment.author} id={comment.id} cardId={cardId} fetchComments={fetchComments} boardId={boardId}/>
            ))}
        </div>
    )
}

export default CommentList;
