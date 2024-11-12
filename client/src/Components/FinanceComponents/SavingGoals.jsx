import React from "react";
import styles from "./styles.module.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title
);

const SavingGoals = () => {
  return (
    <div className="mt-16 bg-blue-400 mb-16">
      <h2 className="text-3xl font-heading font-bold text-center pt-5">
        Saving Goals
      </h2>
      <div className={styles.savingGoalslayout}>
        <article className="card font-body bg-primary text-primary-content w-96">
          <div className="card-body">
            <h2 className="text-2xl font-semibold font-heading">Goal title</h2>
            <div className="grid grid-cols-2">
              <p className="self-end text-xl">Target</p>
              <p className="justify-self-end">
                Rs.
                <span className="font-body font-bold text-2xl">1234</span>
              </p>
            </div>
            <div className="grid grid-cols-2">
              <p>Deadline</p>
              <p className="justify-self-end">Date</p>
              {/* Edit option needs to be added */}
            </div>
            <div className="my-4">
              <Doughnut
                data={{
                  labels: ["Completed", "Remaining"],
                  datasets: [
                    {
                      label: "Poll",
                      data: [70, 30],
                      circumference: 180,
                      rotation: 270,
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                }}
              />
            </div>
            <div className="card-actions justify-end">
              <button className="btn">Cancel Goal</button>
            </div>
          </div>
        </article>
        <article className="card font-body bg-primary text-primary-content w-96">
          <div className="card-body">
            <h2 className="text-2xl font-semibold font-heading">Goal title</h2>
            <div className="grid grid-cols-2">
              <p className="self-end text-xl">Target</p>
              <p className="justify-self-end">
                Rs.
                <span className="font-body font-bold text-2xl">1234</span>
              </p>
            </div>
            <div className="grid grid-cols-2">
              <p>Deadline</p>
              <p className="justify-self-end">Date</p>
              {/* Edit option needs to be added */}
            </div>
            <div className="my-4">
              <Doughnut
                data={{
                  labels: ["Completed", "Remaining"],
                  datasets: [
                    {
                      label: "Poll",
                      data: [70, 30],
                      backgroundColor: ["green", "yellow"],
                      circumference: 180,
                      rotation: 270,
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                }}
              />
            </div>{" "}
            <div className="card-actions justify-end">
              <button className="btn">Cancel Goal</button>
            </div>
          </div>
        </article>
        <article className="card font-body bg-primary text-primary-content w-96">
          <div className="card-body">
            <h2 className="text-2xl font-semibold font-heading">Goal title</h2>
            <div className="grid grid-cols-2">
              <p className="self-end text-xl">Target</p>
              <p className="justify-self-end">
                Rs.
                <span className="font-body font-bold text-2xl">1234</span>
              </p>
            </div>
            <div className="grid grid-cols-2">
              <p>Deadline</p>
              <p className="justify-self-end">Date</p>
              {/* Edit option needs to be added */}
            </div>
            <div className="my-4">
              <Doughnut
                data={{
                  labels: ["Completed", "Remaining"],
                  datasets: [
                    {
                      label: "Poll",
                      data: [70, 30],
                      circumference: 180,
                      rotation: 270,
                    },
                  ],
                }}
                options={{}}
              />
            </div>{" "}
            <div className="card-actions justify-end">
              <button className="btn">Cancel Goal</button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default SavingGoals;
