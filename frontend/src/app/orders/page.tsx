"use client";

import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { gql, useQuery, useMutation } from "@apollo/client";
import { CHECKOUT_ORDER } from "@/graphql/mutations"; 
import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";

// Backend schema ke according correct query
const GET_ORDERS = gql`
  query GetOrders {
    getOrders {
      id
      status
      country
      orderItems {
        quantity
      }
    }
  }
`;

export default function OrdersPage() {
  const { user } = useContext(AuthContext)!;
  const { data, loading, refetch } = useQuery(GET_ORDERS);
  
  // Checkout mutation call karne ke liye
  const [checkoutOrder] = useMutation(CHECKOUT_ORDER, {
    onCompleted: () => {
      alert("Order marked as PAID!");
      refetch(); // List refresh karne ke liye
    }
  });

  return (
    <ProtectedRoute>
      <Navbar />
      <div className="p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">📦 Order Management</h1>

        {loading && <p className="text-orange-500 animate-pulse">Loading orders...</p>}

        <div className="grid gap-4">
          {data?.getOrders.map((order: any) => (
            <div key={order.id} className="bg-white border p-5 rounded-xl shadow-sm flex justify-between items-center">
              <div>
                <p className="text-xs font-mono text-gray-400">ID: {order.id}</p>
                <p className="text-lg font-bold mt-1">🌍 {order.country}</p>
                <p className="text-sm text-gray-600">Total Items: {order.orderItems.length}</p>
                <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold ${
                  order.status === 'PAID' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {order.status}
                </span>
              </div>

              {/* 🎯 Logic: Sirf Admin/Manager ko button dikhega agar status PAID nahi hai */}
              {(user?.role === "ADMIN" || user?.role === "MANAGER") && order.status !== "PAID" && (
                <button
                  onClick={() => checkoutOrder({ variables: { orderId: order.id } })}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                >
                  Mark as Paid ✅
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}