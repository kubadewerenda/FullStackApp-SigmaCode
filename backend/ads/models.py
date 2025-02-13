from django.db import models
from django.core.validators import RegexValidator
from django.core.exceptions import ValidationError

# Create your models here.
class Advertisement(models.Model):
    STATUS_CHOICES = (
        ('active', 'Aktywne'),
        ('inactive', 'Nieaktywne'),
    )

    CATEGORY_CHOICES = (
        ('tech', 'Technologia'),
        ('real_estate', 'Nieruchomości'),
        ('jobs', 'Praca'),
        ('others', 'Inne'),
    )

    title = models.CharField(max_length=200, blank=False)
    content = models.TextField(blank=False)
    date_added = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='active')
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    author = models.CharField(max_length=100, blank=False)
    contact = models.CharField(
        max_length=100,
        validators=[
            RegexValidator(
                regex=r'^(\+?\d{9,15}|[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,})$',
                message='Podaj numer telefonu lub adres email!',
            )
        ],
    )
    image = models.ImageField(upload_to='advertisements/', blank=True, null=True)
    
    def __str__(self):
        return self.title