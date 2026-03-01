"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@apollo/client/react";
import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";
import { GET_RESTAURANT } from "@/graphql/queries";

interface MenuItem {
  id: string;
  name: string;
  price: number;
}

interface Restaurant {
  id: string;
  name: string;
  country: string;
  menuItems: MenuItem[];
}

interface GetRestaurantResponse {
  restaurant: Restaurant;
}

export default function RestaurantPage() {
  const params = useParams();
  const id = params.id as string;

  const { data, loading, error } =
    useQuery<GetRestaurantResponse>(GET_RESTAURANT, {
      variables: { id },
    });

  return (
    <ProtectedRoute>
      <Navbar />

      <div className="p-6 max-w-4xl mx-auto">
        {loading && <p>Loading...</p>}

        {error && (
          <p className="text-red-500">
            Error: {error.message}
          </p>
        )}

        {data && (
          <>
            <h1 className="text-2xl font-bold mb-4">
              {data.restaurant.name}
            </h1>

            <p className="mb-6 text-gray-600">
              Region: {data.restaurant.country}
            </p>

            <div className="space-y-4">
              {data.restaurant.menuItems.map((item) => (
                <div
                  key={item.id}
                  className="border p-4 rounded shadow-sm"
                >
                  <h2 className="font-semibold">
                    {item.name}
                  </h2>
                  <p>₹ {item.price}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </ProtectedRoute>
  );
}