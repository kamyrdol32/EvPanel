from core import db
from models import Logs

def log(User_ID, Message):
    print("[LOG] USER ID: " + str(User_ID) + " - " + Message)
    log = Logs(User_ID=User_ID, Message=Message)
    db.session.add(log)
    db.session.commit()