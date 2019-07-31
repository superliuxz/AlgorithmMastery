"""algo_mastery URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin

from algo_mastery.views import OneQuestion, AllQuestions, Health

urlpatterns = [
    url(r'^admin/?', admin.site.urls),
    url(r'^api/health/?$', Health.as_view(), name='health'),
    url(r'^api/all-questions/?$', AllQuestions.as_view(),
        name='get-all-questions'),
    url(r'^api/one-question/?$', OneQuestion.as_view(),
        name='put-one-question'),
    url(r'^api/one-question/(?P<question_id>[^/]*)/?$', OneQuestion.as_view(),
        name='update-one-question'),
]
