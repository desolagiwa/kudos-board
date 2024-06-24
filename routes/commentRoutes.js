const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


router.get('/:boardId/:cardId', async (req, res) => {
    // const cardId = parseInt(req.params.cardId)
    try {
        const comments = await prisma.Comment.findMany(
            // {where: {cardId}}
            {where: {
                cardId: parseInt(req.params.cardId),
                // boardId: parseInt(req.params.boardId) // or some other value
              }}
        )
        res.json(comments)
    } catch (error) {
        console.error(error)
        res.status(500).send('Server Error')
    }
})
router.post('/:boardId/:cardId', async (req,res) => {
    const {author, message, cardId} = req.body
    const newComment = await prisma.Comment.create({
      data: {
        author,
        message,
        cardId
      }
    })
    res.json(newComment)
})
router.patch('/:boardId/:cardId/:commentId', async (req,res) => {
    const boardId = parseInt(req.params.boardId)
    const cardId = parseInt(req.params.cardId)
    const commentId = parseInt(req.params.commentId)
    const {author, message} = req.body
    const updatedComment = await prisma.Comment.update({
        where: {
            id: commentId,
            },
        data: {
            author,
            message,
        }

    })
    res.json(updatedComment)
})
router.delete('/:boardId/:cardId/:commentId', async (req,res) => {
    const boardId = parseInt(req.params.boardId)
    const cardId = parseInt(req.params.cardId)
    const commentId = parseInt(req.params.commentId)
    const deletedComment = await prisma.Comment.delete({
        where: {
            id: commentId,
        }
    })
    res.json(deletedComment)
})

module.exports = router
