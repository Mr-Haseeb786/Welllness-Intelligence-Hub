const { Schema, model } = require("mongoose");

const ExpenseSchmema = new Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  financeRef: {
    type: Schema.Types.ObjectId,
    ref: "financeinfo",
    required: true,
  },
});

const ExpenseModel = model("expense", ExpenseSchmema);

module.exports = { ExpenseModel };
