const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const cardRoutes = require('./cardRoutes')


router.get('/', async (req, res) => {
    let query = {}
    if (req.query.category) {
      query.where = { category: req.query.category }
    }
    try {
      const boards = await prisma.Board.findMany(query)
      res.json(boards)
    } catch (error) {
      console.error(error)
      res.status(500).send('Server Error')
    }
})

router.get('/:id', async (req, res) => {
    try {
      const board = await prisma.Board.findUnique({
        where: { id: parseInt(req.params.id) }
      })
      res.json(board)
    } catch (error) {
      console.error(error)
      res.status(404).send('Board not found')
    }
  })

router.post('/', async (req, res) => {
    const {title, description, category, image, author} = req.body
    const newBoard = await prisma.Board.create({
      data: {
        title,
        description,
        category,
        image,
        author,
      }
    })
    res.json(newBoard)
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { title, description, category, image, author } = req.body
    const updatedBoard = await prisma.Board.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        category,
        image,
        author,
      }
    })
    res.json(updatedBoard)
  })

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    const deletedBoard = await prisma.Board.delete({
      where: { id: parseInt(id) }
    })
    res.json(deletedBoard)
  })

router.use('/cards', cardRoutes)

module.exports = router
