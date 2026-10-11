from django.contrib import admin
from django.urls import include, path

from accounts import views as account_views

urlpatterns = [
    path("", account_views.landing, name="landing"),
    path("healthz", account_views.healthz, name="healthz"),
    path("accounts/", include("allauth.urls")),
    path("app/", include("tracker.urls")),
    path("admin/", admin.site.urls),
]
