from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_mail import Mail
from flask_openapi3 import OpenAPI, Info, APIBlueprint
from flask_sqlalchemy import SQLAlchemy

# App initialization
info = Info(title="EvPanel API", version="1.0.0")
app = OpenAPI(__name__, info=info)
api_blueprint = APIBlueprint("api", __name__, url_prefix="/api/v1")
app.config.from_object("config")

jwt = JWTManager(app)
db = SQLAlchemy()
db.init_app(app)
mail = Mail(app)
CORS(app, supports_credentials=True)

# Importing
import api
import auth

# Registering blueprints
api_blueprint.register_api(auth.auth_blueprint)

# Register API
app.register_api(api_blueprint)

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
