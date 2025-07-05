from flask import Blueprint, request, jsonify
from models import db, Employee

bp = Blueprint("routes", __name__)

@bp.route("/employees", methods=["GET"])
def get_employees():
    search = request.args.get("search", "")
    results = Employee.query.filter(
        (Employee.name.ilike(f"%{search}%")) |
        (Employee.department.ilike(f"%{search}%"))
    ).all()
    return jsonify([{
        "id": e.id,
        "name": e.name,
        "email": e.email,
        "department": e.department
    } for e in results])
