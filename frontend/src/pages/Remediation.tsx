
import { Layout } from "@/components/layout/Layout";
import { useRemediation } from "@/hooks/useRemediation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Server, Globe, Lock, AlertTriangle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { ToolResults, ToolResult } from "@/components/tools/ToolResults";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

export default function Remediation() {
  const { applyRemediation, isApplying, history } = useRemediation();
  const [selectedMethod, setSelectedMethod] = useState("");
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("firewall");

  const remediationTools = [
    {
      id: "firewall",
      name: "Configuration de Pare-feu",
      icon: Shield,
      description: "Configure des règles de pare-feu adaptées aux menaces détectées",
      type: "firewall",
      options: ["Configuration basique", "Configuration avancée", "Mode DMZ"],
      detailedDescription: `
        <h3>Configuration de Pare-feu</h3>
        <p>Cet outil permet de configurer automatiquement les règles de pare-feu pour protéger votre infrastructure contre les menaces détectées.</p>
        <h4>Options disponibles:</h4>
        <ul>
          <li><strong>Configuration basique</strong>: Applique un ensemble de règles standard pour bloquer les menaces les plus courantes.</li>
          <li><strong>Configuration avancée</strong>: Paramétrage personnalisé avec détection d'intrusion et protection avancée.</li>
          <li><strong>Mode DMZ</strong>: Isole les serveurs exposés dans une zone démilitarisée pour limiter les risques.</li>
        </ul>
        <p>Utilisez cet outil après avoir détecté des tentatives d'intrusion ou comme mesure préventive.</p>
      `
    },
    {
      id: "iptables",
      name: "Règles IPtables",
      icon: Server,
      description: "Applique des règles IPtables pour renforcer la sécurité réseau",
      type: "iptables",
      options: ["Protection DoS", "Whitelist IP", "Règles restrictives"],
      detailedDescription: `
        <h3>Règles IPtables</h3>
        <p>Cet outil configure des règles IPtables avancées pour le filtrage du trafic réseau au niveau du noyau Linux.</p>
        <h4>Options disponibles:</h4>
        <ul>
          <li><strong>Protection DoS</strong>: Limite le nombre de connexions simultanées pour prévenir les attaques par déni de service.</li>
          <li><strong>Whitelist IP</strong>: N'autorise que les adresses IP spécifiées à accéder aux services sensibles.</li>
          <li><strong>Règles restrictives</strong>: Applique une politique de "tout refuser par défaut" avec des exceptions spécifiques.</li>
        </ul>
        <p>Idéal pour les serveurs Linux nécessitant une protection réseau avancée.</p>
      `
    },
    {
      id: "webapp",
      name: "Sécurité Web",
      icon: Globe,
      description: "Corrige les vulnérabilités web (XSS, CSRF, injections)",
      type: "webapp",
      options: ["Protection XSS", "Protection CSRF", "Validation entrées"],
      detailedDescription: `
        <h3>Sécurité Web</h3>
        <p>Cet outil corrige automatiquement les vulnérabilités courantes des applications web.</p>
        <h4>Options disponibles:</h4>
        <ul>
          <li><strong>Protection XSS</strong>: Ajoute des en-têtes de sécurité et encode les sorties pour prévenir les attaques Cross-Site Scripting.</li>
          <li><strong>Protection CSRF</strong>: Implémente des tokens anti-CSRF pour protéger contre les requêtes forgées.</li>
          <li><strong>Validation entrées</strong>: Ajoute des filtres de validation pour toutes les entrées utilisateur afin de prévenir les injections.</li>
        </ul>
        <p>Utilisez cet outil après avoir identifié des vulnérabilités dans vos applications web.</p>
      `
    },
    {
      id: "ssl",
      name: "Configuration SSL/TLS",
      icon: Lock,
      description: "Optimise la configuration SSL/TLS",
      type: "ssl",
      options: ["TLS 1.3", "Perfect Forward Secrecy", "HSTS"],
      detailedDescription: `
        <h3>Configuration SSL/TLS</h3>
        <p>Cet outil optimise la configuration de vos connexions chiffrées pour maximiser la sécurité.</p>
        <h4>Options disponibles:</h4>
        <ul>
          <li><strong>TLS 1.3</strong>: Configure le serveur pour n'utiliser que la version la plus récente et sécurisée de TLS.</li>
          <li><strong>Perfect Forward Secrecy</strong>: Implémente des suites de chiffrement qui garantissent que les données passées restent sécurisées même si la clé privée est compromise.</li>
          <li><strong>HSTS</strong>: Active HTTP Strict Transport Security pour forcer les connexions HTTPS.</li>
        </ul>
        <p>Recommandé pour tous les services exposés sur Internet nécessitant des communications sécurisées.</p>
      `
    },
    {
      id: "updates",
      name: "Mises à jour de sécurité",
      icon: AlertTriangle,
      description: "Applique les derniers correctifs de sécurité",
      type: "updates",
      options: ["OS", "Serveur Web", "Bibliothèques"],
      detailedDescription: `
        <h3>Mises à jour de sécurité</h3>
        <p>Cet outil automatise l'application des derniers correctifs de sécurité pour différents composants.</p>
        <h4>Options disponibles:</h4>
        <ul>
          <li><strong>OS</strong>: Met à jour le système d'exploitation avec les derniers correctifs de sécurité.</li>
          <li><strong>Serveur Web</strong>: Applique les mises à jour de sécurité pour Apache, Nginx ou autres serveurs web.</li>
          <li><strong>Bibliothèques</strong>: Met à jour les bibliothèques et dépendances utilisées par vos applications.</li>
        </ul>
        <p>À utiliser régulièrement dans le cadre d'une maintenance préventive.</p>
      `
    }
  ];

  // Transform the history data to match the ToolResult type
  const transformedHistory: ToolResult[] = history ? history.map(item => ({
    id: item.id,
    timestamp: item.timestamp,
    toolName: item.toolName,
    command: item.method || "Remédiation", // Use method as command or default to "Remédiation"
    target: item.target,
    findingType: item.targetType,
    severity: "info", // Default severity
    details: item.details,
    rawOutput: item.output // Map output to rawOutput
  })) : [];

  const handleRemediation = (type: string, method: string) => {
    if (method) {
      applyRemediation({
        vulnerabilityType: type,
        method: method,
        target: "system",
      });
      
      toast({
        title: "Remédiation appliquée",
        description: `La solution "${method}" a été appliquée avec succès.`,
      });
    }
  };

  return (
    <Layout>
      <div className="container w-full mx-auto p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Solutions de Remédiation</h1>
            <p className="text-muted-foreground mt-1">
              Appliquez des solutions automatisées pour corriger les vulnérabilités détectées
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-orange-500/10 text-orange-500">
              5 solutions disponibles
            </Badge>
            <Badge variant="outline" className="bg-green-500/10 text-green-500">
              {transformedHistory.length} remédiations appliquées
            </Badge>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-5 mb-6">
            {remediationTools.map(tool => (
              <TabsTrigger key={tool.id} value={tool.id} className="flex items-center gap-2">
                <tool.icon className="h-4 w-4" />
                <span className="hidden md:inline">{tool.name.split(' ')[0]}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          
          {remediationTools.map(tool => (
            <TabsContent key={tool.id} value={tool.id} className="pt-2">
              <Card className="border-t-4" style={{ borderTopColor: 'rgb(249, 115, 22)' }}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <tool.icon className="h-6 w-6 text-orange-500" />
                      <CardTitle className="text-xl">{tool.name}</CardTitle>
                    </div>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Info className="h-5 w-5 text-muted-foreground" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <div className="flex items-center gap-2">
                            <tool.icon className="h-5 w-5 text-orange-500" />
                            <DialogTitle>{tool.name}</DialogTitle>
                          </div>
                        </DialogHeader>
                        <div dangerouslySetInnerHTML={{ __html: tool.detailedDescription }} className="prose dark:prose-invert prose-sm max-w-none">
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Select value={selectedMethod} onValueChange={setSelectedMethod}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une méthode" />
                      </SelectTrigger>
                      <SelectContent>
                        {tool.options.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button 
                      className="w-full bg-orange-500 hover:bg-orange-600"
                      onClick={() => handleRemediation(tool.type, selectedMethod)}
                      disabled={isApplying || !selectedMethod}
                    >
                      {isApplying ? "Application en cours..." : "Appliquer la solution"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Historique des remédiations</CardTitle>
          </CardHeader>
          <CardContent>
            <ToolResults results={transformedHistory} />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
