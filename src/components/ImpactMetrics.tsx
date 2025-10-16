import { TrendingUp, Clock, Users, AlertCircle } from "lucide-react";

const ImpactMetrics = () => {
  const metrics = [
    {
      icon: TrendingUp,
      value: "87%",
      label: "Incident Resolution Rate",
      trend: "+12% from last month",
      color: "primary"
    },
    {
      icon: Clock,
      value: "2.3 min",
      label: "Average Response Time",
      trend: "-45s improvement",
      color: "accent"
    },
    {
      icon: Users,
      value: "45K+",
      label: "Active Community Members",
      trend: "+8K this quarter",
      color: "secondary"
    },
    {
      icon: AlertCircle,
      value: "10K+",
      label: "Events Tracked Daily",
      trend: "Real-time updates",
      color: "primary"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Measurable Impact
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real metrics from real cities powered by AI intelligence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {metrics.map((metric, i) => {
            const Icon = metric.icon;
            return (
              <div 
                key={i}
                className="p-8 rounded-lg bg-card border border-border hover:border-primary/40 transition-all hover:scale-105 group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-${metric.color} flex items-center justify-center shadow-glow-${metric.color} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                </div>
                <div className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-primary">
                  {metric.value}
                </div>
                <div className="text-foreground font-medium mb-2">{metric.label}</div>
                <div className="text-sm text-muted-foreground">{metric.trend}</div>
              </div>
            );
          })}
        </div>

        {/* Recent Events Table */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="p-6 border-b border-border">
            <h3 className="text-2xl font-bold">Recent Synthesized City Alerts</h3>
            <p className="text-muted-foreground mt-2">Live AI-generated summaries with actionable recommendations</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-4 font-semibold">Event</th>
                  <th className="text-left p-4 font-semibold">Location</th>
                  <th className="text-left p-4 font-semibold">AI Summary</th>
                  <th className="text-left p-4 font-semibold">Recommended Action</th>
                  <th className="text-left p-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  {
                    event: "Traffic Congestion",
                    location: "Main St & 5th Ave",
                    summary: "Heavy congestion detected from multiple sensor and citizen reports",
                    action: "Use Elm Ave as alternate route",
                    status: "Active"
                  },
                  {
                    event: "Community Event",
                    location: "Central Park",
                    summary: "Outdoor concert detected, 500+ attendees via social media analysis",
                    action: "Expect increased foot traffic until 10 PM",
                    status: "Ongoing"
                  },
                  {
                    event: "Infrastructure Issue",
                    location: "Oak St Bridge",
                    summary: "Pothole reported by 12 citizens with photo evidence",
                    action: "Maintenance crew dispatched, avoid lane 2",
                    status: "In Progress"
                  },
                  {
                    event: "Weather Alert",
                    location: "Downtown District",
                    summary: "Heavy rainfall predicted, flash flood risk in low areas",
                    action: "Avoid underground parking, seek higher ground",
                    status: "Active"
                  }
                ].map((alert, i) => (
                  <tr key={i} className="hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-medium">{alert.event}</td>
                    <td className="p-4 text-muted-foreground">{alert.location}</td>
                    <td className="p-4 text-sm">{alert.summary}</td>
                    <td className="p-4 text-sm text-primary">{alert.action}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        alert.status === "Active" ? "bg-primary/20 text-primary" :
                        alert.status === "Ongoing" ? "bg-accent/20 text-accent" :
                        "bg-secondary/20 text-secondary"
                      }`}>
                        {alert.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactMetrics;
