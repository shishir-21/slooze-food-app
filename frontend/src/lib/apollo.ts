// Apollo Client configuration
// This connects frontend to your NestJS GraphQL backend

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const httpLink = new HttpLink({
  uri: "http://localhost:3000/graphql", // Change if backend running on different port
  credentials: "include",
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});