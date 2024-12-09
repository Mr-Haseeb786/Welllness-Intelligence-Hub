import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
  defaults,
} from "chart.js/auto";
import { Doughnut, Line } from "react-chartjs-2";
import { getQueryDb, postPutQueryDb } from "../../api/queryFuncs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title
);

defaults.maintainAspectRatio = false;
defaults.responsive = true;

const ExpenseDetails = () => {
  const [expensesData, setExpensesData] = useState([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const getExpenses = async () => {
      const { success, data } = await getQueryDb("/user/expenses");
      console.log("Expenses", data.expenses);
      setExpensesData(data.expenses);
    };
    getExpenses();
  }, []);

  return (
    <div className="bg-red-300 py-5">
      <h2 className="text-3xl mt-2 mb-5 font-heading text-center font-bold">
        Your Expenses
      </h2>
      <article className=" md:flex md:justify-evenly md:items-center gap-4 mb-9">
        <div className="h-96 max-w-xs mx-auto mb-5">
          <p className="text-xl text-center mb-5 font-heading font-semibold">
            Overall Expenses
          </p>
          {expensesData.length === 0 ? (
            "N/A"
          ) : (
            <Doughnut
              data={{
                labels: expensesData.map((expenses) => expenses.name),
                datasets: [
                  {
                    label: "Expenses",
                    data: expensesData.map((expenses) => expenses.amount),
                  },
                ],
              }}
            />
          )}
        </div>
        <div className="h-96 max-w-sm md:w-full mx-auto mb-5 mt-16 md:mt-0">
          <p className="text-xl text-center mb-5 font-heading font-semibold">
            Expense History
          </p>
          {expensesData.length === 0 ? (
            "N/A"
          ) : (
            <Line
              data={{
                labels: expensesData.map((expenses) => expenses.name),
                datasets: [
                  {
                    label: "Expenses",
                    data: expensesData.map((expenses) => expenses.amount),
                    tension: 0.4,
                  },
                ],
              }}
            />
          )}
        </div>
      </article>
    </div>
  );
};

export default ExpenseDetails;
