
import { 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  Shield, 
  ShieldAlert, 
  XCircle 
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function RecentVulnerabilities() {
  const vulnerabilities = [
    {
      id: "V-2023-0125",
      name: "Injection SQL dans le formulaire de contact",
      severity: "critical",
      status: "open",
      target: "app.example.com/contact",
      discoveredAt: "2023-04-14 08:23",
      cve: "CVE-2022-38745",
    },
    {
      id: "V-2023-0124",
      name: "Faille XSS dans la page d'administration",
      severity: "high",
      status: "in-progress",
      target: "admin.example.com/dashboard",
      discoveredAt: "2023-04-13 15:47",
      cve: "CVE-2023-22501",
    },
    {
      id: "V-2023-0123",
      name: "Version obsolète de bibliothèque (Log4j)",
      severity: "critical",
      status: "resolved",
      target: "api.example.com",
      discoveredAt: "2023-04-13 11:30",
      resolvedAt: "2023-04-13 16:45",
      cve: "CVE-2021-44228",
    },
    {
      id: "V-2023-0122",
      name: "Problème de configuration CORS",
      severity: "medium",
      status: "open",
      target: "api.example.com",
      discoveredAt: "2023-04-12 13:15",
    },
    {
      id: "V-2023-0121",
      name: "Certificat SSL expiré",
      severity: "high",
      status: "resolved",
      target: "legacy.example.com",
      discoveredAt: "2023-04-11 09:32",
      resolvedAt: "2023-04-11 14:20",
    },
  ];

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return (
          <Badge variant="outline" className="bg-cyber-alert/10 text-cyber-alert border-cyber-alert">
            <ShieldAlert className="h-3.5 w-3.5 mr-1" />
            Critique
          </Badge>
        );
      case "high":
        return (
          <Badge variant="outline" className="bg-cyber-warning/10 text-cyber-warning border-cyber-warning">
            <Shield className="h-3.5 w-3.5 mr-1" />
            Élevée
          </Badge>
        );
      case "medium":
        return (
          <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500">
            <Shield className="h-3.5 w-3.5 mr-1" />
            Moyenne
          </Badge>
        );
      case "low":
        return (
          <Badge variant="outline" className="bg-cyber-success/10 text-cyber-success border-cyber-success">
            <Shield className="h-3.5 w-3.5 mr-1" />
            Faible
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            <Shield className="h-3.5 w-3.5 mr-1" />
            {severity}
          </Badge>
        );
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return (
          <Badge variant="outline" className="border-cyber-alert text-cyber-alert">
            <XCircle className="h-3.5 w-3.5 mr-1" />
            Non résolu
          </Badge>
        );
      case "in-progress":
        return (
          <Badge variant="outline" className="border-cyber-warning text-cyber-warning">
            <Clock className="h-3.5 w-3.5 mr-1" />
            En cours
          </Badge>
        );
      case "resolved":
        return (
          <Badge variant="outline" className="border-cyber-success text-cyber-success">
            <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
            Résolu
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Vulnérabilités récentes</CardTitle>
        <Button variant="ghost" size="sm" className="gap-1">
          Voir toutes <ArrowUpRight className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Vulnérabilité</TableHead>
              <TableHead>Sévérité</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Cible</TableHead>
              <TableHead>Découvert</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vulnerabilities.map((vuln) => (
              <TableRow key={vuln.id}>
                <TableCell className="font-mono text-xs">{vuln.id}</TableCell>
                <TableCell>
                  <div className="font-medium">{vuln.name}</div>
                  {vuln.cve && (
                    <div className="text-xs text-muted-foreground">{vuln.cve}</div>
                  )}
                </TableCell>
                <TableCell>{getSeverityBadge(vuln.severity)}</TableCell>
                <TableCell>{getStatusBadge(vuln.status)}</TableCell>
                <TableCell className="font-mono text-xs">{vuln.target}</TableCell>
                <TableCell className="text-xs">
                  <div>{vuln.discoveredAt}</div>
                  {vuln.resolvedAt && (
                    <div className="text-cyber-success">
                      Résolu: {vuln.resolvedAt}
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
