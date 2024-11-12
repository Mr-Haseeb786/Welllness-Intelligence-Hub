import React from "react";
import HeadInfo from "./HeadInfo";
import ExpenseDetails from "./ExpenseDetails";
import SavingGoals from "./SavingGoals";

const AggregatorComp = () => {
  return (
    <>
      <HeadInfo />
      <ExpenseDetails />
      <SavingGoals />
    </>
  );
};

export default AggregatorComp;
