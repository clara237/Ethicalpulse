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

export const generateMockRemediationOutput = (vulnerabilityType: string): string => {
  const outputs: Record<string, string> = {
    "firewall": "Configuration du pare-feu terminée avec succès.\n\n- Règles configurées pour filtrer le trafic malveillant\n- Ports non nécessaires fermés\n- Journalisation des tentatives bloquées activée",
    "iptables": "Configuration iptables terminée avec succès.\n\n```\n# Règles ajoutées:\niptables -A INPUT -p tcp --dport 22 -m state --state NEW -m recent --set\niptables -A INPUT -p tcp --dport 22 -m state --state NEW -m recent --update --seconds 60 --hitcount 4 -j DROP\n```",
    "webapp": "Correctifs des vulnérabilités d'application web appliqués.\n\n- Validation des entrées renforcée\n- Protection XSS mise en place\n- Tokens CSRF implémentés\n- Headers de sécurité configurés",
    "ssl": "Configuration SSL/TLS mise à jour avec succès.\n\n- TLS 1.3 activé\n- Ciphers faibles désactivés\n- Perfect Forward Secrecy activé\n- HSTS configuré",
    "updates": "Mises à jour de sécurité appliquées.\n\n- Système d'exploitation: ✅\n- Services web: ✅\n- Bibliothèques: ✅\n- Applications: ✅",
    "backup": "Sauvegarde sécurisée créée avec succès.\n\n- Données chiffrées avec AES-256\n- Stockées dans 3 emplacements distincts\n- Vérification d'intégrité effectuée",
    "malware": "Analyse anti-malware terminée.\n\n- 3 fichiers suspects identifiés\n- 2 menaces neutralisées\n- 1 fichier mis en quarantaine\n- Rapport complet généré",
    "permissions": "Permissions des fichiers et utilisateurs corrigées.\n\n- Principe du moindre privilège appliqué\n- Accès sensibles restreints\n- Autorisations root limitées",
    "monitoring": "Système de surveillance configuré.\n\n- Alertes email configurées\n- Seuils d'alertes définis\n- Journalisation centralisée activée",
    "hardening": "Renforcement système appliqué.\n\n- Services non essentiels désactivés\n- Configuration des mots de passe renforcée\n- Modules de sécurité noyau activés"
  };
  
  return outputs[vulnerabilityType] || "Remédiation appliquée avec succès.";
};

// Fonction de génération de données mock pour les scans
export const generateMockScanResults = (scanType: string, target: string) => {
  const vulnerabilityTypes = [
    'Injection SQL', 'XSS', 'CSRF', 'Fuite d\'informations', 
    'Mauvaise configuration', 'Port ouvert', 'Service obsolète',
    'Identifiants par défaut', 'Chiffrement faible', 'Absence de correctifs'
  ];
  
  const severities = ['critical', 'high', 'medium', 'low'];
  
  // Génère un nombre aléatoire entre min et max inclus
  const randomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  
  // Génère une date aléatoire dans les dernières 24 heures
  const randomDate = () => {
    const date = new Date();
    date.setHours(date.getHours() - randomInt(0, 24));
    date.setMinutes(date.getMinutes() - randomInt(0, 60));
    return date.toISOString();
  };
  
  // Génère un résultat aléatoire
  const generateRandomResult = (id: number) => {
    const vulnType = vulnerabilityTypes[randomInt(0, vulnerabilityTypes.length - 1)];
    const severity = severities[randomInt(0, severities.length - 1)];
    
    return {
      id: `result-${id}`,
      timestamp: randomDate(),
      toolName: scanType,
      command: `scan ${target}`,
      details: `${vulnType} détecté sur ${target}`,
      rawOutput: `Détails techniques pour ${vulnType}:\n- Impact: ${severity === 'critical' ? 'Critique' : severity === 'high' ? 'Élevé' : severity === 'medium' ? 'Moyen' : 'Faible'}\n- Probabilité d'exploitation: ${randomInt(1, 10)}/10\n- Recommandation: Appliquer les correctifs de sécurité et renforcer la configuration`,
      target: target,
      severity: severity,
      findingType: vulnType,
    };
  };
  
  // Génère entre 2 et 8 résultats
  const resultCount = randomInt(2, 8);
  const results = [];
  
  for (let i = 1; i <= resultCount; i++) {
    results.push(generateRandomResult(i));
  }
  
  return results;
};

