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
    <div className="flex h-screen items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h1 className="text-xl font-bold mb-4">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-2"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-4"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white w-full py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}