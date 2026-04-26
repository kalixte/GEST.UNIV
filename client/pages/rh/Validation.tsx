import Layout from "@/components/layout/Layout";
import { Check, X, CheckSquare, Square } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ValidationItem {
  id: number;
  teacher: string;
  course: string;
  date: string;
  type: "CM" | "TD" | "TP";
  duration: number;
  room: string;
}

const mockPendingItems: ValidationItem[] = [
  {
    id: 1,
    teacher: "Dr. Pierre Dupont",
    course: "Introduction à l'Informatique",
    date: "2024-01-15",
    type: "CM",
    duration: 2,
    room: "A101",
  },
  {
    id: 2,
    teacher: "Dr. Luc Bernard",
    course: "Mécanique Classique",
    date: "2024-01-14",
    type: "TP",
    duration: 3,
    room: "Lab C301",
  },
  {
    id: 3,
    teacher: "Dr. Jean Laurent",
    course: "Biologie Cellulaire",
    date: "2024-01-13",
    type: "TD",
    duration: 1.5,
    room: "B206",
  },
  {
    id: 4,
    teacher: "Prof. Marie Martin",
    course: "Calcul Différentiel",
    date: "2024-01-12",
    type: "CM",
    duration: 2,
    room: "A102",
  },
];

export default function Validation() {
  const [items, setItems] = useState<ValidationItem[]>(mockPendingItems);
  const [selectedItem, setSelectedItem] = useState<ValidationItem | null>(
    items[0] || null
  );
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [comment, setComment] = useState("");

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === items.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(items.map((item) => item.id));
    }
  };

  const handleValidate = (id?: number) => {
    const idsToValidate = id ? [id] : selectedIds;
    setItems(items.filter((item) => !idsToValidate.includes(item.id)));
    setSelectedIds([]);
    if (selectedItem && idsToValidate.includes(selectedItem.id)) {
      setSelectedItem(null);
    }
  };

  const handleReject = (id?: number) => {
    const idsToReject = id ? [id] : selectedIds;
    setItems(items.filter((item) => !idsToReject.includes(item.id)));
    setSelectedIds([]);
    if (selectedItem && idsToReject.includes(selectedItem.id)) {
      setSelectedItem(null);
    }
  };

  return (
    <Layout
      userRole="rh"
      userName="RH"
      pageTitle="Validation des heures"
      breadcrumbs={[{ label: "RH" }, { label: "Validation" }]}
      showSearch={false}
    >
      {/* Bulk Actions Toolbar */}
      {items.length > 0 && (
        <div className="bg-white rounded-lg border border-border p-4 mb-6 flex items-center gap-4">
          <button
            onClick={toggleSelectAll}
            className="flex items-center gap-2 text-sm font-medium text-neutral-700 hover:text-neutral-900"
          >
            {selectedIds.length === items.length ? (
              <CheckSquare size={20} className="text-primary-600" />
            ) : (
              <Square size={20} className="text-neutral-400" />
            )}
            <span>Tout sélectionner</span>
          </button>

          {selectedIds.length > 0 && (
            <>
              <span className="text-sm font-medium text-neutral-600 ml-auto">
                {selectedIds.length} élément{selectedIds.length !== 1 ? "s" : ""} sélectionné{selectedIds.length !== 1 ? "s" : ""}
              </span>
              <button
                onClick={() => handleValidate()}
                className="py-2 px-4 rounded-lg bg-success-100 text-success-700 font-medium hover:bg-success-200 transition-colors flex items-center gap-2"
              >
                <Check size={18} />
                Valider la sélection
              </button>
              <button
                onClick={() => handleReject()}
                className="py-2 px-4 rounded-lg bg-danger-100 text-danger-700 font-medium hover:bg-danger-200 transition-colors flex items-center gap-2"
              >
                <X size={18} />
                Rejeter la sélection
              </button>
            </>
          )}
        </div>
      )}

      {/* Two-Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel: List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-border overflow-hidden">
            <div className="px-4 py-3 border-b border-border bg-neutral-50">
              <p className="text-sm font-semibold text-neutral-900">
                En attente ({items.length})
              </p>
            </div>
            <div className="max-h-screen overflow-y-auto">
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={cn(
                    "w-full px-4 py-3 border-b border-border hover:bg-neutral-50 transition-colors text-left",
                    selectedItem?.id === item.id && "bg-primary-50 border-l-4 border-l-primary-500"
                  )}
                >
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(item.id)}
                      onChange={(e) => {
                        e.stopPropagation();
                        toggleSelect(item.id);
                      }}
                      onClick={(e) => e.stopPropagation()}
                      className="mt-1"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-neutral-900 truncate">
                        {item.teacher}
                      </p>
                      <p className="text-xs text-neutral-600 truncate">
                        {item.course}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="px-2 py-0.5 bg-primary-100 text-primary-700 rounded text-xs font-medium">
                          {item.type}
                        </span>
                        <span className="text-xs text-neutral-500">
                          {item.date}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel: Detail */}
        {selectedItem && (
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-6">
                Détails de la saisie
              </h3>

              {/* Teacher Info */}
              <div className="mb-6 pb-6 border-b border-border">
                <p className="text-xs font-semibold text-neutral-700 uppercase mb-2">
                  Enseignant
                </p>
                <p className="text-base font-medium text-neutral-900">
                  {selectedItem.teacher}
                </p>
              </div>

              {/* Course Info */}
              <div className="mb-6 pb-6 border-b border-border">
                <p className="text-xs font-semibold text-neutral-700 uppercase mb-2">
                  Matière
                </p>
                <p className="text-base font-medium text-neutral-900">
                  {selectedItem.course}
                </p>
              </div>

              {/* Session Details */}
              <div className="grid grid-cols-2 gap-6 mb-6 pb-6 border-b border-border">
                <div>
                  <p className="text-xs font-semibold text-neutral-700 uppercase mb-2">
                    Type de séance
                  </p>
                  <p className="text-base font-medium text-neutral-900">
                    {selectedItem.type}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-neutral-700 uppercase mb-2">
                    Date
                  </p>
                  <p className="text-base font-medium text-neutral-900">
                    {selectedItem.date}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-neutral-700 uppercase mb-2">
                    Durée
                  </p>
                  <p className="text-base font-medium text-neutral-900">
                    {selectedItem.duration}h
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-neutral-700 uppercase mb-2">
                    Salle
                  </p>
                  <p className="text-base font-medium text-neutral-900">
                    {selectedItem.room}
                  </p>
                </div>
              </div>

              {/* Validation Form */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Commentaire
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Ajouter un commentaire optionnel..."
                  rows={3}
                  className={cn(
                    "w-full px-4 py-2.5 rounded-lg border border-border",
                    "bg-white text-neutral-900 text-sm",
                    "placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  )}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => handleValidate(selectedItem.id)}
                  className="flex-1 py-2.5 px-4 rounded-lg bg-success-500 text-white font-semibold hover:bg-success-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Check size={18} />
                  Valider
                </button>
                <button
                  onClick={() => handleReject(selectedItem.id)}
                  className="flex-1 py-2.5 px-4 rounded-lg bg-danger-500 text-white font-semibold hover:bg-danger-600 transition-colors flex items-center justify-center gap-2"
                >
                  <X size={18} />
                  Rejeter
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {items.length === 0 && (
        <div className="bg-white rounded-lg border border-border p-12 text-center">
          <p className="text-neutral-500 font-medium">
            Toutes les saisies ont été validées
          </p>
        </div>
      )}
    </Layout>
  );
}
