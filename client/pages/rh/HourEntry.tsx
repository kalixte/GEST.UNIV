import Layout from "@/components/layout/Layout";
import { Upload, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface FormData {
  teacher: string;
  course: string;
  sessionType: "CM" | "TD" | "TP";
  date: string;
  startTime: string;
  endTime: string;
  room: string;
  group: string;
  observations: string;
}

const teachers = [
  "Dr. Pierre Dupont",
  "Prof. Marie Martin",
  "Dr. Luc Bernard",
  "Prof. Anne Lefevre",
  "Dr. Jean Laurent",
];

const courses: Record<string, string[]> = {
  "Dr. Pierre Dupont": [
    "Introduction à l'Informatique",
    "Programmation Avancée",
  ],
  "Prof. Marie Martin": ["Calcul Différentiel", "Algèbre Linéaire"],
  "Dr. Luc Bernard": ["Mécanique Classique", "Électromagnétisme"],
  "Prof. Anne Lefevre": ["Chimie Générale", "Chimie Organique"],
  "Dr. Jean Laurent": ["Biologie Cellulaire", "Génétique"],
};

const ratesByType: Record<string, number> = {
  CM: 85,
  TD: 60,
  TP: 50,
};

const equivalenceFactors: Record<string, number> = {
  CM: 1.5,
  TD: 1.0,
  TP: 0.75,
};

export default function HourEntry() {
  const [formData, setFormData] = useState<FormData>({
    teacher: "",
    course: "",
    sessionType: "CM",
    date: "",
    startTime: "",
    endTime: "",
    room: "",
    group: "",
    observations: "",
  });

  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const calculateDuration = () => {
    if (!formData.startTime || !formData.endTime) return 0;
    const start = new Date(`2000-01-01 ${formData.startTime}`);
    const end = new Date(`2000-01-01 ${formData.endTime}`);
    return Math.max(0, (end.getTime() - start.getTime()) / (1000 * 60 * 60));
  };

  const duration = calculateDuration();
  const equivalentHours = duration * equivalenceFactors[formData.sessionType];
  const estimatedAmount = duration * ratesByType[formData.sessionType];

  const availableCourses =
    formData.teacher && courses[formData.teacher]
      ? courses[formData.teacher]
      : [];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <Layout
      userRole="rh"
      userName="RH"
      pageTitle="Saisie des heures d'enseignement"
      breadcrumbs={[{ label: "RH" }, { label: "Saisie des heures" }]}
      showSearch={false}
    >
      {/* Header with Secondary Button */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-lg font-semibold text-neutral-900"></h2>
        <button className="py-2.5 px-6 border-2 border-neutral-300 text-neutral-700 font-semibold rounded-full hover:bg-neutral-100 transition-colors">
          Saisie rapide
        </button>
      </div>

      {/* Form Card */}
      <div className="max-w-2xl mx-auto bg-white rounded-lg border border-border p-8 mb-8">
        <form className="space-y-6">
          {/* Teacher Select */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Enseignant *
            </label>
            <select
              value={formData.teacher}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  teacher: e.target.value,
                  course: "",
                })
              }
              required
              className={cn(
                "w-full px-4 py-2.5 rounded-lg border border-border",
                "bg-white text-neutral-900 text-sm",
                "focus:outline-none focus:ring-2 focus:ring-primary-500"
              )}
            >
              <option value="">Sélectionner un enseignant</option>
              {teachers.map((teacher) => (
                <option key={teacher} value={teacher}>
                  {teacher}
                </option>
              ))}
            </select>
          </div>

          {/* Course Select */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Matière *
            </label>
            <select
              value={formData.course}
              onChange={(e) =>
                setFormData({ ...formData, course: e.target.value })
              }
              disabled={!formData.teacher}
              required
              className={cn(
                "w-full px-4 py-2.5 rounded-lg border border-border",
                "bg-white text-neutral-900 text-sm",
                "focus:outline-none focus:ring-2 focus:ring-primary-500",
                !formData.teacher && "bg-neutral-50 text-neutral-500"
              )}
            >
              <option value="">Sélectionner une matière</option>
              {availableCourses.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>

          {/* Session Type */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-3">
              Type de séance *
            </label>
            <div className="flex gap-4">
              {(["CM", "TD", "TP"] as const).map((type) => (
                <label key={type} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="sessionType"
                    value={type}
                    checked={formData.sessionType === type}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        sessionType: e.target.value as "CM" | "TD" | "TP",
                      })
                    }
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium text-neutral-700">
                    {type}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Date *
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              required
              className={cn(
                "w-full px-4 py-2.5 rounded-lg border border-border",
                "bg-white text-neutral-900 text-sm",
                "focus:outline-none focus:ring-2 focus:ring-primary-500"
              )}
            />
          </div>

          {/* Time Range */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Heure début *
              </label>
              <input
                type="time"
                value={formData.startTime}
                onChange={(e) =>
                  setFormData({ ...formData, startTime: e.target.value })
                }
                required
                className={cn(
                  "w-full px-4 py-2.5 rounded-lg border border-border",
                  "bg-white text-neutral-900 text-sm",
                  "focus:outline-none focus:ring-2 focus:ring-primary-500"
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Heure fin *
              </label>
              <input
                type="time"
                value={formData.endTime}
                onChange={(e) =>
                  setFormData({ ...formData, endTime: e.target.value })
                }
                required
                className={cn(
                  "w-full px-4 py-2.5 rounded-lg border border-border",
                  "bg-white text-neutral-900 text-sm",
                  "focus:outline-none focus:ring-2 focus:ring-primary-500"
                )}
              />
            </div>
          </div>

          {/* Room and Group */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Salle *
              </label>
              <input
                type="text"
                placeholder="A101"
                value={formData.room}
                onChange={(e) =>
                  setFormData({ ...formData, room: e.target.value })
                }
                required
                className={cn(
                  "w-full px-4 py-2.5 rounded-lg border border-border",
                  "bg-white text-neutral-900 text-sm",
                  "placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Groupe/Promotion
              </label>
              <input
                type="text"
                placeholder="L1 Informatique"
                value={formData.group}
                onChange={(e) =>
                  setFormData({ ...formData, group: e.target.value })
                }
                className={cn(
                  "w-full px-4 py-2.5 rounded-lg border border-border",
                  "bg-white text-neutral-900 text-sm",
                  "placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                )}
              />
            </div>
          </div>

          {/* Observations */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Observations
            </label>
            <textarea
              value={formData.observations}
              onChange={(e) =>
                setFormData({ ...formData, observations: e.target.value })
              }
              rows={3}
              placeholder="Remarques additionnelles..."
              className={cn(
                "w-full px-4 py-2.5 rounded-lg border border-border",
                "bg-white text-neutral-900 text-sm",
                "placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              )}
            />
          </div>

          {/* Summary Box */}
          {duration > 0 && (
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
              <p className="text-sm text-primary-900">
                <span className="font-semibold">Durée:</span> {duration}h |{" "}
                <span className="font-semibold">Équivalent TD:</span>{" "}
                {equivalentHours}h |{" "}
                <span className="font-semibold">Montant estimé:</span>{" "}
                {estimatedAmount}€
              </p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-4 pt-6">
            <button
              type="button"
              className="flex-1 py-2.5 px-4 rounded-lg border-2 border-neutral-300 text-neutral-700 font-semibold hover:bg-neutral-100 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 px-4 rounded-lg bg-primary-500 text-white font-semibold hover:bg-primary-600 transition-colors"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>

      {/* Bulk Import Section */}
      <div className="max-w-2xl mx-auto">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">
          Import en masse
        </h3>
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={cn(
            "relative border-2 border-dashed rounded-lg p-8 text-center transition-colors",
            dragActive ? "border-primary-500 bg-primary-50" : "border-neutral-300 bg-neutral-50"
          )}
        >
          <input
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          <Upload className={cn(
            "mx-auto mb-3 size-8",
            dragActive ? "text-primary-500" : "text-neutral-400"
          )} />
          <p className="text-sm font-medium text-neutral-900 mb-1">
            Déposer votre fichier Excel ou cliquer pour sélectionner
          </p>
          <p className="text-xs text-neutral-500 mb-4">
            Formats acceptés: .xlsx, .xls, .csv
          </p>
          <a href="#" className="text-sm font-semibold text-primary-600 hover:text-primary-700">
            Télécharger le modèle Excel
          </a>

          {file && (
            <div className="mt-4 bg-white border border-success-200 rounded-lg p-3 flex items-center justify-between">
              <span className="text-sm text-neutral-700">{file.name}</span>
              <button
                onClick={() => setFile(null)}
                className="text-neutral-500 hover:text-danger-600"
              >
                <X size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
