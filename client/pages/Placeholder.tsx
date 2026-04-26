import Layout from "@/components/layout/Layout";
import { AlertCircle } from "lucide-react";

interface PlaceholderProps {
  title: string;
  userRole: "admin" | "rh" | "teacher";
  pageName: string;
}

export default function Placeholder({
  title,
  userRole,
  pageName,
}: PlaceholderProps) {
  return (
    <Layout
      userRole={userRole}
      userName="User"
      pageTitle={title}
      showSearch={false}
    >
      <div className="min-h-full flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-warning-50 text-warning-500 mb-6">
            <AlertCircle size={32} />
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">
            {pageName}
          </h2>
          <p className="text-neutral-600 mb-8">
            Cette page est actuellement en développement. Continuez à interagir
            avec l'assistant IA pour définir le contenu de cette page.
          </p>
          <button className="px-6 py-2.5 bg-primary-500 text-white font-semibold rounded-full hover:bg-primary-600 transition-colors">
            Retour au tableau de bord
          </button>
        </div>
      </div>
    </Layout>
  );
}
