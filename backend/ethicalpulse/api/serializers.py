# api/serializers.py
from rest_framework import serializers
from .models import CustomUser, Project, Remediation, SecurityScan, Vulnerability
import pyotp

"""
Sérialiseurs pour convertir les objets CustomUser en JSON et vice-versa
"""
class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = (
            'id', 'username', 'email', 'first_name', 'last_name', 'role',
            'is_staff', 'is_active', 'is_superuser', 'date_joined', 'last_login'
        )
        read_only_fields = ('id', 'date_joined', 'last_login')

class CustomUserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    enable_otp = serializers.BooleanField(default=False, write_only=True)

    class Meta:
        model = CustomUser
        fields = (
            'username', 'email', 'password', 'first_name', 'last_name', 'role',
            'is_staff', 'is_active', 'is_superuser', 'enable_otp'
        )

    def create(self, validated_data):
        """
        Crée un nouvel utilisateur avec mot de passe haché et OTP si activé
        """
        enable_otp = validated_data.pop('enable_otp', False)
        user = CustomUser.objects.create_user(
            email=validated_data['email'],
            username=validated_data.get('username'),
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            role=validated_data.get('role', 'ANALYST'),
            is_staff=validated_data.get('is_staff', False),
            is_active=validated_data.get('is_active', True),
            is_superuser=validated_data.get('is_superuser', False),
        )
        if enable_otp:
            user.otp_secret = pyotp.random_base32()
            user.save()
        return user

class OTPSerializer(serializers.Serializer):
    """
    Sérialiseur pour valider le code OTP
    """
    otp_code = serializers.CharField(max_length=6, required=True)


class VulnerabilitySerializer(serializers.ModelSerializer):
    """
    Sérialiseur pour les vulnérabilités
    """
    class Meta:
        model = Vulnerability
        fields = '__all__'
        read_only_fields = ('id', 'created_at', 'updated_at')
    def create(self, validated_data):
        """
        Crée une nouvelle vulnérabilité
        """
        return Vulnerability.objects.create(**validated_data)
    def update(self, instance, validated_data):
        """
        Met à jour une vulnérabilité existante
        """
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.severity = validated_data.get('severity', instance.severity)
        instance.status = validated_data.get('status', instance.status)
        instance.assigned_to = validated_data.get('assigned_to', instance.assigned_to)
        instance.project = validated_data.get('project', instance.project)
        instance.save()
        return instance
class ProjectSerializer(serializers.ModelSerializer):
    """
    Sérialiseur pour les projets
    """
    class Meta:
        model = Project
        fields = '__all__'
        read_only_fields = ('id', 'created_at', 'updated_at')
    def create(self, validated_data):
        """
        Crée un nouveau projet
        """
        return Project.objects.create(**validated_data)
    def update(self, instance, validated_data):
        """
        Met à jour un projet existant
        """
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.status = validated_data.get('status', instance.status)
        instance.save()
        return instance
class RemediationSerializer(serializers.ModelSerializer):
    """
    Sérialiseur pour les remédiations
    """
    class Meta:
        model = Remediation
        fields = '__all__'
        read_only_fields = ('id', 'executed_at', 'completed_at')
    def create(self, validated_data):
        """
        Crée une nouvelle remédiation
        """
        return Remediation.objects.create(**validated_data)
    def update(self, instance, validated_data):
        """
        Met à jour une remédiation existante
        """
        instance.name = validated_data.get('name', instance.name)
        instance.remediation_type = validated_data.get('remediation_type', instance.remediation_type)
        instance.method = validated_data.get('method', instance.method)
        instance.status = validated_data.get('status', instance.status)
        instance.output = validated_data.get('output', instance.output)
        instance.completed_at = validated_data.get('completed_at', instance.completed_at)
        instance.save()
        return instance
    
class UserSerializer(serializers.ModelSerializer):
    """
    Sérialiseur pour les utilisateurs
    """
    class Meta:
        model = CustomUser
        fields = '__all__'
        read_only_fields = ('id', 'date_joined', 'last_login')
    def create(self, validated_data):
        """
        Crée un nouvel utilisateur
        """
        return CustomUser.objects.create(**validated_data)
    def update(self, instance, validated_data):
        """
        Met à jour un utilisateur existant
        """
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.role = validated_data.get('role', instance.role)
        instance.is_staff = validated_data.get('is_staff', instance.is_staff)
        instance.is_active = validated_data.get('is_active', instance.is_active)
        instance.is_superuser = validated_data.get('is_superuser', instance.is_superuser)
        instance.save()
        return instance
class SecurityScanSerializer(serializers.ModelSerializer):
    """
    Sérialiseur pour les analyses de sécurité
    """
    class Meta:
        model = SecurityScan
        fields = '__all__'
        read_only_fields = ('id', 'created_at', 'updated_at')
    def create(self, validated_data):
        """
        Crée une nouvelle analyse de sécurité
        """
        return SecurityScan.objects.create(**validated_data)
    def update(self, instance, validated_data):
        """
        Met à jour une analyse de sécurité existante
        """
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.status = validated_data.get('status', instance.status)
        instance.save()
        return instance 
    