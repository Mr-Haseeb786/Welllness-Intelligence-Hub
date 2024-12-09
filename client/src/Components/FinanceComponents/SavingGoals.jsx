import React, { useEffect, useState } from "react";
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

const AddSavingGoal = ({ closePop, setRevalidateGoals }) => {
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

  const handleSubmit = async (e) => {
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

    const body = {
      title: goalTitle,
      deadline: goalDeadline,
      savedAmount: goalStartingAmount,
      targetAmount: goalTarget - goalStartingAmount,
    };

    const { success, data } = await postPutQueryDb(
      "/user/saving-goals",
      "POST",
      body
    );

    setRevalidateGoals(Math.random());

    console.log(data);
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

const AddAmountPopupContent = ({
  closePopup,
  savingId,
  setRevalidateGoals,
}) => {
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

    const body = {
      goalId: savingId,
      newAmount: addAmount,
    };

    const { data, success } = await postPutQueryDb(
      "/user/saving-goals",
      "PUT",
      body
    );

    setRevalidateGoals(Math.random());
    console.log(data);

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
  const [savingGoals, setSavingGoals] = useState([]);
  const [savingId, setSavingId] = useState("");
  const [revalidateGoals, setRevalidateGoals] = useState(0);

  useEffect(() => {
    const getSavingGoals = async () => {
      const { success, data } = await getQueryDb("/user/saving-goals");
      setSavingGoals(data.savingGoals);
    };
    getSavingGoals();
  }, [revalidateGoals]);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isAddAmountPopupOpen, setIsAddAmountPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const openAddAmount = () => setIsAddAmountPopupOpen(true);
  const closeAddAnount = () => setIsAddAmountPopupOpen(false);

  const removeGoal = async (id) => {
    console.log("Removed", id);

    const body = {
      goalId: id,
    };

    const ans = confirm("Are you sure to remove the goal?");

    if (!ans) return;

    const { success, data } = await postPutQueryDb(
      "/user/saving-goals",
      "DELETE",
      body
    );
    if (success) setRevalidateGoals(Math.random());

    return;
  };

  return (
    <div className="mt-16 bg-blue-400 mb-16 grid ">
      <Popup
        children={
          <AddSavingGoal
            closePop={closePopup}
            setRevalidateGoals={setRevalidateGoals}
          />
        }
        isOpen={isPopupOpen}
        onClose={closePopup}
      />
      <Popup
        children={
          <AddAmountPopupContent
            closePopup={closeAddAnount}
            savingId={savingId}
            setRevalidateGoals={setRevalidateGoals}
          />
        }
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
        {savingGoals.length === 0
          ? `N\A`
          : savingGoals.map((goal) => {
              const { _id, title, deadline, targetAmount, savedAmount } = goal;

              console.log(targetAmount, savedAmount);

              return (
                <article
                  key={_id}
                  data-id={_id}
                  className="card font-body bg-primary text-primary-content w-96"
                >
                  <div className="card-body">
                    <h2 className="text-2xl font-semibold font-heading">
                      {title}
                    </h2>
                    <div className="grid grid-cols-2">
                      <p className="self-end text-xl">Target</p>
                      <p className="justify-self-end">
                        Rs.
                        <span className="font-body font-bold text-2xl">
                          {targetAmount}
                        </span>
                      </p>
                    </div>
                    <div className="grid ">
                      <label className="form-control w-full max-w-lg justify-self-center">
                        <div className="label">
                          <span className="label-text text-white font-semibold font-body text-sm">
                            Deadline Date
                          </span>
                        </div>
                        <input
                          type="text"
                          className="text-black bg-blue-400 input input-bordered w-full max-w-lg"
                          name="goalDeadline"
                          value={deadline.substring(0, 10)}
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
                                data: [savedAmount, targetAmount],
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
                        data-id={_id}
                        onClick={(e) => {
                          setSavingId(e.target.getAttribute("data-id"));
                          openAddAmount();
                        }}
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
                      <button
                        data-id={_id}
                        className="btn"
                        onClick={(e) => {
                          removeGoal(e.target.getAttribute("data-id"));
                        }}
                      >
                        Cancel Goal
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
      </div>
    </div>
  );
};

export default SavingGoals;
