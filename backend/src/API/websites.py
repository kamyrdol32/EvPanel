import requests
import time

from flask import jsonify, request
from flask_openapi3 import APIBlueprint

from ..app import db
from ..models import Websites

websites_blueprint = APIBlueprint("website", __name__, url_prefix="/website")


@websites_blueprint.get("/get")
def get_websites():
    check_websites()
    websites = Websites.query.all()
    Data = []
    for website in websites:
        Data.append(
            {
                "id": website.id,
                "name": website.name,
                "url": website.url,
                "status": website.status,
            }
        )
    return jsonify(Data), 200


def check_websites():
    websites = Websites.query.all()
    for website in websites:
        try:
            if website.endpoint != "":
                response = requests.get(website.endpoint)
                if response.status_code == 200:
                    website.status = "Online"
                    print("Online " + str(website.name))
                else:
                    website.status = "Offline"
                    print("Offline " + str(website.name))

                db.session.add(website)
                db.session.commit()

        except Exception as error:
            website.status = "Offline"
            db.session.add(website)
            db.session.commit()

            print(error)
            return jsonify({"error": str(error)}), 400