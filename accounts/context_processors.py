from django.conf import settings


def auth_options(request):
    """Lets templates hide the Google button when it isn't configured."""
    return {"google_enabled": bool(settings.GOOGLE_CLIENT_ID and settings.GOOGLE_CLIENT_SECRET)}
