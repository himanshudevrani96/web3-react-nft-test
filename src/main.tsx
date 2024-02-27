import React from "react";
import ReactDOM from "react-dom/client";
import App from "./modules/app/App";
// import { Provider } from "react-redux";
// import { store } from "../src/app/store";
import { Web3ReactProvider } from "@web3-react/core";
import { connectors } from "./wallets/helpers/connectors";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/rapidaman/testkaldistakingsubgraph",
  cache: new InMemoryCache(),
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Web3ReactProvider connectors={connectors}>
      {/* <Provider store={store}> */}
      <ApolloProvider client={client}>
        <App />
        {/* </Provider> */}
      </ApolloProvider>
    </Web3ReactProvider>
  </React.StrictMode>
);
