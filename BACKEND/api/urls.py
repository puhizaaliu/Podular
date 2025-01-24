from django.urls import path
from . import views
from .views import creator_register
from rest_framework import routers
from .views import creator_detail


router=routers.DefaultRouter()
router.register('address', views.CustomerAddressViewSet)
router.register('podcastrating', views.PodcastRatingViewSet)

urlpatterns = [
    #Creators
    path('creator/', views.CreatorList.as_view()),
    path('creator/<int:id>/', creator_detail, name='creator-detail'),
    path('creators/<int:pk>', views.CreatorDetails.as_view()),
    path('creators/register', creator_register, name='creator_register'),
    path('creators/login', views.creator_login, name='creator_login'),

    #Podcast Categories 
    path('categories/', views.CategoryList.as_view()),
    path('category/<int:pk>', views.CategoryDetail.as_view()),
    #Podcasts
    path('podcasts/', views.PodcastList.as_view()),
    path('podcast/<int:pk>', views.PodcastDetail.as_view()),
    path('podcast-imgs/', views.PodcastImgsList.as_view()),
    path('podcast-imgs/<int:podcast_id>', views.PodcastImgsDetail.as_view()),
    path('podcast-img/<int:pk>', views.PodcastImgDetail.as_view()),
    #Customers
    path('customers/', views.CustomerList.as_view()),
    path('customers/<int:pk>', views.CustomerDetail.as_view()),
    path('user/<int:pk>', views.UserDetail.as_view()),
    path('customer/login/', views.customer_login,name='customer_login'),
    path('customer/register/', views.customer_register,name='customer_register'),
    path('customers/<int:pk>/address-list', views.CustomerAddressList.as_view()),
    path('mark-default-address/<int:pk>/', views.mark_default_address,name='mark_default_address'),
    path('customer/dashboard/<int:pk>/', views.customer_dashboard, name='customer_dashboard'),

    #Subscriptions
    path('subscriptions/', views.SubscriptionPodcastsList.as_view()),
    path('subscriptions/<int:pk>', views.SubscriptionPodcastsList.as_view()),
    

]

urlpatterns+=router.urls
