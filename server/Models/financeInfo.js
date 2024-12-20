const { Schema, model } = require("mongoose");

const FinanceInfoSchema = new Schema({
  totalBalance: {
    type: Number,
    reqiured: true,
    default: 0,
  },
  monthlyIncome: {
    type: Number,
    required: true,
    default: 0,
  },
  monthlyExpense: {
    type: Number,
    default: 0,
  },
  userOwner: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  expenseRef: {
    type: Schema.Types.ObjectId,
    ref: "expense",
  },
  savingsRef: {
    type: Schema.Types.ObjectId,
    ref: "savings",
  },
});

const FinanceModel = model("financeinfo", FinanceInfoSchema);

module.exports = { FinanceModel };
