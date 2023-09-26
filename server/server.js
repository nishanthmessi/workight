import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

// Initializing dotenv and express app
dotenv.config()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

//API Home Route
app.get('/', (req, res) => {
  res.send('Welcome to Workight Server')
})

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`)
})
