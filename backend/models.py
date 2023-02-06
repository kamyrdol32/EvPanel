from datetime import datetime

from core import db

class User(db.Model):
    __tablename__ = 'Users'
    ID = db.Column(db.Integer, primary_key=True)
    Email = db.Column(db.String(128), unique=True, nullable=False)
    Username = db.Column(db.String(128), unique=True, nullable=False)
    Password = db.Column(db.String(128), nullable=False)
    Phone = db.Column(db.String(128), nullable=True)
    Created_Date = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, Email, Username, Password):
        self.Email = Email
        self.Username = Username
        self.Password = Password

    def __repr__(self):
        return '<User %r>' % self.Username


class Servers(db.Model):
    __tablename__ = 'Servers'
    ID = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String(128), nullable=False)
    Server_ID = db.Column(db.String(128), nullable=False)
    Created_Date = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, Name, Server_ID):
        self.Name = Name
        self.Server_ID = Server_ID

    def __repr__(self):
        return '<Server %r>' % self.Name