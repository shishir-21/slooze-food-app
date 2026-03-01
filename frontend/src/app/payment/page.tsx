"use client";

import { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PAYMENT_METHOD } from "@/graphql/mutations";
import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";
import { AuthContext } from "@/context/AuthContext";

export default function PaymentPage() {
  const { user } = useContext(AuthContext)!;
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");

  const [addPaymentMethod, { loading }] = useMutation(ADD_PAYMENT_METHOD);

  // Security Check: If not Admin, show Access Denied
  if (user?.role !== "ADMIN") {
    return (
      <ProtectedRoute>
        <Navbar />
        <div className="p-10 text-center">
          <h1 className="text-2xl font-bold text-red-600">🚫 Access Denied</h1>
          <p className="text-gray-600">This page is restricted to Administrators only.</p>
        </div>
      </ProtectedRoute>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addPaymentMethod({ variables: { cardNumber, expiry } });
      alert("New Payment Method Authorized!");
      setCardNumber("");
      setExpiry("");
    } catch (err: any) {
      alert("Authorization Failed: " + err.message);
    }
  };

  return (
    <ProtectedRoute>
      <Navbar />
      <div className="p-8 max-w-lg mx-auto bg-white shadow-xl rounded-2xl mt-10">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">💳 Manage Payment Systems</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Card Number</label>
            <input
              type="text"
              required
              placeholder="XXXX-XXXX-XXXX-XXXX"
              className="mt-1 border p-3 w-full rounded-md focus:ring-blue-500"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
            <input
              type="text"
              required
              placeholder="MM/YY"
              className="mt-1 border p-3 w-full rounded-md focus:ring-blue-500"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md transition-all"
          >
            {loading ? "Authorizing..." : "Add Payment Method"}
          </button>
        </form>
      </div>
    </ProtectedRoute>
  );
}