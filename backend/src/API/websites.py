import requests
import time

from flask import jsonify, request
from flask_cors import cross_origin
from flask_openapi3 import APIBlueprint

from ..app import db
from ..models import Websites

websites_blueprint = APIBlueprint("website", __name__, url_prefix="/website")


@websites_blueprint.get("/get")
@cross_origin()
def get_websites():
    Data = []
    websites = Websites.query.all()

    for website in websites:
        try:
            if website.endpoint:
                response = requests.get(website.endpoint)
                if response.status_code == 200:
                    website.status = "Online"
                    print("Online " + str(website.name))
                else:
                    website.status = "Offline"
                    print("Offline " + str(website.name))
            else:
                website.status = "Unknown"

        except Exception as error:
            website.status = "ERROR"
            print(error)
            return jsonify({"error": str(error)}), 400

        db.session.add(website)
        db.session.commit()

        Data.append(
            {
                "id": website.id,
                "name": website.name,
                "url": website.url,
                "status": website.status,
            }
        )

    return jsonify(Data), 200