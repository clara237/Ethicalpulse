import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { useVulnerabilities } from "@/hooks/useVulnerabilities";
import { Vulnerability } from "@/lib/api";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { RecentVulnerabilities } from "@/components/dashboard/RecentVulnerabilities";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Filter,
  RefreshCw,
  Search,
  Shield,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";

const Vulnerabilities = () => {
  const [activeTab, setActiveTab] = useState<"all" | "open" | "resolved">("all");
  const { vulnerabilities, isLoading, error, update } = useVulnerabilities();
  
  const filteredVulnerabilities = vulnerabilities.filter((vuln) => {
    if (activeTab === "open") return vuln.status === "open";
    if (activeTab === "resolved") return vuln.status === "resolved";
    return true;
  });

  const getTabButton = (tab: "all" | "open" | "resolved", label: string) => {
    const count = vulnerabilities.filter(v => 
      tab === "all" ? true : 
      tab === "open" ? v.status === "open" : 
      v.status === "resolved"
    ).length;

    return (
      <Button
        variant={activeTab === tab ? "default" : "outline"}
        className="gap-2"
        onClick={() => setActiveTab(tab)}
      >
        {label}
        <Badge variant={activeTab === tab ? "secondary" : "outline"}>
          {count}
        </Badge>
      </Button>
    );
  };

  const handleResolve = async (vulnerability: Vulnerability) => {
    await update({
      id: vulnerability.id,
      updates: {
        status: "resolved",
        resolved_at: new Date().toISOString(),
      },
    });
  };

  if (error) {
    return (
      <Layout>
        <div className="flex flex-col gap-6">
          <div className="p-4 border border-destructive rounded-lg">
            <p className="text-destructive">Une erreur est survenue lors du chargement des vulnérabilités.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Vulnérabilités</h1>
            <p className="text-muted-foreground">
              Identifiez et corrigez les failles de sécurité dans vos systèmes
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Actualiser
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
              <div className="flex gap-2">
                {getTabButton("all", "Toutes")}
                {getTabButton("open", "Non résolues")}
                {getTabButton("resolved", "Résolues")}
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Rechercher..."
                    className="w-full sm:w-[300px] pl-9"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex gap-2 flex-wrap">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sévérité" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes sévérités</SelectItem>
                      <SelectItem value="critical">Critique</SelectItem>
                      <SelectItem value="high">Élevée</SelectItem>
                      <SelectItem value="medium">Moyenne</SelectItem>
                      <SelectItem value="low">Faible</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous types</SelectItem>
                      <SelectItem value="injection">Injection</SelectItem>
                      <SelectItem value="xss">Cross-Site Scripting</SelectItem>
                      <SelectItem value="auth">Authentification</SelectItem>
                      <SelectItem value="config">Configuration</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select defaultValue="recent">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Trier par" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Plus récent</SelectItem>
                      <SelectItem value="severity">Sévérité (Décroissant)</SelectItem>
                      <SelectItem value="severity-asc">Sévérité (Croissant)</SelectItem>
                      <SelectItem value="status">Statut</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center">
                  <span className="text-sm text-muted-foreground mr-4">
                    Affichage 1-10 sur 29 résultats
                  </span>
                  <div className="flex gap-1">
                    <Button variant="outline" size="icon" disabled>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                {isLoading ? (
                  <div className="flex items-center justify-center p-8">
                    <span className="loading loading-spinner"></span>
                  </div>
                ) : (
                  filteredVulnerabilities.map((vulnerability) => (
                    <div 
                      key={vulnerability.id} 
                      className="rounded-lg border p-4 hover:bg-accent/50 transition-colors"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="md:col-span-2">
                          <div className="flex gap-2 items-start mb-1">
                            {vulnerability.severity === "critical" && <ShieldAlert className="h-5 w-5 text-cyber-alert flex-shrink-0" />}
                            {vulnerability.severity === "high" && <Shield className="h-5 w-5 text-cyber-warning flex-shrink-0" />}
                            {vulnerability.severity === "medium" && <Shield className="h-5 w-5 text-amber-500 flex-shrink-0" />}
                            {vulnerability.severity === "low" && <ShieldCheck className="h-5 w-5 text-cyber-success flex-shrink-0" />}
                            
                            <div>
                              <h3 className="font-medium">{vulnerability.name}</h3>
                              <p className="text-sm text-muted-foreground">{vulnerability.target_url}</p>
                            </div>
                          </div>
                          <div className="ml-7 text-xs text-muted-foreground">
                            ID: {vulnerability.id} {vulnerability.cve_id && `• ${vulnerability.cve_id}`}
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">Détecté</span>
                            <span className="text-sm">
                              {new Date(vulnerability.discovered_at).toLocaleString()}
                            </span>
                          </div>
                          {vulnerability.resolved_at && (
                            <div className="flex flex-col mt-1">
                              <span className="text-sm font-medium text-cyber-success">Résolu</span>
                              <span className="text-sm">
                                {new Date(vulnerability.resolved_at).toLocaleString()}
                              </span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="outline" size="sm">
                            Détails
                          </Button>
                          {vulnerability.status !== "resolved" ? (
                            <Button 
                              size="sm"
                              onClick={() => handleResolve(vulnerability)}
                            >
                              Corriger
                            </Button>
                          ) : (
                            <Button variant="ghost" size="sm" className="text-cyber-success">
                              <ShieldCheck className="h-4 w-4 mr-1" />
                              Résolu
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  Affichage 1-10 sur 29 résultats
                </div>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" disabled>
                    Précédent
                  </Button>
                  <Button variant="outline" size="sm">
                    Suivant
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Vulnérabilités par catégorie</CardTitle>
              <CardDescription>
                Distribution des types de vulnérabilités
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-cyber-accent"></div>
                    <span>Injection</span>
                  </div>
                  <span>8</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-cyber-warning"></div>
                    <span>XSS</span>
                  </div>
                  <span>6</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-cyber-alert"></div>
                    <span>Authentification</span>
                  </div>
                  <span>5</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                    <span>Configuration</span>
                  </div>
                  <span>7</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-indigo-500"></div>
                    <span>Autres</span>
                  </div>
                  <span>3</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Top vulnérabilités</CardTitle>
              <CardDescription>
                Les plus fréquentes dans vos systèmes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <Badge variant="outline" className="bg-cyber-alert/10 text-cyber-alert border-cyber-alert">
                    Critique
                  </Badge>
                  <div>
                    <p className="font-medium">Injection SQL</p>
                    <p className="text-sm text-muted-foreground">
                      Détectée dans 4 applications différentes
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Badge variant="outline" className="bg-cyber-warning/10 text-cyber-warning border-cyber-warning">
                    Élevée
                  </Badge>
                  <div>
                    <p className="font-medium">Cross-Site Scripting (XSS)</p>
                    <p className="text-sm text-muted-foreground">
                      Détectée dans 3 applications différentes
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Badge variant="outline" className="bg-cyber-warning/10 text-cyber-warning border-cyber-warning">
                    Élevée
                  </Badge>
                  <div>
                    <p className="font-medium">Faille d'authentification</p>
                    <p className="text-sm text-muted-foreground">
                      Détectée dans 2 applications différentes
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Tendances de remédiation</CardTitle>
              <CardDescription>
                Progression de la résolution des vulnérabilités
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Taux de remédiation</span>
                    <span>75%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full w-[75%] bg-cyber-success rounded-full"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Vulnérabilités critiques</span>
                    <span>60%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full w-[60%] bg-cyber-alert rounded-full"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Vulnérabilités élevées</span>
                    <span>40%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full w-[40%] bg-cyber-warning rounded-full"></div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Temps moyen de correction</span>
                    <span className="text-sm">2.5 jours</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Vulnerabilities;
