from django.contrib import admin
from .models import Vulnerability, SecurityScan, Project, Remediation, CustomUser

@admin.register(Vulnerability)
class VulnerabilityAdmin(admin.ModelAdmin):
    list_display = ('name', 'severity', 'status', 'discovered_at', 'created_at')
    search_fields = ('name', 'description', 'cve_id')
    list_filter = ('severity', 'status')
    ordering = ('-created_at',)

@admin.register(SecurityScan)
class SecurityScanAdmin(admin.ModelAdmin):
    list_display = ('name', 'status', 'scan_type', 'start_time', 'end_time')
    search_fields = ('name', 'target_url')
    list_filter = ('status',)
    ordering = ('-created_at',)

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'target_domain', 'target_ip', 'created_at')
    search_fields = ('name', 'description', 'target_domain')
    list_filter = ('target_type', 'scope')
    ordering = ('-created_at',)

@admin.register(Remediation)
class RemediationAdmin(admin.ModelAdmin):
    list_display = ('name', 'vulnerability', 'project', 'status', 'executed_at')
    search_fields = ('name', 'method', 'output')
    list_filter = ('status',)
    ordering = ('-executed_at',)

@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('email', 'username', 'role', 'is_staff', 'is_active')
    search_fields = ('email', 'username')
    list_filter = ('role', 'is_staff', 'is_active')
    ordering = ('email',)