import json
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import JsonResponse
from django.shortcuts import HttpResponse, HttpResponseRedirect, render
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
from django.core.paginator import Paginator

from .models import *
from .forms import *
import random

POSITIONS = ["President","Vice President","General Secretary","Financial Secretary","Public Relations","General Organizer","Cordinating Secretary","Secretary for Education","Pres and Information","Computer Prefect","Utility/Water Prefect"]




def index(request):  
    if request.user.is_authenticated:
        
        if request.user.confirmed:
            return render(request, "voting/index.html")
        else:
            return HttpResponseRedirect(reverse('otp'))
    else:
        return HttpResponseRedirect(reverse('login'))

        

def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse('index'))
        else:
            return render(request, "voting/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "voting/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("login"))


def register(request):
    if request.method == "POST":
        phone = request.POST["phone"]
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "voting/register.html", {
                "message": "Passwords must match."
            })
       
        # ##check phone number and send OTP

        # phone_form = Phone_form(phone)
        # if phone_form.is_valid():
        #     send_otp(phone.cleaned_data["phone"])

        # else:
        #     return render(request, "voting/register.html", {
        #         "message": "Incorrect phone number"
        #     })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.phone = phone
            user.save()
        except IntegrityError:
            return render(request, "voting/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("send_otp"))

    else:
        return render(request, "voting/register.html")








def otp(request):
    
    context = {
        "message" : "",
        "pin":""
    }

    try:
        unregistered = Unregistered.objects.get(user=request.user) 
        unregistered_code = unregistered.code
        context["pin"] = f"Sent to phone number-{request.user.phone}: Hello {request.user} your code is {unregistered_code}"
    except:
        pass


    if request.method == "POST":


        try:

            code = request.POST['pin']
            unregistered = Unregistered.objects.get(user=request.user) 
            unregistered_code = unregistered.code
            print(code,unregistered_code)
            if int(code) == int(unregistered_code) :
                print("yes pin match")
                request.user.confirmed = True
                request.user.save()

                unregistered = Unregistered.objects.get(user=request.user)
                unregistered.delete()

                return render(request,'voting/index.html')
            else:
                print("pin no match")
                context["message"] = "INVALID CODE"

        except:

                context["message"] = "INVALID CODE"

    return render(request, "voting/otp.html",context)

@login_required
@csrf_exempt
def submit_vote(request):
    if request.method == "PUT":
        
        data = json.loads(request.body)
        candidate_id = data.get("id") 
        position = data.get("position")
        # print(candidate_id,position)
        # position = data.get("position") 

        
        candidates = Candidate.objects.filter(position = position)
        candidate = Candidate.objects.get(id = candidate_id)


        for person in candidates.all():
            if request.user in person.votes.all():
                print("already")
                return JsonResponse({"message":"voted"},safe=False)

        
        else:
            candidate.votes.add(request.user)
            candidate.save()
            return JsonResponse({"message":"saved"},safe=False)
            
    return HttpResponse(status=404)


@login_required
def send_otp(request):

    waiting = Unregistered.objects.all()
    waiting = [wait.user for wait in waiting ]

    if request.user in waiting:
        print("You already have code")
        print(f"Hello {request.user.username} here is your code {request.user.phone}")

    else:

        name = request.user.username
        code = random.randint(1000,9999)
        unregistered = Unregistered(user = request.user, code = code)     
        unregistered.save()
        print(f"Hello {name} here is your code {code}")

    return HttpResponseRedirect(reverse('otp'))


@login_required
def get_candidates(request,position):

    index = int(position) - 1
    position = POSITIONS[index]
    
    candidates = Candidate.objects.filter(position = position)

    return JsonResponse([candidate.serialize() for candidate in candidates],safe=False)





def admin_dashboard(request):
    context={
        "voters": User.objects.filter(confirmed=False),
        "positions":POSITIONS

    }
    return render(request,"voting/admin_dashboard.html",context)


def create_candidate(request):
    if request.method == "POST":
        print(request.FILES)
        try:
            name = request.POST["name"]
            position = request.POST["position"]
            picture = request.FILES["picture"]

            new = Candidate(name=name,position=position,picture=picture)
            new.save()
        except:
            context={
                "message":"Invalid candidate form"
            }
            return render(request,"voting/error.html",context)
            
    return HttpResponseRedirect(reverse("admin_dashboard"))


def approve_voter(request):
    pass