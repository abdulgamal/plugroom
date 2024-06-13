import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import Venue from "./pages/venue";
import Reserve from "./pages/reserve";
import Product from "./pages/dashboard/product";

function App() {
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="/venue" element={<Venue />} />
      <Route path="/reserve" element={<Reserve />} />
      <Route path="/reserve/:id" element={<Reserve />} />
      <Route path="/edit/:id" element={<Product />} />
      <Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
    </Routes>
  );
}

export default App;
