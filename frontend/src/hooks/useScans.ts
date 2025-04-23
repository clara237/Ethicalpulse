
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  fetchScans, 
  fetchScansByStatus, 
  createScan, 
  updateScan, 
  startScan, 
  completeScan,
  SecurityScan,
  ScanStatus,
  CreateScanInput
} from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

export function useScans() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: allScans = [], isLoading: isLoadingAll } = useQuery({
    queryKey: ['scans'],
    queryFn: fetchScans,
  });

  const getByStatus = (status: ScanStatus) => {
    return useQuery({
      queryKey: ['scans', status],
      queryFn: () => fetchScansByStatus(status),
    });
  };

  const { mutate: create } = useMutation({
    mutationFn: createScan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scans'] });
      toast({
        title: "Scan créé",
        description: "Le scan a été créé avec succès.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création du scan.",
        variant: "destructive",
      });
    },
  });

  const { mutate: update } = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<SecurityScan> }) => 
      updateScan(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scans'] });
      toast({
        title: "Scan mis à jour",
        description: "Le scan a été mis à jour avec succès.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour du scan.",
        variant: "destructive",
      });
    },
  });

  const { mutate: start } = useMutation({
    mutationFn: startScan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scans'] });
      toast({
        title: "Scan démarré",
        description: "Le scan a été démarré avec succès.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors du démarrage du scan.",
        variant: "destructive",
      });
    },
  });

  const { mutate: complete } = useMutation({
    mutationFn: ({ id, findings }: { 
      id: string; 
      findings: { critical: number; high: number; medium: number; low: number; } 
    }) => completeScan(id, findings),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scans'] });
      toast({
        title: "Scan terminé",
        description: "Le scan a été marqué comme terminé avec succès.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la fin du scan.",
        variant: "destructive",
      });
    },
  });

  return {
    allScans,
    isLoadingAll,
    getByStatus,
    create,
    update,
    start,
    complete,
  };
}
