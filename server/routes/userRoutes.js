import express from 'express'
import { registerUser, authUser } from '../controllers/userController'

const router = express.Router()
router.post('/', registerUser)
router.post('/auth', authUser)

export default router
