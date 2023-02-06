from flask import Blueprint, jsonify

auth_blueprint = Blueprint('auth', __name__)

@auth_blueprint.route('/login', methods=['POST'])
def login():
    return jsonify({"msg": "Hello World!"}), 200

@auth_blueprint.route('/register', methods=['POST'])
def register():
    return jsonify({"msg": "Hello World!"}), 200