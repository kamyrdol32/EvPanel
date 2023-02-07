import hashlib

from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required

from models import Users
from core import db, app

api_blueprint = Blueprint('api', __name__)


@api_blueprint.route('/db/create', methods=['GET'])
def create_db():
    with app.app_context():
        db.create_all()

    user = Users(Email="admin", Username="admin", Password=hashlib.sha256("admin".encode()).hexdigest())
    if user:
        db.session.add(user)
        db.session.commit()

    return jsonify({"msg": "Database created successfully"}), 200

@api_blueprint.route('/test', methods=['POST'])
@jwt_required()
def test():
    return jsonify({"message": "Hello World!"}), 200