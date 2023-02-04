from flask import Blueprint, jsonify
import core

api_blueprint = Blueprint('api', __name__)


@api_blueprint.route('/db/create', methods=['GET'])
def create_db():
    with core.app.app_context():
        core.db.create_all()
    return jsonify({"msg": "Database created successfully"}), 200
