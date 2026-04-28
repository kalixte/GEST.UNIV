import Layout from "@/components/layout/Layout";
import { Plus, Edit2, Trash2, Save } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useNotification } from "@/hooks/use-notification";

type Tab = "general" | "equivalences" | "rates" | "years" | "users";

interface AcademicYear {
  id: number;
  year: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "RH" | "Enseignant";
  status: "Actif" | "Inactif";
}

const mockYears: AcademicYear[] = [
  {
    id: 1,
    year: "2024-2025",
    startDate: "2024-09-01",
    endDate: "2025-08-31",
    isActive: true,
  },
  {
    id: 2,
    year: "2023-2024",
    startDate: "2023-09-01",
    endDate: "2024-08-31",
    isActive: false,
  },
];

const mockUsers: User[] = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@example.com",
    role: "Admin",
    status: "Actif",
  },
  {
    id: 2,
    name: "RH User",
    email: "rh@example.com",
    role: "RH",
    status: "Actif",
  },
  {
    id: 3,
    name: "Teacher User",
    email: "teacher@example.com",
    role: "Enseignant",
    status: "Actif",
  },
];

export default function Settings() {
  const { success } = useNotification();
  const [activeTab, setActiveTab] = useState<Tab>("general");
  const [equivalences, setEquivalences] = useState({
    cm: 1.5,
    td: 1.0,
    tp: 0.75,
  });
  const [years, setYears] = useState<AcademicYear[]>(mockYears);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveEquivalences = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsSaving(false);
    success("Équivalences horaires enregistrées avec succès");
  };

  const handleAddYear = () => {
    success("Formulaire d'ajout d'année académique ouvert");
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: "general", label: "Général" },
    { id: "equivalences", label: "Équivalences horaires" },
    { id: "rates", label: "Taux par défaut" },
    { id: "years", label: "Années académiques" },
    { id: "users", label: "Utilisateurs" },
  ];

  return (
    <Layout
      userRole="admin"
      userName="Admin"
      pageTitle="Paramètres système"
      breadcrumbs={[{ label: "Admin" }, { label: "Paramètres" }]}
      showSearch={false}
    >
      {/* Tabs */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-4 py-3 text-sm font-medium border-b-2 transition-colors",
                activeTab === tab.id
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-neutral-600 hover:text-neutral-900"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Équivalences Horaires Tab */}
      {activeTab === "equivalences" && (
        <div className="space-y-6">
          {/* Info Banner */}
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
            <p className="text-sm text-primary-900">
              <span className="font-semibold">Information:</span> Les équivalences
              horaires permettent de normaliser les heures de travail. Par
              exemple, 1h CM = 1.5h équivalent TD en termes de charge de
              travail.
            </p>
          </div>

          {/* Equivalences Table */}
          <div className="bg-white rounded-lg border border-border overflow-hidden">
            <table className="w-full">
              <thead className="bg-neutral-50 border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-neutral-700">
                    Type de séance
                  </th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-neutral-700">
                    Coefficient d'équivalence
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { type: "CM", key: "cm" },
                  { type: "TD", key: "td" },
                  { type: "TP", key: "tp" },
                ].map((row) => (
                  <tr key={row.key} className="border-b border-border hover:bg-neutral-50">
                    <td className="px-6 py-4 text-sm font-medium text-neutral-900">
                      {row.type}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <input
                        type="number"
                        step="0.01"
                        value={equivalences[row.key as keyof typeof equivalences]}
                        onChange={(e) =>
                          setEquivalences({
                            ...equivalences,
                            [row.key]: parseFloat(e.target.value),
                          })
                        }
                        className={cn(
                          "w-32 px-3 py-2 rounded-lg border border-border",
                          "bg-white text-neutral-900 text-sm",
                          "focus:outline-none focus:ring-2 focus:ring-primary-500"
                        )}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSaveEquivalences}
            disabled={isSaving}
            className={cn(
              "py-2.5 px-6 bg-primary-500 text-white font-semibold rounded-full",
              "hover:bg-primary-600 transition-colors flex items-center gap-2",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            <Save size={18} />
            {isSaving ? "Enregistrement..." : "Enregistrer les modifications"}
          </button>
        </div>
      )}

      {/* Années académiques Tab */}
      {activeTab === "years" && (
        <div className="space-y-6">
          <button onClick={handleAddYear} className="py-2.5 px-6 bg-primary-500 text-white font-semibold rounded-full hover:bg-primary-600 transition-colors flex items-center gap-2">
            <Plus size={20} />
            Ajouter une année
          </button>

          <div className="bg-white rounded-lg border border-border overflow-hidden">
            <table className="w-full">
              <thead className="bg-neutral-50 border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase">
                    Année
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase">
                    Date de début
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase">
                    Date de fin
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-neutral-700 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {years.map((year, index) => (
                  <tr
                    key={year.id}
                    className={cn(
                      "border-b border-border hover:bg-neutral-50 transition-colors",
                      index === years.length - 1 && "border-b-0"
                    )}
                  >
                    <td className="px-6 py-4 text-sm font-semibold text-neutral-900">
                      {year.year}
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-700">
                      {year.startDate}
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-700">
                      {year.endDate}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={cn(
                          "px-2.5 py-1 rounded-md text-xs font-medium",
                          year.isActive
                            ? "bg-success-100 text-success-700"
                            : "bg-neutral-100 text-neutral-700"
                        )}
                      >
                        {year.isActive ? "Actif" : "Inactif"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-center">
                      <button className="text-primary-600 hover:text-primary-700 font-medium">
                        Modifier
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Utilisateurs Tab */}
      {activeTab === "users" && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-border overflow-hidden">
            <table className="w-full">
              <thead className="bg-neutral-50 border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase">
                    Nom
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase">
                    Rôle
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-neutral-700 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={user.id}
                    className={cn(
                      "border-b border-border hover:bg-neutral-50 transition-colors",
                      index === users.length - 1 && "border-b-0"
                    )}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-neutral-900">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-700">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="px-2.5 py-1 bg-primary-100 text-primary-700 rounded-md text-xs font-medium">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={cn(
                          "px-2.5 py-1 rounded-md text-xs font-medium",
                          user.status === "Actif"
                            ? "bg-success-100 text-success-700"
                            : "bg-neutral-100 text-neutral-700"
                        )}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-center">
                      <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                        Réinitialiser MDP
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* General Tab */}
      {activeTab === "general" && (
        <div className="bg-white rounded-lg border border-border p-8">
          <p className="text-neutral-600">
            Paramètres généraux du système à configurer.
          </p>
        </div>
      )}

      {/* Rates Tab */}
      {activeTab === "rates" && (
        <div className="bg-white rounded-lg border border-border p-8">
          <p className="text-neutral-600">
            Configuration des taux horaires par défaut.
          </p>
        </div>
      )}
    </Layout>
  );
}
