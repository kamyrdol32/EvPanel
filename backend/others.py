import random
import string
from flask_mail import Message

def passwordGenerator(stringlength=16):
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(stringlength))


def send_welcome_email(username, email, key):
    msg = Message("Hyped.pl - Potwierdzenie rejestracji", recipients=[email])
    msg.body = "Witaj " + str(username) + "!\n\n" + \
               "Aby potwierdzić rejestrację kliknij w poniższy link:\n\n" + \
               "http://hyped.pl/account/activate/" + str(key) + "\n" + \
               "http://87.207.92.40:3000/account/activate/" + str(key) + "\n\n" + \
               "Pozdrawiamy,\n" + \
               "Zespół Hyped.pl"
    app.mail.send(msg)
    return "Message sent!"