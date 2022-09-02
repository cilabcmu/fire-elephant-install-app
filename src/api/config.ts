import { ApolloClient, InMemoryCache } from "@apollo/client";

const API_URL = import.meta.env.VITE_API_URL || "https://localhost/";

const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache(),
});

export default client;
