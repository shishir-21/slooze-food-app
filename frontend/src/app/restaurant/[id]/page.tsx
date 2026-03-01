"use client";

import { useParams } from "next/navigation";
import { useQuery, gql } from "@apollo/client";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";


const GET_MENU = gql`
  query GetRestaurant($id: String!) {
    restaurant(id: $id) {
      id
      name
      menuItems {
        id
        name
        price
      }
    }
  }
`;

export default function RestaurantPage() {
    const params = useParams();
    const { addToCart } = useContext(CartContext)!;
    const { data, loading } = useQuery(GET_MENU, {
        variables: { id: params.id },
    });

    return (
        <ProtectedRoute>
            <Navbar />

            <div className="p-6">
                {loading && <p>Loading...</p>}

                <h1 className="text-2xl font-bold mb-4">
                    {data?.restaurant?.name}
                </h1>

                {data?.restaurant?.menuItems?.map((item: any) => (
                    <div
                        key={item.id}
                        className="border p-4 mb-2 rounded"
                    >
                        <h2>{item.name}</h2>
                        <p>₹ {item.price}</p>

                        <button
                            onClick={() =>
                                addToCart({
                                    id: item.id,
                                    name: item.name,
                                    price: item.price,
                                    quantity: 1,
                                })
                            }
                            className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
                        >
                            Add to Order
                        </button>
                    </div>
                ))}
            </div>
        </ProtectedRoute>
    );
}