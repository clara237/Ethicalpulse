
import { Layout } from "@/components/layout/Layout";
import { ScanStatus } from "@/components/dashboard/ScanStatus";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AlertTriangle, 
  Calendar, 
  Play, 
  PlusCircle, 
  Settings 
} from "lucide-react";

const Scans = () => {
  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Scans de sécurité</h1>
            <p className="text-muted-foreground">Gérez et planifiez vos scans de sécurité</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Planifier
            </Button>
            <Button>
              <Play className="h-4 w-4 mr-2" />
              Nouveau scan
            </Button>
          </div>
        </div>

        <Tabs defaultValue="active">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="active">Actifs</TabsTrigger>
            <TabsTrigger value="scheduled">Planifiés</TabsTrigger>
            <TabsTrigger value="completed">Terminés</TabsTrigger>
            <TabsTrigger value="templates">Modèles</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="space-y-6">
            <ScanStatus showActions={true} />
          </TabsContent>
          
          <TabsContent value="scheduled" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Scans planifiés</CardTitle>
                <CardDescription>
                  Visualisez et gérez vos scans automatiques programmés
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-medium">Scan complet hebdomadaire</h3>
                        <p className="text-sm text-muted-foreground">Tous les lundis à 01:00</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4 mr-1" />
                          Modifier
                        </Button>
                        <Button size="sm">
                          <Play className="h-4 w-4 mr-1" />
                          Lancer
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Type</p>
                        <p>Scan complet</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Cibles</p>
                        <p>Toutes les applications</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Prochain scan</p>
                        <p>Lundi 19 avril, 01:00</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-medium">Scan API journalier</h3>
                        <p className="text-sm text-muted-foreground">Tous les jours à 03:30</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4 mr-1" />
                          Modifier
                        </Button>
                        <Button size="sm">
                          <Play className="h-4 w-4 mr-1" />
                          Lancer
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Type</p>
                        <p>Scan ciblé</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Cibles</p>
                        <p>API Gateway, Auth Service</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Prochain scan</p>
                        <p>Demain, 03:30</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="border-dashed">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Ajouter une planification
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Scans terminés</CardTitle>
                <CardDescription>
                  Historique des scans de sécurité précédents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="rounded-lg border p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-medium">
                            {i % 2 === 0 ? "Scan complet" : "Scan ciblé"}
                            {i === 0 && " (problèmes détectés)"}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {i === 0 ? "Aujourd'hui" : i === 1 ? "Hier" : `Il y a ${i + 1} jours`}, {Math.floor(Math.random() * 24)}:
                            {Math.floor(Math.random() * 60).toString().padStart(2, '0')}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Rapport
                          </Button>
                          <Button size="sm">
                            <Play className="h-4 w-4 mr-1" />
                            Relancer
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Durée</p>
                          <p>{Math.floor(Math.random() * 60) + 10} minutes</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Vulnérabilités</p>
                          <div className="flex items-center gap-2">
                            {i === 0 && (
                              <>
                                <AlertTriangle className="h-4 w-4 text-cyber-alert" />
                                <span>2 critiques, 5 élevées</span>
                              </>
                            )}
                            {i === 1 && <span>3 élevées, 7 moyennes</span>}
                            {i > 1 && <span>{Math.floor(Math.random() * 10)} moyennes/faibles</span>}
                          </div>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Cibles</p>
                          <p>
                            {i % 3 === 0 
                              ? "Toutes les applications" 
                              : i % 3 === 1 
                                ? "API Gateway, Auth Service" 
                                : "Frontend, Database"
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="templates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Modèles de scan</CardTitle>
                <CardDescription>
                  Configurez des modèles réutilisables pour vos scans réguliers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-medium">Scan complet</h3>
                        <p className="text-sm text-muted-foreground">
                          Analyse complète incluant toutes les méthodes de test
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4 mr-1" />
                          Modifier
                        </Button>
                        <Button size="sm">
                          <Play className="h-4 w-4 mr-1" />
                          Utiliser
                        </Button>
                      </div>
                    </div>
                    <div className="text-sm">
                      <div className="mb-2">
                        <p className="text-muted-foreground">Outils inclus</p>
                        <p>OWASP ZAP, Nmap, SQLMap, Nuclei, SSL Scanner</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Durée estimée</p>
                        <p>45-60 minutes par application</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-medium">Scan API rapide</h3>
                        <p className="text-sm text-muted-foreground">
                          Scan léger pour les API et services REST
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4 mr-1" />
                          Modifier
                        </Button>
                        <Button size="sm">
                          <Play className="h-4 w-4 mr-1" />
                          Utiliser
                        </Button>
                      </div>
                    </div>
                    <div className="text-sm">
                      <div className="mb-2">
                        <p className="text-muted-foreground">Outils inclus</p>
                        <p>API Security Scanner, JWT Analyzer, CORS Tester</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Durée estimée</p>
                        <p>15-20 minutes par API</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-medium">Scan d'infrastructure</h3>
                        <p className="text-sm text-muted-foreground">
                          Analyse des serveurs et de l'infrastructure réseau
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4 mr-1" />
                          Modifier
                        </Button>
                        <Button size="sm">
                          <Play className="h-4 w-4 mr-1" />
                          Utiliser
                        </Button>
                      </div>
                    </div>
                    <div className="text-sm">
                      <div className="mb-2">
                        <p className="text-muted-foreground">Outils inclus</p>
                        <p>Nmap, OpenVAS, ServerScan, SSLyze</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Durée estimée</p>
                        <p>30-40 minutes par segment réseau</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="border-dashed">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Créer un nouveau modèle
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Scans;
