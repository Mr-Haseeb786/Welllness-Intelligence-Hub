import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import HeadInfo from "../Components/FinanceComponents/HeadInfo";
import ExpenseDetails from "../Components/FinanceComponents/ExpenseDetails";
import SavingGoals from "../Components/FinanceComponents/SavingGoals";

const FinanceTracker = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="max-w-7xl hidden md:block w-11/12 mx-auto">
        <HeadInfo />
        <ExpenseDetails />
        <SavingGoals />
      </div>
    </>
  );
};

export default FinanceTracker;
