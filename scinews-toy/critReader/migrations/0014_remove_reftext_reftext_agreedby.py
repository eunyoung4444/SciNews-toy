# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2018-03-29 22:06
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('critReader', '0013_question_question_madeat'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='reftext',
            name='reftext_agreedby',
        ),
    ]
