import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PetsPage from "./pages/PetsPage";
import PetDetailPage from "./pages/PetDetailPage";
import AdoptersPage from "./pages/AdoptersPage";
import RequestsPage from "./pages/RequestsPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected routes – redirect to /login when not authenticated */}
        <Route element={<ProtectedRoute />}>
          <Route path="/pets" element={<PetsPage />} />
          <Route path="/pets/:petId" element={<PetDetailPage />} />
          <Route path="/adopters" element={<AdoptersPage />} />
          <Route path="/requests" element={<RequestsPage />} />
        </Route>

        {/* Catch-all – no URL gives a blank page */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;