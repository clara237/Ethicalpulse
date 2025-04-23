
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { generateMockRemediationOutput } from "@/lib/api-utils";

interface RemediationParams {
  vulnerabilityType: string;
  method: string;
  target: string;
  projectId?: string;
}

export const useRemediation = () => {
  const { toast } = useToast();

  const applyRemediation = useCallback(async (params: RemediationParams) => {
    // This would be a real API call in production
    // return await fetch('/api/remediation', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(params)
    // }).then(res => res.json());
    
    // For the demo, we'll simulate a backend response
    return new Promise((resolve) => {
      setTimeout(() => {
        const output = generateMockRemediationOutput(params.vulnerabilityType);
        resolve({
          id: `rem-${Date.now()}`,
          timestamp: new Date().toISOString(),
          toolName: "Remédiation",
          method: params.method,
          targetType: params.vulnerabilityType,
          target: params.target,
          status: "success",
          details: `Remédiation ${params.method} appliquée pour ${params.vulnerabilityType}`,
          output: output
        });
      }, 1500); // Simulate network delay
    });
  }, []);

  const mutation = useMutation({
    mutationFn: applyRemediation,
    onSuccess: (data) => {
      toast({
        title: "Remédiation réussie",
        description: "L'action de remédiation a été appliquée avec succès.",
      });
      return data;
    },
    onError: (error) => {
      toast({
        title: "Erreur de remédiation",
        description: "L'action de remédiation a échoué. Veuillez réessayer.",
        variant: "destructive",
      });
      console.error("Remediation error:", error);
    }
  });

  const getRemediationHistory = useCallback(async () => {
    // This would be a real API call in production
    // return await fetch('/api/remediation/history').then(res => res.json());
    
    // Mock data for demo
    return [
      {
        id: "rem-1",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        toolName: "Remédiation",
        method: "Configuration simple",
        targetType: "firewall",
        target: "192.168.1.1",
        status: "success",
        details: "Configuration du pare-feu",
        output: generateMockRemediationOutput("firewall")
      },
      {
        id: "rem-2",
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        toolName: "Remédiation",
        method: "Patch XSS",
        targetType: "webapp",
        target: "https://example.com",
        status: "success",
        details: "Correction vulnérabilité XSS",
        output: generateMockRemediationOutput("webapp")
      }
    ];
  }, []);

  const { data: history, isLoading, error, refetch } = useQuery({
    queryKey: ["remediation-history"],
    queryFn: getRemediationHistory
  });

  return {
    applyRemediation: mutation.mutate,
    isApplying: mutation.isPending,
    history,
    isLoading,
    error,
    refetch
  };
};
