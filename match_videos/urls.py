from django.urls import path
from .views import login_view
from .views import signup_view

from . import views


urlpatterns = [
    path('login/', login_view, name='login'),
    path('signup/', signup_view, name='signup'),
    path("index/", views.index, name="index"),
    path("welcome/",views.welcome, name="welcome"),
    path("logout",views.logout_view, name="logout"),
   


]
