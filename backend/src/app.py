from flask import jsonify
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_mail import Mail
from flask_openapi3 import OpenAPI, Info, APIBlueprint
from flask_sqlalchemy import SQLAlchemy
from flask_apscheduler import APScheduler

# App initialization
info = Info(title="EvPanel API", version="1.0.0")
app = OpenAPI(__name__, info=info)
app.config.from_pyfile("config.py")
api_blueprint = APIBlueprint("api", __name__, url_prefix="/api/v1")

CORS(app, supports_credentials=True)
jwt = JWTManager(app)
db = SQLAlchemy()
db.init_app(app)
mail = Mail(app)
bcrypt = Bcrypt(app)
scheduler = APScheduler()
scheduler.init_app(app)
scheduler.start()

# Importing
from .API.auth import auth_blueprint
from .API.job import job_blueprint
from .API.websites import websites_blueprint

# Registering blueprints
api_blueprint.register_api(auth_blueprint)
api_blueprint.register_api(job_blueprint)
api_blueprint.register_api(websites_blueprint)

# Register API
app.register_api(api_blueprint)


@app.route("/health_check")
def health_check():
    return jsonify("OK"), 200


with app.app_context():
    db.create_all()
