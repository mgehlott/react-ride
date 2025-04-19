import { useState } from "react";
import { Link } from "react-router-dom";

const CaptainSignup = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const handleChange = (e, name) => {
    setUserData((pre) => {
      return {
        ...pre,
        [name]: e.target.value,
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData({
      firstName: "",
      lastName: "",
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
            <label htmlFor="name" className="text-lg font-medium">
              What`s your name
            </label>
            <div className="flex gap-3 mb-3">
              <input
                id="firstName"
                type="text"
                value={userData.firstName}
                onChange={(e) => handleChange(e, "firstName")}
                placeholder="First name"
                className="w-full bg-[#eee] px-4 py-2 mt-3 rounded-md placeholder:text-sm"
              />
              <input
                id="lastName"
                type="text"
                value={userData.lastName}
                onChange={(e) => handleChange(e, "lastName")}
                placeholder="Last name"
                className="w-full bg-[#eee] px-4 py-2 mt-3 rounded-md placeholder:text-sm"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="text-lg font-medium">
              What`s your email
            </label>
            <input
              id="email"
              type="email"
              value={userData.email}
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
              value={userData.password}
              onChange={(e) => handleChange(e, "password")}
              placeholder="Enter password"
              className="w-full bg-[#eee] px-4 py-2 mt-3 rounded-md placeholder:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black rounded text-semibold text-white mt-4 py-2"
          >
            Signup
          </button>
        </form>
        <p className="text-center mt-2 font-semibold text-sm">
          Already have account?{" "}
          <Link to="/captain-login" className="text-blue-700">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;
