# Generated by Django 3.0.5 on 2021-01-14 06:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('voting', '0003_candidate'),
    ]

    operations = [
        migrations.AlterField(
            model_name='candidate',
            name='picture',
            field=models.ImageField(blank=True, null=True, upload_to='images/candidates/'),
        ),
        migrations.AlterField(
            model_name='user',
            name='phone',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
