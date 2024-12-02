import { Auth0Provider } from "@auth0/auth0-react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import ReactDOM from "react-dom/client"; // React 18+ uses react-dom/client

import App from "./App";
// import "./App.css";
import theme from "./theme";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
 
  root.render(
    <Auth0Provider
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      clientId="7yTDOOG1oolu6EaSijcWHtChqM4VDnqH"
      domain="dev-sd7w6s5507kp55cz.us.auth0.com"
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Auth0Provider>
  );
} else {
  console.error("Root element not found");
}
