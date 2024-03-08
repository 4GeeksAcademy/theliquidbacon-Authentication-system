"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity
from flask_bcrypt import Bcrypt

api = Blueprint('api', __name__)

app = Flask(__name__)
bcrypt = Bcrypt(app)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200

@api.route('Signup', methods=['POST'])
def create_user():
    email = request.json.get("email")
    password = request.json.get("password")
    user = User.query.filter_by(email = email).first()
    if user is not None:
        return jsonify({"message": "User already exist"}), 401
    secure_password = bcrypt.generate_password_hash(password, 10).decode("utf-8")
    new_user = User()
    new_user.email = email
    new_user.password = secure_password
    new_user.is_active = True
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message":"Succesful Signup"}), 200

@api.route('Login', methods = ['POST'])
def login_user():
    username = request.json.get("email")
    password = request.json.get("password")
    user = User.query.filter_by(email = username).first()
    if user is None:
        return jsonify({"message": "User not found"}), 401
    
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"message": "Wrong password"}), 401
    
    token = create_access_token(identity = user.id)
    return jsonify({"message": "Login successful", "token": token}), 200

@api.route('protected')
@jwt_required()
def protected():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    response = {
        "userId": user_id,
        "email": user.email,
        "isActive":  user.is_active
    }
    return jsonify(response)