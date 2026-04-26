import Layout from "@/components/layout/Layout";
import { Clock, CheckCircle2, Users, AlertCircle } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface HourEntry {
  id: number;
  teacher: string;
  course: string;
  date: string;
  type: "CM" | "TD" | "TP";
  duration: number;
  room: string;
  status: "En attente" | "Validé" | "Rejeté";
}

const mockEntries: HourEntry[] = [
  {
    id: 1,
    teacher: "Dr. Pierre Dupont",
    course: "Introduction à l'Informatique",
    date: "2024-01-15",
    type: "CM",
    duration: 2,
    room: "A101",
    status: "En attente",
  },
  {
    id: 2,
    teacher: "Prof. Marie Martin",
    course: "Calcul Différentiel",
    date: "2024-01-15",
    type: "TD",
    duration: 1.5,
    room: "B205",
    status: "Validé",
  },
  {
    id: 3,
    teacher: "Dr. Luc Bernard",
    course: "Mécanique Classique",
    date: "2024-01-14",
    type: "TP",
    duration: 3,
    room: "Lab C301",
    status: "En attente",
  },
  {
    id: 4,
    teacher: "Prof. Anne Lefevre",
    course: "Chimie Générale",
    date: "2024-01-14",
    type: "CM",
    duration: 2,
    room: "A102",
    status: "Validé",
  },
  {
    id: 5,
    teacher: "Dr. Jean Laurent",
    course: "Biologie Cellulaire",
    date: "2024-01-14",
    type: "TD",
    duration: 1.5,
    room: "B206",
    status: "Rejeté",
  },
  {
    id: 6,
    teacher: "Dr. Pierre Dupont",
    course: "Programmation Avancée",
    date: "2024-01-13",
    type: "TP",
    duration: 2.5,
    room: "Lab C302",
    status: "Validé",
  },
];

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  bgColor: string;
}

const StatCard = ({ label, value, icon, bgColor }: StatCardProps) => (
  <div className="bg-white rounded-lg p-6 border border-border">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <p className="text-sm font-medium text-neutral-600 mb-1">{label}</p>
        <p className="text-2xl font-bold text-neutral-900">{value}</p>
      </div>
      <div className={cn("p-3 rounded-lg", bgColor)}>{icon}</div>
    </div>
  </div>
);

const getStatusColor = (status: string) => {
  switch (status) {
    case "Validé":
      return "bg-success-100 text-success-700";
    case "En attente":
      return "bg-warning-100 text-warning-700";
    case "Rejeté":
      return "bg-danger-100 text-danger-700";
    default:
      return "bg-neutral-100 text-neutral-700";
  }
};

export default function RHDashboard() {
  const [entries, setEntries] = useState<HourEntry[]>(mockEntries);
  const [activeFilter, setActiveFilter] = useState<string>("Toutes");

  const filteredEntries =
    activeFilter === "Toutes"
      ? entries
      : entries.filter((e) => e.status === activeFilter);

  const pendingCount = entries.filter((e) => e.status === "En attente").length;
  const validatedCount = entries.filter((e) => e.status === "Validé").length;
  const teachersWithEntries = new Set(entries.map((e) => e.teacher)).size;

  return (
    <Layout
      userRole="rh"
      userName="RH"
      pageTitle="Tableau de bord RH"
      breadcrumbs={[{ label: "RH" }, { label: "Tableau de bord" }]}
      showSearch={true}
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          label="Heures à valider"
          value={pendingCount}
          icon={<Clock size={24} className="text-warning-500" />}
          bgColor="bg-warning-50"
        />
        <StatCard
          label="Heures validées ce mois"
          value={validatedCount}
          icon={<CheckCircle2 size={24} className="text-success-500" />}
          bgColor="bg-success-50"
        />
        <StatCard
          label="Enseignants avec heures"
          value={teachersWithEntries}
          icon={<Users size={24} className="text-primary-500" />}
          bgColor="bg-primary-50"
        />
        <StatCard
          label="Prochaine échéance paiement"
          value="15 janv."
          icon={<AlertCircle size={24} className="text-danger-500" />}
          bgColor="bg-danger-50"
        />
      </div>

      {/* Alert Banner */}
      {pendingCount > 0 && (
        <div className="bg-warning-50 border border-warning-200 rounded-lg p-4 mb-8 flex items-start gap-4">
          <AlertCircle size={20} className="text-warning-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-warning-900 mb-1">
              Validation en attente
            </p>
            <p className="text-sm text-warning-800">
              {pendingCount} saisie{pendingCount !== 1 ? "s":" "} d'heures en attente de validation
            </p>
          </div>
          <button className="text-sm font-semibold text-warning-600 hover:text-warning-700 whitespace-nowrap ml-4">
            Voir la liste
          </button>
        </div>
      )}

      {/* Filter Pills */}
      <div className="mb-6 flex flex-wrap gap-2">
        {["Toutes", "En attente", "Validées", "Rejetées"].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors",
              activeFilter === filter
                ? "bg-primary-500 text-white"
                : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Hours Table */}
      <div className="bg-white rounded-lg border border-border overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="text-lg font-semibold text-neutral-900">
            Dernières saisies d'heures
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase">
                  Enseignant
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase">
                  Matière
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-neutral-700 uppercase">
                  Type
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-neutral-700 uppercase">
                  Durée
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase">
                  Salle
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase">
                  Statut
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredEntries.map((entry, index) => (
                <tr
                  key={entry.id}
                  className={cn(
                    "border-b border-border hover:bg-neutral-50 transition-colors",
                    index === filteredEntries.length - 1 && "border-b-0"
                  )}
                >
                  <td className="px-6 py-4 text-sm font-medium text-neutral-900">
                    {entry.teacher}
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-700 max-w-xs truncate">
                    {entry.course}
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-700">
                    {entry.date}
                  </td>
                  <td className="px-6 py-4 text-sm text-center">
                    <span className="px-2.5 py-1 bg-primary-100 text-primary-700 rounded-md text-xs font-medium">
                      {entry.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-center font-medium text-neutral-900">
                    {entry.duration}h
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-700">
                    {entry.room}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={cn(
                        "px-2.5 py-1 rounded-md text-xs font-medium",
                        getStatusColor(entry.status)
                      )}
                    >
                      {entry.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredEntries.length === 0 && (
        <div className="bg-white rounded-lg border border-border p-12 text-center">
          <p className="text-neutral-500">Aucune saisie trouvée</p>
        </div>
      )}
    </Layout>
  );
}
