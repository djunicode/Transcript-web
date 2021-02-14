from djoser.email import ActivationEmail, ConfirmationEmail, PasswordResetEmail, PasswordChangedConfirmationEmail, UsernameChangedConfirmationEmail, UsernameResetEmail
from django.conf import settings

def customContext(context):
    context['domain'] = settings.FRONTEND_DOMAIN
    context['site_name'] = settings.FRONTEND_DOMAIN
    return context
class ActivationEmail(ActivationEmail):
    def get_context_data(self):
        context = super().get_context_data()
        return customContext(context)
class ConfirmationEmail(ConfirmationEmail):
    def get_context_data(self):
        context = super().get_context_data()
        return customContext(context)
class PasswordResetEmail(PasswordResetEmail):
    def get_context_data(self):
        context = super().get_context_data()
        return customContext(context)
class PasswordChangedConfirmationEmail(PasswordChangedConfirmationEmail):
    def get_context_data(self):
        context = super().get_context_data()
        return customContext(context)
class UsernameChangedConfirmationEmail(UsernameChangedConfirmationEmail):
    def get_context_data(self):
        context = super().get_context_data()
        return customContext(context)
class UsernameResetEmail(UsernameResetEmail):
    def get_context_data(self):
        context = super().get_context_data()
        return customContext(context)