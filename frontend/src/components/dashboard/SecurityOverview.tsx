import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, AlertTriangle, CheckCircle, Clock } from "lucide-react";

export function SecurityOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Vulnérabilités Totales</CardTitle>
          <Shield className="h-4 w-4 text-security-info" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">245</div>
          <p className="text-xs text-muted-foreground">
            +3% par rapport au mois dernier
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Vulnérabilités Critiques</CardTitle>
          <AlertTriangle className="h-4 w-4 text-security-critical" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12</div>
          <p className="text-xs text-muted-foreground">
            -2% par rapport au mois dernier
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Résolues</CardTitle>
          <CheckCircle className="h-4 w-4 text-security-success" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">178</div>
          <p className="text-xs text-muted-foreground">
            +12% par rapport au mois dernier
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">En Attente</CardTitle>
          <Clock className="h-4 w-4 text-security-warning" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">67</div>
          <p className="text-xs text-muted-foreground">
            -5% par rapport au mois dernier
          </p>
        </CardContent>
      </Card>
    </div>
  );
}