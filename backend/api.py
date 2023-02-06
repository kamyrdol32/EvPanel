from flask import Blueprint, jsonify

from core import db, app

api_blueprint = Blueprint('api', __name__)


@api_blueprint.route('/db/create', methods=['GET'])
def create_db():
    with app.app_context():
        db.create_all()
    return jsonify({"msg": "Database created successfully"}), 200

@api_blueprint.route('/test', methods=['GET'])
def test():
    return jsonify({"msg": "Hello World!"}), 200