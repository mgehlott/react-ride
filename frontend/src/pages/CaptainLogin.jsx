import { useState } from "react";
import { Link } from "react-router-dom";

const CaptainLogin = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e, name) => {
    setLoginData((pre) => {
      return { ...pre, [name]: e.target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginData({
      email: "",
      password: "",
    });
  };
  return (
    <div className="p-7 flex flex-col h-screen justify-between">
      <div>
        <img
          className="w-16 mb-2"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmoJcsV2aZSkAm3nmwtyjuiekrT3H5U7pvjQ&s"
        />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="text-lg font-medium">
              What`s your email
            </label>
            <input
              id="email"
              type="email"
              value={loginData.email}
              onChange={(e) => handleChange(e, "email")}
              placeholder="email@example.com"
              className="w-full bg-[#eee] px-4 py-2 mt-3 rounded-md placeholder:text-sm"
            />
          </div>
          <div className="mt-3">
            <label htmlFor="password" className="text-lg font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={loginData.password}
              onChange={(e) => handleChange(e, "password")}
              placeholder="Enter password"
              className="w-full bg-[#eee] px-4 py-2 mt-3 rounded-md placeholder:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black rounded text-semibold text-white mt-4 py-2"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-2 font-semibold text-sm">
          New here?{" "}
          <Link to="/captain-signup" className="text-blue-700">
            Register as Driver
          </Link>
        </p>
      </div>
      <div>
        {" "}
        <Link
          to="/login"
          className="w-full flex items-center justify-center bg-[#f19c2c] rounded text-semibold text-white mt-4 py-2"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
