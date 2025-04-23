
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Reports() {
  return (
    <Layout>
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Rapports de Sécurité</h1>
          <Button className="bg-orange-500 hover:bg-orange-600">
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:border-orange-500 transition-colors cursor-pointer">
            <CardHeader className="flex flex-row items-center space-y-0 gap-4">
              <FileText className="h-6 w-6 text-orange-500" />
              <div>
                <CardTitle>Rapport Hebdomadaire</CardTitle>
                <p className="text-sm text-muted-foreground">07/04/2025</p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Résumé des activités de sécurité et des incidents de la semaine
              </p>
            </CardContent>
          </Card>

          <Card className="hover:border-orange-500 transition-colors cursor-pointer">
            <CardHeader className="flex flex-row items-center space-y-0 gap-4">
              <FileText className="h-6 w-6 text-orange-500" />
              <div>
                <CardTitle>Audit de Sécurité</CardTitle>
                <p className="text-sm text-muted-foreground">01/04/2025</p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Résultats détaillés de l'audit de sécurité mensuel
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
