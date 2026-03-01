"use client"; // Enabling client-side features for this specific component tree

import { ApolloProvider } from "@apollo/client";
import { client } from "@/lib/apollo";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";

/**
 * Providers component wraps the application with necessary context providers.
 * Using a separate file allows the main layout to remain a Server Component.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}