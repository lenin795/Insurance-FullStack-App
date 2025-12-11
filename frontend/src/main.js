import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const user = { name: "Amit Sharma", email: "amit@email.com", avatar: "A", phone: "+91-9898989898" };

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App user={user} />
  </React.StrictMode>
);
