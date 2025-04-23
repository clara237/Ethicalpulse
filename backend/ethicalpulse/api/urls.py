
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import VulnerabilityViewSet, SecurityScanViewSet, ProjectViewSet, RemediationViewSet

router = DefaultRouter()
router.register(r'vulnerabilities', VulnerabilityViewSet)
router.register(r'scans', SecurityScanViewSet)
router.register(r'projects', ProjectViewSet)
router.register(r'remediations', RemediationViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
