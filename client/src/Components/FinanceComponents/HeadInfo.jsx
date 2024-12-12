import React, { useEffect, useState } from "react";
import { getQueryDb } from "../../api/queryFuncs";
import Testing from "../Testing";

const HeadInfo = () => {
  const [totalBalance, setTotalBalance] = useState(0);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [monthlyExpense, setMonthlyExpense] = useState(0);

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const apiCall = async () => {
      const { success, data } = await getQueryDb("/user/home");

      if (success) {
        setSuccess(true);

        console.log(data);
        setMonthlyIncome(data.financeInfo.monthlyIncome);
        setTotalBalance(data.financeInfo.totalBalance);
        setMonthlyExpense(data.financeInfo.monthlyExpense);
      }
    };

    apiCall();
  }, []);

  console.log(totalBalance, monthlyIncome);

  return (
    <div className="font-body mt-[6rem] mb-[8rem] md:flex md:justify-evenly">
      <article className="flex justify-between md:gap-8">
        <h2 className="font-heading text-xl font-semibold self-end">
          Total Balance:{" "}
        </h2>
        <span className="font-bold text-4xl self-end ">
          <span className="text-xl">Rs. </span>
          {success ? totalBalance : "N/A"}
        </span>
      </article>

      <article className="flex justify-between mt-14 md:gap-8">
        <div className="">
          <h2 className="font-heading font-semibold text-lg">Monthly Income</h2>
          <p className="mt-3 font-semibold font-heading">
            Rs.
            <span className="font-bold font-body text-2xl">
              {" "}
              {success ? monthlyExpense : "N/A"}
            </span>
          </p>
        </div>
        <div className="max-h-full w-1 rounded-md bg-slate-500"></div>
        <div>
          <h2 className="font-heading font-semibold text-lg">
            Monthly Expense
          </h2>
          <p className="mt-3 font-semibold font-heading text-right">
            Rs.
            <span className="font-bold font-body text-2xl">
              {success ? monthlyIncome : "N/A"}
            </span>
          </p>
        </div>
      </article>
    </div>
  );
};

export default HeadInfo;
