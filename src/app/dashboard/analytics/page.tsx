import { getAdminAnalytics } from "@/components/helper/getAdminAnalytics";
import AnalyticsCards from "../_component/AnalyticsCards";

export default async function AnalyticsPage() {
  const analytics = await getAdminAnalytics();

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-semibold">Portfolio Analytics</h1>
        <p className="text-muted-foreground">
          Visitors, resume downloads, and hire requests
        </p>
      </header>

      <AnalyticsCards data={analytics} />
    </div>
  );
}
