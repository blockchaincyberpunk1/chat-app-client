import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";

/**
 * The entry point for the React application.
 * It renders the root component (`<App />`) inside the `ChakraProvider` for UI theming.
 */
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);

/**
 * This function can be used to measure and log performance metrics of the app.
 * Uncomment the line below to enable logging of web vitals.
 *
 * You can also modify this to send data to an analytics endpoint.
 * Learn more: https://bit.ly/CRA-vitals
 */
reportWebVitals();
