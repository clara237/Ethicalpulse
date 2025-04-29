from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.utils.translation import gettext_lazy as _

class Vulnerability(models.Model):
    SEVERITY_CHOICES = [
        ('critical', 'Critique'),
        ('high', 'Élevée'),
        ('medium', 'Moyenne'),
        ('low', 'Faible'),
    ]
    
    STATUS_CHOICES = [
        ('open', 'Ouverte'),
        ('in_progress', 'En cours'),
        ('resolved', 'Résolue'),
        ('closed', 'Fermée'),
    ]
    
    name = models.CharField(max_length=255, verbose_name="Nom")
    description = models.TextField(blank=True, null=True, verbose_name="Description")
    severity = models.CharField(max_length=10, choices=SEVERITY_CHOICES, verbose_name="Sévérité")
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default='open', verbose_name="Statut")
    target_url = models.URLField(blank=True, null=True, verbose_name="URL cible")
    discovered_at = models.DateTimeField(auto_now_add=True, verbose_name="Date de découverte")
    resolved_at = models.DateTimeField(blank=True, null=True, verbose_name="Date de résolution")
    resolution_notes = models.TextField(blank=True, null=True, verbose_name="Notes de résolution")
    cve_id = models.CharField(max_length=20, blank=True, null=True, verbose_name="Identifiant CVE")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Date de création")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Date de mise à jour")
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = "Vulnérabilité"
        verbose_name_plural = "Vulnérabilités"
        ordering = ['-created_at']

class SecurityScan(models.Model):
    STATUS_CHOICES = [
        ('scheduled', 'Planifié'),
        ('in_progress', 'En cours'),
        ('completed', 'Terminé'),
        ('failed', 'Échoué'),
    ]
    
    name = models.CharField(max_length=255, verbose_name="Nom")
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default='scheduled', verbose_name="Statut")
    target_url = models.URLField(verbose_name="URL cible")
    scan_type = models.CharField(max_length=50, verbose_name="Type de scan")
    start_time = models.DateTimeField(blank=True, null=True, verbose_name="Heure de début")
    end_time = models.DateTimeField(blank=True, null=True, verbose_name="Heure de fin")
    findings_summary = models.JSONField(blank=True, null=True, verbose_name="Résumé des résultats")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Date de création")
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = "Scan de sécurité"
        verbose_name_plural = "Scans de sécurité"
        ordering = ['-created_at']

class Project(models.Model):
    TARGET_TYPE_CHOICES = [
        ('website', 'Site Web'),
        ('webapp', 'Application Web'),
        ('api', 'API'),
        ('server', 'Serveur'),
        ('network', 'Réseau'),
        ('other', 'Autre'),
    ]
    
    SCOPE_CHOICES = [
        ('internal', 'Interne'),
        ('external', 'Externe'),
        ('both', 'Les deux'),
    ]
    
    name = models.CharField(max_length=255, verbose_name="Nom")
    description = models.TextField(blank=True, null=True, verbose_name="Description")
    target_domain = models.CharField(max_length=255, blank=True, null=True, verbose_name="Domaine cible")
    target_ip = models.CharField(max_length=45, blank=True, null=True, verbose_name="IP cible")
    target_type = models.CharField(max_length=20, choices=TARGET_TYPE_CHOICES, blank=True, null=True, verbose_name="Type de cible")
    scope = models.CharField(max_length=20, choices=SCOPE_CHOICES, blank=True, null=True, verbose_name="Portée")
    technologies = models.JSONField(blank=True, null=True, verbose_name="Technologies")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Date de création")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Date de mise à jour")
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = "Projet"
        verbose_name_plural = "Projets"
        ordering = ['-created_at']

class Remediation(models.Model):
    STATUS_CHOICES = [
        ('success', 'Succès'),
        ('failed', 'Échec'),
        ('in_progress', 'En cours'),
    ]
    
    vulnerability = models.ForeignKey(Vulnerability, on_delete=models.CASCADE, null=True, blank=True, verbose_name="Vulnérabilité")
    project = models.ForeignKey(Project, on_delete=models.CASCADE, verbose_name="Projet")
    name = models.CharField(max_length=255, verbose_name="Nom")
    remediation_type = models.CharField(max_length=50, verbose_name="Type de remédiation")
    method = models.CharField(max_length=255, verbose_name="Méthode")
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default='in_progress', verbose_name="Statut")
    output = models.TextField(blank=True, null=True, verbose_name="Résultat")
    executed_at = models.DateTimeField(auto_now_add=True, verbose_name="Date d'exécution")
    completed_at = models.DateTimeField(blank=True, null=True, verbose_name="Date de complétion")
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = "Remédiation"
        verbose_name_plural = "Remédiations"
        ordering = ['-executed_at']

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Veuillez entrer votre adresse email')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Le superutilisateur doit avoir is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Le superutilisateur doit avoir is_superuser=True.')

        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractUser):
    ROLES = (
        ('ADMIN', 'Administrateur'),
        ('ANALYST', 'Analyste'),
        ('SECURITY', 'Ingénieur sécurité'),
        ('MANAGER', 'Manager'),
    )

    email = models.EmailField(unique=True)
    role = models.CharField(max_length=20, choices=ROLES, default='ANALYST')
    otp_secret = models.CharField(max_length=100, blank=True, null=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    class Meta:
        permissions = [
            ("view_sensitive_data", "Can view sensitive data"),
            ("manage_users", "Can manage users"),
            ("execute_security_actions", "Can execute security actions"),
        ]