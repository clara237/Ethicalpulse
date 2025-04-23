
import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { CommandPrompt } from "@/components/tools/CommandPrompt";
import { ToolSelector, SecurityTool } from "@/components/tools/ToolSelector";
import { ToolResults, ToolResult } from "@/components/tools/ToolResults";
import { ProjectSelector, Project } from "@/components/project/ProjectSelector";
import { useToast } from "@/hooks/use-toast";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, Globe, Server, Shield, Lock, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Tools = () => {
  const [selectedTool, setSelectedTool] = useState<SecurityTool | null>(null);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [results, setResults] = useState<ToolResult[]>([]);
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("detection");
  const { state } = useSidebar();

  const handleSelectTool = (tool: SecurityTool) => {
    setSelectedTool(tool);
    toast({
      title: "Outil sélectionné",
      description: `L'outil "${tool.name}" a été sélectionné.`,
    });
  };

  const handleProjectChange = (project: Project) => {
    setCurrentProject(project);
    toast({
      title: "Projet sélectionné",
      description: `Le projet "${project.name}" a été sélectionné.`,
    });
  };

  const handleCommandExecuted = (command: string, output: string) => {
    const newResult: ToolResult = {
      id: `result-${Date.now()}`,
      timestamp: new Date().toISOString(),
      toolName: selectedTool?.name || "Unknown",
      command: command,
      details: "Résultat de l'exécution de la commande",
      rawOutput: output,
      target: currentProject?.targetDomain || command.split(' ')[1],
      severity: Math.random() > 0.5 ? 'high' : 'medium',
      findingType: selectedTool?.id === 'nmap' 
        ? 'Port Ouvert' 
        : selectedTool?.id === 'sqlmap' 
          ? 'Injection SQL' 
          : 'Vulnérabilité',
    };
    
    setResults(prev => [newResult, ...prev]);
  };

  const handleExportResult = (result: ToolResult) => {
    toast({
      title: "Export réussi",
      description: `Le résultat de ${result.toolName} a été exporté.`,
    });
  };

  const handleRemediationSubmit = (vulnType: string, method: string) => {
    const output = generateRemediationOutput(vulnType, method);
    toast({
      title: "Remédiation appliquée",
      description: `${method} a été appliqué pour résoudre ${vulnType}`,
    });
    
    const newResult: ToolResult = {
      id: `remediation-${Date.now()}`,
      timestamp: new Date().toISOString(),
      toolName: "Remédiation",
      command: `${method} pour ${vulnType}`,
      details: "Résultat de la remédiation",
      rawOutput: output,
      target: currentProject?.targetDomain || "",
      severity: "info", // Changed from "resolved" to "info" to match the valid severity types
      findingType: "Remédiation",
    };
    
    setResults(prev => [newResult, ...prev]);
  };
  
  const generateRemediationOutput = (vulnType: string, method: string) => {
    const outputs = {
      "firewall": "Configuration du pare-feu terminée avec succès.\n\n- Règles configurées pour filtrer le trafic malveillant\n- Ports non nécessaires fermés\n- Journalisation des tentatives bloquées activée",
      "iptables": "Configuration iptables terminée avec succès.\n\n```\n# Règles ajoutées:\niptables -A INPUT -p tcp --dport 22 -m state --state NEW -m recent --set\niptables -A INPUT -p tcp --dport 22 -m state --state NEW -m recent --update --seconds 60 --hitcount 4 -j DROP\n```",
      "webapp": "Correctifs des vulnérabilités d'application web appliqués.\n\n- Validation des entrées renforcée\n- Protection XSS mise en place\n- Tokens CSRF implémentés\n- Headers de sécurité configurés",
      "ssl": "Configuration SSL/TLS mise à jour avec succès.\n\n- TLS 1.3 activé\n- Ciphers faibles désactivés\n- Perfect Forward Secrecy activé\n- HSTS configuré",
      "updates": "Mises à jour de sécurité appliquées.\n\n- Système d'exploitation: ✅\n- Services web: ✅\n- Bibliothèques: ✅\n- Applications: ✅",
      "backup": "Sauvegarde sécurisée créée avec succès.\n\n- Données chiffrées avec AES-256\n- Stockées dans 3 emplacements distincts\n- Vérification d'intégrité effectuée",
      "malware": "Analyse anti-malware terminée.\n\n- 3 fichiers suspects identifiés\n- 2 menaces neutralisées\n- 1 fichier mis en quarantaine\n- Rapport complet généré",
      "permissions": "Permissions des fichiers et utilisateurs corrigées.\n\n- Principe du moindre privilège appliqué\n- Accès sensibles restreints\n- Autorisations root limitées",
      "monitoring": "Système de surveillance configuré.\n\n- Alertes email configurées\n- Seuils d'alertes définis\n- Journalisation centralisée activée",
      "hardening": "Renforcement système appliqué.\n\n- Services non essentiels désactivés\n- Configuration des mots de passe renforcée\n- Modules de sécurité noyau activés"
    };
    
    return outputs[vulnType] || "Remédiation appliquée avec succès.";
  };

  const remediationTools = [
    {
      name: "Configuration de Pare-feu",
      icon: Shield,
      description: "Configure des règles de pare-feu adaptées pour bloquer les menaces",
      options: ["Configuration simple", "Configuration avancée", "Mode DMZ"],
      type: "firewall"
    },
    {
      name: "Règles IPtables",
      icon: Server,
      description: "Configure des règles IPtables pour filtrer le trafic réseau",
      options: ["Règles basiques", "Protection anti-DoS", "Whitelist IP"],
      type: "iptables"
    },
    {
      name: "Correctifs Web",
      icon: Globe,
      description: "Applique des correctifs pour vulnérabilités web courantes (XSS, CSRF, Injection)",
      options: ["Patch XSS", "Patch Injection SQL", "Patch CSRF"],
      type: "webapp"
    },
    {
      name: "Sécurisation SSL/TLS",
      icon: Lock,
      description: "Configure correctement les paramètres SSL/TLS",
      options: ["TLS 1.3", "Cipher Suite sécurisée", "Configuration HSTS"],
      type: "ssl"
    },
    {
      name: "Mises à jour sécurité",
      icon: AlertTriangle,
      description: "Applique les derniers correctifs de sécurité",
      options: ["OS", "Serveur Web", "Bibliothèques"],
      type: "updates"
    },
    {
      name: "Sauvegarde sécurisée",
      icon: Server,
      description: "Configure un système de sauvegarde chiffré et régulier",
      options: ["Sauvegarde quotidienne", "Sauvegarde incrémentale", "Sauvegarde hors-site"],
      type: "backup"
    },
    {
      name: "Scan anti-malware",
      icon: Shield,
      description: "Détecte et supprime les malwares et backdoors",
      options: ["Scan rapide", "Scan approfondi", "Scan mémoire"],
      type: "malware"
    },
    {
      name: "Ajustement permissions",
      icon: Lock,
      description: "Corrige les permissions des fichiers et utilisateurs",
      options: ["Unix chmod", "Windows ACL", "Audit complet"],
      type: "permissions"
    },
    {
      name: "Système de surveillance",
      icon: AlertTriangle,
      description: "Configure des alertes et surveillance pour détecter les intrusions",
      options: ["Alerte email", "Journalisation", "Surveillance temps réel"],
      type: "monitoring"
    },
    {
      name: "Renforcement système",
      icon: Shield,
      description: "Durcit la configuration système pour minimiser les vulnérabilités",
      options: ["Basique", "Intermédiaire", "Conforme NIST"],
      type: "hardening"
    }
  ];

  const RemediationTool = ({ tool }) => {
    const [selectedOption, setSelectedOption] = useState(tool.options[0]);
    
    return (
      <Card className="hover:border-cyber-accent transition-colors">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <tool.icon className="h-5 w-5 text-orange-500" />
            <CardTitle className="text-lg">{tool.name}</CardTitle>
          </div>
          <CardDescription>{tool.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <Select 
                value={selectedOption} 
                onValueChange={setSelectedOption}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionner une méthode" />
                </SelectTrigger>
                <SelectContent>
                  {tool.options.map(option => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button 
                className="bg-orange-500 hover:bg-orange-600"
                onClick={() => handleRemediationSubmit(tool.type, selectedOption)}
              >
                Appliquer
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <Layout>
      <div className={cn("flex flex-col gap-6", state === "collapsed" && "md:ml-0")}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Outils de Sécurité</h1>
            <p className="text-muted-foreground">
              Outils complets pour analyser et détecter les vulnérabilités
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher..."
                className="pl-8"
              />
            </div>
            <ProjectSelector onProjectChange={handleProjectChange} />
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="detection">Détection</TabsTrigger>
            <TabsTrigger value="remediation">Remédiation</TabsTrigger>
          </TabsList>
          
          <TabsContent value="detection">
            {selectedTool ? (
              <div className="grid grid-cols-1 gap-6">
                {currentProject && (
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Informations sur la cible</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Domaine:</span>
                          <span className="text-sm">{currentProject.targetDomain || "Non spécifié"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Server className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">IP:</span>
                          <span className="text-sm">{currentProject.targetIP || "Non spécifiée"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">Type:</span>
                          <Badge variant="outline">{currentProject.targetType || "Non spécifié"}</Badge>
                        </div>
                        {currentProject.technologies && currentProject.technologies.length > 0 && (
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-medium">Technologies:</span>
                            {currentProject.technologies.map((tech, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                <Card>
                  <CardHeader className="flex flex-row items-start justify-between space-y-0">
                    <div>
                      <div className="flex items-center gap-2">
                        <selectedTool.icon className="h-5 w-5 text-orange-500" />
                        <CardTitle>{selectedTool.name}</CardTitle>
                      </div>
                      <CardDescription>{selectedTool.description}</CardDescription>
                    </div>
                    <button 
                      className="text-sm text-orange-500 hover:underline"
                      onClick={() => setSelectedTool(null)}
                    >
                      Retour aux outils
                    </button>
                  </CardHeader>
                  <CardContent>
                    <CommandPrompt 
                      tool={selectedTool.id} 
                      onCommandExecuted={handleCommandExecuted}
                      targetDomain={currentProject?.targetDomain}
                      targetIP={currentProject?.targetIP}
                    />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Résultats</CardTitle>
                    <CardDescription>
                      Résultats des dernières commandes exécutées
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ToolResults 
                      results={results}
                      onExport={handleExportResult}
                    />
                  </CardContent>
                </Card>
              </div>
            ) : (
              <ToolSelector onSelectTool={handleSelectTool} />
            )}
          </TabsContent>
          
          <TabsContent value="remediation">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {remediationTools.map((tool, index) => (
                <RemediationTool key={index} tool={tool} />
              ))}
            </div>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Historique des remédiations</CardTitle>
                <CardDescription>
                  Résultats des dernières remédiations appliquées
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ToolResults 
                  results={results.filter(r => r.toolName === "Remédiation")}
                  onExport={handleExportResult}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Tools;
