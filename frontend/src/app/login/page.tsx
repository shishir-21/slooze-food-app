"use client";

import { useState, useContext } from "react";
import { useMutation } from "@apollo/client/react";
import { gql } from "@apollo/client";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

/** * GraphQL Mutation for Login 
 * Returns a JWT string on success
 */
const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export default function LoginPage() {
  const { login } = useContext(AuthContext)!;
  const router = useRouter();

  // Component State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Track UI loading state

  const [loginMutation] = useMutation(LOGIN_MUTATION);

  /**
   * Handles the form submission
   * Prevents default reload and executes the GraphQL mutation
   */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setLoading(true);

    try {
      const res = await loginMutation({
        variables: { email, password },
      });

      const token = res.data.login;
      login(token); // Update global Auth context
      router.push("/"); // Redirect to dashboard/home
    } catch (err) {
      console.error("Login failed:", err);
      alert("Invalid credentials. Please check your email and password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    /* Main Container: Centered using Flexbox with a soft gray background */
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      
      /* Login Card: White background, large rounded corners, and deep shadow */
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        
        {/* Logo & Heading Section */}
        <div className="text-center">
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-orange-100 text-2xl shadow-inner">
            🍔
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 tracking-tight">
            Welcome to <span className="text-orange-600">Slooze</span>
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to satisfy your cravings
          </p>
        </div>

        {/* Input Form */}
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                placeholder="shishir@example.com"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Remember Me & Forgot Password link */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded cursor-pointer"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 cursor-pointer">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-orange-600 hover:text-orange-500 transition-colors">
                Forgot password?
              </a>
            </div>
          </div>

          {/* Submit Button: Changes style based on 'loading' state */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white shadow-lg transition-all duration-150 transform active:scale-95 ${
                loading 
                  ? "bg-orange-300 cursor-not-allowed" 
                  : "bg-orange-600 hover:bg-orange-700 hover:shadow-orange-200"
              }`}
            >
              {loading ? "Checking details..." : "Sign In"}
            </button>
          </div>
        </form>

        {/* Footer Link */}
        <div className="text-center border-t border-gray-100 pt-6">
          <p className="text-sm text-gray-500">
            Don't have an account? 
            <a href="#" className="ml-1 font-semibold text-orange-600 hover:text-orange-500">
              Create one now
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
