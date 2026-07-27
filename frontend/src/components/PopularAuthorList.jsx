import React, { useEffect, useState } from "react";
import userLogo from "../assets/user.png";
import { getAllUsers } from "../api/authApi";

const PopularAuthorList = () => {
  const [popularUser, setPopularUser] = useState([]);
  const fetchUsers = async () => {
    try {
      const res = await getAllUsers();
      if (res.data.success) {
        setPopularUser(res.data.users);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="mx-auto mt-5 max-w-6xl py-5">
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-3xl font-bold dark:text-white">Popular Authors</h2>
        <hr className="h-1.5 w-28 rounded-full border-0 bg-red-800" />
        <div className="md-px-0 my-10 flex items-center justify-center gap-20 px-4">
          {popularUser?.slice(0, 3)?.map((user, index) => (
            <div key={index} className="flex flex-col items-center gap-4">
              <img
                src={user.photoUrl || userLogo}
                alt=""
                className="h-23 w-23 rounded-full md:h-34 md:w-34"
              />
              <p className="text-xl font-bold">{user.firstName} {user.lastName}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularAuthorList;
