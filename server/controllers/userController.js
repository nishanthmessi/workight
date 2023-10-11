import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateJwtToken from '../utils/generateToken.js'

// @desc - Register new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    name,
    email,
    password,
  })

  if (user) {
    generateJwtToken(res, user._id)
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc - Login/Auth user
// @route POST /api/users/auth
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    generateJwtToken(res, user._id)
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @desc - Update user basic details
// @route Patch /api/user/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.bio = req.body.bio || user.bio
    user.description = req.body.description || user.description
    // user.currentCompany = req.body.currentCompany || user.currentCompany

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      bio: updatedUser.bio,
      description: updatedUser.description,
      //currentCompany: updatedUser.currentCompany,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc - Add user work experience details
// @route Post /api/user/profile/experience
// @access Private
const createWorkExperince = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.experience.companyName = req.body.experience.companyName

    const userWorkExperience = await user.save()

    res.json({
      _id: userWorkExperience._id,
      companyName: userWorkExperience.experience.companyName,
    })
  } else {
    res.status(401)
    throw new Error('Unable to update experience')
  }
})

// @desc - Update user work experience details
// @route Patch /api/user/profile
// @access Private
const updateWorkExperince = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.experience.companyName =
      req.body.experience.companyName || user.experience.companyName
  }

  const updatedUserDetails = await user.save()
  res.json({
    _id: updatedUser._id,
    companyName: updatedUserDetails.experience.companyName,
  })
})

// @desc - Logout user
// @route POST /api/user/logout
// @access Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  })

  res.status(200).json({ message: 'User logged out' })
})

export {
  registerUser,
  authUser,
  updateUserProfile,
  createWorkExperince,
  logoutUser,
}
