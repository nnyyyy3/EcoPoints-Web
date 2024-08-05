import { loader } from "~/loaders/adminLoaders/adminLoader";
import AdmDashboard from "~/components/admin/features/adminDashboard/AdmDashboard";

export { loader };

export default function AdminDashboardRoute() {
  return <AdmDashboard />;
}
