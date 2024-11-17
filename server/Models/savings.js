const { Schema, model } = require("mongoose");

const SavingsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  targetAmount: {
    type: Number,
    required: true,
  },
  savedAmount: {
    type: Number,
    default: 0,
    required: true,
  },
  financeRef: {
    type: Schema.Types.ObjectId,
    ref: "financeinfo",
    required: true,
  },
});

const SavingsModel = model("savings", SavingsSchema);

module.exports = { SavingsModel };
