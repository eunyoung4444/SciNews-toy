# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2018-03-18 16:01
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('critReader', '0005_auto_20180318_1428'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='question_article',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='critReader.Article'),
            preserve_default=False,
        ),
    ]