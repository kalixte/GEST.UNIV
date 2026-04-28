import Layout from "@/components/layout/Layout";
import { Users, Clock, DollarSign, AlertCircle, ArrowUp, ArrowDown } from "lucide-react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";
import { useNotification } from "@/hooks/use-notification";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: number;
    isPositive: boolean;
  };
  bgColor: string;
}

const StatCard = ({ label, value, icon, change, bgColor }: StatCardProps) => (
  <div className="bg-white rounded-lg p-6 border border-border">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <p className="text-sm font-medium text-neutral-600 mb-1">{label}</p>
        <p className="text-2xl font-bold text-neutral-900">{value}</p>
        {change && (
          <div className="flex items-center gap-1 mt-2">
            {change.isPositive ? (
              <ArrowUp size={16} className="text-success-500" />
            ) : (
              <ArrowDown size={16} className="text-danger-500" />
            )}
            <span
              className={cn(
                "text-xs font-medium",
                change.isPositive ? "text-success-500" : "text-danger-500"
              )}
            >
              {change.value}% par rapport au mois dernier
            </span>
          </div>
        )}
      </div>
      <div className={cn("p-3 rounded-lg", bgColor)}>{icon}</div>
    </div>
  </div>
);

const departmentData = [
  { department: "Informatique", CM: 120, TD: 80, TP: 100 },
  { department: "Mathématiques", CM: 100, TD: 60, TP: 0 },
  { department: "Physique", CM: 110, TD: 70, TP: 90 },
  { department: "Chimie", CM: 95, TD: 65, TP: 110 },
  { department: "Biologie", CM: 105, TD: 75, TP: 95 },
  { department: "Langues", CM: 85, TD: 50, TP: 0 },
];

const statusData = [
  { name: "Permanent", value: 45 },
  { name: "Vacataire", value: 30 },
  { name: "Associé", value: 25 },
];

const topTeachers = [
  {
    id: 1,
    name: "Dr. Pierre Dupont",
    department: "Informatique",
    cm: 40,
    td: 25,
    tp: 20,
    total: 85,
    amount: 3400,
  },
  {
    id: 2,
    name: "Prof. Marie Martin",
    department: "Mathématiques",
    cm: 35,
    td: 20,
    tp: 0,
    total: 55,
    amount: 2200,
  },
  {
    id: 3,
    name: "Dr. Luc Bernard",
    department: "Physique",
    cm: 38,
    td: 22,
    tp: 18,
    total: 78,
    amount: 3120,
  },
  {
    id: 4,
    name: "Prof. Anne Lefevre",
    department: "Chimie",
    cm: 32,
    td: 20,
    tp: 28,
    total: 80,
    amount: 3200,
  },
  {
    id: 5,
    name: "Dr. Jean Laurent",
    department: "Biologie",
    cm: 36,
    td: 24,
    tp: 20,
    total: 80,
    amount: 3200,
  },
];

const COLORS = ["#2563EB", "#16A34A", "#D97706"];

export default function AdminDashboard() {
  const { success } = useNotification();

  const handleAddTeacher = () => {
    success("Formulaire d'ajout d'enseignant ouvert");
  };

  const handleAddHours = () => {
    success("Fenêtre de saisie d'heures ouvert");
  };

  const handleGeneratePayroll = () => {
    success("Génération des états de paiement en cours...");
  };

  return (
    <Layout
      userRole="admin"
      userName="Admin"
      pageTitle="Tableau de bord"
      showSearch={true}
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          label="Total Enseignants"
          value="124"
          icon={<Users size={24} className="text-primary-500" />}
          change={{ value: 5, isPositive: true }}
          bgColor="bg-primary-50"
        />
        <StatCard
          label="Heures saisies ce mois"
          value="1,240"
          icon={<Clock size={24} className="text-warning-500" />}
          change={{ value: 12, isPositive: true }}
          bgColor="bg-warning-50"
        />
        <StatCard
          label="Montant total à payer"
          value="49 600 CFA"
          icon={<DollarSign size={24} className="text-success-500" />}
          change={{ value: 8, isPositive: true }}
          bgColor="bg-success-50"
        />
        <StatCard
          label="Alertes actives"
          value="12"
          icon={<AlertCircle size={24} className="text-danger-500" />}
          change={{ value: 25, isPositive: false }}
          bgColor="bg-danger-50"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Hours by Department */}
        <div className="lg:col-span-2 bg-white rounded-lg p-6 border border-border">
          <h3 className="text-lg font-semibold text-neutral-900 mb-6">
            Heures par département
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="department" stroke="#64748b" style={{ fontSize: "12px" }} />
                <YAxis stroke="#64748b" style={{ fontSize: "12px" }} />
                <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e2e8f0" }} />
                <Legend />
                <Bar dataKey="CM" fill="#2563EB" />
                <Bar dataKey="TD" fill="#16A34A" />
                <Bar dataKey="TP" fill="#D97706" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Distribution */}
        <div className="bg-white rounded-lg p-6 border border-border">
          <h3 className="text-lg font-semibold text-neutral-900 mb-6">
            Répartition par statut
          </h3>
          <div className="h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col gap-3 mt-4">
            {statusData.map((item, index) => (
              <div key={item.name} className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-sm text-neutral-700">{item.name}</span>
                <span className="text-sm font-medium text-neutral-900 ml-auto">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Teachers Table */}
      <div className="bg-white rounded-lg border border-border overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="text-lg font-semibold text-neutral-900">
            Top 5 enseignants avec le plus d'heures
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase">
                  Nom
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase">
                  Département
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-neutral-700 uppercase">
                  CM
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-neutral-700 uppercase">
                  TD
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-neutral-700 uppercase">
                  TP
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-neutral-700 uppercase">
                  Total
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-neutral-700 uppercase">
                  Montant
                </th>
              </tr>
            </thead>
            <tbody>
              {topTeachers.map((teacher, index) => (
                <tr
                  key={teacher.id}
                  className={cn(
                    "border-b border-border hover:bg-neutral-50 transition-colors",
                    index === topTeachers.length - 1 && "border-b-0"
                  )}
                >
                  <td className="px-6 py-4 text-sm font-medium text-neutral-900">
                    {teacher.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-700">
                    {teacher.department}
                  </td>
                  <td className="px-6 py-4 text-sm text-center text-neutral-700">
                    {teacher.cm}
                  </td>
                  <td className="px-6 py-4 text-sm text-center text-neutral-700">
                    {teacher.td}
                  </td>
                  <td className="px-6 py-4 text-sm text-center text-neutral-700">
                    {teacher.tp}
                  </td>
                  <td className="px-6 py-4 text-sm text-center font-semibold text-neutral-900">
                    {teacher.total}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-right text-primary-600">
                    {teacher.amount.toLocaleString()} CFA
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <button onClick={handleAddTeacher} className="flex-1 py-3 px-4 rounded-full bg-primary-500 text-white font-semibold hover:bg-primary-600 transition-colors flex items-center justify-center gap-2">
          <span>+</span>
          Ajouter enseignant
        </button>
        <button onClick={handleAddHours} className="flex-1 py-3 px-4 rounded-full border-2 border-primary-500 text-primary-500 font-semibold hover:bg-primary-50 transition-colors flex items-center justify-center gap-2">
          <span>+</span>
          Saisir heures
        </button>
        <button onClick={handleGeneratePayroll} className="flex-1 py-3 px-4 rounded-full border-2 border-neutral-300 text-neutral-700 font-semibold hover:bg-neutral-100 transition-colors">
          Générer états de paiement
        </button>
      </div>
    </Layout>
  );
}
