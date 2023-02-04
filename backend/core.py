from flask import Flask, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

import api

app = Flask(__name__)
app.config.from_object('config')

app.register_blueprint(api.api_blueprint, url_prefix='/api')

db = SQLAlchemy()
db.init_app(app)
CORS(app)

@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'

@app.route('/test')
def test():
    return jsonify({'message': 'test'})

if __name__ == '__main__':
    app.run()

