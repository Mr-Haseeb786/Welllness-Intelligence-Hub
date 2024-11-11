import React from "react";
// import { Chart as ChartJS } from "react-chartjs-2"
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
          <Doughnut
            data={{
              labels: ["day", "month"],
              datasets: [
                {
                  label: "Expenses",
                  data: [12, 35],
                },
              ],
            }}
          />
        </div>
        <div className="h-96 max-w-sm md:w-full mx-auto mb-5 mt-16 md:mt-0">
          <p className="text-xl text-center mb-5 font-heading font-semibold">
            Expense History
          </p>
          <Line
            data={{
              labels: ["day", "month", "year", "b", "c", "d", "e", "g", "f"],
              datasets: [
                {
                  label: "Expenses",
                  data: [12, 35, 15, 80, 60, 70, 20, 45, 55],
                },
              ],
            }}
          />
        </div>
      </article>
    </div>
  );
};

export default ExpenseDetails;
