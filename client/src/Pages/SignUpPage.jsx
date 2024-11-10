import React, { useState } from "react";
import { Link } from "react-router-dom";
import { validateAccountCreation } from "../lib/libFunctions";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "User",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setErrors({
      ...errors,
      [name]: false,
    });

    setFormData({
      ...formData,
      [name]: value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      email: formData.email === "",
      password: formData.password === "",
    };

    setErrors(newErrors);

    if (!formData.email || !formData.password) return;

    const errorResults = validateAccountCreation(formData);

    console.log(errorResults);

    if (errorResults.email) console.log("Email error");
    setErrors({
      ...errors,
      email: true,
    });

    if (errorResults.password)
      setErrors({
        ...errors,
        password: true,
      });

    console.log(errorResults);

    if (errorResults.email || errorResults.password) {
      return;
    }

    // Api call

    return;
  };

  return (
    <div className="grid md:grid-cols-3 items-center h-screen font-body">
      <section className="h-full bg-slate-500 w-full"></section>
      <section className="md:col-span-2">
        <form
          className="max-w-xs grid gap-4 items-center mx-auto"
          onSubmit={handleSubmit}
        >
          <label
            className={`input input-bordered ${
              errors.email && "input-error"
            } flex items-center gap-2`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
          </label>
          <label className={`input input-bordered flex items-center gap-2`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Name (optional)"
              name="username"
              onChange={handleChange}
            />
          </label>
          <div>
            <label
              className={`input input-bordered ${
                errors.password && "input-error"
              } flex items-center gap-2`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                className="grow"
                onChange={handleChange}
                name="password"
                placeholder="Password"
              />
            </label>
            <p className="text-[13px] font-normal mt-2 ml-2">
              Password must be more than 4 characters containing
            </p>
            <ul className="mt-1 text-[13px] font-normal list-disc ml-6">
              <li>1 UpperCase Character</li>
              <li>1 LowerCase Character</li>
              <li>1 Number</li>
            </ul>
          </div>
          <button className="btn btn-primary mt-5">Create Account</button>
          <p className="text-center">
            Already a member?{" "}
            <Link
              className="underline font-body text-blue-700 italic"
              to="/signin"
            >
              Login
            </Link>
          </p>
        </form>
      </section>
    </div>
  );
};

export default SignUpPage;
