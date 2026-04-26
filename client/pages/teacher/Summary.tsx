import Layout from "@/components/layout/Layout";
import { Download, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface SummaryItem {
  id: number;
  course: string;
  filiere: string;
  level: string;
  cm: number;
  td: number;
  tp: number;
  totalEquiv: number;
  amount: number;
}

const mockData: SummaryItem[] = [
  {
    id: 1,
    course: "Introduction à l'Informatique",
    filiere: "Informatique",
    level: "L1",
    cm: 18,
    td: 10,
    tp: 8,
    totalEquiv: 38,
    amount: 1520,
  },
  {
    id: 2,
    course: "Programmation Avancée",
    filiere: "Informatique",
    level: "L3",
    cm: 16,
    td: 10,
    tp: 8,
    totalEquiv: 36,
    amount: 1440,
  },
  {
    id: 3,
    course: "Algorithmes et Structures",
    filiere: "Informatique",
    level: "L2",
    cm: 14,
    td: 8,
    tp: 6,
    totalEquiv: 31.5,
    amount: 1260,
  },
  {
    id: 4,
    course: "Bases de Données",
    filiere: "Informatique",
    level: "L2",
    cm: 19,
    td: 12,
    tp: 6,
    totalEquiv: 40.5,
    amount: 1620,
  },
];

const totalCM = mockData.reduce((sum, item) => sum + item.cm, 0);
const totalTD = mockData.reduce((sum, item) => sum + item.td, 0);
const totalTP = mockData.reduce((sum, item) => sum + item.tp, 0);
const totalEquiv = mockData.reduce((sum, item) => sum + item.totalEquiv, 0);
const totalAmount = mockData.reduce((sum, item) => sum + item.amount, 0);

export default function TeacherSummary() {
  return (
    <Layout
      userRole="teacher"
      userName="Dr. Pierre Dupont"
      pageTitle="Mon récapitulatif"
      breadcrumbs={[{ label: "Enseignant" }, { label: "Mon récapitulatif" }]}
      showSearch={false}
    >
      {/* Period Selectors */}
      <div className="bg-white rounded-lg border border-border p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Period Type */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Type de période
            </label>
            <div className="flex gap-2">
              <button className="flex-1 py-2 px-3 rounded-lg border-2 border-primary-500 text-primary-600 font-medium hover:bg-primary-50 transition-colors">
                Académique
              </button>
              <button className="flex-1 py-2 px-3 rounded-lg border-2 border-neutral-300 text-neutral-700 hover:bg-neutral-100 transition-colors">
                Semestriel
              </button>
            </div>
          </div>

          {/* Year Selector */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Année
            </label>
            <select className={cn(
              "w-full px-3 py-2 rounded-lg border border-border",
              "bg-white text-neutral-900 text-sm",
              "focus:outline-none focus:ring-2 focus:ring-primary-500"
            )}>
              <option>2024-2025</option>
              <option>2023-2024</option>
              <option>2022-2023</option>
            </select>
          </div>

          {/* Semester Selector */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Semestre
            </label>
            <select className={cn(
              "w-full px-3 py-2 rounded-lg border border-border",
              "bg-white text-neutral-900 text-sm",
              "focus:outline-none focus:ring-2 focus:ring-primary-500"
            )}>
              <option>Semestre 1</option>
              <option>Semestre 2</option>
            </select>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-border p-6">
          <p className="text-sm font-medium text-neutral-600 mb-2">CM (Cours Magistral)</p>
          <p className="text-3xl font-bold text-neutral-900 mb-1">{totalCM}h</p>
          <p className="text-sm text-neutral-600">
            Équivalent: {(totalCM * 1.5).toFixed(1)}h
          </p>
        </div>
        <div className="bg-white rounded-lg border border-border p-6">
          <p className="text-sm font-medium text-neutral-600 mb-2">TD (Travaux Dirigés)</p>
          <p className="text-3xl font-bold text-neutral-900 mb-1">{totalTD}h</p>
          <p className="text-sm text-neutral-600">
            Équivalent: {(totalTD * 1.0).toFixed(1)}h
          </p>
        </div>
        <div className="bg-white rounded-lg border border-border p-6">
          <p className="text-sm font-medium text-neutral-600 mb-2">TP (Travaux Pratiques)</p>
          <p className="text-3xl font-bold text-neutral-900 mb-1">{totalTP}h</p>
          <p className="text-sm text-neutral-600">
            Équivalent: {(totalTP * 0.75).toFixed(1)}h
          </p>
        </div>
      </div>

      {/* Summary Table */}
      <div className="bg-white rounded-lg border border-border overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase">
                  Matière
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase">
                  Filière
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-neutral-700 uppercase">
                  Niveau
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
                  Total Équiv.
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-neutral-700 uppercase">
                  Montant
                </th>
              </tr>
            </thead>
            <tbody>
              {mockData.map((item, index) => (
                <tr
                  key={item.id}
                  className={cn(
                    "border-b border-border hover:bg-neutral-50 transition-colors",
                    index === mockData.length - 1 && "border-b-0"
                  )}
                >
                  <td className="px-6 py-4 text-sm font-medium text-neutral-900 max-w-xs truncate">
                    {item.course}
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-700">
                    {item.filiere}
                  </td>
                  <td className="px-6 py-4 text-sm text-center">
                    <span className="px-2.5 py-1 bg-primary-100 text-primary-700 rounded-md text-xs font-medium">
                      {item.level}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-center text-neutral-700">
                    {item.cm}h
                  </td>
                  <td className="px-6 py-4 text-sm text-center text-neutral-700">
                    {item.td}h
                  </td>
                  <td className="px-6 py-4 text-sm text-center text-neutral-700">
                    {item.tp}h
                  </td>
                  <td className="px-6 py-4 text-sm text-center font-semibold text-neutral-900">
                    {item.totalEquiv}h
                  </td>
                  <td className="px-6 py-4 text-sm text-right font-semibold text-neutral-900">
                    {item.amount}€
                  </td>
                </tr>
              ))}
              {/* Total Row */}
              <tr className="bg-primary-50 border-t-2 border-primary-200">
                <td colSpan={3} className="px-6 py-4 text-sm font-bold text-neutral-900">
                  TOTAL
                </td>
                <td className="px-6 py-4 text-sm text-center font-bold text-neutral-900">
                  {totalCM}h
                </td>
                <td className="px-6 py-4 text-sm text-center font-bold text-neutral-900">
                  {totalTD}h
                </td>
                <td className="px-6 py-4 text-sm text-center font-bold text-neutral-900">
                  {totalTP}h
                </td>
                <td className="px-6 py-4 text-sm text-center font-bold text-primary-600">
                  {totalEquiv}h
                </td>
                <td className="px-6 py-4 text-sm text-right font-bold text-primary-600">
                  {totalAmount}€
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Download Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <button className="flex-1 py-3 px-4 rounded-lg bg-danger-50 border-2 border-danger-300 text-danger-600 font-semibold hover:bg-danger-100 transition-colors flex items-center justify-center gap-2">
          <FileText size={20} />
          Télécharger en PDF
        </button>
        <button className="flex-1 py-3 px-4 rounded-lg bg-success-50 border-2 border-success-300 text-success-600 font-semibold hover:bg-success-100 transition-colors flex items-center justify-center gap-2">
          <Download size={20} />
          Télécharger en Excel
        </button>
      </div>

      {/* Note Section */}
      <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6">
        <h4 className="text-sm font-semibold text-neutral-900 mb-2">Note importante</h4>
        <p className="text-sm text-neutral-700">
          Ces données sont indicatives. Le montant final est validé par le service RH et
          peut différer suite à des ajustements administratifs ou des modifications
          contractuelles.
        </p>
      </div>
    </Layout>
  );
}
