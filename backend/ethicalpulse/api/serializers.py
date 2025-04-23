
from rest_framework import serializers
from .models import Vulnerability, SecurityScan, Project, Remediation

class VulnerabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Vulnerability
        fields = '__all__'
        
class SecurityScanSerializer(serializers.ModelSerializer):
    class Meta:
        model = SecurityScan
        fields = '__all__'

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

class RemediationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Remediation
        fields = '__all__'
