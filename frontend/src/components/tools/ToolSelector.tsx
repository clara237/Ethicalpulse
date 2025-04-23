
import { useState } from "react";
import { 
  Globe, 
  Shield, 
  Search, 
  Bug, 
  Database, 
  Lock, 
  Wifi, 
  Server, 
  Zap, 
  FileSearch, 
  Key,
  ShieldAlert, 
  Code
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export type SecurityTool = {
  id: string;
  name: string;
  category: 'scanner' | 'pentest' | 'analyze' | 'remediation' | 'custom';
  description: string;
  icon: React.ElementType;
  tags?: string[];
  details?: string;
};

const SECURITY_TOOLS: SecurityTool[] = [
  {
    id: "owaspzap",
    name: "OWASP ZAP",
    category: "scanner",
    description: "Scanner de vulnérabilités web automatisé",
    icon: Globe,
    tags: ["Web", "APIs", "OWASP"],
    details: "Analysez les applications web à la recherche des vulnérabilités de sécurité OWASP Top 10 et plus."
  },
  {
    id: "nmap",
    name: "Nmap",
    category: "scanner",
    description: "Scanner réseau et découverte d'hôtes",
    icon: Search,
    tags: ["Réseau", "Infrastructure"],
    details: "Découvrez les hôtes, services et vulnérabilités sur votre réseau."
  },
  {
    id: "sqlmap",
    name: "SQLMap",
    category: "scanner",
    description: "Détection d'injections SQL automatisée",
    icon: Database,
    tags: ["Bases de données", "Injection"],
    details: "Testez les vulnérabilités d'injection SQL dans vos applications web."
  },
  {
    id: "nuclei",
    name: "Nuclei",
    category: "scanner",
    description: "Scanner de vulnérabilités basé sur des modèles",
    icon: Shield,
    tags: ["Web", "Infrastructure", "Automatisé"],
    details: "Utilisez des modèles pour détecter rapidement des vulnérabilités connues."
  },
  {
    id: "sslanalyzer",
    name: "SSL Analyzer",
    category: "analyze",
    description: "Audit de configuration SSL/TLS",
    icon: Lock,
    tags: ["Cryptographie", "Certificats"],
    details: "Vérifiez la sécurité de vos configurations SSL et TLS."
  },
  {
    id: "apiscanner",
    name: "API Scanner",
    category: "scanner",
    description: "Analyse des services API et REST",
    icon: Code,
    tags: ["API", "REST", "GraphQL"],
    details: "Testez les vulnérabilités spécifiques aux interfaces API."
  },
  {
    id: "burpsuite",
    name: "Burp Suite",
    category: "pentest",
    description: "Plateforme de test d'intrusion d'applications web",
    icon: Bug,
    tags: ["Web", "Proxy", "Pentest"],
    details: "Plateforme complète pour le test de sécurité des applications web."
  },
  {
    id: "metasploit",
    name: "Metasploit",
    category: "pentest",
    description: "Framework d'exploitation pour tests d'intrusion",
    icon: Bug,
    tags: ["Exploit", "Pentest", "Framework"],
    details: "Framework d'exploitation pour développer et exécuter des exploits contre des machines cibles."
  },
  {
    id: "wireshark",
    name: "Wireshark",
    category: "analyze",
    description: "Analyseur de protocole réseau",
    icon: Wifi,
    tags: ["Réseau", "Analyse", "Trafic"],
    details: "Capturez et examinez le trafic réseau pour détecter des anomalies ou menaces."
  },
  {
    id: "nikto",
    name: "Nikto",
    category: "scanner",
    description: "Scanner de serveur web pour problèmes de sécurité",
    icon: Server,
    tags: ["Web", "Serveur", "Vulnérabilités"],
    details: "Scannez vos serveurs web pour détecter les vulnérabilités et mauvaises configurations."
  },
  {
    id: "maltego",
    name: "Maltego",
    category: "analyze",
    description: "Outil d'analyse et de visualisation de données",
    icon: FileSearch,
    tags: ["OSINT", "Reconnaissance", "Visualisation"],
    details: "Collectez et visualisez des informations pour la reconnaissance et l'analyse."
  },
  {
    id: "aircrack",
    name: "Aircrack-ng",
    category: "pentest",
    description: "Suite d'outils pour audit de sécurité WiFi",
    icon: Wifi,
    tags: ["WiFi", "WEP", "WPA"],
    details: "Testez la sécurité de vos réseaux sans fil contre diverses attaques."
  }
];

interface ToolSelectorProps {
  onSelectTool: (tool: SecurityTool) => void;
}

export function ToolSelector({ onSelectTool }: ToolSelectorProps) {
  const [activeCategory, setActiveCategory] = useState<string>("scanner");

  const filterTools = (category: string) => {
    return SECURITY_TOOLS.filter(tool => tool.category === category);
  };

  const renderToolCard = (tool: SecurityTool) => (
    <div 
      key={tool.id}
      className="bg-card text-card-foreground p-6 rounded-lg border hover:border-primary transition-colors"
      onClick={() => onSelectTool(tool)}
    >
      <div className="flex items-start mb-4">
        <div className="mr-4 bg-primary/10 p-3 rounded-full">
          <tool.icon className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-semibold">{tool.name}</h3>
          <p className="text-muted-foreground text-sm">{tool.description}</p>
        </div>
      </div>
      
      {tool.tags && (
        <div className="flex flex-wrap gap-1 mb-4">
          {tool.tags.map(tag => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      )}
      
      <p className="text-sm text-muted-foreground">{tool.details}</p>
      
      <div className="mt-4 flex justify-end gap-2">
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <svg className="h-4 w-4" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v14m-7-7h14"></path>
          </svg>
          Options
        </Button>
        <Button size="sm" className="flex items-center gap-1">
          <svg className="h-4 w-4" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7-7v14"></path>
          </svg>
          Lancer
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <Tabs defaultValue={activeCategory} value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="w-full grid grid-cols-5 mb-6">
          <TabsTrigger value="scanner">Scanner</TabsTrigger>
          <TabsTrigger value="pentest">Pentest</TabsTrigger>
          <TabsTrigger value="analyze">Analyse</TabsTrigger>
          <TabsTrigger value="remediation">Remédiation</TabsTrigger>
          <TabsTrigger value="custom">Personnalisé</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeCategory} className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterTools(activeCategory).map(renderToolCard)}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
