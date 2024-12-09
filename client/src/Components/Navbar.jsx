import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getQueryDb, postPutQueryDb } from "../api/queryFuncs";

const Navbar = () => {
  const navigate = useNavigate();
  const logoutUser = async () => {
    console.log("Logged out");
    const { success, data } = await postPutQueryDb("/user/signout", "POST", {
      signout: true,
    });

    console.log(data);

    if (success) navigate("/signin");
  };

  return (
    <nav className="hidden md:block">
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <a className="btn btn-ghost text-xl">WHI</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li className="font-heading text-base font-semibold">
              <Link to={"/finance-tracker/edit-info"}>Edit Info</Link>
            </li>
            <li className="font-heading text-base font-semibold">
              <Link to="/">Finance Tracker</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li onClick={logoutUser}>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
