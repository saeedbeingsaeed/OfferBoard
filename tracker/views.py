from django.db.models import Count
from django.views.generic import TemplateView

from .models import Application, Stage


class HomeView(TemplateView):
    template_name = "tracker/home.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        counts = dict(
            Application.objects.for_user(self.request.user)
            .values_list("stage")
            .annotate(n=Count("id"))
            .values_list("stage", "n")
        )
        context["stage_counts"] = [(stage, counts.get(stage.value, 0)) for stage in Stage]
        context["total"] = sum(counts.values())
        return context
