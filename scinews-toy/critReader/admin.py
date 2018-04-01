from django.contrib import admin
from .models import Article, Question, RefText, Research
# Register your models here.


admin.site.register(Article)
admin.site.register(Question)
admin.site.register(Research)
admin.site.register(RefText)
