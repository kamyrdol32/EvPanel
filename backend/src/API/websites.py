import requests

from flask import jsonify, request
from flask_cors import cross_origin
from flask_openapi3 import APIBlueprint

from ..app import db
from ..models import Websites

websites_blueprint = APIBlueprint("website", __name__, url_prefix="/website")


@websites_blueprint.get("/get")
@cross_origin()
def get_websites():
    websites = Websites.query.all()
    Data = []

    for website in websites:
        Data.append(
            {
                "id": website.id,
                "name": website.name,
                "url": website.url,
                "status_backend": website.status_backend,
                "status_frontend": website.status_frontend,
            }
        )

    return jsonify(Data), 200


@websites_blueprint.get("/refresh")
def refresh_websites():
    website = Websites.query.all()
    Data = []

    for website in website:
        # Backend

        try:
            if website.endpoint_backend and website.endpoint_backend != "localhost":
                response = requests.get(website.endpoint_backend)
                if response.status_code == 200:
                    website.status_backend = "Online"
                else:
                    website.status_backend = "Offline"
            elif website.endpoint_backend == "localhost":
                website.status_backend = "Online"
            else:
                website.status_backend = "None"

        except Exception as error:
            website.status_backend = "Offline"

        # Frontend

        try:
            if website.endpoint_frontend:
                response = requests.get(website.endpoint_frontend)
                if response.status_code == 200:
                    website.status_frontend = "Online"
                else:
                    website.status_frontend = "Offline"
            else:
                website.status_frontend = "None"

        except Exception as error:
            website.status_frontend = "Offline"

        db.session.add(website)
        db.session.commit()

    return get_websites()
