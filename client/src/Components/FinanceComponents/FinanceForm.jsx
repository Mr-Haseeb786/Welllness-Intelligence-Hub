import React, { useState } from "react";
import Popup from "../Popup";

const PopupContent = ({ closePopup }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

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
        />
      </label>{" "}
      <button className="btn btn-accent mt-6">Save</button>
    </form>
  );
};

const FinanceForm = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  return (
    <article className="mt-[6rem] mb-[8rem]">
      <form
        action=""
        className="grid justify-center md:grid-cols-2 md:items-center"
      >
        <label className="form-control w-full max-w-lg justify-self-center">
          <div className="label">
            <span className="label-text font-semibold font-body text-lg">
              Enter your total balance
            </span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-lg"
            name="total-balance"
          />
        </label>
        <label className="form-control w-full max-w-lg justify-self-center mt-4 md:mt-0">
          <div className="label">
            <span className="label-text font-semibold font-body text-lg">
              Enter your total Monthly Expense
            </span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-lg"
            name="monthly-expense"
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
        <form className="grid items-center justify-items-center gap-4">
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
              name="expense-title"
            />
          </label>
          <label className="form-control w-full max-w-lg justify-self-center mt-4 md:mt-0">
            <div className="label">
              <span className="label-text font-semibold font-body text-lg">
                Expenditure Amount
              </span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-lg"
              name="expense-amount"
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
              children={<PopupContent closePopup={closePopup} />}
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
              {/* row 1 */}
              <tr>
                <th>1</th>
                <td>Grocery</td>
                <td>Quality Control Specialist</td>
                <td className="flex gap-2">
                  <button className="btn btn-warning" onClick={openPopup}>
                    Edit
                  </button>
                  <button className="btn btn-error">Remove</button>
                </td>
              </tr>
              {/* row 2 */}
              <tr>
                <th>2</th>
                <td>Hart Hagerty</td>
                <td>Desktop Support Technician</td>
                <td className="flex gap-2">
                  <button className="btn btn-warning">Edit</button>
                  <button className="btn btn-error">Remove</button>
                </td>{" "}
              </tr>
              {/* row 3 */}
              <tr>
                <th>3</th>
                <td>Brice Swyre</td>
                <td>Tax Accountant</td>
                <td className="flex gap-2">
                  <button className="btn btn-warning">Edit</button>
                  <button className="btn btn-error">Remove</button>
                </td>{" "}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </article>
  );
};

export default FinanceForm;
