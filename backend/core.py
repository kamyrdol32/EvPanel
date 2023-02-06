from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

# App initialization
app = Flask(__name__)
app.config.from_object('config')
db = SQLAlchemy()
db.init_app(app)
CORS(app)

# Importing
import models
import api
import auth

# Registering blueprints
app.register_blueprint(api.api_blueprint, url_prefix='/api')
app.register_blueprint(auth.auth_blueprint, url_prefix='/api')

if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)
