import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AdminRoutes, AuthRoutes, UserInputRoutes, UserRoutes } from "./routes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      {/* Users Routes */}
      <Routes>
        <Route path="/*" element={<UserRoutes />} />{" "}
        <Route path="/user/*" element={<UserInputRoutes />} />{" "}
        <Route path="/auth/*" element={<AuthRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </>
  );
}

export default App;
