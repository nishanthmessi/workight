import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'

// Initializing dotenv, db connection and express app
dotenv.config()
connectDB()

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
