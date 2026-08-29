import MetricsGrid from "./MetricsGrid";
import RevenueChart from "./RevenueChart";
import ActivityStream from "./ActivityStream";

export default function OverviewPage() {
  return (
    <div className="space-y-6">
      <MetricsGrid />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <ActivityStream />
      </div>
    </div>
  );
}
