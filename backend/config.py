###
# Change name of config file to config.py
###

from datetime import timedelta
from dotenv import load_dotenv
import os

load_dotenv()

# Project
PROJECT_NAME = "EvPanel"
PROJECT_VERSION = "0.1.0"
PROJECT_DESCRIPTION = ""
PROJECT_AUTHOR = "Kamil Żegleń"

# Flask
TESTING = True
DEBUG = True
FLASK_ENV = 'development'
SECRET_KEY = os.getenv("SECRET_KEY")
JSON_SORT_KEYS = False

# SQLALCHEMY
SQLALCHEMY_DATABASE_URI = os.getenv("SQLALCHEMY_DATABASE_URI")
SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_POOL_SIZE = 50000
SQLALCHEMY_MAX_OVERFLOW = 50000

# JWT
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
JWT_TOKEN_LOCATION = ['cookies']
JWT_COOKIE_CSRF_PROTECT = True
JWT_COOKIE_SECURE = False
JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=5)

# CORS
CORS_HEADERS = 'Content-Type'