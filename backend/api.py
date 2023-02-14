import hashlib

from flask import Blueprint, jsonify

from models import Users
from app import db, app

api_blueprint = Blueprint('api', __name__)
