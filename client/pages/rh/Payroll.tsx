import Layout from "@/components/layout/Layout";
import { Plus, Download, FileText, Eye } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface PayrollItem {
  id: number;
  teacher: string;
  grade: string;
  department: string;
  normalHours: number;
  complementaryHours: number;
  ratesCMTDTP: string;
  normalAmount: number;
  complementaryAmount: number;
  total: number;
  paymentStatus: "En attente" | "Payé" | "Partiellement payé";
}

const mockPayroll: PayrollItem[] = [
  {
    id: 1,
    teacher: "Dr. Pierre Dupont",
    grade: "Professeur",
    department: "Informatique",
    normalHours: 67,
    complementaryHours: 0,
    ratesCMTDTP: "85/60/50",
    normalAmount: 2680,
    complementaryAmount: 0,
    total: 2680,
    paymentStatus: "Payé",
  },
  {
    id: 2,
    teacher: "Prof. Marie Martin",
    grade: "Maître de conf.",
    department: "Mathématiques",
    normalHours: 55,
    complementaryHours: 5,
    ratesCMTDTP: "75/55/0",
    normalAmount: 2200,
    complementaryAmount: 225,
    total: 2425,
    paymentStatus: "En attente",
  },
  {
    id: 3,
    teacher: "Dr. Luc Bernard",
    grade: "ATER",
    department: "Physique",
    normalHours: 78,
    complementaryHours: 8,
    ratesCMTDTP: "50/40/35",
    normalAmount: 2600,
    complementaryAmount: 280,
    total: 2880,
    paymentStatus: "Payé",
  },
  {
    id: 4,
    teacher: "Prof. Anne Lefevre",
    grade: "Vacataire",
    department: "Chimie",
    normalHours: 45,
    complementaryHours: 10,
    ratesCMTDTP: "40/30/25",
    normalAmount: 1350,
    complementaryAmount: 280,
    total: 1630,
    paymentStatus: "Partiellement payé",
  },
  {
    id: 5,
    teacher: "Dr. Jean Laurent",
    grade: "Professeur",
    department: "Biologie",
    normalHours: 80,
    complementaryHours: 5,
    ratesCMTDTP: "80/60/45",
    normalAmount: 3200,
    complementaryAmount: 180,
    total: 3380,
    paymentStatus: "En attente",
  },
];

interface StatCardProps {
  label: string;
  value: string | number;
}

const StatCard = ({ label, value }: StatCardProps) => (
  <div className="bg-white rounded-lg p-6 border border-border">
    <p className="text-sm font-medium text-neutral-600 mb-2">{label}</p>
    <p className="text-2xl font-bold text-neutral-900">{value}</p>
  </div>
);

const getStatusColor = (status: string) => {
  switch (status) {
    case "Payé":
      return "bg-success-100 text-success-700";
    case "En attente":
      return "bg-warning-100 text-warning-700";
    case "Partiellement payé":
      return "bg-info-100 text-info-700";
    default:
      return "bg-neutral-100 text-neutral-700";
  }
};

