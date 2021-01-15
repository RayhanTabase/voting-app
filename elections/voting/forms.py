from django import forms


class Phone_form(forms.Form):
    phone = forms.CharField(max_length=20)

    def clean_phone(self):
        pass