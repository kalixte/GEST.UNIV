import Layout from "@/components/layout/Layout";
import { Plus, Edit2, Trash2, Eye } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useNotification } from "@/hooks/use-notification";

interface Teacher {
  id: number;
  firstName: string;
  lastName: string;
  grade: string;
  department: string;
  status: "Actif" | "Inactif" | "En congé";
  rateCM: number;
  rateTD: number;
  rateTP: number;
  contractualHours: number;
}

const mockTeachers: Teacher[] = [
  {
    id: 1,
    firstName: "Pierre",
    lastName: "Dupont",
    grade: "Professeur",
    department: "Informatique",
    status: "Actif",
    rateCM: 85,
    rateTD: 60,
    rateTP: 50,
    contractualHours: 192,
  },
  {
    id: 2,
    firstName: "Marie",
    lastName: "Martin",
    grade: "Maître de conférences",
    department: "Mathématiques",
    status: "Actif",
    rateCM: 75,
    rateTD: 55,
    rateTP: 0,
    contractualHours: 192,
  },
  {
    id: 3,
    firstName: "Luc",
    lastName: "Bernard",
    grade: "ATER",
    department: "Physique",
    status: "Actif",
    rateCM: 50,
    rateTD: 40,
    rateTP: 35,
    contractualHours: 96,
  },
  {
    id: 4,
    firstName: "Anne",
    lastName: "Lefevre",
    grade: "Vacataire",
    department: "Chimie",
    status: "En congé",
    rateCM: 40,
    rateTD: 30,
    rateTP: 25,
    contractualHours: 48,
  },
  {
    id: 5,
    firstName: "Jean",
    lastName: "Laurent",
    grade: "Professeur",
    department: "Biologie",
    status: "Actif",
    rateCM: 80,
    rateTD: 60,
    rateTP: 45,
    contractualHours: 192,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Actif":
      return "bg-success-100 text-success-700";
    case "Inactif":
      return "bg-neutral-100 text-neutral-700";
    case "En congé":
      return "bg-warning-100 text-warning-700";
    default:
      return "bg-neutral-100 text-neutral-700";
  }
};

export default function Teachers() {
  const { success } = useNotification();
  const [teachers, setTeachers] = useState<Teacher[]>(mockTeachers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");

  const handleAddTeacher = () => {
    success("Formulaire d'ajout d'enseignant ouvert");
  };

  const filteredTeachers = teachers.filter((teacher) => {
    const matchesSearch =
      `${teacher.firstName} ${teacher.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      teacher.lastName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      !selectedDepartment || teacher.department === selectedDepartment;
    const matchesStatus = !selectedStatus || teacher.status === selectedStatus;
    const matchesGrade = !selectedGrade || teacher.grade === selectedGrade;

    return matchesSearch && matchesDepartment && matchesStatus && matchesGrade;
  });

  const departments = [...new Set(teachers.map((t) => t.department))];
  const statuses = ["Actif", "Inactif", "En congé"];
  const grades = [...new Set(teachers.map((t) => t.grade))];

  return (
    <Layout
      userRole="admin"
      userName="Admin"
      pageTitle="Gestion des enseignants"
      breadcrumbs={[{ label: "Admin" }, { label: "Enseignants" }]}
      showSearch={false}
    >
      {/* Header with Add Button */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <h2 className="text-lg font-semibold text-neutral-900">
          {filteredTeachers.length} enseignant{filteredTeachers.length !== 1 ? "s" : ""}
        </h2>
        <button onClick={handleAddTeacher} className="w-full md:w-auto py-2.5 px-6 bg-primary-500 text-white font-semibold rounded-full hover:bg-primary-600 transition-colors flex items-center justify-center gap-2">
          <Plus size={20} />
          Ajouter un enseignant
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-lg border border-border p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Rechercher
            </label>
            <input
              type="text"
              placeholder="Nom de l'enseignant"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={cn(
                "w-full px-3 py-2 rounded-lg border border-border",
                "bg-white text-neutral-900 text-sm",
                "placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              )}
            />
          </div>

          {/* Department Filter */}
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

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Statut
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

          {/* Grade Filter */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Grade
            </label>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className={cn(
                "w-full px-3 py-2 rounded-lg border border-border",
                "bg-white text-neutral-900 text-sm",
                "focus:outline-none focus:ring-2 focus:ring-primary-500"
              )}
            >
              <option value="">Tous</option>
              {grades.map((grade) => (
                <option key={grade} value={grade}>
                  {grade}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Teachers Table */}
      <div className="bg-white rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase">
                  Nom Prénom
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase">
                  Grade
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase">
                  Département
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase">
                  Statut
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-neutral-700 uppercase">
                  Taux CM
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-neutral-700 uppercase">
                  Taux TD
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-neutral-700 uppercase">
                  Taux TP
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-neutral-700 uppercase">
                  Heures Contractuelles
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-neutral-700 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTeachers.map((teacher, index) => (
                <tr
                  key={teacher.id}
                  className={cn(
                    "border-b border-border hover:bg-neutral-50 transition-colors",
                    index === filteredTeachers.length - 1 && "border-b-0"
                  )}
                >
                  <td className="px-6 py-4 text-sm font-medium text-neutral-900">
                    {teacher.firstName} {teacher.lastName}
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-700">
                    {teacher.grade}
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-700">
                    {teacher.department}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={cn(
                        "px-2.5 py-1 rounded-md text-xs font-medium",
                        getStatusColor(teacher.status)
                      )}
                    >
                      {teacher.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-center text-neutral-700">
                    {teacher.rateCM} CFA
                  </td>
                  <td className="px-6 py-4 text-sm text-center text-neutral-700">
                    {teacher.rateTD} CFA
                  </td>
                  <td className="px-6 py-4 text-sm text-center text-neutral-700">
                    {teacher.rateTP} CFA
                  </td>
                  <td className="px-6 py-4 text-sm text-center font-medium text-neutral-900">
                    {teacher.contractualHours}h
                  </td>
                  <td className="px-6 py-4 text-sm text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-1.5 hover:bg-neutral-200 rounded-lg transition-colors text-neutral-600 hover:text-primary-600">
                        <Eye size={18} />
                      </button>
                      <button className="p-1.5 hover:bg-neutral-200 rounded-lg transition-colors text-neutral-600 hover:text-primary-600">
                        <Edit2 size={18} />
                      </button>
                      <button className="p-1.5 hover:bg-neutral-200 rounded-lg transition-colors text-neutral-600 hover:text-danger-600">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredTeachers.length === 0 && (
        <div className="bg-white rounded-lg border border-border p-12 text-center">
          <p className="text-neutral-500">Aucun enseignant trouvé</p>
        </div>
      )}
    </Layout>
  );
}
