from django.db import models


class Instagram(models.Model):
    nama_depan = models.CharField(max_length=100, verbose_name="First Name")
    nama_belakang = models.CharField(max_length=100, verbose_name="Last Name")
    username = models.CharField(max_length=100, verbose_name="Username")

    def __str__(self):
        return f"{self.id}.{self.username}"