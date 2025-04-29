import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { name: "Injection SQL", value: 32 },
  { name: "XSS", value: 28 },
  { name: "Config. Incorrecte", value: 45 },
  { name: "Auth. Faible", value: 19 },
  { name: "Exposition de Données", value: 25 },
];

const COLORS = ["#3498db", "#00bcd4", "#1eaedb", "#2ecc71", "#8884d8"];

export function VulnerabilitiesByType() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Vulnérabilités par Type</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
