import hashlib
from flask import Blueprint, jsonify, request
from flask_cors import cross_origin, CORS
from flask_jwt_extended import create_access_token, set_access_cookies

from models import User
from core import db, app

auth_blueprint = Blueprint('auth', __name__)


@auth_blueprint.route('/register', methods=['POST'])
@cross_origin(supports_credentials=True)
def register():
    try:
        email = request.json.get('email')
        username = request.json.get('username')
        password = request.json.get('password')
        confirmPassword = request.json.get('confirmPassword')

        if not email or not password or not confirmPassword or not username:
            return jsonify({"error": "Please fill all fields"}), 400

        if password != confirmPassword:
            return jsonify({"error": "Passwords do not match"}), 400

        if len(password) < 6 or len(confirmPassword) < 6:
            return jsonify({"error": "Password must be at least 6 characters long"}), 400

        if User.query.filter_by(Email=email).first():
            return jsonify({"error": "Email already exists"}), 400

        if User.query.filter_by(Username=username).first():
            return jsonify({"error": "Username already exists"}), 400

        user = User(Email=email, Username=username, Password=hashlib.sha256(password.encode()).hexdigest())
        if user:
            db.session.add(user)
            db.session.commit()

        # Create access token
        access_token = create_access_token(identity=username)
        response = jsonify({"message": "User created successfully"})
        set_access_cookies(response, access_token)

        return response, 200

    except Exception as error:
        return jsonify({"error": str(error)}), 400



@auth_blueprint.route('/login', methods=['POST'])
@cross_origin(supports_credentials=True)
def login():
    try:
        email = request.json.get('email')
        password = request.json.get('password')

        if not email or not password:
            return jsonify({"error": "Please fill all fields"}), 400

        user = User.query.filter_by(Email=email).first()

        if not user:
            return jsonify({"error": "User does not exist"}), 400

        if user.Password != hashlib.sha256(password.encode()).hexdigest():
            return jsonify({"error": "Invalid password"}), 400

        # Create access token
        access_token = create_access_token(identity=user.Username)
        response = jsonify({"message": "Login successful"})
        set_access_cookies(response, access_token)
        return response, 200

    except Exception as error:
        return jsonify({"error": str(error)}), 400