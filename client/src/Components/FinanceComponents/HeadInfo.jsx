import React from "react";

const HeadInfo = () => {
  return (
    <div className="font-body mt-[6rem] mb-[8rem] md:flex md:justify-evenly">
      <article className="flex justify-between md:gap-8">
        <h2 className="font-heading text-xl font-semibold self-end">
          Total Balance:{" "}
        </h2>
        <span className="font-bold text-4xl self-end ">
          <span className="text-xl">Rs. </span>
          987654
        </span>
      </article>

      <article className="flex justify-between mt-14 md:gap-8">
        <div className="">
          <h2 className="font-heading font-semibold text-lg">Monthly Income</h2>
          <p className="mt-3 font-semibold font-heading">
            Rs.
            <span className="font-bold font-body text-2xl"> 982341</span>
          </p>
        </div>
        <div className="max-h-full w-1 rounded-md bg-slate-500"></div>
        <div>
          <h2 className="font-heading font-semibold text-lg">
            Monthly Expense
          </h2>
          <p className="mt-3 font-semibold font-heading text-right">
            Rs.
            <span className="font-bold font-body text-2xl"> 13233</span>
          </p>
        </div>
      </article>
    </div>
  );
};

export default HeadInfo;
