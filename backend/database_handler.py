from datetime import datetime
import sqlite3

"""
id INTEGER PRIMARY KEY AUTOINCREMENT,
titulo TEXT,
descricao TEXT,
status TEXT CHECK(status IN ('pendente', 'concluida')),
data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP
"""


# Class TODO, everything is explicitly typed here so this con
# be reused very clearly along the code
class Todo:
    def __init__(self, id: int, titulo: str, descricao: str, status: str, data_criacao: datetime) -> None:
        self.id: int = id
        self.titulo: str = titulo
        self.descricao: str = descricao
        self.status: str = status
        self.data_criacao: datetime = data_criacao


class Todos:
    def __init__(self, path="todos.db"):
        self.path = path

    # TODO: DOCUMENT:
    # Connecting everytime makes sense here
    # prevents from needing to use `check_same_thread=False`
    # ensures it's clear, well define, in-and-out behaviour
    def _get_connection(self):
        return sqlite3.connect(self.path)

    def get_todos(self) -> list[Todo]:
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM todos")
            untyped_todos = cursor.fetchall()
            todos = [Todo(*row) for row in untyped_todos]
            return todos

    def insert(self, titulo: str, descricao: str, is_concluida: bool = False):
        status = "concluida" if is_concluida else "pendente"
        with self._get_connection() as conn:
            conn.execute(
                "INSERT INTO todos (titulo, descricao, status) VALUES (?, ?, ?)",
                (titulo, descricao, status),
            )

    def delete(self, id: int):
        with self._get_connection() as conn:
            conn.execute("DELETE FROM todos WHERE id = ?", (id,))

    def update(self, id: int, novo_titulo: str, nova_descricao: str, is_concluida: bool = False):
        status = "concluida" if is_concluida else "pendente"
        with self._get_connection() as conn:
            conn.execute(
                "UPDATE todos SET titulo=?, descricao=?, status=? WHERE id=?",
                (novo_titulo, nova_descricao, status, id),
            )


if __name__ == "__main__":
    class_obj = Todos()
    # class_obj.insert("Teste tit", "teste desc")
    print(class_obj.get_todos())
    class_obj.update(1, "Titulo", "desc", True)
    # class_obj.delete("9")
    print(class_obj.get_todos())
