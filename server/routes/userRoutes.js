import express from 'express'
import {
  registerUser,
  authUser,
  updateUserProfile,
  logoutUser,
} from '../controllers/userController.js'
import { protect } from '../middlewares/authMiddleware.js'

const router = express.Router()
router.post('/', registerUser)
router.post('/auth', authUser)
router.post('/logout', logoutUser)
router.route('/profile').patch(protect, updateUserProfile)

export default router
