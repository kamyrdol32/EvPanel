from datetime import datetime

from .app import app, db


class Users(db.Model):
    __tablename__ = "Users"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(128), unique=True, nullable=False)
    username = db.Column(db.String(128), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    role = db.relationship("Roles", backref="Users", lazy=True)
    avatar = db.Column(db.Text(10000000), unique=False, nullable=True)
    key = db.Column(db.String(32), nullable=False)
    is_active = db.Column(db.Boolean(), default=False, nullable=False)
    created_data = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, email, username, password, key):
        self.email = email
        self.username = username
        self.password = password
        self.key = key

    def __repr__(self):
        return "<User %r>" % self.Username


class Roles(db.Model):
    __tablename__ = "Roles"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), unique=True, nullable=False)
    user_ide = db.Column(db.Integer, db.ForeignKey("Users.id"), nullable=False)
    created_data = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, name, user_ide):
        self.name = name
        self.user_ide = user_ide

    def __repr__(self):
        return "<Role %r>" % self.Name


class Jobs(db.Model):
    __tablename__ = "Jobs"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("Users.id"), nullable=False)
    name = db.Column(db.String(128), unique=False, nullable=False)
    company = db.Column(db.String(128), unique=False, nullable=False)
    url = db.Column(db.String(128), unique=False, nullable=False)
    created_data = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, name, company, url, user_id):
        self.name = name
        self.company = company
        self.url = url
        self.user_id = user_id


    def __repr__(self):
        return "<Jobs %r>" % self.Name
