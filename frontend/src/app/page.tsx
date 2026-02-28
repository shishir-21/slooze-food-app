"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <ProtectedRoute>
      <Navbar />

      <div className="p-6">
        <h1 className="text-2xl font-bold">
          Welcome to Food Ordering App
        </h1>
      </div>
    </ProtectedRoute>
  );
}