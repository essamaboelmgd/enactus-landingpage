import { Users, FileText, CheckCircle, Clock } from "lucide-react";
import { StatsCard } from "@/components/StatsCard";

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here's your overview.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Members"
          value="1,234"
          icon={Users}
          description="+12% from last month"
        />
        <StatsCard
          title="Total Submissions"
          value="856"
          icon={FileText}
          description="+8% from last month"
        />
        <StatsCard
          title="Approved"
          value="743"
          icon={CheckCircle}
          description="86.8% approval rate"
        />
        <StatsCard
          title="Pending Review"
          value="113"
          icon={Clock}
          description="Requires attention"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex items-center gap-4 pb-4 border-b border-border/30 last:border-0"
              >
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    New member registration
                  </p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">
            Committee Distribution
          </h3>
          <div className="space-y-3">
            {[
              { name: "Technical Committee", count: 245, color: "bg-chart-1" },
              { name: "Finance Committee", count: 198, color: "bg-chart-2" },
              { name: "Marketing Committee", count: 176, color: "bg-chart-3" },
              { name: "HR Committee", count: 154, color: "bg-chart-4" },
            ].map((committee) => (
              <div key={committee.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground">{committee.name}</span>
                  <span className="text-muted-foreground font-medium">
                    {committee.count}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full ${committee.color} transition-all duration-500`}
                    style={{ width: `${(committee.count / 245) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