// Fonction pour générer des données mock pour les statistiques de vulnérabilités
export const generateMockVulnerabilityStats = () => {
  return {
    total: 48,
    critical: 7,
    high: 12,
    medium: 18,
    low: 11,
    resolvedLastMonth: 23,
    newLastMonth: 15,
    topCategories: [
      { name: 'Injection SQL', count: 9 },
      { name: 'XSS', count: 8 },
      { name: 'Mauvaise configuration', count: 7 },
      { name: 'Absence de correctifs', count: 6 },
      { name: 'Authentification faible', count: 5 }
    ],
    bySystem: [
      { name: 'Web App', critical: 4, high: 7, medium: 9, low: 3 },
      { name: 'API', critical: 2, high: 3, medium: 5, low: 4 },
      { name: 'Serveur', critical: 1, high: 2, medium: 4, low: 4 }
    ],
    historicalData: [
      { month: 'Jan', critical: 10, high: 15, medium: 20, low: 12 },
      { month: 'Fév', critical: 8, high: 14, medium: 18, low: 10 },
      { month: 'Mar', critical: 9, high: 13, medium: 19, low: 9 },
      { month: 'Avr', critical: 7, high: 12, medium: 18, low: 11 },
      { month: 'Mai', critical: 5, high: 10, medium: 16, low: 8 },
      { month: 'Juin', critical: 8, high: 11, medium: 17, low: 9 }
    ]
  };
};

// Fonction pour générer des données mock pour les rapports
export const generateMockReportData = () => {
  return {
    summary: {
      vulnerabilitiesTotal: 48,
      vulnerabilitiesBySeverity: {
        critical: 7,
        high: 12,
        medium: 18,
        low: 11
      },
      scansPerformed: 23,
      remediationsApplied: 19,
      systemsCovered: 12
    },
    recommendations: [
      {
        title: "Mise à jour des systèmes critiques",
        description: "Appliquer les derniers correctifs de sécurité sur les serveurs web et d'application",
        priority: "Haute"
      },
      {
        title: "Renforcement des configurations SSL/TLS",
        description: "Désactiver les protocoles obsolètes et utiliser uniquement des algorithmes de chiffrement forts",
        priority: "Moyenne"
      },
      {
        title: "Amélioration de la validation des entrées",
        description: "Implémenter une validation stricte des entrées sur toutes les interfaces utilisateur",
        priority: "Haute"
      },
      {
        title: "Audit des permissions utilisateurs",
        description: "Réviser les permissions des utilisateurs selon le principe du moindre privilège",
        priority: "Moyenne"
      }
    ],
    timelineData: [
      { date: "2025-01-15", event: "Audit initial", details: "Évaluation complète de la sécurité" },
      { date: "2025-02-10", event: "Correctifs critiques", details: "Application des correctifs pour vulnérabilités critiques" },
      { date: "2025-03-05", event: "Configuration pare-feu", details: "Renforcement des règles de pare-feu" },
      { date: "2025-04-12", event: "Tests de pénétration", details: "Tests d'intrusion externes et internes" }
    ]
  };
};

// Fonction pour générer des données mock pour l'historique des actions
export const generateMockHistoryData = () => {
  return [
    {
      id: "hist-1",
      type: "Scan",
      description: "Scan de vulnérabilités sur api.example.com",
      date: "2025-04-17",
      status: "completed",
      user: "Sophie Dubois",
      details: "Scan complet avec détection de 7 vulnérabilités"
    },
    {
      id: "hist-2",
      type: "Remédiation",
      description: "Configuration du pare-feu mise à jour",
      date: "2025-04-16",
      status: "success",
      user: "Thomas Martin",
      details: "Règles ajoutées pour bloquer les accès non autorisés"
    },
    {
      id: "hist-3",
      type: "Alerte",
      description: "Tentative d'intrusion détectée",
      date: "2025-04-15",
      status: "warning",
      user: "Système",
      details: "10 tentatives d'authentification échouées depuis 185.143.223.45"
    },
    {
      id: "hist-4",
      type: "Mise à jour",
      description: "Application des correctifs de sécurité",
      date: "2025-04-14",
      status: "success",
      user: "Marc Bernard",
      details: "Correctifs appliqués pour CVE-2025-1234 et CVE-2025-5678"
    },
    {
      id: "hist-5",
      type: "Rapport",
      description: "Rapport mensuel généré",
      date: "2025-04-01",
      status: "info",
      user: "Système",
      details: "Rapport automatique de mars 2025"
    }
  ];
};
