from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from . import serializers
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .serializers import AdminTokenObtainPairSerializer
from rest_framework import generics, permissions, viewsets, pagination
from . import models
from django.db import IntegrityError
from django.contrib.auth.models import User 
from django.contrib.auth import authenticate
from .models import Creator
from django.shortcuts import get_object_or_404
import logging

#Creators
class CreatorList(generics.ListCreateAPIView):
    queryset=models.Creator.objects.all()
    serializer_class=serializers.CreatorSerializer

class CreatorDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Creator.objects.all()
    serializer_class=serializers.CreatorDetailSerializer
    
def creator_detail(request, id):
    creator = get_object_or_404(Creator, pk=id)
    return JsonResponse({
        'id': creator.id,
        'username': creator.user.username,
        'address': creator.address
        # add other fields as needed
    })

@csrf_exempt
def creator_register(request):
    if request.method == "POST":
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        mobile = request.POST.get('mobile')
        email = request.POST.get('email')
        address = request.POST.get('address')
        username = request.POST.get('username')
        password = request.POST.get('password')

        try:
            # Create user with hashed password and other relevant fields
            user = User.objects.create_user(
                first_name=first_name,
                last_name=last_name,
                email=email,
                username=username,
                password=password  # Automatically hashes the password
            )
            # Create the creator profile linked to the user
            creator = models.Creator.objects.create(
                user=user,
                mobile=mobile,
                address=address
            )
            return JsonResponse({
                'bool': True,
                'user': user.id,
                'creator': creator.id,
                'msg': 'You have successfully registered. You can log in now!'
            })

        except IntegrityError as e:
            if 'username' in str(e):
                return JsonResponse({
                    'bool': False,
                    'msg': 'Username already exists!'
                })
            elif 'mobile' in str(e):
                return JsonResponse({
                    'bool': False,
                    'msg': 'Mobile already is registered!'
                })
            else:
                return JsonResponse({
                    'bool': False,
                    'msg': 'Something went wrong!'
                }, status=400)

    return JsonResponse({
        'bool': False,
        'msg': 'Invalid request'
    }, status=400)

