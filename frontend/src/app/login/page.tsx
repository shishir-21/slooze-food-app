"use client";

import { useState, useContext } from "react";
import { useMutation } from "@apollo/client/react";
import { gql } from "@apollo/client";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export default function LoginPage() {
  const { login } = useContext(AuthContext)!;
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginMutation] = useMutation(LOGIN_MUTATION);

  const handleLogin = async () => {
    const res = await loginMutation({
      variables: { email, password },
    });

    const token = res.data.login;
    login(token);
    router.push("/");
  };

  return (
    // Changed: Added p-4 to ensure there's a gap on the smallest phone screens
    <div className="flex h-screen items-center justify-center p-4 bg-gray-50"> 
      
      {/* Changed: Replaced w-80 with w-full and max-w-sm for responsiveness */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 p-2 w-full mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 p-2 w-full mb-6 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          // Changed: Added transition and hover effects to make it feel more "modern"
          className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2.5 rounded font-semibold transition-colors"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
