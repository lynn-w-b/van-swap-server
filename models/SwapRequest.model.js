const { Schema, model } = require("mongoose");

const swapSchema = new Schema(
  {
    swaprequester: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required."],
    },
    vanowner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required."],
    },
    van: {
      type: Schema.Types.ObjectId,
      ref: "Van",
      required: [true, "Van is required."],
    },
    startdate: {
      type: String,
      required: [true, "Dates requested are required."],
    },
    enddate: {
      type: String,
      required: [true, "Dates requested are required."],
    },
    additionalInfo: {
      type: String,
      required: [true, "Additional information is required."],
    },
    decision: {
      type: String
    },
  },
  {
    timestamps: true,
  },
  { strictQuery: "throw" }
);

module.exports = model("Swap", swapSchema);
