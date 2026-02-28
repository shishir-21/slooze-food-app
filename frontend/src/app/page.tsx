"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";
import { useQuery } from "@apollo/client";
import { GET_RESTAURANTS } from "@/graphql/queries";

export default function Home() {
  const { data, loading } = useQuery(GET_RESTAURANTS);

  return (
    <ProtectedRoute>
      <Navbar />

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Restaurants</h1>

        {loading && <p>Loading...</p>}

        {data?.restaurants?.map((restaurant: any) => (
          <div
            key={restaurant.id}
            className="border p-4 mb-2 rounded"
          >
            <h2 className="font-semibold">{restaurant.name}</h2>
            <p>Country: {restaurant.country}</p>
          </div>
        ))}
      </div>
    </ProtectedRoute>
  );
}