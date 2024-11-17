import { useSignIn } from "@clerk/clerk-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const { isLoaded, signIn } = useSignIn();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (value.trim() !== "") {
      setErrors({
        ...errors,
        [name]: false,
      });
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      email: formData.email.trim() === "",
      password: formData.email.trim() === "",
    };

    setErrors(newErrors);

    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: formData.email,
        password: formData.password,
      });

      if (signInAttempt.status === "complete") {
        alert("signed In");
      } else {
        console.log("Further action required:", signInAttempt);
      }
    } catch (error) {
      console.log("Error Signing in " + error);
      alert("Account does not exist!");
    }

    console.log(formData);
  };

  return (
    <div className="grid items-center h-screen md:grid-cols-3 font-body">
      <section className="h-full bg-slate-500 w-full "></section>
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
              name="email"
              className={`grow`}
              placeholder="Email"
              onChange={handleChange}
            />
          </label>
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
              name="password"
              className="grow"
              placeholder="Password"
              onChange={handleChange}
            />
          </label>
          <button className="btn btn-primary mt-10">Login{/*  */}</button>
          <p className="text-center">
            Not a member?{" "}
            <Link
              className="underline font-body text-blue-700 italic"
              to="/signup"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </section>
    </div>
  );
};

export default LoginPage;
