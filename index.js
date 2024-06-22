const express = require('express');
const cors = require('cors')
require('dotenv').config()
const app = express();

const boardRoutes = require('./routes/boardRoutes')

const port = process.env.port || 3000
const { Prisma } = require('@prisma/client')


app.use(cors())
app.use(express.json())
app.use('/boards', boardRoutes)


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
  })

app.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json({ error: err.message })
  }
  else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
        return res.status(400).json({ error: "A unique constraint violation occurred." })
    }
  }
  res.status(500).json({ error: "Internal Server Error" })
  })



module.exports = app
