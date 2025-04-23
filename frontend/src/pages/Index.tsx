
import { Layout } from "@/components/layout/Layout";
import { VulnerabilityOverview } from "@/components/dashboard/VulnerabilityOverview";
import { ScanStatus } from "@/components/dashboard/ScanStatus";
import { RecentVulnerabilities } from "@/components/dashboard/RecentVulnerabilities";

const Index = () => {
  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Tableau de bord</h1>
          <p className="text-muted-foreground">Vue d'ensemble de la sécurité de vos systèmes</p>
        </div>

        <VulnerabilityOverview />
        
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <ScanStatus />
          </div>
          <div className="lg:col-span-2">
            <div className="bg-card rounded-lg border shadow-sm">
              <div className="flex flex-col gap-2 p-6">
                <h3 className="text-lg font-semibold">Activités récentes</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-cyber-alert mt-1.5"></div>
                    <div>
                      <p className="text-sm font-medium">Vulnérabilité critique détectée</p>
                      <p className="text-xs text-muted-foreground">Injection SQL sur api.example.com</p>
                      <p className="text-xs text-muted-foreground">Il y a 2 heures</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-cyber-success mt-1.5"></div>
                    <div>
                      <p className="text-sm font-medium">Scan automatique terminé</p>
                      <p className="text-xs text-muted-foreground">15 vulnérabilités détectées</p>
                      <p className="text-xs text-muted-foreground">Aujourd'hui, 04:30</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-cyber-warning mt-1.5"></div>
                    <div>
                      <p className="text-sm font-medium">Patch appliqué</p>
                      <p className="text-xs text-muted-foreground">Correction de 3 vulnérabilités</p>
                      <p className="text-xs text-muted-foreground">Hier, 18:45</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-cyber-accent mt-1.5"></div>
                    <div>
                      <p className="text-sm font-medium">Nouveau scan planifié</p>
                      <p className="text-xs text-muted-foreground">Infrastructure complète</p>
                      <p className="text-xs text-muted-foreground">Hier, 15:20</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <RecentVulnerabilities />
      </div>
    </Layout>
  );
};

export default Index;
