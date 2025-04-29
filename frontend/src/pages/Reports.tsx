import { Layout } from "@/components/layout/Layout"; // Importez votre Layout
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FileText, Download, Filter, BarChart2, Calendar, Share2, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sidebar } from "@/components/layout/Sidebar"; // Importez votre Sidebar
import { Navbar } from "@/components/layout/Navbar"; // Importez votre Navbar

interface Report {
  id: string;
  title: string;
  date: string;
  type: string;
  format: string;
  creator: string;
  size: string;
}
const reports: Report[] = [
  {
    id: "REP-001",
    title: "Rapport de Vulnérabilité Q4-2023",
    date: "15 Déc 2023",
    type: "Vulnérabilités",
    format: "PDF",
    creator: "Système",
    size: "2.4 MB",
  },
  {
    id: "REP-002",
    title: "Analyse des Tendances de Sécurité",
    date: "10 Déc 2023",
    type: "Analytique",
    format: "XLSX",
    creator: "Admin",
    size: "1.8 MB",
  },
  {
    id: "REP-003",
    title: "Rapport de Conformité ISO 27001",
    date: "05 Déc 2023",
    type: "Conformité",
    format: "PDF",
    creator: "Sophie L.",
    size: "4.2 MB",
  },
  {
    id: "REP-004",
    title: "Résumé des Activités de Scan",
    date: "01 Déc 2023",
    type: "Scans",
    format: "PDF",
    creator: "Système",
    size: "1.5 MB",
  },
  {
    id: "REP-005",
    title: "Audit de Sécurité du Réseau",
    date: "28 Nov 2023",
    type: "Audit",
    format: "PDF",
    creator: "Thomas D.",
    size: "3.7 MB",
  },
  {
    id: "REP-006",
    title: "Statistiques de Remédiation",
    date: "22 Nov 2023",
    type: "Remédiation",
    format: "XLSX",
    creator: "Système",
    size: "0.9 MB",
  },
];

const templates = [
  {
    id: "template-1",
    title: "Rapport Exécutif",
    description: "Résumé pour la direction avec métriques clés de sécurité.",
    tags: ["Exécutif", "Résumé"],
  },
  {
    id: "template-2",
    title: "Rapport Technique Détaillé",
    description: "Rapport technique complet avec toutes les vulnérabilités et détails.",
    tags: ["Technique", "Détaillé"],
  },
  {
    id: "template-3",
    title: "Rapport de Conformité",
    description: "Analyse de conformité avec les normes et réglementations.",
    tags: ["Conformité", "Audit"],
  },
  {
    id: "template-4",
    title: "Tableau de Bord des Tendances",
    description: "Visualisation des tendances de sécurité sur une période donnée.",
    tags: ["Tendances", "Graphiques"],
  },
];

export default function Reports() {
  const getFormatIcon = (format: string) => {
    switch (format.toLowerCase()) {
      case "pdf":
        return <FileText className="h-4 w-4 text-security-high" />;
      case "xlsx":
        return <BarChart2 className="h-4 w-4 text-security-low" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };
  return (
    <Layout>
      <Navbar /> {/* Ajoutez la Navbar ici */}
      <div className="flex">
        <Sidebar /> {/* Ajoutez la Sidebar ici */}
        
        {/* Contenu principal */}
        <div className="flex-1 p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Rapports</h1>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Planifier
              </Button>
              <Button>
                <FileText className="mr-2 h-4 w-4" />
                Nouveau rapport
              </Button>
            </div>
          </div>

          <Tabs defaultValue="reports">
            <TabsList>
              <TabsTrigger value="reports">Rapports générés</TabsTrigger>
              <TabsTrigger value="templates">Modèles</TabsTrigger>
              <TabsTrigger value="scheduled">Rapports planifiés</TabsTrigger>
            </TabsList>
            
            <TabsContent value="reports" className="mt-6">
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle>Rapports disponibles</CardTitle>
                      <CardDescription>
                        Consultez et téléchargez vos rapports de sécurité.
                      </CardDescription>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Select defaultValue="all">
                        <SelectTrigger className="w-full sm:w-[180px]">
                          <Filter className="mr-2 h-4 w-4" />
                          <SelectValue placeholder="Type de rapport" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tous les types</SelectItem>
                          <SelectItem value="vulnerabilities">Vulnérabilités</SelectItem>
                          <SelectItem value="compliance">Conformité</SelectItem>
                          <SelectItem value="audit">Audit</SelectItem>
                          <SelectItem value="analytics">Analytique</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select defaultValue="recent">
                        <SelectTrigger className="w-full sm:w-[180px]">
                          <SelectValue placeholder="Période" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="recent">Récents d'abord</SelectItem>
                          <SelectItem value="oldest">Anciens d'abord</SelectItem>
                          <SelectItem value="thisMonth">Ce mois</SelectItem>
                          <SelectItem value="lastMonth">Mois dernier</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {reports.map((report) => (
                      <div key={report.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-start space-x-4 mb-4 sm:mb-0">
                          <div className="bg-muted rounded-lg p-2 h-10 w-10 flex items-center justify-center">
                            {getFormatIcon(report.format)}
                          </div>
                          <div>
                            <h3 className="font-medium">{report.title}</h3>
                            <div className="flex flex-wrap items-center text-sm text-muted-foreground gap-2 mt-1">
                              <span>{report.date}</span>
                              <span>•</span>
                              <Badge variant="outline">{report.type}</Badge>
                              <span>•</span>
                              <span>{report.size}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Share2 className="h-4 w-4 mr-1" /> Partager
                          </Button>
                          <Button variant="outline" size="sm">
                            <Printer className="h-4 w-4 mr-1" /> Imprimer
                          </Button>
                          <Button size="sm">
                            <Download className="h-4 w-4 mr-1" /> Télécharger
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="templates" className="mt-6">
              <div className="grid gap-4 md:grid-cols-2">
                {templates.map((template) => (
                  <Card key={template.id} className="flex flex-col h-full">
                    <CardHeader>
                      <CardTitle>{template.title}</CardTitle>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {template.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground">{template.description}</p>
                    </CardContent>
                    <CardContent className="pt-0">
                      <Button className="w-full">
                        <FileText className="mr-2 h-4 w-4" /> Générer rapport
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="scheduled" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Rapports Planifiés</CardTitle>
                  <CardDescription>
                    Gérez vos rapports automatisés et récurrents.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center items-center py-12 text-muted-foreground">
                    <div className="text-center">
                      <h3 className="text-xl font-medium mb-2">Aucun rapport planifié</h3>
                      <p className="mb-4">Vous n'avez pas encore configuré de rapports récurrents.</p>
                      <Button>
                        <Calendar className="mr-2 h-4 w-4" /> Planifier un rapport
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}