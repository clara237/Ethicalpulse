
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, AlertTriangle, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function History() {
  const historyItems = [
    {
      type: "Remédiation",
      description: "Configuration du pare-feu mise à jour",
      date: "2025-04-18",
      status: "success",
      icon: Shield
    },
    {
      type: "Alerte",
      description: "Tentative d'intrusion détectée",
      date: "2025-04-17",
      status: "warning",
      icon: AlertTriangle
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Historique des Activités</h1>
        
        <div className="space-y-4">
          {historyItems.map((item, index) => (
            <Card key={index}>
              <CardContent className="flex items-center gap-4 py-4">
                <item.icon className={`h-8 w-8 ${
                  item.status === "success" ? "text-green-500" : 
                  item.status === "warning" ? "text-orange-500" : 
                  "text-blue-500"
                }`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{item.type}</h3>
                    <Badge variant={
                      item.status === "success" ? "default" : 
                      item.status === "warning" ? "destructive" : 
                      "secondary"
                    }>
                      {item.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <span className="text-sm text-muted-foreground">{item.date}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
