# Generated by Django 3.0.5 on 2021-01-14 19:41

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('voting', '0008_auto_20210114_1436'),
    ]

    operations = [
        migrations.AlterField(
            model_name='candidate',
            name='votes',
            field=models.ManyToManyField(blank=True, null=True, related_name='candidates', to=settings.AUTH_USER_MODEL),
        ),
    ]
