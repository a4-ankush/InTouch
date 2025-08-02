import React from "react";
import { Link } from "react-router-dom";

const UserDetails = ({ name, bio, posts, userId }) => (
  <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-6 flex flex-col items-center">
    <Link to={`/profile/${userId}`}>
      <span className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-2xl mb-3 hover:ring-2 hover:ring-blue-400 transition">
        {name?.charAt(0) || "U"}
      </span>
    </Link>
    <p className="font-bold text-xl text-gray-800 mb-1">{name || "No Name"}</p>
    <p className="text-gray-600 text-center mb-2">
      {bio || "No bio available."}
    </p>
    <div className="flex items-center gap-2 mt-2">
      <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
        Posts: {posts}
      </span>
    </div>
  </div>
);

export default UserDetails;
