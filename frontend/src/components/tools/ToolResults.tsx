
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToolResult = {
  id: string;
  timestamp: string;
  toolName: string;
  command: string;
  target?: string;
  findingType?: string;
  severity?: 'critical' | 'high' | 'medium' | 'low' | 'info';
  details: string;
  rawOutput: string;
};

interface ToolResultsProps {
  results: ToolResult[];
  onExport?: (result: ToolResult) => void;
}

export function ToolResults({ results, onExport }: ToolResultsProps) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRow = (id: string) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(id)) {
      newExpandedRows.delete(id);
    } else {
      newExpandedRows.add(id);
    }
    setExpandedRows(newExpandedRows);
  };

  const getSeverityColor = (severity?: string) => {
    switch (severity) {
      case 'critical': return 'bg-cyber-alert hover:bg-cyber-alert/80';
      case 'high': return 'bg-red-500 hover:bg-red-500/80';
      case 'medium': return 'bg-amber-500 hover:bg-amber-500/80';
      case 'low': return 'bg-cyber-success hover:bg-cyber-success/80';
      case 'info': return 'bg-blue-500 hover:bg-blue-500/80';
      default: return 'bg-gray-500 hover:bg-gray-500/80';
    }
  };

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-8"></TableHead>
            <TableHead>Timestamp</TableHead>
            <TableHead>Outil</TableHead>
            <TableHead>Commande</TableHead>
            <TableHead>Cible</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Sévérité</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-4 text-muted-foreground">
                Aucun résultat disponible. Exécutez un outil pour voir les résultats.
              </TableCell>
            </TableRow>
          ) : (
            results.map((result) => (
              <>
                <TableRow key={result.id}>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => toggleRow(result.id)}
                      className="h-6 w-6"
                    >
                      {expandedRows.has(result.id) ? 
                        <ChevronUp className="h-4 w-4" /> : 
                        <ChevronDown className="h-4 w-4" />
                      }
                    </Button>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {new Date(result.timestamp).toLocaleString()}
                  </TableCell>
                  <TableCell>{result.toolName}</TableCell>
                  <TableCell className="max-w-[150px] truncate">
                    <code>{result.command}</code>
                  </TableCell>
                  <TableCell>{result.target || '-'}</TableCell>
                  <TableCell>{result.findingType || '-'}</TableCell>
                  <TableCell>
                    {result.severity ? (
                      <Badge className={cn(getSeverityColor(result.severity))}>
                        {result.severity.toUpperCase()}
                      </Badge>
                    ) : (
                      '-'
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onExport && onExport(result)}
                      title="Exporter"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
                {expandedRows.has(result.id) && (
                  <TableRow>
                    <TableCell colSpan={8}>
                      <div className="p-4 bg-muted/30">
                        <h4 className="font-medium mb-2">Détails</h4>
                        <p className="mb-4 text-sm">{result.details}</p>
                        
                        <h4 className="font-medium mb-2">Sortie brute</h4>
                        <pre className="text-xs bg-black text-green-400 p-3 rounded-md overflow-x-auto">
                          {result.rawOutput}
                        </pre>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
