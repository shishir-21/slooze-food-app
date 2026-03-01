"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client"; // Removed unused 'gql' import
import ProtectedRoute from "../components/ProtectedRoute";
import Navbar from "../components/Navbar";
import { GET_RESTAURANTS } from "@/graphql/queries"; // Using pre-defined query from queries file

export default function Home() {
    const router = useRouter(); 
    
    // Fetch restaurants data using the shared query
    const { data, loading, error } = useQuery(GET_RESTAURANTS);

    return (
        <ProtectedRoute>
            <Navbar />

            <div className="p-6 max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Restaurants</h1>

                {/* Display loading message while fetching data */}
                {loading && <p className="text-orange-500 italic">Loading restaurants...</p>}
                
                {/* Display error message if the query fails */}
                {error && <p className="text-red-500 font-bold">Error: {error.message}</p>}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data?.restaurants?.map((restaurant: any) => (
                        <div
                            key={restaurant.id}
                            className="border p-5 rounded-xl shadow-sm cursor-pointer hover:bg-gray-50 hover:border-orange-500 transition-all"
                            onClick={() => router.push(`/restaurant/${restaurant.id}`)}
                        >
                            <h2 className="text-xl font-bold text-gray-800">{restaurant.name}</h2>
                            <p className="text-gray-500 mt-2">Country: 🌍 {restaurant.country}</p>
                        </div>
                    ))}
                </div>

                {/* Show a message if no data is found */}
                {!loading && data?.restaurants?.length === 0 && (
                    <p className="text-gray-400 mt-10">No restaurants found in your area.</p>
                )}
            </div>
        </ProtectedRoute>
    );
}