"use client";

import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { CartContext } from "@/context/CartContext";
import Link from "next/link";

export default function Navbar() {
  // Accessing Authentication and Cart contexts
  const { user, logout } = useContext(AuthContext)!;
  const { cart } = useContext(CartContext)!;

  // Calculating the total number of items currently in the cart
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-lg">
      <div className="flex gap-6 items-center">
        {/* Main Brand Logo/Link */}
        <Link href="/" className="font-bold text-xl text-orange-500">
          Slooze Food
        </Link>

        {/* Navigation for Order History - Only visible if the user is logged in */}
        {user && (
          <Link href="/orders" className="hover:text-orange-500 font-medium transition-colors">
            Orders History
          </Link>
        )}

        {/* 💳 NEW: Payment Config Link - ONLY visible for ADMIN */}
        {user?.role === "ADMIN" && (
          <Link href="/payment" className="hover:text-blue-400 font-medium transition-colors border-b-2 border-transparent hover:border-blue-400">
            Payment Config
          </Link>
        )}
      </div>



      <div className="flex gap-6 items-center">
        {/* Cart Navigation with a dynamic badge showing item count */}
        <Link href="/cart" className="relative hover:text-orange-400 transition-colors">
          Cart
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-4 bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              {itemCount}
            </span>
          )}
        </Link>

        {/* User Information and Authentication Actions */}
        {user && (
          <div className="flex gap-4 items-center border-l border-gray-600 pl-6">
            {/* Displaying User Role (RBAC) */}
            <div className="text-sm">
              <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">Role</p>
              <p className="font-semibold text-orange-400">{user.role}</p>
            </div>
            {/* Displaying User Country (ReBAC / Regional Access) */}
            <div className="text-sm">
              <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">Region</p>
              <p className="font-semibold text-blue-400">{user.country}</p>
            </div>

            {/* Logout Trigger */}
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-1.5 rounded-lg transition-all font-bold ml-2"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}