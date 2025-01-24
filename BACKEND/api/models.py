from django.db import models 
from django.contrib.auth.models import User


# Creator Model
class Creator (models.Model):
    id=models.AutoField(primary_key=True)
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    mobile=models.PositiveBigIntegerField(unique=True, null=True)
    address=models.TextField(null=True)
    profile_img=models.ImageField(upload_to='seller/imgs/', null=True)

    def __str__ (self):
            return self.user.username
    
#Category
class PodcastCategory (models.Model):
        title=models.CharField(max_length=200)
        detail=models.TextField(null=True)

        def __str__ (self):
            return self.title
        
#Podcast 
class Podcast (models.Model):
        category=models.ForeignKey(PodcastCategory, on_delete=models.SET_NULL, null=True, related_name='category_podcast')
        creator=models.ForeignKey(Creator, on_delete=models.SET_NULL, null=True)
        title=models.CharField(max_length=200)
        detail=models.TextField(null=True)

        def __str__ (self):
            return self.title
        
class Customer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    mobile = models.PositiveBigIntegerField()
    profile_img = models.ImageField(upload_to='customer_imgs/', null=True, blank=True)

    def __str__(self):
        return self.user.username

class CustomerAddress(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='addresses')
    address = models.TextField()
    default_address = models.BooleanField(default=False)

    def __str__(self):
        return self.address



 # Podcast Rating and Reviews 
class PodcastRating(models.Model):
    customer=models.ForeignKey(Customer,on_delete=models.CASCADE,related_name='rating_customers')
    podcast=models.ForeignKey(Podcast,on_delete=models.CASCADE, related_name='podcast_ratings')
    rating=models.IntegerField()
    reviews=models.TextField()
    add_time=models.DateTimeField(auto_now_add=True)

    def __str__(self):
          return f'{self.rating} - {self.reviews}'

# Podcast Images Model
class PodcastImage(models.Model):
    podcast=models.ForeignKey(Podcast,on_delete=models.CASCADE,related_name='podcast_img')
    image=models.ImageField(upload_to='podcast_imgs/',null=True)
    
    def __str__(self):
          return self.image.url
           
#Subscription Model
class Subscription(models.Model):
    customer=models.ForeignKey(Customer,on_delete=models.CASCADE,)
    subscription_time=models.DateTimeField(auto_now_add=True)
    
#Subscription Items Model
class SubscriptionPodcasts(models.Model):
    subscription=models.ForeignKey(Customer,on_delete=models.CASCADE, related_name='subscription_podcasts')
    podcast=models.ForeignKey(Podcast,on_delete=models.CASCADE)

    def __str__(self):
        return self.podcast.title

