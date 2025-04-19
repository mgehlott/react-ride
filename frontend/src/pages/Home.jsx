import { Link } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const Home = () => {
  const userData = useUserContext();
  console.log("uu", userData);
  return (
    <div className="">
      <div className="bg-cover bg-[url(https://images.unsplash.com/photo-1527603815363-e79385e0747e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHRyYWZmaWMlMjBsaWdodHxlbnwwfHwwfHx8MA%3D%3D)]  h-screen  pt- flex justify-between flex-col w-full">
        <img
          className="w-20 ml-4"
          src="https://www.logo.wine/a/logo/Uber/Uber-Logo.wine.svg"
        />
        <div className="bg-white py-4 px-4 pb-6 pt-2">
          <div className="text-2xl font-bold">Get Started with Uber </div>
          <Link
            to="/login"
            className="flex items-center justify-center w-full bg-black text-white py-3 rounded mt-4"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
