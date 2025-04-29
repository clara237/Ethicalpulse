
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import VulnerabilityViewSet, SecurityScanViewSet, ProjectViewSet, RemediationViewSet
from .views import LoginView, OTPVerifyView, UserListView, UserCreateView, UserUpdateView
from rest_framework_simplejwt.views import TokenRefreshView


router = DefaultRouter()
router.register(r'vulnerabilities', VulnerabilityViewSet)
router.register(r'scans', SecurityScanViewSet)
router.register(r'projects', ProjectViewSet)
router.register(r'remediations', RemediationViewSet)

urlpatterns = [
    path('', include(router.urls)),
     path('login/', LoginView.as_view(), name='login'),  # Endpoint pour la connexion
    path('otp-verify/', OTPVerifyView.as_view(), name='otp_verify'),  # Endpoint pour vérifier OTP
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Rafraîchir le token JWT
    path('users/', UserListView.as_view(), name='user_list'),  # Lister tous les utilisateurs
    path('users/create/', UserCreateView.as_view(), name='user_create'),  # Créer un utilisateur
    path('users/update/<int:pk>/', UserUpdateView.as_view(), name='user_update'),  # Modifier un utilisateur
    #path('users/delete/<int:pk>/', UserDeleteView.as_view(), name='user_delete'),  # Supprimer un utilisateur
]
