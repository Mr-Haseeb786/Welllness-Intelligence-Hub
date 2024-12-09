import React, { useEffect, useState } from "react";
import Popup from "../Popup";
import "./styles.module.css";
import Toast from "../ToastComp";
import {
  deleteQueryDb,
  getQueryDb,
  postPutQueryDb,
} from "../../api/queryFuncs";

const PopupContent = ({
  closePopup,
  expenseId,
  setRevalidateExpenses = { setRevalidateExpenses },
}) => {
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState(0);

  const onExpenseNameChange = (e) => setExpenseName(e.target.value);
  const onExpenseAmountChange = (e) => setExpenseAmount(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!expenseName || !expenseAmount) {
      alert("Please enter all the values");
      return;
    }

    const body = {
      expenseId,
      newExpenseInfo: {
        name: expenseName,
        amount: expenseAmount,
      },
    };

    const { success, data } = await postPutQueryDb(
      "/user/expenses",
      "PUT",
      body
    );

    if (success) {
      setRevalidateExpenses(Math.random);
    }

    console.log(data);

    closePopup();
  };

  return (
    <form className="grid font-body" onSubmit={handleSubmit}>
      <label className="form-control w-full max-w-lg justify-self-center">
        <div className="label">
          <span className="label-text font-semibold font-body text-sm">
            Edit your epxense name
          </span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-lg"
          name="total-balance"
          value={expenseName}
          onChange={onExpenseNameChange}
        />
      </label>{" "}
      <label className="form-control w-full max-w-lg justify-self-center">
        <div className="label">
          <span className="label-text font-semibold font-body text-sm">
            Edit your expenditure amount
          </span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-lg"
          name="total-balance"
          value={expenseAmount}
          onChange={onExpenseAmountChange}
        />
      </label>{" "}
      <button className="btn btn-accent mt-6">Save</button>
    </form>
  );
};

