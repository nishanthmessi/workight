import express from 'express'
import {
  registerUser,
  authUser,
  updateUserProfile,
  logoutUser,
  createWorkExperince,
} from '../controllers/userController.js'
import { protect } from '../middlewares/authMiddleware.js'

const router = express.Router()
router.post('/', registerUser)
router.post('/auth', authUser)
router.post('/logout', logoutUser)
router.route('/profile').patch(protect, updateUserProfile)
router.patch('/profile/work-experience', createWorkExperince)

export default router
