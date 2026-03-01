"use client";

import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import { AuthContext } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";

// Apollo imports 
import { useMutation } from "@apollo/client/react";
import { CREATE_ORDER, ADD_ITEM_TO_ORDER, CHECKOUT_ORDER } from "@/graphql/mutations";
import { useRouter } from "next/navigation";

export default function CartPage() {
    const { cart, clearCart } = useContext(CartContext)!;
    const { user } = useContext(AuthContext)!;
    const router = useRouter();

    const [createOrder, { loading: creatingOrder }] = useMutation(CREATE_ORDER);
    const [addItemToOrder] = useMutation(ADD_ITEM_TO_ORDER);
    const [checkoutOrder] = useMutation(CHECKOUT_ORDER);

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const handleCheckout = async () => {
        try {
            if (cart.length === 0) return alert("Cart is empty!");

            const { data: orderData } = await createOrder();
            const newOrderId = orderData.createOrder.id;

            for (const item of cart) {
                await addItemToOrder({
                    variables: {
                        orderId: newOrderId,
                        menuItemId: item.id,
                        quantity: parseFloat(item.quantity.toString()),
                    },
                });
            }

            alert("Order placed successfully!");
            clearCart();
            router.push("/orders"); 
        } catch (error: any) {
            console.error("Checkout Error:", error);
            alert(`Checkout failed: ${error.message}`);
        }
    };

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

                {/* Checkout Section Fix */}
                {(user?.role === "ADMIN" || user?.role === "MANAGER") ? (
                    <button
                        onClick={handleCheckout}
                        disabled={creatingOrder || cart.length === 0}
                        className={`${creatingOrder ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
                            } text-white px-4 py-2 rounded mt-4 transition-colors`}
                    >
                        {creatingOrder ? "Processing..." : "Checkout"}
                    </button>
                ) : (
                    user?.role === "MEMBER" && (
                        <p className="text-red-500 mt-4">
                            Members cannot checkout orders
                        </p>
                    )
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