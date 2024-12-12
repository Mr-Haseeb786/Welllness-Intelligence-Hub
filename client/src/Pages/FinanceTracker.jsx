import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import HeadInfo from "../Components/FinanceComponents/HeadInfo";
import ExpenseDetails from "../Components/FinanceComponents/ExpenseDetails";
import SavingGoals from "../Components/FinanceComponents/SavingGoals";
import AggregatorComp from "../Components/FinanceComponents/AggregatorComp";
import Chatbot from "../Components/FinanceComponents/Chatbot";

const FinanceTracker = () => {
  const [openChatbot, setOpenChatbot] = useState(false);

  return (
    <>
      <Navbar setOpenChatbot={setOpenChatbot} />
      <Sidebar children={<AggregatorComp />} />
      <div className="max-w-7xl hidden md:block w-11/12 mx-auto">
        <HeadInfo />
        {openChatbot && <Chatbot setOpenChatbot={setOpenChatbot} />}

        <ExpenseDetails />
        <SavingGoals />
      </div>
    </>
  );
};

export default FinanceTracker;
