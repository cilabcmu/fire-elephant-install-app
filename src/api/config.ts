import { ApolloClient, InMemoryCache } from "@apollo/client";

const API_URL = import.meta.env.VITE_API_URL || "https://localhost/";

const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache(),
});


// ? the coordinate must be in range Thailand
const centerCoordinate: [number, number] = [15.633079341971834, 100.68963610488117]; 
const maxCoordinate: [number, number] = [14.474720650380878, 105.52024567646404];

export { client, centerCoordinate, maxCoordinate };
