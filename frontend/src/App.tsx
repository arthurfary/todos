import { useState, useEffect } from 'react'
import './App.css'
import TodoItem, { type Todo } from './components/todo/todo'


function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)

  useEffect(() => {
    fetch("http://127.0.0.1:5000/tasks")
      .then(response => response.json())
      .then(data => setTodos(data.values))
      .catch(error => console.error('Error fetching todos:', error))
  }, [])

  const handleDelete = (id: number) => {
    // Optimistically update UI
    setTodos(todos.filter(todo => todo.id !== id))

    // Delete from backend
    fetch(`http://127.0.0.1:5000/tasks/${id}`, {
      method: 'DELETE',
    })
      .catch(error => {
        console.error('Error deleting todo:', error)
        // Refetch to restore state on error
        fetch("http://127.0.0.1:5000/tasks")
          .then(response => response.json())
          .then(data => setTodos(data.values))
      })
  }

  const handleEdit = (todo: Todo) => {
    setEditingId(todo.id)
  }

  const handleSave = (updatedTodo: Todo) => {
    // Update local state
    setTodos(todos.map(todo =>
      todo.id === updatedTodo.id ? updatedTodo : todo
    ))

    // Clear editing state
    setEditingId(null)

    // Send to backend
    fetch(`http://127.0.0.1:5000/tasks/${updatedTodo.id}`, {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titulo: updatedTodo.titulo,
        descricao: updatedTodo.descricao,
        status: updatedTodo.status
      })
    })
      .catch(error => {
        console.error('Error updating todo:', error)
        // Refetch to restore state on error
        fetch("http://127.0.0.1:5000/tasks")
          .then(response => response.json())
          .then(data => setTodos(data.values))
      })
  }

  const handleCancelEdit = () => {
    setEditingId(null)
  }

  return (
    <>
      <h1>Pendentes:</h1>
      <div className='todo-list'>
        {todos.filter((todo) => todo.status === "pendente").map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              isEditing={editingId === todo.id}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onSave={handleSave}
              onCancel={handleCancelEdit}
            />
          )
        })}
      </div>

      <h1>Concluídas:</h1>
      <div className='todo-list'>
        {todos.filter((todo) => todo.status === "concluida").map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              isEditing={editingId === todo.id}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onSave={handleSave}
              onCancel={handleCancelEdit}
            />
          )
        })}
      </div>
    </>
  )
}

export default App