export default function Payroll() {
  const [items, setItems] = useState<PayrollItem[]>(mockPayroll);
  const [selectedMonth, setSelectedMonth] = useState("01-2024");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const departments = [...new Set(items.map((i) => i.department))];
  const statuses = ["En attente", "Payé", "Partiellement payé"];

  const filteredItems = items.filter((item) => {
    const matchesDept =
      !selectedDepartment || item.department === selectedDepartment;
    const matchesStatus =
      !selectedStatus || item.paymentStatus === selectedStatus;
    return matchesDept && matchesStatus;
  });

  const totalAmount = filteredItems.reduce((sum, item) => sum + item.total, 0);
  const teacherCount = new Set(filteredItems.map((i) => i.teacher)).size;
  const totalNormalHours = filteredItems.reduce(
    (sum, item) => sum + item.normalHours,
    0
  );
  const totalComplementaryHours = filteredItems.reduce(
    (sum, item) => sum + item.complementaryHours,
    0
  );

  return (
    <Layout
      userRole="rh"
      userName="RH"
      pageTitle="États de paiement"
      breadcrumbs={[{ label: "RH" }, { label: "États de paiement" }]}
      showSearch={false}
    >
      {/* Header with Generate Button */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <h2 className="text-lg font-semibold text-neutral-900"></h2>
        <button className="w-full md:w-auto py-2.5 px-6 bg-primary-500 text-white font-semibold rounded-full hover:bg-primary-600 transition-colors flex items-center justify-center gap-2">
          <Plus size={20} />
          Générer les états
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-lg border border-border p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Month */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Mois
            </label>
            <input
              type="month"
              value={selectedMonth.split("-").reverse().join("-")}
              onChange={(e) =>
                setSelectedMonth(
                  e.target.value.split("-").reverse().join("-")
                )
              }
              className={cn(
                "w-full px-3 py-2 rounded-lg border border-border",
                "bg-white text-neutral-900 text-sm",
                "focus:outline-none focus:ring-2 focus:ring-primary-500"
              )}
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Département
            </label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className={cn(
                "w-full px-3 py-2 rounded-lg border border-border",
                "bg-white text-neutral-900 text-sm",
                "focus:outline-none focus:ring-2 focus:ring-primary-500"
              )}
            >
              <option value="">Tous</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* Payment Status */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Statut paiement
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className={cn(
                "w-full px-3 py-2 rounded-lg border border-border",
                "bg-white text-neutral-900 text-sm",
                "focus:outline-none focus:ring-2 focus:ring-primary-500"
              )}
            >
              <option value="">Tous</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Export Button */}
          <div className="flex items-end">
            <button className={cn(
              "w-full py-2 px-4 rounded-lg border-2 border-neutral-300",
              "text-neutral-700 font-semibold hover:bg-neutral-100",
              "transition-colors flex items-center justify-center gap-2"
            )}>
              <Download size={18} />
              <span className="hidden sm:inline">Exporter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard label="Total à payer" value={`${totalAmount}€`} />
        <StatCard label="Enseignants concernés" value={teacherCount} />
        <StatCard label="Heures normales total" value={`${totalNormalHours}h`} />
        <StatCard
          label="Heures complémentaires"
          value={`${totalComplementaryHours}h`}
        />
      </div>

      {/* Payroll Table */}
      <div className="bg-white rounded-lg border border-border overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="text-lg font-semibold text-neutral-900">
            Détail des paiements
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase">
                  Enseignant
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase">
                  Grade
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase">
                  Département
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-neutral-700 uppercase">
                  H. Normales
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-neutral-700 uppercase">
                  H. Complémentaires
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-neutral-700 uppercase">
                  Total
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
              {filteredItems.map((item, index) => (
                <tr
                  key={item.id}
                  className={cn(
                    "border-b border-border hover:bg-neutral-50 transition-colors",
                    index === filteredItems.length - 1 && "border-b-0"
                  )}
                >
                  <td className="px-6 py-4 font-medium text-neutral-900">
                    {item.teacher}
                  </td>
                  <td className="px-6 py-4 text-neutral-700">{item.grade}</td>
                  <td className="px-6 py-4 text-neutral-700">
                    {item.department}
                  </td>
                  <td className="px-6 py-4 text-center text-neutral-700">
                    {item.normalHours}h
                  </td>
                  <td className="px-6 py-4 text-center text-neutral-700">
                    {item.complementaryHours}h
                  </td>
                  <td className="px-6 py-4 text-right font-semibold text-neutral-900">
                    {item.total}€
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "px-2.5 py-1 rounded-md text-xs font-medium",
                        getStatusColor(item.paymentStatus)
                      )}
                    >
                      {item.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-1.5 hover:bg-neutral-200 rounded-lg transition-colors text-neutral-600 hover:text-primary-600">
                        <Eye size={18} />
                      </button>
                      <button className="p-1.5 hover:bg-neutral-200 rounded-lg transition-colors text-neutral-600 hover:text-danger-600">
                        <FileText size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredItems.length === 0 && (
        <div className="bg-white rounded-lg border border-border p-12 text-center">
          <p className="text-neutral-500">Aucun état de paiement trouvé</p>
        </div>
      )}
    </Layout>
  );
}
