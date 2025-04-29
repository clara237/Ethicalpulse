# from django.contrib.auth.base_user import BaseUserManager
# from django.core.exceptions import ValidationError
# from django.core.validators import validate_email
# from django.utils.translation import gettext_lazy as _


# class CustomUserManager(BaseUserManager):
    
#     def email_validator(self, email):
#         try:
#             validate_email(email)
#         except ValidationError:
#             raise ValidationError(_("You must provide a valid email address."))

#     def create_user(self, first_name, last_name, email, password=None, **extra_fields):
#         """
#         Créer un utilisateur avec email, nom, prénom et mot de passe.
#         """
#         if not email:
#             raise ValueError(_('The Email field must be set'))
#         if not first_name:
#             raise ValueError(_('The First Name field must be set'))
#         if not last_name:
#             raise ValueError(_('The Last Name field must be set'))
#         if not password:
#             raise ValueError(_('The Password field must be set'))

#         self.email_validator(email)
#         email = self.normalize_email(email)

#         user = self.model(
#             email=email,
#             first_name=first_name,
#             last_name=last_name,
#             **extra_fields
#         )
#         user.set_password(password)
#         extra_fields.setdefault("is_staff", False)
#         extra_fields.setdefault("is_super user", False)
#         user.save(using=self._db)
#         return user

#     def create_superuser(self, email, password=None, **extra_fields):
#         """
#         Créer un superutilisateur avec email et mot de passe.
#         """
#         if not email:
#             raise ValueError(_('The Email field must be set'))
#         if not password:
#             raise ValueError(_('The Password field must be set'))

#         self.email_validator(email)
#         email = self.normalize_email(email)

#         extra_fields.setdefault('first_name', 'Admin')
#         extra_fields.setdefault('last_name', 'User')
#         extra_fields.setdefault('is_staff', True)
#         extra_fields.setdefault('is_superuser', True)
#         extra_fields.setdefault('is_active', True)

#         if extra_fields.get('is_staff') is not True:
#             raise ValueError(_('Superuser must have is_staff=True.'))
#         if extra_fields.get('is_superuser') is not True:
#             raise ValueError(_('Superuser must have is_superuser=True.'))
#         if extra_fields.get('is_active') is not True:
#             raise ValueError(_('Superuser must have is_active=True.'))

#         return self.create_user(
#             first_name=extra_fields['first_name'],
#             last_name=extra_fields['last_name'],
#             email=email,
#             password=password,
#             **extra_fields
#         )
