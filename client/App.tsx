import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import Placeholder from "./pages/Placeholder";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/teachers" element={<Placeholder title="Gestion des Enseignants" userRole="admin" pageName="Gestion des Enseignants" />} />
      <Route path="/admin/courses" element={<Placeholder title="Gestion des Matières" userRole="admin" pageName="Gestion des Matières" />} />
      <Route path="/admin/settings" element={<Placeholder title="Paramètres Système" userRole="admin" pageName="Paramètres Système" />} />
      <Route path="/admin/logs" element={<Placeholder title="Journal des Actions" userRole="admin" pageName="Journal des Actions" />} />

      {/* RH Routes */}
      <Route path="/rh" element={<Placeholder title="Tableau de bord RH" userRole="rh" pageName="Tableau de bord RH" />} />
      <Route path="/rh/entry" element={<Placeholder title="Saisie des Heures" userRole="rh" pageName="Saisie des Heures" />} />
      <Route path="/rh/validation" element={<Placeholder title="Validation des Heures" userRole="rh" pageName="Validation des Heures" />} />
      <Route path="/rh/payroll" element={<Placeholder title="États de Paiement" userRole="rh" pageName="États de Paiement" />} />

      {/* Teacher Routes */}
      <Route path="/teacher" element={<Placeholder title="Mon Tableau de Bord" userRole="teacher" pageName="Mon Tableau de Bord" />} />
      <Route path="/teacher/summary" element={<Placeholder title="Mon Récapitulatif" userRole="teacher" pageName="Mon Récapitulatif" />} />

      {/* Other Routes */}
      <Route path="/profile" element={<Placeholder title="Mon Profil" userRole="admin" pageName="Profil Utilisateur" />} />

      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
