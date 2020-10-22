const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, 'Username is required.'],
      unique: true
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    about: {
      type: String,
      trim: true,
      required: [true, 'About section is required.'],
    },
    image: {
      type: String,
      trim: true,
      required: [true, 'Image is required.'],
    },
    vans: {
      type: Array,
      items: {
        van: Schema.Types.ObjectId,
        ref: 'Van'
      },
      default: []
    }
  },
  {
    timestamps: true
  }
);

module.exports = model('User', userSchema);