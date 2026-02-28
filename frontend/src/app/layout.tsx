import { AuthProvider } from "@/context/AuthContext";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/lib/apollo";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ApolloProvider client={client}>
          <AuthProvider>{children}</AuthProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}