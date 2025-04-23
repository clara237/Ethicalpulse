
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Vulnerability, SecurityScan, Project, Remediation
from .serializers import VulnerabilitySerializer, SecurityScanSerializer, ProjectSerializer, RemediationSerializer
from datetime import datetime

class VulnerabilityViewSet(viewsets.ModelViewSet):
    queryset = Vulnerability.objects.all()
    serializer_class = VulnerabilitySerializer
    
    def get_queryset(self):
        queryset = Vulnerability.objects.all()
        status = self.request.query_params.get('status', None)
        severity = self.request.query_params.get('severity', None)
        
        if status:
            queryset = queryset.filter(status=status)
        if severity:
            queryset = queryset.filter(severity=severity)
            
        return queryset

class SecurityScanViewSet(viewsets.ModelViewSet):
    queryset = SecurityScan.objects.all()
    serializer_class = SecurityScanSerializer
    
    def get_queryset(self):
        queryset = SecurityScan.objects.all()
        status = self.request.query_params.get('status', None)
        
        if status:
            queryset = queryset.filter(status=status)
            
        return queryset

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class RemediationViewSet(viewsets.ModelViewSet):
    queryset = Remediation.objects.all()
    serializer_class = RemediationSerializer
    
    def get_queryset(self):
        queryset = Remediation.objects.all()
        status = self.request.query_params.get('status', None)
        
        if status:
            queryset = queryset.filter(status=status)
            
        return queryset
    
    @action(detail=False, methods=['post'])
    def apply(self, request):
        try:
            vulnerability_id = request.data.get('vulnerability_id')
            project_id = request.data.get('project_id')
            remediation_type = request.data.get('remediation_type')
            method = request.data.get('method')
            
            # Vérifier qu'un projet est spécifié
            if not project_id:
                return Response(
                    {"error": "Un projet doit être spécifié pour la remédiation."},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            project = Project.objects.get(id=project_id)
            
            # Si une vulnérabilité est spécifiée, la lier à la remédiation
            vulnerability = None
            if vulnerability_id:
                try:
                    vulnerability = Vulnerability.objects.get(id=vulnerability_id)
                except Vulnerability.DoesNotExist:
                    return Response(
                        {"error": "Vulnérabilité non trouvée."},
                        status=status.HTTP_404_NOT_FOUND
                    )
            
            # Créer la remédiation
            remediation = Remediation.objects.create(
                vulnerability=vulnerability,
                project=project,
                name=f"Remédiation {remediation_type} - {method}",
                remediation_type=remediation_type,
                method=method,
                status="in_progress"
            )
            
            # Simuler l'exécution de la remédiation
            # Dans un cas réel, cela serait probablement une tâche asynchrone
            outputs = {
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
            }
            
            # Mettre à jour la remédiation avec le résultat
            remediation.output = outputs.get(remediation_type, "Remédiation appliquée avec succès.")
            remediation.status = "success"
            remediation.completed_at = datetime.now()
            remediation.save()
            
            # Si une vulnérabilité est liée, la marquer comme résolue
            if vulnerability:
                vulnerability.status = "resolved"
                vulnerability.resolved_at = datetime.now()
                vulnerability.resolution_notes = f"Résolu avec {method}"
                vulnerability.save()
            
            serializer = RemediationSerializer(remediation)
            return Response(serializer.data, status=status.HTTP_200_OK)
            
        except Project.DoesNotExist:
            return Response(
                {"error": "Projet non trouvé."},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
