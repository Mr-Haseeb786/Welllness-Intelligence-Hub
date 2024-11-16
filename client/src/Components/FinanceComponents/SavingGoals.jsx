import React, { useState } from "react";
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
import Popup from "../Popup";
import Toast from "../ToastComp";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title
);

const AddSavingGoal = ({ closePop }) => {
  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  const openToast = () => setToastVisible(true);
  const closeToast = () => setToastVisible(false);

  const [goalData, setGoalData] = useState({
    goalTitle: "",
    goalTarget: 0,
    goalDeadline: "",
    goalStartingAmount: 0,
  });

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "goalTarget" || name === "goalStartingAmount") {
      value = parseInt(value);
    }

    setGoalData({
      ...goalData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { goalDeadline, goalStartingAmount, goalTarget, goalTitle } =
      goalData;

    if (!goalData || !goalDeadline || !goalTarget || !goalTitle) {
      setToastMessage("Please provide values in all fields");
      openToast();
      return;
    }

    if (goalTarget <= 0) {
      setToastMessage("Target amount must be greater than zero");
      openToast();
      return;
    }

    if (goalStartingAmount < 0) {
      setToastMessage("Starting amount can not be zero");
      openToast();
      return;
    }

    console.log(goalData);
    closePop();
  };

  return (
    <form className="grid" onSubmit={handleSubmit}>
      <Toast
        isVisible={toastVisible}
        message={toastMessage}
        onClose={closeToast}
      />
      <label className="form-control w-full max-w-lg justify-self-center">
        <div className="label">
          <span className="label-text font-semibold font-body text-sm">
            Enter your Goal Title
          </span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-lg"
          name="goalTitle"
          onChange={handleChange}
        />
      </label>{" "}
      <label className="form-control w-full max-w-lg justify-self-center">
        <div className="label">
          <span className="label-text font-semibold font-body text-sm">
            Enter your target amount
          </span>
        </div>
        <input
          type="number"
          placeholder="Type here"
          className="input input-bordered w-full max-w-lg"
          name="goalTarget"
          onChange={handleChange}
        />
      </label>{" "}
      <label className="form-control w-full max-w-lg justify-self-center">
        <div className="label">
          <span className="label-text font-semibold font-body text-sm">
            Select Deadline Date
          </span>
        </div>
        <input
          type="date"
          className="input input-bordered w-full max-w-lg"
          name="goalDeadline"
          onChange={handleChange}
        />
      </label>{" "}
      <label className="form-control w-full max-w-lg justify-self-center">
        <div className="label">
          <span className="label-text font-semibold font-body text-sm">
            Starting Amount
          </span>
        </div>
        <input
          type="number"
          onChange={handleChange}
          placeholder="Type here"
          className="input input-bordered w-full max-w-lg"
          name="goalStartingAmount"
        />
      </label>{" "}
      <button className="btn btn-accent mt-6">Save</button>
    </form>
  );
};

const AddAmountPopupContent = ({ closePopup }) => {
  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  const [addAmount, setAddAmount] = useState(0);

  const openToast = () => setToastVisible(true);
  const closeToast = () => setToastVisible(false);

  const handleChange = (e) => {
    setAddAmount(parseInt(e.target.value));
    return;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!addAmount || addAmount <= 0) {
      setToastMessage("Amount must be greater than zero");
      openToast();
      return;
    }

    console.log(addAmount);
    closePopup();
    return;
  };

  return (
    <form className="grid" onSubmit={handleSubmit}>
      <Toast
        isVisible={toastVisible}
        message={toastMessage}
        onClose={closeToast}
      />
      <label className="form-control w-full max-w-lg justify-self-center">
        <div className="label">
          <span className="label-text font-semibold font-body text-sm">
            Add Savings
          </span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-lg"
          name="addAmount"
          onChange={handleChange}
        />
      </label>{" "}
      <button type="submit" className="btn btn-accent mt-6">
        Save
      </button>
    </form>
  );
};

const SavingGoals = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isAddAmountPopupOpen, setIsAddAmountPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const openAddAmount = () => setIsAddAmountPopupOpen(true);
  const closeAddAnount = () => setIsAddAmountPopupOpen(false);

  const removeGoal = async () => {
    alert("Goal Removed");
    return;
  };

  return (
    <div className="mt-16 bg-blue-400 mb-16 grid ">
      <Popup
        children={<AddSavingGoal closePop={closePopup} />}
        isOpen={isPopupOpen}
        onClose={closePopup}
      />
      <Popup
        children={<AddAmountPopupContent closePopup={closeAddAnount} />}
        isOpen={isAddAmountPopupOpen}
        onClose={closeAddAnount}
      />
      <h2 className="text-3xl font-heading font-bold text-center pt-5">
        Saving Goals
      </h2>
      <button
        className="btn btn-accent font-body justify-self-end mr-6 mt-9 md:mt-0"
        onClick={openPopup}
      >
        Add Goal
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height={14}
          width={12.25}
          viewBox="0 0 448 512"
        >
          <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
        </svg>
      </button>
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
            <div className="grid ">
              <label className="form-control w-full max-w-lg justify-self-center">
                <div className="label">
                  <span className="label-text text-white font-semibold font-body text-sm">
                    Select Deadline Date
                  </span>
                </div>
                <input
                  type="date"
                  className="text-black bg-blue-400 input input-bordered w-full max-w-lg"
                  name="goalDeadline"
                />
              </label>{" "}
            </div>
            <div className="my-4 relative">
              <div>
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
              <button
                className="btn btn-accent rounded-full absolute translate-y-3 -translate-x-1 bottom-0 left-0"
                onClick={openAddAmount}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height={14}
                  width={12.25}
                  viewBox="0 0 448 512"
                >
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
                </svg>
              </button>
            </div>
            <div className="card-actions justify-end">
              <button className="btn" onClick={removeGoal}>
                Cancel Goal
              </button>
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
            <div className="my-4 relative">
              <div>
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
              <button
                className="btn btn-accent rounded-full absolute translate-y-3 -translate-x-1 bottom-0 left-0"
                onClick={openAddAmount}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height={14}
                  width={12.25}
                  viewBox="0 0 448 512"
                >
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
                </svg>
              </button>
            </div>{" "}
            <div className="card-actions justify-end">
              <button className="btn" onClick={removeGoal}>
                Cancel Goal
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default SavingGoals;
