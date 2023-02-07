from datetime import datetime

from core import db
from core import app

class Users(db.Model):
    __tablename__ = 'Users'
    ID = db.Column(db.Integer, primary_key=True)
    Email = db.Column(db.String(128), unique=True, nullable=False)
    Username = db.Column(db.String(128), unique=True, nullable=False)
    Password = db.Column(db.String(128), nullable=False)
    Role = db.relationship('Roles', backref='Users', lazy=True)
    Avatar = db.Column(db.Text(10000000), unique=False, nullable=True)
    Created_Date = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, Email, Username, Password):
        self.Email = Email
        self.Username = Username
        self.Password = Password

    def __repr__(self):
        return '<User %r>' % self.Username


class Roles(db.Model):
    __tablename__ = 'Roles'
    ID = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String(128), unique=True, nullable=False)
    User_ID = db.Column(db.Integer, db.ForeignKey('Users.ID'), nullable=False)
    Created_Date = db.Column(db.DateTime, default=datetime.utcnow)


    def __init__(self, Name, User_ID):
        self.Name = Name
        self.User_ID = User_ID

    def __repr__(self):
        return '<Role %r>' % self.Name


class Logs(db.Model):
    __tablename__ = 'Logs'
    ID = db.Column(db.Integer, primary_key=True)
    User_ID = db.Column(db.Integer, db.ForeignKey('Users.ID'), nullable=False)
    Message = db.Column(db.String(128), nullable=False)
    Created_Date = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, User_ID, Message):
        self.User_ID = User_ID
        self.Message = Message

    def __repr__(self):
        return '<Log %r>' % self.Message