"use client";

import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { gql, useQuery, useMutation } from "@apollo/client";
import { CHECKOUT_ORDER, CANCEL_ORDER } from "@/graphql/mutations";
import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";

// GraphQL Query aligned with backend schema
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
    
    // Fetching orders using Apollo useQuery hook
    const { data, loading, refetch } = useQuery(GET_ORDERS);

    // Mutation to finalize order status to PAID
    const [checkoutOrder] = useMutation(CHECKOUT_ORDER, {
        onCompleted: () => {
            alert("Order marked as PAID!");
            refetch(); // Refreshing the list to reflect status change
        }
    });

    // Mutation to update order status to CANCELLED
    const [cancelOrder] = useMutation(CANCEL_ORDER, {
        onCompleted: () => {
            alert("Order cancelled successfully!");
            refetch(); // Refreshing the list to reflect status change
        }
    });

    // Helper function to handle order cancellation with a confirmation prompt
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

                {/* Loading state indicator */}
                {loading && <p className="text-orange-500 animate-pulse">Loading orders...</p>}

                <div className="grid gap-4">
                    {data?.getOrders.map((order: any) => (
                        <div key={order.id} className="bg-white border p-5 rounded-xl shadow-sm flex justify-between items-center">
                            <div>
                                <p className="text-xs font-mono text-gray-400 uppercase tracking-tighter">ID: {order.id.slice(0, 8)}...</p>
                                <p className="text-lg font-bold mt-1 text-gray-800 italic">🌍 {order.country}</p>
                                <p className="text-sm text-gray-600">Total Items: {order.orderItems.length}</p>
                                
                                {/* Dynamic Status Badge */}
                                <span className={`inline-block mt-2 px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                                    order.status === 'PAID' ? 'bg-green-100 text-green-700' : 
                                    order.status === 'CANCELLED' ? 'bg-red-100 text-red-700' : 
                                    'bg-yellow-100 text-yellow-700'
                                }`}>
                                    {order.status}
                                </span>
                            </div>

                            <div className="flex gap-2">
                                {/* Action Buttons: Restricted by Role and Order Status */}
                                {(user?.role === "ADMIN" || user?.role === "MANAGER") && order.status === "PENDING" && (
                                    <>
                                        <button
                                            onClick={() => checkoutOrder({ variables: { orderId: order.id } })}
                                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-all text-xs shadow-md"
                                        >
                                            Mark as Paid
                                        </button>
                                        <button
                                            onClick={() => handleCancel(order.id)}
                                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-all text-xs shadow-md"
                                        >
                                            Cancel Order
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Empty state handling */}
                {!loading && data?.getOrders.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                        No orders found.
                    </div>
                )}
            </div>
        </ProtectedRoute>
    );
}