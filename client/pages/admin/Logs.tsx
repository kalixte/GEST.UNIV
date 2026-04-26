import Layout from "@/components/layout/Layout";
import { Download, Calendar } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface LogEntry {
  id: number;
  date: string;
  time: string;
  user: string;
  role: string;
  action: string;
  entity: string;
  details: string;
  ip: string;
}

const mockLogs: LogEntry[] = [
  {
    id: 1,
    date: "2024-01-15",
    time: "14:32",
    user: "Admin User",
    role: "Admin",
    action: "SUPPRESSION",
    entity: "Enseignant",
    details: "Suppression de Dr. Pierre Dupont",
    ip: "192.168.1.100",
  },
  {
    id: 2,
    date: "2024-01-15",
    time: "14:15",
    user: "RH User",
    role: "RH",
    action: "MODIFICATION",
    entity: "Heures",
    details: "Modification saisie heures - ID #4521",
    ip: "192.168.1.101",
  },
  {
    id: 3,
    date: "2024-01-15",
    time: "13:45",
    user: "Admin User",
    role: "Admin",
    action: "CRÉATION",
    entity: "Enseignant",
    details: "Création nouveau compte - Marie Lefevre",
    ip: "192.168.1.100",
  },
  {
    id: 4,
    date: "2024-01-14",
    time: "16:20",
    user: "RH User",
    role: "RH",
    action: "MODIFICATION",
    entity: "Paramètre",
    details: "Modification taux horaire CM",
    ip: "192.168.1.101",
  },
  {
    id: 5,
    date: "2024-01-14",
    time: "11:05",
    user: "Admin User",
    role: "Admin",
    action: "CONNEXION",
    entity: "Session",
    details: "Connexion utilisateur",
    ip: "192.168.1.100",
  },
  {
    id: 6,
    date: "2024-01-14",
    time: "09:30",
    user: "RH User",
    role: "RH",
    action: "EXPORT",
    entity: "Payroll",
    details: "Export états de paiement janvier 2024",
    ip: "192.168.1.101",
  },
  {
    id: 7,
    date: "2024-01-13",
    time: "15:45",
    user: "Admin User",
    role: "Admin",
    action: "SUPPRESSION",
    entity: "Matière",
    details: "Suppression matière INFO101",
    ip: "192.168.1.100",
  },
  {
    id: 8,
    date: "2024-01-13",
    time: "10:15",
    user: "RH User",
    role: "RH",
    action: "CRÉATION",
    entity: "Heures",
    details: "Création saisie heures - Dr. Jean Laurent",
    ip: "192.168.1.101",
  },
];

const getActionBgColor = (action: string) => {
  if (action === "SUPPRESSION") return "bg-danger-50";
  if (action === "MODIFICATION") return "bg-warning-50";
  return "bg-white";
};

const getActionBadgeColor = (action: string) => {
  switch (action) {
    case "CONNEXION":
      return "bg-primary-100 text-primary-700";
    case "CRÉATION":
      return "bg-success-100 text-success-700";
    case "MODIFICATION":
      return "bg-warning-100 text-warning-700";
    case "SUPPRESSION":
      return "bg-danger-100 text-danger-700";
    case "EXPORT":
      return "bg-primary-100 text-primary-700";
    default:
      return "bg-neutral-100 text-neutral-700";
  }
};

export default function Logs() {
  const [logs, setLogs] = useState<LogEntry[]>(mockLogs);
  const [actionFilter, setActionFilter] = useState<string>("");
  const [userFilter, setUserFilter] = useState<string>("");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");

  const filteredLogs = logs.filter((log) => {
    if (actionFilter && log.action !== actionFilter) return false;
    if (userFilter && log.user.toLowerCase() !== userFilter.toLowerCase())
      return false;
    return true;
  });

  const handleExportCSV = () => {
    const headers = [
      "Date",
      "Heure",
      "Utilisateur",
      "Rôle",
      "Action",
      "Entité",
      "Détails",
      "IP",
    ];
    const csvContent = [
      headers.join(","),
      ...filteredLogs.map((log) =>
        [
          log.date,
          log.time,
          log.user,
          log.role,
          log.action,
          log.entity,
          `"${log.details}"`,
          log.ip,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `logs_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  return (
    <Layout
      userRole="admin"
      userName="Admin"
      pageTitle="Journal des actions"
      breadcrumbs={[{ label: "Admin" }, { label: "Journal des actions" }]}
      showSearch={false}
    >
      {/* Filter Bar */}
      <div className="bg-white rounded-lg border border-border p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Du
            </label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className={cn(
                "w-full px-3 py-2 rounded-lg border border-border",
                "bg-white text-neutral-900 text-sm",
                "focus:outline-none focus:ring-2 focus:ring-primary-500"
              )}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Au
            </label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className={cn(
                "w-full px-3 py-2 rounded-lg border border-border",
                "bg-white text-neutral-900 text-sm",
                "focus:outline-none focus:ring-2 focus:ring-primary-500"
              )}
            />
          </div>

          {/* Action Filter */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Type d'action
            </label>
            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className={cn(
                "w-full px-3 py-2 rounded-lg border border-border",
                "bg-white text-neutral-900 text-sm",
                "focus:outline-none focus:ring-2 focus:ring-primary-500"
              )}
            >
              <option value="">Tous</option>
              <option value="CONNEXION">Connexion</option>
              <option value="CRÉATION">Création</option>
              <option value="MODIFICATION">Modification</option>
              <option value="SUPPRESSION">Suppression</option>
              <option value="EXPORT">Export</option>
            </select>
          </div>

          {/* User Filter */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Utilisateur
            </label>
            <input
              type="text"
              placeholder="Nom de l'utilisateur"
              value={userFilter}
              onChange={(e) => setUserFilter(e.target.value)}
              className={cn(
                "w-full px-3 py-2 rounded-lg border border-border",
                "bg-white text-neutral-900 text-sm",
                "placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              )}
            />
          </div>

          {/* Export Button */}
          <div className="flex items-end">
            <button
              onClick={handleExportCSV}
              className={cn(
                "w-full py-2 px-4 rounded-lg border-2 border-neutral-300",
                "text-neutral-700 font-semibold hover:bg-neutral-100",
                "transition-colors flex items-center justify-center gap-2"
              )}
            >
              <Download size={18} />
              <span className="hidden sm:inline">Exporter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4 text-sm text-neutral-600">
        {filteredLogs.length} résultat{filteredLogs.length !== 1 ? "s" : ""}
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase">
                  Date / Heure
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase">
                  Utilisateur
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase">
                  Rôle
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase">
                  Entité
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase">
                  Détails
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase">
                  IP
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log, index) => (
                <tr
                  key={log.id}
                  className={cn(
                    "border-b border-border hover:bg-neutral-50 transition-colors",
                    getActionBgColor(log.action),
                    index === filteredLogs.length - 1 && "border-b-0"
                  )}
                >
                  <td className="px-6 py-4 text-sm font-medium text-neutral-900 whitespace-nowrap">
                    {log.date} {log.time}
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-700">
                    {log.user}
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-700">
                    <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-primary-100 text-primary-700">
                      {log.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={cn(
                        "px-2.5 py-1 rounded-md text-xs font-medium",
                        getActionBadgeColor(log.action)
                      )}
                    >
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-neutral-700">
                    {log.entity}
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-700 max-w-xs truncate">
                    {log.details}
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-600 font-mono text-xs">
                    {log.ip}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
