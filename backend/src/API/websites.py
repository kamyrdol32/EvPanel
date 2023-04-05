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
    refresh_websites()
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


def refresh_websites():
    print("Refresing websites")
    website = Websites.query.all()
    Data = []

    for website in website:

        # Backend

        try:
            website.status_backend = "Online"
            if website.endpoint_backend and website.endpoint_backend != "localhost":
                response = requests.get(website.endpoint_backend)
                if response.status_code == 200:
                    website.status_backend = "Online"
                else:
                    website.status_backend = "Offline"
            elif website.endpoint_backend == "localhost":
                website.status_backend = "Online"
            else:
                website.status_backend = "Unknown"

        except Exception as error:
            website.status = error
            print(error)

        # Frontend

        try:
            website.status_frontend = "Online"
            if website.endpoint_frontend:
                response = requests.get(website.endpoint_frontend)
                if response.status_code == 200:
                    website.status_frontend = "Online"
                else:
                    website.status_frontend = "Offline"
            else:
                website.status_frontend = "Unknown"


        except Exception as error:
            website.status_frontend = error
            print(error)

        db.session.add(website)
        db.session.commit()

    return True
