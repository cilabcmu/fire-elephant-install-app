import { ApolloProvider } from "@apollo/client";
import ReactDOM from "react-dom/client";
import { client } from "./api/config";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
