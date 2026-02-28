"use client";

import "./globals.css";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/lib/apollo";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: "Food Ordering App",
  description: "Role Based Food Ordering System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ApolloProvider client={client}>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}