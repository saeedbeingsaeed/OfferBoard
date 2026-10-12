from django.contrib.auth.decorators import login_not_required
from django.http import HttpResponse
from django.shortcuts import redirect, render


@login_not_required
def landing(request):
    if request.user.is_authenticated:
        return redirect("tracker:board")
    return render(request, "landing.html")


@login_not_required
def healthz(request):
    # Render pings this to decide the service is up. It deliberately skips the
    # database so a slow or paused database can't make the deploy look broken.
    return HttpResponse("ok", content_type="text/plain")
