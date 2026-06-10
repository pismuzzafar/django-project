from django import forms
from .models import Instagram


class InstagramForm(forms.ModelForm):
    class Meta:
        model = Instagram
        fields = ['nama_depan', 'nama_belakang', 'username']
        widgets = {
            'nama_depan': forms.TextInput(attrs={
                'class': 'form-input',
                'placeholder': 'Enter first name',
                'id': 'firstName',
            }),
            'nama_belakang': forms.TextInput(attrs={
                'class': 'form-input',
                'placeholder': 'Enter last name',
                'id': 'lastName',
            }),
            'username': forms.TextInput(attrs={
                'class': 'form-input',
                'placeholder': 'Enter username',
                'id': 'username',
            }),
        }
        labels = {
            'nama_depan': 'First Name',
            'nama_belakang': 'Last Name',
            'username': 'Username',
        }