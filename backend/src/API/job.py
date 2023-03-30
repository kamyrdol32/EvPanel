from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
from flask_jwt_extended import get_jwt, jwt_required, get_jwt_identity
from flask_openapi3 import APIBlueprint

from ..app import db
from ..models import Jobs, Users

job_blueprint = APIBlueprint("job", __name__, url_prefix="/job")

@job_blueprint.get("/get")
@cross_origin()
@jwt_required()
def get_jobs():
    try:
        if request.args.get("search"):
            search = request.args.get("search")

            user = get_jwt_identity()
            user_id = Users.query.filter_by(username=user).first().id
            jobs = (
                Jobs.query.filter_by(user_id=user_id)
                .filter(
                    Jobs.name.like(f"%{search}%") | Jobs.company.like(f"%{search}%")
                )
                .all()
            )

            Data = []
            for job in jobs:
                Data.append(
                    {
                        "id": job.id,
                        "name": job.name,
                        "company": job.company,
                        "url": job.url,
                        "created_data": job.created_data,
                    }
                )

            return jsonify(Data), 200

        else:
            user = get_jwt_identity()
            user_id = Users.query.filter_by(username=user).first().id
            jobs = Jobs.query.filter_by(user_id=user_id).all()

            Data = []
            for job in jobs:
                Data.append(
                    {
                        "id": job.id,
                        "name": job.name,
                        "company": job.company,
                        "url": job.url,
                        "created_data": job.created_data,
                    }
                )
            return jsonify(Data), 200

    except Exception as error:
        return jsonify({"error": str(error)}), 400


@job_blueprint.post("/add")
@cross_origin()
@jwt_required()
def add_jobs():
    try:
        user = get_jwt_identity()
        user_id = Users.query.filter_by(username=user).first().id

        name = request.json.get("name")
        company = request.json.get("company")
        url = request.json.get("url")

        job = Jobs(name=name, company=company, url=url, user_id=user_id)
        if job:
            db.session.add(job)
            db.session.commit()

            return jsonify({"message": "Job added successfully"}), 200

        else:
            return jsonify({"error": "Something went wrong"}), 400

    except Exception as error:
        return jsonify({"error": str(error)}), 400


@job_blueprint.delete("/delete")
@cross_origin()
@jwt_required()
def delete_jobs():
    try:
        if request.args.get("id"):
            user = get_jwt_identity()
            user_id = Users.query.filter_by(username=user).first().id

            id = request.args.get("id")
            job = Jobs.query.filter_by(id=id).first()

            if job and job.user_id == user_id:
                db.session.delete(job)
                db.session.commit()

                return jsonify({"message": "Job deleted successfully"}), 200

    except Exception as error:
        return jsonify({"error": str(error)}), 400
