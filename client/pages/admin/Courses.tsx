import Layout from "@/components/layout/Layout";
import { Plus, Edit2, Trash2, Eye } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useNotification } from "@/hooks/use-notification";

interface Course {
  id: number;
  code: string;
  title: string;
  filiere: string;
  level: string;
  cmPlanned: number;
  tdPlanned: number;
  tpPlanned: number;
  totalPlanned: number;
  cmDone: number;
  tdDone: number;
  tpDone: number;
  responsible: string;
}

const mockCourses: Course[] = [
  {
    id: 1,
    code: "INFO101",
    title: "Introduction à l'Informatique",
    filiere: "Informatique",
    level: "L1",
    cmPlanned: 24,
    tdPlanned: 12,
    tpPlanned: 12,
    totalPlanned: 48,
    cmDone: 18,
    tdDone: 10,
    tpDone: 8,
    responsible: "Dr. Pierre Dupont",
  },
  {
    id: 2,
    code: "MATH101",
    title: "Calcul Différentiel",
    filiere: "Mathématiques",
    level: "L1",
    cmPlanned: 30,
    tdPlanned: 20,
    tpPlanned: 0,
    totalPlanned: 50,
    cmDone: 30,
    tdDone: 20,
    tpDone: 0,
    responsible: "Prof. Marie Martin",
  },
  {
    id: 3,
    code: "PHYS101",
    title: "Mécanique Classique",
    filiere: "Physique",
    level: "L1",
    cmPlanned: 20,
    tdPlanned: 15,
    tpPlanned: 15,
    totalPlanned: 50,
    cmDone: 15,
    tdDone: 12,
    tpDone: 10,
    responsible: "Dr. Luc Bernard",
  },
  {
    id: 4,
    code: "CHIM101",
    title: "Chimie Générale",
    filiere: "Chimie",
    level: "L1",
    cmPlanned: 18,
    tdPlanned: 12,
    tpPlanned: 18,
    totalPlanned: 48,
    cmDone: 12,
    tdDone: 8,
    tpDone: 10,
    responsible: "Prof. Anne Lefevre",
  },
  {
    id: 5,
    code: "BIO101",
    title: "Biologie Cellulaire",
    filiere: "Biologie",
    level: "L1",
    cmPlanned: 22,
    tdPlanned: 14,
    tpPlanned: 14,
    totalPlanned: 50,
    cmDone: 20,
    tdDone: 14,
    tpDone: 12,
    responsible: "Dr. Jean Laurent",
  },
];

const ProgressBar = ({ done, planned }: { done: number; planned: number }) => {
  const percentage = Math.min((done / planned) * 100, 100);
  const isComplete = done >= planned;

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full transition-all",
            isComplete ? "bg-success-500" : "bg-primary-500"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-xs font-medium text-neutral-600 w-12 text-right">
        {done}/{planned}h
      </span>
    </div>
  );
};

export default function Courses() {
  const { success } = useNotification();
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [selectedFiliere, setSelectedFiliere] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const handleAddCourse = () => {
    success("Formulaire d'ajout de matière ouvert");
  };

  const filteredCourses = courses.filter((course) => {
    const matchesFiliere = !selectedFiliere || course.filiere === selectedFiliere;
    const matchesLevel = !selectedLevel || course.level === selectedLevel;
    return matchesFiliere && matchesLevel;
  });

  const filieres = [...new Set(courses.map((c) => c.filiere))];
  const levels = ["L1", "L2", "L3", "M1", "M2"];

  return (
    <Layout
      userRole="admin"
      userName="Admin"
      pageTitle="Gestion des matières"
      breadcrumbs={[{ label: "Admin" }, { label: "Matières" }]}
      showSearch={false}
    >
      {/* Header with Add Button */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <h2 className="text-lg font-semibold text-neutral-900">
          {filteredCourses.length} matière{filteredCourses.length !== 1 ? "s" : ""}
        </h2>
        <button onClick={handleAddCourse} className="w-full md:w-auto py-2.5 px-6 bg-primary-500 text-white font-semibold rounded-full hover:bg-primary-600 transition-colors flex items-center justify-center gap-2">
          <Plus size={20} />
          Ajouter une matière
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-lg border border-border p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Filiere Filter */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Filière
            </label>
            <select
              value={selectedFiliere}
              onChange={(e) => setSelectedFiliere(e.target.value)}
              className={cn(
                "w-full px-3 py-2 rounded-lg border border-border",
                "bg-white text-neutral-900 text-sm",
                "focus:outline-none focus:ring-2 focus:ring-primary-500"
              )}
            >
              <option value="">Toutes</option>
              {filieres.map((filiere) => (
                <option key={filiere} value={filiere}>
                  {filiere}
                </option>
              ))}
            </select>
          </div>

          {/* Level Chips */}
          <div className="md:col-span-2 lg:col-span-2">
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Niveau
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() =>
                  setSelectedLevel(selectedLevel === "" ? "" : "")
                }
                className={cn(
                  "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                  selectedLevel === ""
                    ? "bg-primary-500 text-white"
                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                )}
              >
                Tous
              </button>
              {levels.map((level) => (
                <button
                  key={level}
                  onClick={() =>
                    setSelectedLevel(selectedLevel === level ? "" : level)
                  }
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                    selectedLevel === level
                      ? "bg-primary-500 text-white"
                      : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                  )}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Courses Table */}
      <div className="bg-white rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase">
                  Code UE
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase">
                  Intitulé
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase">
                  Filière
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase">
                  Niveau
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase">
                  CM
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase">
                  TD
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase">
                  TP
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase">
                  Responsable
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-neutral-700 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((course, index) => (
                <tr
                  key={course.id}
                  className={cn(
                    "border-b border-border hover:bg-neutral-50 transition-colors",
                    index === filteredCourses.length - 1 && "border-b-0"
                  )}
                >
                  <td className="px-6 py-4 text-sm font-bold text-neutral-900">
                    {course.code}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-neutral-900 max-w-xs truncate">
                    {course.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-700">
                    {course.filiere}
                  </td>
                  <td className="px-6 py-4 text-sm text-center">
                    <span className="px-2.5 py-1 bg-primary-100 text-primary-700 rounded-md text-xs font-medium">
                      {course.level}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <ProgressBar
                      done={course.cmDone}
                      planned={course.cmPlanned}
                    />
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <ProgressBar
                      done={course.tdDone}
                      planned={course.tdPlanned}
                    />
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <ProgressBar
                      done={course.tpDone}
                      planned={course.tpPlanned}
                    />
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-700">
                    {course.responsible}
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

      {filteredCourses.length === 0 && (
        <div className="bg-white rounded-lg border border-border p-12 text-center">
          <p className="text-neutral-500">Aucune matière trouvée</p>
        </div>
      )}
    </Layout>
  );
}
