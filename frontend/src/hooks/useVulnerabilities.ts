
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchVulnerabilities, createVulnerability, updateVulnerability, Vulnerability, CreateVulnerabilityInput } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

export function useVulnerabilities() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: vulnerabilities = [], isLoading, error } = useQuery({
    queryKey: ['vulnerabilities'],
    queryFn: fetchVulnerabilities,
  });

  const { mutate: create } = useMutation({
    mutationFn: createVulnerability,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vulnerabilities'] });
      toast({
        title: "Vulnérabilité créée",
        description: "La vulnérabilité a été créée avec succès.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création de la vulnérabilité.",
        variant: "destructive",
      });
    },
  });

  const { mutate: update } = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Vulnerability> }) => 
      updateVulnerability(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vulnerabilities'] });
      toast({
        title: "Vulnérabilité mise à jour",
        description: "La vulnérabilité a été mise à jour avec succès.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour de la vulnérabilité.",
        variant: "destructive",
      });
    },
  });

  return {
    vulnerabilities,
    isLoading,
    error,
    create,
    update,
  };
}
