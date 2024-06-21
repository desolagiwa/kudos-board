const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/:boardId', async (req, res) => {
    const boardId = parseInt(req.params.boardId)
    try {
        const cards = await prisma.Card.findMany(
            {where: {boardId}}
        )
        res.json(cards)
    } catch (error) {
        console.error(error)
        res.status(500).send('Server Error')
    }
})

router.get('/:boardId/:cardId', async (req, res) => {
    const boardId = parseInt(req.params.boardId)
    const cardId = parseInt(req.params.cardId)
    try {
        const card = await prisma.Card.findFirst(
            {where: {
                id :cardId,
                boardId
            }}
        )
        if (card){
            res.json(card)
        } else {
            res.status(404).send('Card not found');
        }
    } catch (error) {
        console.error(error)
        res.status(500).send('Server Error')
    }
})

router.post('/:boardId/', async (req,res) => {
    const {title, description, gif, upvotes, boardId} = req.body
    const newCard = await prisma.Card.create({
      data: {
        title,
        description,
        gif,
        upvotes,
        boardId
      }
    })
    res.json(newCard)
})

router.patch('/:boardId/:cardId', async (req,res) => {
    const boardId = parseInt(req.params.boardId)
    const cardId = parseInt(req.params.cardId)
    const {title, description, gif, upvotes} = req.body
    const updatedCard = await prisma.Card.update({
        where: {
            id: cardId,
            boardId},
        data: {
            title,
            description,
            gif,
            upvotes,
        }

    })
    res.json(updatedCard)
})

router.delete('/:boardId/:cardId', async (req,res) => {
    const boardId = parseInt(req.params.boardId)
    const cardId = parseInt(req.params.cardId)
    const deletedCard = await prisma.Card.delete({
        where: {
            id: cardId,
            boardId
        }
    })
    res.json(deletedCard)
})

module.exports = router
