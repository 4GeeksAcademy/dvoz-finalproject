"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt, get_jwt_identity, current_user


app = Flask(__name__)
bcrypt = Bcrypt(app)
api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/signup', methods=['POST'])
def signup_user():
    try:
        # Se reciben los datos de la petición
        body=request.get_json()

        if body['name'] is None:
            return jsonify({"msg":"El campo nombre y apellido es obligatorio"})
        if body['email'] is None:
            return jsonify({"msg":"Por especifique un correo electrónico"}),400
        # Se valida que se esta ingresando un usuario y contraseña
        if body['password'] is None:
            return jsonify({"msg":"Por favor especifique su contraseña"}),400
        
        existing_user = User.query.filter_by(email=body['email']).one_or_none()

        if existing_user:
            return jsonify({"msg": "El correo electrónico ya está registrado"}), 400

        # Se encripta la contraseña
        body['password']=bcrypt.generate_password_hash(body['password']).decode('utf-8')
        # Se guarda en la base de datos 
        user = User(name=body['name'], last_name=body['last_name'], email=body['email'], password=body['password'], is_active=True)
        db.session.add(user)
        db.session.commit()
        return jsonify({"msg":"Usuario creado con exito", "user": user.serialize()}), 201
    except Exception as error:
        return jsonify("Error, comuniquese con el administrador"), 500
    

@api.route('/login', methods=['POST'])
def user_login():
    try:
        body = request.get_json()
        if body["email"] is None:
            return jsonify({"msg":"Debe especificar un correo electrónico"}), 400
        # Se busca el usuario en la base de datos y se verifica que exista
        user = User.query.filter_by(email=body["email"]).first()
        if user is None:
            return jsonify({"msg":"Usuario no encontrado"}), 404
        
        # Se comparar la contraseña proporcionada por el usuario con un hash de contraseña almacenado previamente
        valid_password = bcrypt.check_password_hash(user.password, body["password"])
        
        if not valid_password:
            return jsonify({"msg": "Contraseña incorrecta"}), 401
        # Se crea y se retorna el token de la sesión
        token = create_access_token(identity=str(user.id), additional_claims={"is_admin": user.is_admin})
        return jsonify({"msg": "Login exitoso", "token": token, "Id": user.id, "user": user.serialize(), "is_admin": user.is_admin })
    except Exception as err:
          print(err.args)
          return jsonify("Error, comuniquese con el administrador"), 500