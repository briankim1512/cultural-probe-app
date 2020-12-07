# Generated by Django 2.2.17 on 2020-11-17 19:07

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('src', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='EmotionLog',
            fields=[
                ('rid', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('uuid', models.UUIDField()),
                ('emotion', models.TextField()),
                ('datetime', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]