const FinanceForm = () => {
  const [expenseData, setExpenseData] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);
  const [expenseId, setExpenseId] = useState("");

  const [isToastOpen, setIsToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const openToast = () => setIsToastOpen(true);
  const closeToast = () => setIsToastOpen(false);
  const [reValidateExpenses, setRevalidateExpenses] = useState("");

  const [mainInfoForm, setMainInform] = useState({
    totalBalance: 0,
    monthlyIncome: 0,
    monthlyExpense: 0,
  });

  useEffect(() => {
    const getExpenses = async () => {
      const { success, data } = await getQueryDb("/user/expenses");

      console.log("Expenses Data ", data.expenses);

      setExpenseData(data.expenses);
    };

    getExpenses();
  }, [reValidateExpenses]);

  const handleMainInfoChange = (e) => {
    let { name, value } = e.target;

    value = parseInt(value.trim());

    setMainInform({
      ...mainInfoForm,
      [name]: value,
    });
  };

  const handleRemoveExpense = async (expenseId) => {
    const body = {
      expenseId,
    };

    const { success, data } = await postPutQueryDb(
      "/user/expenses",
      "DELETE",
      body
    );

    if (success) setRevalidateExpenses(Math.random());

    console.log(data);
  };

  const handleMainInfoSubmit = async (e) => {
    e.preventDefault();

    if (
      !mainInfoForm.monthlyIncome ||
      !mainInfoForm.totalBalance ||
      !mainInfoForm.monthlyExpense
    ) {
      setToastMessage("No Values Provided");
      openToast();
      return;
    }

    if (
      mainInfoForm.monthlyIncome < 0 ||
      mainInfoForm.totalBalance < 0 ||
      !mainInfoForm.monthlyExpense
    ) {
      // setIsToastOpen(true);
      setToastMessage("Values must be positive");
      openToast();
      return;
    }

    try {
      const resp = await postPutQueryDb("/user/basics", "POST", mainInfoForm);

      console.log(resp);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  //  ==============
  // Expense Section vars
  //  ==============

  const [expenseInfoForm, setExpenseInfoForm] = useState({
    expenseTitle: "",
    expenditureAmount: 0,
  });

  const handleExpenseDataChange = (e) => {
    e.preventDefault();
    let { name, value } = e.target;

    if (name === "expenditureAmount") {
      value = parseInt(value);
    }

    setExpenseInfoForm({
      ...expenseInfoForm,
      [name]: value,
    });
  };

  const handleAddNewExpense = async (e) => {
    e.preventDefault();

    if (!expenseInfoForm.expenditureAmount || !expenseInfoForm.expenseTitle) {
      setToastMessage("Please Provide Values in both Fields");
      openToast();
      return;
    }

    if (expenseInfoForm.expenseTitle.length < 3) {
      setToastMessage("Expense Title must be more than 3 characters");
      openToast();
      return;
    }

    if (expenseInfoForm.expenditureAmount < 0) {
      setToastMessage("Expense Amount cannot be negative");
      openToast();
      return;
    }

    // querys
    const { success, data } = await getQueryDb("/user/home");

    if (!success) {
      console.log("Error");
      return;
    }

    const body = {
      name: expenseInfoForm.expenseTitle,
      amount: expenseInfoForm.expenditureAmount,
      financeRef: data.financeInfo._id,
    };

    const { success: expenseSuccess, data: newExpense } = await postPutQueryDb(
      "/user/expenses",
      "POST",
      body
    );

    console.log(newExpense);
    // revalidate query

    setRevalidateExpenses(Math.random());

    console.log(expenseInfoForm);
  };

  let expenseSerial = 0;

  return (
    <article className="mt-[6rem] mb-[8rem]">
      <Toast
        isVisible={isToastOpen}
        onClose={closeToast}
        message={toastMessage}
      />
      <form
        onSubmit={handleMainInfoSubmit}
        className="grid justify-center md:grid-cols-2 md:items-center"
      >
        <label className="form-control w-full max-w-lg justify-self-center">
          <div className="label">
            <span className="label-text font-semibold font-body text-lg">
              Enter your total balance
            </span>
          </div>
          <input
            type="number"
            placeholder="Type here"
            className="input input-bordered w-full max-w-lg"
            name="totalBalance"
            onChange={handleMainInfoChange}
          />
        </label>
        <label className="form-control w-full max-w-lg justify-self-center mt-4 md:mt-0">
          <div className="label">
            <span className="label-text font-semibold font-body text-lg">
              Enter your total Monthly Expense
            </span>
          </div>
          <input
            type="number"
            placeholder="Type here"
            className="input input-bordered w-full max-w-lg"
            name="monthlyIncome"
            onChange={handleMainInfoChange}
          />
        </label>
        <label className="form-control w-full max-w-lg justify-self-center md:col-span-2 mt-4 md:mt-8">
          <div className="label">
            <span className="label-text font-semibold font-body text-lg">
              Enter your Monthly Income
            </span>
          </div>
          <input
            type="number"
            placeholder="Type here"
            className="input input-bordered w-full max-w-lg"
            name="monthlyExpense"
            onChange={handleMainInfoChange}
          />
        </label>
        <button className="btn btn-accent mt-16 max-w-max md:col-span-2 justify-self-center font-body">
          <p className="mr-4">Update Info</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="14"
            width="10.5"
            viewBox="0 0 384 512"
          >
            <path d="M280 64l40 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 128C0 92.7 28.7 64 64 64l40 0 9.6 0C121 27.5 153.3 0 192 0s71 27.5 78.4 64l9.6 0zM64 112c-8.8 0-16 7.2-16 16l0 320c0 8.8 7.2 16 16 16l256 0c8.8 0 16-7.2 16-16l0-320c0-8.8-7.2-16-16-16l-16 0 0 24c0 13.3-10.7 24-24 24l-88 0-88 0c-13.3 0-24-10.7-24-24l0-24-16 0zm128-8a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" />
          </svg>
        </button>
      </form>

      <div className="bg-gray-300 h-1 rounded-md my-[7rem] max-w-lg w-10/12 mx-auto"></div>

      <div>
        <h2 className="text-center font-heading font-bold text-3xl mt-[5rem] mb-16">
          Expense Details
        </h2>
        <form
          className="grid items-center justify-items-center gap-4"
          onSubmit={handleAddNewExpense}
        >
          <label className="form-control w-full max-w-lg justify-self-center mt-4 md:mt-0">
            <div className="label">
              <span className="label-text font-semibold font-body text-lg">
                Expense Title
              </span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-lg"
              name="expenseTitle"
              onChange={handleExpenseDataChange}
            />
          </label>
          <label className="form-control w-full max-w-lg justify-self-center mt-4 md:mt-0">
            <div className="label">
              <span className="label-text font-semibold font-body text-lg">
                Expenditure Amount
              </span>
            </div>
            <input
              type="number"
              placeholder="Type here"
              className="input input-bordered w-full max-w-lg"
              name="expenditureAmount"
              onChange={handleExpenseDataChange}
            />
          </label>
          <button className="btn btn-accent md:col-span-2 mt-16">
            <p className="font-body mr-6">Add New Expense</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height={14}
              width={12.25}
              viewBox="0 0 448 512"
            >
              <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
            </svg>
          </button>
        </form>
        <div className="overflow-x-auto mt-8">
          <table className="table table-zebra">
            <Popup
              isOpen={isPopupOpen}
              onClose={closePopup}
              children={
                <PopupContent
                  closePopup={closePopup}
                  expenseId={expenseId}
                  setRevalidateExpenses={setRevalidateExpenses}
                />
              }
            />
            {/* head */}
            <thead className="font-heading text-sm">
              <tr>
                <th></th>
                <th>Expense Title</th>
                <th>Expenditure Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="font-body">
              {expenseData.length === 0
                ? "N/A"
                : expenseData.map((expense) => {
                    expenseSerial++;
                    const { _id, name, amount } = expense;
                    return (
                      <tr key={_id} data-id={`${_id}`}>
                        <th>{expenseSerial}</th>
                        <td>{name}</td>
                        <td>{amount}</td>
                        <td className="flex gap-2">
                          <button
                            className="btn btn-warning"
                            onClick={(e) => {
                              setExpenseId(
                                e.target.parentElement.parentElement.getAttribute(
                                  "data-id"
                                )
                              );
                              openPopup();
                              return;
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-error"
                            onClick={(e) => {
                              handleRemoveExpense(
                                e.target.parentElement.parentElement.getAttribute(
                                  "data-id"
                                )
                              );
                            }}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>
      </div>
    </article>
  );
};

export default FinanceForm;
