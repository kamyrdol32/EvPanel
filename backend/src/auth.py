from datetime import datetime, timezone, timedelta

from flask import jsonify, request
from flask_cors import cross_origin
from flask_jwt_extended import (
    create_access_token,
    set_access_cookies,
    unset_jwt_cookies,
    get_jwt_identity,
    get_jwt,
    jwt_required,
)
from flask_openapi3 import APIBlueprint

from .app import db, bcrypt
from .models import Users
from .others import passwordGenerator, send_welcome_email

auth_blueprint = APIBlueprint("auth", __name__, url_prefix="/auth")


@auth_blueprint.post("/user/register")
@cross_origin()
def register():
    try:
        email = request.json.get("email")
        username = request.json.get("username")
        password = request.json.get("password")
        confirmPassword = request.json.get("confirmPassword")

        if not email or not password or not confirmPassword or not username:
            return jsonify({"error": "Please fill all fields"}), 400

        if password != confirmPassword:
            return jsonify({"error": "Passwords do not match"}), 400

        if len(password) < 6 or len(confirmPassword) < 6:
            return (
                jsonify({"error": "Password must be at least 6 characters long"}),
                400,
            )

        if Users.query.filter_by(email=email).first():
            return jsonify({"error": "Email already exists"}), 400

        if Users.query.filter_by(username=username).first():
            return jsonify({"error": "Username already exists"}), 400

        # Hashing password
        key = passwordGenerator(username)

        password_hashed = password + key
        password_hashed = bcrypt.generate_password_hash(password_hashed).decode("utf-8")

        user = Users(
            email=email, username=username, password=str(password_hashed), key=key
        )
        if user:
            db.session.add(user)
            db.session.commit()
            send_welcome_email(username, email, key)

            return (
                jsonify(
                    {"message": "User created successfully. Please confirm your email."}
                ),
                200,
            )

    except Exception as error:
        print(error)
        return jsonify({"error": str(error)}), 400


@auth_blueprint.get("/user/login")
@cross_origin()
def login():
    try:
        email = request.args.get("email")
        password = request.args.get("password")

        if not email or not password:
            return jsonify({"error": "Please fill all fields"}), 400

        user = Users.query.filter_by(email=email).first()

        if not user:
            return jsonify({"error": "User does not exist"}), 400

        if not user.is_active:
            return jsonify({"error": "User is not active"}), 400

        # Hashing password
        key = user.key
        password_hashed = password + key

        if not bcrypt.check_password_hash(user.password, password_hashed):
            return jsonify({"error": "Invalid password"}), 400

        # Create the tokens we will be sending back to the user
        access_token = create_access_token(identity=user.username)
        response = jsonify(
            {
                "message": "Login successful",
                "user": user.username,
                "avatar": user.avatar,
            }
        )
        set_access_cookies(response, access_token)

        return response, 200

    except Exception as error:
        return jsonify({"error": str(error)}), 400


@auth_blueprint.get("/logout")
@cross_origin()
def logout():
    try:
        response = jsonify({"info": "Logout successful"})
        unset_jwt_cookies(response)
        return response, 200

    except Exception as error:
        return jsonify({"error": str(error)}), 400


@auth_blueprint.get("/activate")
@cross_origin()
def activate(key=None):
    try:
        key = request.args.get("KEY")

        user = Users.query.filter_by(key=key).first()

        if not user:
            return jsonify({"error": "User does not exist"}), 400

        if user.is_active:
            return jsonify({"error": "User is already active"}), 400

        user.is_active = True
        db.session.commit()
        return jsonify({"message": "User activated successfully"}), 200

    except Exception as error:
        return jsonify({"error": str(error)}), 400


@auth_blueprint.post("/isAuthenticated")
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
