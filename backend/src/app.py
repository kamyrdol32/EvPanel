from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_mail import Mail
from flask_openapi3 import OpenAPI, Info, APIBlueprint
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# App initialization
info = Info(title="EvPanel API", version="1.0.0")
app = OpenAPI(__name__, info=info)
app.config.from_pyfile("config.py")
api_blueprint = APIBlueprint("api", __name__, url_prefix="/api/v1")

jwt = JWTManager(app)
db = SQLAlchemy()
db.init_app(app)
mail = Mail(app)
CORS(app, supports_credentials=True)
bcrypt = Bcrypt(app)

# Importing
from .API.auth import auth_blueprint
from .API.job import job_blueprint

# Registering blueprints
api_blueprint.register_api(auth_blueprint)
api_blueprint.register_api(job_blueprint)

# Register API
app.register_api(api_blueprint)

with app.app_context():
    db.create_all()
