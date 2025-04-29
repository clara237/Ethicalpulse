from backend.ethicalpulse.api import serializers
from backend.ethicalpulse.api.models import CustomUser


class Meta:
    model = CustomUser
    fields = ['email', 'username', 'role', 'password', 'password_confirm']

def validate(self, data):
    if data['password'] != data['password_confirm']:
        raise serializers.ValidationError({"password_confirm": "Les mots de passe ne correspondent pas."})
    return data

def create(self, validated_data):
    validated_data.pop('password_confirm')
    user = CustomUser.objects.create_user(**validated_data)
    return user