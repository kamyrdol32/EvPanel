import random
import string

from flask_mail import Message
from app import mail


def passwordGenerator(stringlength=16):
    letters = string.ascii_lowercase
    return "".join(random.choice(letters) for _ in range(stringlength))


def send_welcome_email(username, email, key):
    msg = Message("EvPanel - Potwierdzenie rejestracji", recipients=[email])
    msg.body = (
        "Witaj "
        + str(username)
        + "!\n\n"
        + "Aby potwierdzić rejestrację kliknij w poniższy link:\n\n"
        + "http://evpanel.pl/activate/"
        + str(key)
        + "\n"
        + "http://87.207.92.40:3000/activate/"
        + str(key)
        + "\n\n"
        + "Pozdrawiamy,\n"
        + "Zespół EvPanel"
    )
    mail.send(msg)
    return "Message sent!"
