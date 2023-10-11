import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    //currentCompany: String,
    bio: {
      type: String,
      maxlength: 30,
    },
    description: {
      type: String,
      maxlength: 256,
    },

    experience: {
      companyName: String,
      role: String,
      jobDescription: String,
    },

    education: String,
    website: String,
  },
  {
    timestamps: true,
  }
)

// Bcrypt setup for hashing password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

// Bcrypt setup for comparing password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('User', userSchema)

export default User
