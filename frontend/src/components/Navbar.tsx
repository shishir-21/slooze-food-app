"use client";

import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { CartContext } from "@/context/CartContext";
import Link from "next/link";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext)!;
  const { cart } = useContext(CartContext)!;
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between">
      <div>
        <span className="font-bold">Food App</span>
      </div>
      <Link href="/cart" className="relative underline">
        Cart
        {itemCount > 0 && (
          <span className="ml-1 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
            {itemCount}
          </span>
        )}
      </Link>
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