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
  onEdit: (todo: Todo) => void
  onDelete: (id: number) => void
}

function TodoItem({ todo, onEdit, onDelete }: TodoItemProps) {
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

