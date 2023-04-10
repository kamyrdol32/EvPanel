import hashlib
import random

from flask_mail import Message, Mail

mail = Mail()


def passwordGenerator(username):
    hashedEmail = hashlib.md5(str(username).encode("utf-8")).hexdigest()
    return hashedEmail


def send_welcome_email(username, email, key):
    msg = Message("EvPanel - Potwierdzenie rejestracji", recipients=[email])
    msg.body = (
        "Witaj "
        + str(username)
        + "!\n\n"
        + "Aby potwierdzić rejestrację kliknij w poniższy link:\n\n"
        + "https://evpanel.kamilzeglen.pl/activate/"
        + str(key)
        + "\n\n"
        + "Pozdrawiamy,\n"
        + "Zespół EvPanel"
    )
    mail.send(msg)
    return "Message sent!"
