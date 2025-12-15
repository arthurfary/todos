from flask import Flask
from database_handler import Todos

db = Todos()
app = Flask(__name__)


@app.route("/tasks")
def get_tasks():
    return db.get_todos()
