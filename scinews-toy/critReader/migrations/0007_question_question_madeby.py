# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2018-03-18 16:19
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('critReader', '0006_question_question_article'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='question_madeby',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]