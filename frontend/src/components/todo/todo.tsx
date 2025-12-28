import { useState, useEffect } from "react"
import "./todo.css"

export interface Todo {
  id: number
  titulo: string
  descricao: string
  status: string
  dataCriacao: Date
}

interface TodoItemProps {
  todo: Todo
  isEditing: boolean
  onEdit: (todo: Todo) => void
  onDelete: (id: number) => void
  onSave: (todo: Todo) => void
  onCancel: () => void
}

function TodoItem({ todo, isEditing, onEdit, onDelete, onSave, onCancel }: TodoItemProps) {
  const [editForm, setEditForm] = useState({
    titulo: todo.titulo,
    descricao: todo.descricao,
    status: todo.status
  })

  // Reset form when entering edit mode
  useEffect(() => {
    if (isEditing) {
      setEditForm({
        titulo: todo.titulo,
        descricao: todo.descricao,
        status: todo.status
      })
    }
  }, [isEditing, todo])

  if (isEditing) {
    return (
      <div className="todo-item todo-item-editing">
        <div className="todo-form">
          <input
            type="text"
            className="todo-input"
            value={editForm.titulo}
            onChange={(e) => setEditForm({ ...editForm, titulo: e.target.value })}
            placeholder="Título"
          />
          <textarea
            className="todo-textarea"
            value={editForm.descricao}
            onChange={(e) => setEditForm({ ...editForm, descricao: e.target.value })}
            placeholder="Descrição"
            rows={3}
          />
          <label>
            <input
              type="checkbox"
              name="is-concluida"
              checked={editForm.status === "concluida"}
              onChange={(e) => setEditForm({
                ...editForm,
                status: e.target.checked ? "concluida" : "pendente"
              })}

            />
            Concluida
          </label>
        </div>

        <div className="todo-actions">
          <button
            className="btn btn-save"
            onClick={() => onSave({ ...todo, ...editForm })}
          >
            Save
          </button>
          <button
            className="btn btn-cancel"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="todo-item">
      <div className="todo-content">
        <h3 className="todo-title">{todo.titulo}</h3>
        <p className="todo-description">{todo.descricao}</p>
        <span className={`todo-status status-${todo.status.toLowerCase()}`}>
          {todo.status}
        </span>
      </div>

      <div className="todo-actions">
        <button
          className="btn btn-edit"
          onClick={() => onEdit(todo)}
        >
          Edit
        </button>

        <button
          className="btn btn-delete"
          onClick={() => onDelete(todo.id)}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default TodoItem
