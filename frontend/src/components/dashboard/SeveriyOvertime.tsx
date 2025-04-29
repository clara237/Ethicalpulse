import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  {
    date: "Janv",
    critical: 4,
    high: 12,
    medium: 28,
    low: 40,
  },
  {
    date: "Févr",
    critical: 3,
    high: 18,
    medium: 25,
    low: 38,
  },
  {
    date: "Mars",
    critical: 6,
    high: 15,
    medium: 30,
    low: 35,
  },
  {
    date: "Avr",
    critical: 7,
    high: 14,
    medium: 32,
    low: 37,
  },
  {
    date: "Mai",
    critical: 5,
    high: 13,
    medium: 28,
    low: 42,
  },
  {
    date: "Juin",
    critical: 12,
    high: 19,
    medium: 24,
    low: 38,
  },
];

export function SeverityOverTime() {
  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader>
        <CardTitle>Sévérité des Vulnérabilités sur le Temps</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="date" stroke="hsl(var(--foreground))" />
              <YAxis stroke="hsl(var(--foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  borderColor: "hsl(var(--border))" 
                }} 
              />
              <Legend />
              <Line type="monotone" dataKey="critical" stroke="#c0392b" strokeWidth={2} />
              <Line type="monotone" dataKey="high" stroke="#e74c3c" strokeWidth={2} />
              <Line type="monotone" dataKey="medium" stroke="#f39c12" strokeWidth={2} />
              <Line type="monotone" dataKey="low" stroke="#3498db" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
