from django.urls import path

from . import views

urlpatterns = [
    path("",views.index,name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
 
    path("admin_dashboard",views.admin_dashboard, name="admin_dashboard"),
    path("create_candidate",views.create_candidate, name="create_candidate"),
    path("get_candidates/<str:position>",views.get_candidates,name="get_candidates"),
    path("submit_vote",views.submit_vote,name="submit_vote"),


    #
    path("send_otp",views.send_otp, name="send_otp"),
    path("approve_voter",views.approve_voter, name="approve_voter"),
    path("otp",views.otp,name="otp"),

]