import React from "react";
import Sidebar from "../Components/Sidebar";
import FinanceForm from "../Components/FinanceComponents/FinanceForm";
import Navbar from "../Components/Navbar";

const InputForm = () => {
  return (
    <div>
      <Navbar />
      <Sidebar children={<FinanceForm />} />
      <div className="hidden md:block max-w-7xl w-11/12 mx-auto">
        <FinanceForm />
      </div>
    </div>
  );
};

export default InputForm;
