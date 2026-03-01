"use client";

import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import { AuthContext } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";

export default function CartPage() {
  const { cart, clearCart } = useContext(CartContext)!;
  const { user } = useContext(AuthContext)!;

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <ProtectedRoute>
      <Navbar />

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

        {cart.map((item) => (
          <div key={item.id} className="border p-3 mb-2 rounded">
            <h2>{item.name}</h2>
            <p>
              ₹ {item.price} × {item.quantity}
            </p>
          </div>
        ))}

        <h2 className="mt-4 font-bold">Total: ₹ {total}</h2>

        {/* Checkout only for Admin & Manager */}
        {(user?.role === "ADMIN" ||
          user?.role === "MANAGER") && (
          <button className="bg-green-500 text-white px-4 py-2 rounded mt-4">
            Checkout
          </button>
        )}

        {user?.role === "MEMBER" && (
          <p className="text-red-500 mt-4">
            Members cannot checkout orders
          </p>
        )}

        <button
          onClick={clearCart}
          className="bg-gray-500 text-white px-4 py-2 rounded mt-4 ml-2"
        >
          Clear Cart
        </button>
      </div>
    </ProtectedRoute>
  );
}