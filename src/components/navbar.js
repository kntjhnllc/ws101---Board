import { userData } from "@/data_store/data";
import userModel from "@/model/userModel";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Navbar() {
  const router = useRouter();
  const { user, updateData } = userData();
  const [currentUser, setCurrentUser] = useState(userModel);

  useEffect(() => {
    user.some((obj, i) => {
      if (obj.isLoggedIn) {
        setCurrentUser(obj);
      }
    });
  }, []);

  const handleLogout = () => {
    user.some((obj, i) => {
      if (obj.isLoggedIn) {
        updateData(i, { ...obj, isLoggedIn: false });
        setCurrentUser(userModel);
        router.push("/login");
      }
    });
  };

  const handleView = () => {
    console.log(user);
  };

  return (
    <>
      <div className="container mx-auto ">
        <nav className="flex items-center flex-wrap ">
          <div className="inline-flex items-center">
            <span
              className="text-xl text-slate-900 font-medium tracking-wide cursor-pointer"
              onClick={handleView}
            >
              Liloc Board
            </span>
          </div>
          <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start flex flex-col lg:h-auto">
            <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-slate-700 font-bold items-center justify-center">
              {currentUser.name !== "" ? currentUser.name : "Name"}
            </a>
            <a
              className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-slate-700 cursor-pointer font-bold items-center justify-center"
              onClick={handleLogout}
            >
              Logout
            </a>
          </div>
        </nav>
      </div>
      <hr />
    </>
  );
}
