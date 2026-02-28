"use client";

import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext)!;

  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between">
      <div>
        <span className="font-bold">Food App</span>
      </div>

      <div className="flex gap-4 items-center">
        {user && (
          <>
            <span>
              Role: <strong>{user.role}</strong>
            </span>
            <span>
              Country: <strong>{user.country}</strong>
            </span>
          </>
        )}

        <button
          onClick={logout}
          className="bg-red-500 px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}