@csrf_exempt
def creator_login(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(username=username, password=password)

        if user:
            try:
                creator = models.Creator.objects.get(user=user)
                msg = {
                    'bool': True,
                    'user': user.username,
                    'id': creator.id
                }
                return JsonResponse(msg)  # Ensure response is returned here
            except models.Creator.DoesNotExist:
                # Handle case where user is authenticated but no creator is associated
                return JsonResponse({
                    'bool': False,
                    'msg': 'No creator associated with this user'
                }, status=404)
        else:
            msg = {
                'bool': False,
                'msg': 'Invalid username or password'
            }
            return JsonResponse(msg, status=401)  # Use appropriate status for unauthorized access

    else:
        # Handle incorrect request method
        return JsonResponse({
            'msg': 'Invalid request method'
        }, status=405)

#Podcasts
class PodcastList(generics.ListCreateAPIView):
    queryset=models.Podcast.objects.all()
    serializer_class=serializers.PodcastListSerializer
    pagination_class=pagination.PageNumberPagination

    def get_queryset(self):
        qs=super().get_queryset()
        if 'category' in self.request.GET:
            category=self.request.GET['category']
            category=models.PodcastCategory.objects.get(id=category)
            qs=qs.filter(category=category)
        if 'fetch_limit' in self.request.GET:
            limit=int(self.request.GET['fetch_limit'])
            qs=qs[:limit]
        return qs

class PodcastDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Podcast.objects.all()
    serializer_class=serializers.PodcastDetailSerializer

class PodcastRatingViewSet(viewsets.ModelViewSet):
    serializer_class=serializers.PodcastRatingSerializer
    queryset=models.PodcastRating.objects.all() 
   
class PodcastImgsList(generics.ListCreateAPIView):
    queryset=models.PodcastImage.objects.all()
    serializer_class=serializers.PodcastImageSerializer
    
class PodcastImgsDetail(generics.ListCreateAPIView):
    queryset=models.PodcastImage.objects.all()
    serializer_class=serializers.PodcastImageSerializer
    
    def get_queryset(self):
        qs=super().get_queryset()
        podcast_id=self.kwargs['podcast_id']
        qs=qs.filter(podcast_id=podcast_id)
        return qs
    
class PodcastImgDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.PodcastImage.objects.all()
    serializer_class=serializers.PodcastImageSerializer

#Customers
class CustomerList(generics.ListCreateAPIView):
    queryset=models.Customer.objects.all()
    serializer_class=serializers.CustomerSerializer

class CustomerDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Customer.objects.all()
    serializer_class=serializers.CustomerDetailSerializer

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.User.objects.all()
    serializer_class=serializers.UserSerializer

logger = logging.getLogger(__name__)

@csrf_exempt
def customer_login(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        logger.debug(f"Received username: {username}, password: {password}")

        user = authenticate(username=username, password=password)
        if user:
            try:
                customer = models.Customer.objects.get(user=user)
                msg = {
                    'bool': True,
                    'user': user.username,
                    'id': customer.id
                }
                logger.debug(f"Authentication successful: {msg}")
                return JsonResponse(msg)  # Ensure response is returned here
            except models.Customer.DoesNotExist:
                logger.error("No customer associated with this user")
                # Handle case where user is authenticated but no customer is associated
                return JsonResponse({
                    'bool': False,
                    'msg': 'No customer associated with this user'
                }, status=404)
        else:
            logger.debug("Authentication failed")
            msg = {
                'bool': False,
                'msg': 'Invalid username or password'
            }
            return JsonResponse(msg, status=401)  # Use appropriate status for unauthorized access
    else:
        # Handle incorrect request method
        logger.error("Invalid request method")
        return JsonResponse({
            'msg': 'Invalid request method'
        }, status=405)


@csrf_exempt
def customer_register(request):
    first_name = request.POST.get('first_name')
    last_name = request.POST.get('last_name')
    email = request.POST.get('email')
    mobile = request.POST.get('mobile')
    username = request.POST.get('username')
    password = request.POST.get('password')

    if not username:
        return JsonResponse({'bool': False, 'msg': 'Username must be provided'}, status=400)

    # Create user with hashed password
    user = User.objects.create_user(
        username=username,
        email=email,
        password=password,  # Use create_user to hash the password
        first_name=first_name,
        last_name=last_name,
    )

    if user:
        customer = models.Customer.objects.create(
            user=user,
            mobile=mobile
        )
        msg = {
            'bool': True,
            'user_id': user.id,
            'customer_id': customer.id,
            'msg': 'Thank you for your registration! You can login now.'
        }
    else:
        msg = {
            'bool': False,
            'msg': 'Invalid data!',
        }
    return JsonResponse(msg)


class CustomerAddressViewSet(viewsets.ModelViewSet):
    serializer_class=serializers.CustomerAddressSerializer
    queryset=models.CustomerAddress.objects.all()
    
class CustomerAddressList(generics.ListAPIView):
    queryset=models.CustomerAddress.objects.all()
    serializer_class=serializers.CustomerAddressSerializer

    def get_queryset(self):
        qs=super().get_queryset()
        customer_id=self.kwargs['pk']
        qs=qs.filter(customer__id=customer_id).order_by('id')
        return qs
    
@csrf_exempt
def mark_default_address(request,pk):
    if request.method=='POST':
        address_id=request.POST.get('address_id')
        models.CustomerAddress.objects.all().update(default_address=False)
        res=models.CustomerAddress.objects.filter(id=address_id).update(default_address=True)
        msg={
            'bool':False
        }
        if res:
            msg={
            'bool':True
        }
    return JsonResponse(msg)

def customer_dashboard(request,pk):
    customer_id=pk
    # totalOrders=models.Order.objects.filter(customer__id=customer_id).count()
    # totalWishlist=models.Wishlist.objects.filter(customer__id=customer_id).count()
    totalAddress=models.CustomerAddress.objects.filter(customer__id=customer_id).count()
    msg={
        # 'totalOrders':totalOrders,
        # 'totalWishlist':totalWishlist,
        'totalAddress':totalAddress,
    }
    return JsonResponse(msg)

class AdminTokenObtainPairView(TokenObtainPairView):
    serializer_class = AdminTokenObtainPairSerializer

#Subscriptions
class SubscriptionPodcastsList(generics.ListCreateAPIView):
    queryset=models.SubscriptionPodcasts.objects.all()
    serializer_class=serializers.SubscriptionPodcastsSerializer

class SubscriptionPodcasts(generics.ListAPIView):
   # queryset=models.Subscription.objects.all()
    serializer_class=serializers.SubscriptionPodcastsSerializer

    def get_queryset(self):
        subscription_id=self.kwargs['pk']
        subscription=models.Subscription.objects.get(id=subscription_id)
        subscription_podcasts=models.SubscriptionPodcasts.objects.filter(subscription=subscription)
        return subscription_podcasts

#Category List API
class CategoryList(generics.ListCreateAPIView):
   queryset = models.PodcastCategory.objects.all()
   serializer_class=serializers.CategorySerializer 


class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
   queryset= models.PodcastCategory.objects.all()
   serializer_class=serializers.CategoryDetailSerializer



