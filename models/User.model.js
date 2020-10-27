const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      trim: true,
      required: [true, 'Full Name is required.']
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    dateofbirth: {
      type: String,
      trim: true,
      required: [true, 'Date of Birth is required.'],
    },
    location: {
      type: String,
      trim: true,
      required: [true, 'Location is required.'],
    },
    about: {
      type: String,
      trim: true,
      required: [true, 'About section is required.'],
    },
    image: {
      type: String,
      trim: true,
      required: [false, 'Image is required.'],
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