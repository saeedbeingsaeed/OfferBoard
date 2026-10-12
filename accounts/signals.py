from django.contrib.auth.signals import user_logged_out
from django.dispatch import receiver


@receiver(user_logged_out)
def delete_demo_user_on_logout(sender, request, user, **kwargs):
    # A demo account can't be signed back into (it has no password), so once the
    # visitor signs out its data is useless: delete it right away.
    if user is not None and user.is_demo:
        user.delete()
