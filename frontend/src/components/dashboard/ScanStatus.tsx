
import { Check, Clock, Play, RefreshCw, XCircle } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useScans } from "@/hooks/useScans";
import { useState } from "react";

type ScanStatusProps = {
  showActions?: boolean;
};

export function ScanStatus({ showActions = true }: ScanStatusProps) {
  // Simuler une progression pour les scans en cours
  const [progressValues, setProgressValues] = useState<Record<string, number>>({});
  
  // Utiliser notre hook de scans
  const { allScans, isLoadingAll, start, complete } = useScans();

  // Simuler la progression d'un scan en cours
  const simulateProgress = (scanId: string) => {
    const interval = setInterval(() => {
      setProgressValues(prev => {
        const currentValue = prev[scanId] || 0;
        const newValue = Math.min(currentValue + 5, 100);
        
        // Si on atteint 100%, simuler la fin du scan
        if (newValue === 100) {
          clearInterval(interval);
          complete({ 
            id: scanId, 
            findings: { 
              critical: Math.floor(Math.random() * 3), 
              high: Math.floor(Math.random() * 5), 
              medium: Math.floor(Math.random() * 8), 
              low: Math.floor(Math.random() * 10) 
            } 
          });
        }
        
        return { ...prev, [scanId]: newValue };
      });
    }, 1000);
    
    return () => clearInterval(interval);
  };

  // Démarrer un scan
  const handleStartScan = (scanId: string) => {
    start(scanId);
    // Initialiser la progression et commencer la simulation
    setProgressValues(prev => ({ ...prev, [scanId]: 0 }));
    simulateProgress(scanId);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="outline" className="bg-cyber-success/10 text-cyber-success border-cyber-success">Terminé</Badge>;
      case "scheduled":
        return <Badge variant="outline" className="bg-cyber-accent/10 text-cyber-accent border-cyber-accent">Planifié</Badge>;
      case "in_progress":
        return <Badge variant="outline" className="bg-cyber-warning/10 text-cyber-warning border-cyber-warning">En cours</Badge>;
      case "failed":
        return <Badge variant="outline" className="bg-cyber-alert/10 text-cyber-alert border-cyber-alert">Échoué</Badge>;
      default:
        return <Badge variant="outline">Inconnu</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <Check className="h-5 w-5 text-cyber-success" />;
      case "scheduled":
        return <Clock className="h-5 w-5 text-cyber-accent" />;
      case "in_progress":
        return <RefreshCw className="h-5 w-5 text-cyber-warning animate-spin" />;
      case "failed":
        return <XCircle className="h-5 w-5 text-cyber-alert" />;
      default:
        return null;
    }
  };

  // Données de démo si aucun scan n'est présent dans la base
  const scans = allScans.length > 0 ? allScans : [
    {
      id: "demo-1",
      name: "Scan automatique journalier",
      status: "completed" as const,
      target_url: "https://example.com",
      scan_type: "Full Scan",
      start_time: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Hier
      end_time: new Date(Date.now() - 23 * 60 * 60 * 1000).toISOString(), // 1h après
      findings_summary: { critical: 2, high: 5, medium: 8, low: 3 },
      created_at: new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "demo-2",
      name: "Scan de vulnérabilités Web",
      status: "scheduled" as const,
      target_url: "https://api.example.com",
      scan_type: "Targeted Scan",
      created_at: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "demo-3",
      name: "Scan d'infrastructure",
      status: "in_progress" as const,
      target_url: "https://network.example.com",
      scan_type: "Network Scan",
      start_time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2h avant
      created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Statut des scans</h2>
          <p className="text-sm text-muted-foreground">Suivez vos scans de sécurité récents et planifiés</p>
        </div>
        {showActions && (
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline">
              Historique
            </Button>
            <Button size="sm">
              <Play className="h-4 w-4 mr-2" />
              Nouveau scan
            </Button>
          </div>
        )}
      </div>

      <div className="grid gap-4">
        {scans.map((scan) => (
          <Card key={scan.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{scan.name}</CardTitle>
                  <CardDescription>{scan.scan_type}</CardDescription>
                </div>
                {getStatusBadge(scan.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scan.status === "in_progress" && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progression</span>
                      <span>{progressValues[scan.id] || 0}%</span>
                    </div>
                    <Progress value={progressValues[scan.id] || 0} className="h-2 bg-muted [&>div]:bg-cyber-accent" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Début: {new Date(scan.start_time || Date.now()).toLocaleString('fr-FR', {
                        hour: '2-digit',
                        minute: '2-digit',
                        day: '2-digit',
                        month: '2-digit',
                      })}</span>
                      <span>Fin estimée: {new Date(Date.now() + 7200000).toLocaleString('fr-FR', {
                        hour: '2-digit',
                        minute: '2-digit',
                        day: '2-digit',
                        month: '2-digit',
                      })}</span>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 text-sm">
                  {scan.status === "completed" && (
                    <>
                      <div>
                        <p className="text-muted-foreground">Dernier scan</p>
                        <p>{new Date(scan.end_time || Date.now()).toLocaleString('fr-FR', {
                          hour: '2-digit',
                          minute: '2-digit',
                          day: '2-digit',
                          month: '2-digit',
                        })}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Durée</p>
                        <p>{scan.start_time && scan.end_time ? 
                          `${Math.round((new Date(scan.end_time).getTime() - new Date(scan.start_time).getTime()) / 60000)} minutes` : 
                          "45 minutes"}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-muted-foreground">Résultats</p>
                        <p>
                          {scan.findings_summary ? 
                            `${scan.findings_summary.critical} critiques, ${scan.findings_summary.high} élevées, ${scan.findings_summary.medium} moyennes` : 
                            "2 critiques, 5 élevées, 8 moyennes"}
                        </p>
                      </div>
                    </>
                  )}

                  {scan.status === "scheduled" && (
                    <>
                      <div>
                        <p className="text-muted-foreground">Dernier scan</p>
                        <p>{new Date(scan.created_at).toLocaleString('fr-FR', {
                          hour: '2-digit',
                          minute: '2-digit',
                          day: '2-digit',
                          month: '2-digit',
                        })}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Prochain scan</p>
                        <p>{new Date(Date.now() + 86400000).toLocaleString('fr-FR', {
                          hour: '2-digit',
                          minute: '2-digit',
                          day: '2-digit',
                          month: '2-digit',
                        })}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-muted-foreground">Résultats précédents</p>
                        <p>0 critiques, 3 élevées, 5 moyennes</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
            {showActions && (
              <CardFooter className="border-t px-6 py-4">
                <div className="flex justify-end gap-2 w-full">
                  {scan.status === "in_progress" && (
                    <Button variant="outline" size="sm" className="text-cyber-alert">
                      Arrêter
                    </Button>
                  )}
                  {scan.status === "scheduled" && (
                    <>
                      <Button variant="outline" size="sm">
                        Modifier
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => handleStartScan(scan.id)}
                      >
                        Lancer maintenant
                      </Button>
                    </>
                  )}
                  {scan.status === "completed" && (
                    <>
                      <Button variant="outline" size="sm">
                        Rapport
                      </Button>
                      <Button size="sm">
                        Relancer
                      </Button>
                    </>
                  )}
                </div>
              </CardFooter>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
