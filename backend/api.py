from flask import Flask, request, jsonify
from flask_cors import CORS
from database_handler import Todos

db = Todos()
app = Flask(__name__)
# TODO: MAKE PORT A CONFIGURABLE ENV VARIABLE
CORS(app, resources={r"/tasks": {"origins": "http://localhost:5173"}})


@app.route("/tasks", methods=["GET", "POST"])
def get_tasks():
    # using match so every thing is explicitly handled
    match request.method:
        case "POST":
            db.insert("Titulo", "Descrição...")
            return {"status": 200}

        case "GET":
            ret = [
                {
                    "id": todo.id,
                    "titulo": todo.titulo,
                    "descricao": todo.descricao,
                    "status": todo.status,
                    "data_criacao": todo.data_criacao,
                }
                for todo in db.get_todos()
            ]
            ret = {"status": 200, "values": ret}
            return jsonify(ret)
