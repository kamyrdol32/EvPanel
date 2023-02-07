import hashlib
from datetime import datetime, timezone, timedelta

from flask import Blueprint, jsonify, request
from flask_cors import cross_origin, CORS
from flask_jwt_extended import create_access_token, set_access_cookies, create_refresh_token, set_refresh_cookies, \
    unset_jwt_cookies, get_jwt_identity, get_jwt, jwt_required

import api
from models import Users, Logs
from core import db, app
from logs import log

auth_blueprint = Blueprint('auth', __name__)


@auth_blueprint.route('/register', methods=['POST'])
@cross_origin()
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

        if Users.query.filter_by(Email=email).first():
            return jsonify({"error": "Email already exists"}), 400

        if Users.query.filter_by(Username=username).first():
            return jsonify({"error": "Username already exists"}), 400

        user = Users(Email=email, Username=username, Password=hashlib.sha256(password.encode()).hexdigest())
        if user:
            db.session.add(user)
            db.session.commit()

            # Logs
            log(user.ID, "User logged in")


            # Create access token
            access_token = create_access_token(identity=user.Username)
            response = jsonify({"message": "User created successfully", "user": user.Username ,"avatar": user.Avatar})
            set_access_cookies(response, access_token)

            return response, 200

    except Exception as error:
        return jsonify({"error": str(error)}), 400


@auth_blueprint.route('/login', methods=['POST'])
@cross_origin()
def login():
    try:
        email = request.json.get('email')
        password = request.json.get('password')

        if not email or not password:
            return jsonify({"error": "Please fill all fields"}), 400

        user = Users.query.filter_by(Email=email).first()

        if not user:
            return jsonify({"error": "User does not exist"}), 400

        if user.Password != hashlib.sha256(password.encode()).hexdigest():
            return jsonify({"error": "Invalid password"}), 400

        # Logs
        log(user.ID, "User logged in")

        # Create the tokens we will be sending back to the user
        access_token = create_access_token(identity=user.Username)
        response = jsonify({"message": "Login successful", "user": user.Username ,"avatar": user.Avatar})
        set_access_cookies(response, access_token)

        return response, 200

    except Exception as error:
        return jsonify({"error": str(error)}), 400


@auth_blueprint.route('/logout', methods=['POST'])
@cross_origin()
def logout():
    try:
        response = jsonify({"info": "Logout successful"})
        unset_jwt_cookies(response)
        return response, 200

    except Exception as error:
        return jsonify({"error": str(error)}), 400


@auth_blueprint.route('/isAuthenticated', methods=['POST'])
@cross_origin()
@jwt_required()
def isAuthenticated():
    try:
        if get_jwt_identity():
            return jsonify({"user": get_jwt_identity()}), 200
        else:
            return jsonify({"dev": "User is not authenticated"}), 400

    except Exception as error:
        return jsonify({"error": str(error)}), 400


@auth_blueprint.after_request
@api.api_blueprint.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=15))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            set_access_cookies(response, access_token)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original response
        return response