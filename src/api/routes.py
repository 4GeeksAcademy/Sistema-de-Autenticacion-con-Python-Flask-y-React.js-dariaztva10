"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Blueprint, request, jsonify
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# Ruta para registrar un nuevo usuario
@api.route('/signup', methods=['POST'])
def signup():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if not email or not password:
        return jsonify({"msg": "Missing email or password"}), 400
    
    # Verificar si el usuario ya existe
    user_exists = User.query.filter_by(email=email).first()
    if user_exists:
        return jsonify({"msg": "User already exists"}), 400
    
    # Hashear la contraseña antes de guardarla
    hashed_password = generate_password_hash(password)

    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "User created successfully"}), 201

# Ruta para autenticar los usuarios y devolver el token JWT
@api.route("/login", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    # Consultar la base de datos por el email
    user = User.query.filter_by(email=email).first()

    if user is None or not check_password_hash(user.password, password):
        # Si el usuario no existe o la contraseña no coincide
        return jsonify({"msg": "Bad email or password"}), 401

    # Un nuevo token con el id de usuario
    access_token = create_access_token(identity=user.id)
    return jsonify({"token": access_token, "user_id": user.id })

# Uso el decorador @jwt_required() en rutas privadas (Protejo una ruta con jwt_required, bloqueo las peticiones sin un JWT válido)
@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Acceder a la identidad del usuario actual con get_jwt_identity
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    return jsonify({"id": user.id, "email": user.email }), 200