
import { Layout } from "@/components/layout/Layout";
import { VulnerabilityOverview } from "@/components/dashboard/VulnerabilityOverview";
import { ScanStatus } from "@/components/dashboard/ScanStatus";
import { RecentVulnerabilities } from "@/components/dashboard/RecentVulnerabilities";
import { SeverityOverTime } from "@/components/dashboard/SeveriyOvertime";
import { VulnerabilitiesByType } from "@/components/dashboard/VulnerabilitiesByType";

const Index = () => {
  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Tableau de bord</h1>
          <p className="text-muted-foreground">Vue d'ensemble de la sécurité de vos systèmes</p>
        </div>

        <VulnerabilityOverview />
        <SeverityOverTime />
          <VulnerabilitiesByType />
          <ScanStatus />       
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="bg-card rounded-lg border shadow-sm">
             
            </div>
          </div>
        </div>

        <RecentVulnerabilities />
      </div>
    </Layout>
  );
};

export default Index;
