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
  userOwner: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

const FinanceModel = model("financeinfo", FinanceInfoSchema);

module.exports = { FinanceModel };
