import Layout from "@/components/layout/Layout";
import { Clock, Zap, DollarSign, TrendingUp, ArrowRight } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

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

const monthlyData = [
  { month: "Sep", hours: 8 },
  { month: "Oct", hours: 14 },
  { month: "Nov", hours: 16 },
  { month: "Dec", hours: 12 },
  { month: "Jan", hours: 17 },
];

const recentSessions = [
  {
    id: 1,
    date: "2024-01-15",
    course: "Introduction à l'Informatique",
    type: "CM",
    duration: 2,
    room: "A101",
    status: "Validé",
  },
  {
    id: 2,
    date: "2024-01-14",
    course: "Programmation Avancée",
    type: "TP",
    duration: 2.5,
    room: "Lab C302",
    status: "Validé",
  },
  {
    id: 3,
    date: "2024-01-12",
    course: "Introduction à l'Informatique",
    type: "TD",
    duration: 1.5,
    room: "B205",
    status: "Validé",
  },
  {
    id: 4,
    date: "2024-01-10",
    course: "Programmation Avancée",
    type: "CM",
    duration: 2,
    room: "A102",
    status: "En attente",
  },
  {
    id: 5,
    date: "2024-01-08",
    course: "Introduction à l'Informatique",
    type: "TP",
    duration: 2.5,
    room: "Lab C301",
    status: "Validé",
  },
];

const getProgressColor = (percentage: number) => {
  if (percentage <= 75) return "bg-success-500";
  if (percentage <= 95) return "bg-warning-500";
  return "bg-danger-500";
};

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

export default function TeacherDashboard() {
  const contractualHours = 100;
  const completedHours = 67;
  const progressPercentage = (completedHours / contractualHours) * 100;

  return (
    <Layout
      userRole="teacher"
      userName="Dr. Pierre Dupont"
      pageTitle="Mon tableau de bord"
      showSearch={true}
    >
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg p-8 mb-8 text-white">
        <h2 className="text-3xl font-bold mb-2">Bonjour, Dr. Pierre Dupont</h2>
        <p className="text-primary-100">Année académique 2024-2025</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          label="Heures effectuées (semestre)"
          value={`${completedHours}h`}
          icon={<Clock size={24} className="text-primary-500" />}
          bgColor="bg-primary-50"
        />
        <StatCard
          label="Heures contractuelles"
          value={`${contractualHours}h`}
          icon={<TrendingUp size={24} className="text-warning-500" />}
          bgColor="bg-warning-50"
        />
        <StatCard
          label="Heures complémentaires"
          value="0h"
          icon={<Zap size={24} className="text-danger-500" />}
          bgColor="bg-danger-50"
        />
        <StatCard
          label="Montant estimé"
          value="2,680€"
          icon={<DollarSign size={24} className="text-success-500" />}
          bgColor="bg-success-50"
        />
      </div>

      {/* Contract Progress */}
      <div className="bg-white rounded-lg border border-border p-6 mb-8">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-neutral-900">
              Avancement du contrat
            </h3>
            <span className="text-lg font-bold text-primary-600">
              {progressPercentage.toFixed(0)}%
            </span>
          </div>
          <p className="text-sm text-neutral-600">
            {completedHours}h / {contractualHours}h complétées
          </p>
        </div>
        <div className="w-full h-3 bg-neutral-200 rounded-full overflow-hidden">
          <div
            className={cn(
              "h-full transition-all rounded-full",
              getProgressColor(progressPercentage)
            )}
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          />
        </div>
        {progressPercentage > 95 && (
          <p className="mt-3 text-sm text-danger-600 font-medium">
            Vous avez dépassé votre contrat !
          </p>
        )}
      </div>

      {/* Monthly Chart */}
      <div className="bg-white rounded-lg border border-border p-6 mb-8">
        <h3 className="text-lg font-semibold text-neutral-900 mb-6">
          Heures effectuées par mois
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" style={{ fontSize: "12px" }} />
              <YAxis stroke="#64748b" style={{ fontSize: "12px" }} />
              <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e2e8f0" }} />
              <Legend />
              <Line
                type="monotone"
                dataKey="hours"
                stroke="#2563EB"
                strokeWidth={2}
                dot={{ fill: "#2563EB", r: 5 }}
                activeDot={{ r: 7 }}
                name="Heures"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Sessions */}
      <div className="bg-white rounded-lg border border-border overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <h3 className="text-lg font-semibold text-neutral-900">
            Mes dernières séances
          </h3>
          <button className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center gap-1">
            Voir tout
            <ArrowRight size={16} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase">
                  Matière
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
              {recentSessions.map((session, index) => (
                <tr
                  key={session.id}
                  className={cn(
                    "border-b border-border hover:bg-neutral-50 transition-colors",
                    index === recentSessions.length - 1 && "border-b-0"
                  )}
                >
                  <td className="px-6 py-4 text-sm text-neutral-700">
                    {session.date}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-neutral-900 max-w-xs truncate">
                    {session.course}
                  </td>
                  <td className="px-6 py-4 text-sm text-center">
                    <span className="px-2.5 py-1 bg-primary-100 text-primary-700 rounded-md text-xs font-medium">
                      {session.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-center font-medium text-neutral-900">
                    {session.duration}h
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-700">
                    {session.room}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={cn(
                        "px-2.5 py-1 rounded-md text-xs font-medium",
                        getStatusColor(session.status)
                      )}
                    >
                      {session.status}
                    </span>
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
