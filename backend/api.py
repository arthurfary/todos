from flask import Flask, request, jsonify
from flask_cors import CORS
from database_handler import Todos

db = Todos()
app = Flask(__name__)

CORS(
    app,
    resources={
        r"/tasks/*": {
            "origins": ["http://localhost:5173", "http://localhost:5000"],
            "methods": ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
            "allow_headers": ["Content-Type"],
        }
    },
)


@app.route("/tasks", methods=["GET", "POST"])
def get_create_route():
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


@app.route("/tasks/<int:id>", methods=["DELETE", "OPTIONS"])
def delete_route(id: int):
    if request.method == "OPTIONS":
        return "", 204
    db.delete(id)
    return {"status": 200}


@app.route("/tasks/<int:id>", methods=["PUT", "OPTIONS"])
def update_route(id: int):
    if request.method == "OPTIONS":
        return "", 204
    data = request.get_json()
    db.update(
        id=id,
        novo_titulo=data.get("titulo"),
        nova_descricao=data.get("descricao"),
        is_concluida=(data.get("status") == "concluida"),
    )
    return {"status": 200}


if __name__ == "__main__":
    app.run(debug=True)

