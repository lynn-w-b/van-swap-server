const { Schema, model } = require('mongoose');

const vanSchema = new Schema(
  {
    make: {
      type: String,
      trim: true,
      required: [true, 'Make of van is required.'],
    },
    model: {
      type: String,
      trim: true,
      required: [true, 'Model of van is required.']
    },
    year: {
        type: String,
        trim: true,
        required: [true, 'Year is required.']
    },
    images: {
        type: Array,
        items: {
          img: String,
        },
        default: []
      },
    location: {
        type: String,
        trim: true,
        required: [true, 'Location of van is required']
    },
    about: {
        type: String,
        trim: true,
        required: [true, 'About information is required']
    },
    owner: {
        type: Schema.Types.ObjectId, ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

module.exports = model('Van', vanSchema);