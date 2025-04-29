from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import CustomUser

"""
Formulaire pour la création d'un nouvel utilisateur
"""
class CustomUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = CustomUser
        fields = ('username', 'email', 'first_name', 'last_name', 'role', 'is_staff', 'is_active', 'is_superuser')

"""
Formulaire pour la modification d'un utilisateur existant
"""
class CustomUserChangeForm(UserChangeForm):
    class Meta(UserChangeForm.Meta):
        model = CustomUser
        fields = ('username', 'email', 'first_name', 'last_name', 'role', 'is_staff', 'is_active', 'is_superuser')

"""
Formulaire pour la vérification du code OTP
"""
class OTPForm(forms.Form):
    otp_code = forms.CharField(max_length=6, required=True)
