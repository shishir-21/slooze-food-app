"use client";

import { ApolloProvider } from "@apollo/client/react";
import { client } from "@/lib/apollo";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <CartProvider>{children}</CartProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}