from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse
from .models import Instagram
from .forms import InstagramForm


def create(request):
    akun_form = InstagramForm(request.POST or None)

    if request.method == 'POST':
        if akun_form.is_valid():
            akun_form.save()
            return redirect('sosmed:list')

    context = {
        "page_title": "Add Member",
        "akun_form": akun_form,
    }
    return render(request, 'sosmed/create.html', context)


def list(request):
    semua_akun = Instagram.objects.all()
    context = {
        "page_title": "Team Members",
        "semua_akun": semua_akun,
    }
    return render(request, 'sosmed/list.html', context)


def update(request, update_id):
    akun_update = get_object_or_404(Instagram, id=update_id)

    akun_form = InstagramForm(
        request.POST or None,
        instance=akun_update
    )

    if request.method == 'POST':
        if akun_form.is_valid():
            akun_form.save()
            return redirect('sosmed:list')

    context = {
        "page_title": "Update Member",
        "akun_form": akun_form,
    }
    return render(request, 'sosmed/create.html', context)


def delete(request, delete_id):
    try:
        Instagram.objects.get(id=delete_id).delete()
        if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
            return JsonResponse({'success': True})
    except Instagram.DoesNotExist:
        if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
            return JsonResponse({'success': False, 'error': 'Not found'}, status=404)
    return redirect('sosmed:list')