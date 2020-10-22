const { Schema, model } = require('mongoose');

const swapSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId, 
      ref:'User', 
      required: [true, 'User is required.'],
      unique: true
    },
    van: {
        type: Schema.Types.ObjectId, 
        ref:'Van', 
        required: [true, 'Van is required.'],
        unique: true
      },
    dates: {
      type: String,
      required: [true, 'Dates requested are required.']
    },
    additionalInfo: {
      type: String,
      trim: true,
      required: [true, 'Additional information is required.'],
    },
    accepted: {
      type: Boolean
    }
  },
  {
    timestamps: true
  }
);

module.exports = model('Swap', swapSchema);