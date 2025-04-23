
import { supabase } from "@/integrations/supabase/client";

export type Vulnerability = {
  id: string;
  name: string;
  description?: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: string;
  target_url?: string;
  discovered_at: string;
  resolved_at?: string;
  resolution_notes?: string;
  cve_id?: string;
  created_at: string;
  updated_at: string;
}

export const fetchVulnerabilities = async () => {
  const { data, error } = await supabase
    .from('vulnerabilities')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Vulnerability[];
};

// Type for creating a new vulnerability
export type CreateVulnerabilityInput = {
  name: string; // Required field
  description?: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status?: string;
  target_url?: string;
  discovered_at?: string;
  resolved_at?: string;
  resolution_notes?: string;
  cve_id?: string;
}

export const createVulnerability = async (vulnerability: CreateVulnerabilityInput) => {
  const { data, error } = await supabase
    .from('vulnerabilities')
    .insert(vulnerability)
    .select()
    .single();

  if (error) throw error;
  return data as Vulnerability;
};

export const updateVulnerability = async (id: string, updates: Partial<Vulnerability>) => {
  const { data, error } = await supabase
    .from('vulnerabilities')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as Vulnerability;
};

// Security Scan types and functions
export type ScanStatus = 'scheduled' | 'in_progress' | 'completed' | 'failed';

export type SecurityScan = {
  id: string;
  name: string;
  status: ScanStatus;
  target_url: string;
  scan_type: string;
  start_time?: string;
  end_time?: string;
  findings_summary?: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  created_at: string;
}

export type CreateScanInput = {
  name: string;
  target_url: string;
  scan_type: string;
  status?: ScanStatus;
}

export const fetchScans = async () => {
  const { data, error } = await supabase
    .from('security_scans')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as SecurityScan[];
};

export const fetchScansByStatus = async (status: ScanStatus) => {
  const { data, error } = await supabase
    .from('security_scans')
    .select('*')
    .eq('status', status)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as SecurityScan[];
};

export const createScan = async (scan: CreateScanInput) => {
  const { data, error } = await supabase
    .from('security_scans')
    .insert(scan)
    .select()
    .single();

  if (error) throw error;
  return data as SecurityScan;
};

export const updateScan = async (id: string, updates: Partial<SecurityScan>) => {
  const { data, error } = await supabase
    .from('security_scans')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as SecurityScan;
};

export const startScan = async (id: string) => {
  const { data, error } = await supabase
    .from('security_scans')
    .update({
      status: 'in_progress',
      start_time: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as SecurityScan;
};

export const completeScan = async (
  id: string, 
  findings: { critical: number; high: number; medium: number; low: number; }
) => {
  const { data, error } = await supabase
    .from('security_scans')
    .update({
      status: 'completed',
      end_time: new Date().toISOString(),
      findings_summary: findings
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as SecurityScan;
};
