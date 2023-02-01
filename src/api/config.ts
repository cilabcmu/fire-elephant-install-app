import { ApolloClient, InMemoryCache } from "@apollo/client";

const API_URL = import.meta.env.VITE_API_URL || "https://localhost/";

const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache(),
});

const centerCoordinate: [number, number] = [18.518710, 99.115388]; // Chiang Mai University “Hariphunchai” Centre, Lamphun Province
const maxCoordinate: [number, number] = [18.670660, 98.912899]; // Big C Hangdong

export { client, centerCoordinate, maxCoordinate };
