"use client";

import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { gql, useQuery, useMutation } from "@apollo/client";
import { CHECKOUT_ORDER, CANCEL_ORDER } from "@/graphql/mutations"; // Added CANCEL_ORDER import
import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";

// Correct query according to backend schema
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
    
    // Fetching orders with Apollo useQuery
    const { data, loading, refetch } = useQuery(GET_ORDERS);

    // Mutation to Mark order as PAID
    const [checkoutOrder] = useMutation(CHECKOUT_ORDER, {
        onCompleted: () => {
            alert("Order marked as PAID!");
            refetch(); // Refresh list to show updated status
        }
    });

    // Mutation to Cancel order
    const [cancelOrder] = useMutation(CANCEL_ORDER, {
        onCompleted: () => {
            alert("Order cancelled successfully!");
            refetch(); // Refresh list to show updated status
        }
    });

    // Handler function for cancellation with confirmation
    const handleCancel = async (orderId: string) => {
        if (confirm("Are you sure you want to cancel this order?")) {
            try {
                await cancelOrder({ variables: { orderId } });
            } catch (err: any) {
                alert("Cancellation failed: " + err.message);
            }
        }
    };

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
                                    order.status === 'PAID' ? 'bg-green-100 text-green-700' : 
                                    order.status === 'CANCELLED' ? 'bg-red-100 text-red-700' : 
                                    'bg-yellow-100 text-yellow-700'
                                }`}>
                                    {order.status}
                                </span>
                            </div>

                            <div className="flex gap-2">
                                {/* Action Buttons: Visible only for ADMIN and MANAGER roles */}
                                {(user?.role === "ADMIN" || user?.role === "MANAGER") && order.status === "PENDING" && (
                                    <>
                                        <button
                                            onClick={() => checkoutOrder({ variables: { orderId: order.id } })}
                                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                                        >
                                            Mark as Paid
                                        </button>
                                        <button
                                            onClick={() => handleCancel(order.id)}
                                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                                        >
                                            Cancel Order
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </ProtectedRoute>
    );
}