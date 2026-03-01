"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client/react";
import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";
import { GET_RESTAURANTS } from "@/graphql/queries";

interface Restaurant {
  id: string;
  name: string;
  country: string;
}

interface GetRestaurantsResponse {
  restaurants: Restaurant[];
}

export default function Home() {
  const router = useRouter();

  const { data, loading, error } =
    useQuery<GetRestaurantsResponse>(GET_RESTAURANTS);

  return (
    <ProtectedRoute>
      <Navbar />
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Available Restaurants
        </h1>

        {loading && (
          <p className="text-orange-500 animate-pulse">
            Loading restaurants...
          </p>
        )}

        {error && (
          <div className="text-red-500 bg-red-50 p-4 rounded border border-red-200">
            Connection Error: {error.message}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.restaurants?.map((restaurant) => (
            <div
              key={restaurant.id}
              className="bg-white border p-6 rounded-2xl shadow-sm cursor-pointer hover:shadow-lg hover:border-orange-500 transition-all"
              onClick={() =>
                router.push(`/restaurant/${restaurant.id}`)
              }
            >
              <h2 className="text-xl font-bold text-gray-800">
                {restaurant.name}
              </h2>
              <p className="text-gray-500 mt-2 font-medium">
                 Region: {restaurant.country}
              </p>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}