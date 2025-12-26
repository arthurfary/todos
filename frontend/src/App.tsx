import { useState, useEffect } from 'react'
import './App.css'
import TodoItem from './components/todo/todo'

function App() {
  //const [count, setCount] = useState(0)
  const [todos, setTodos] = useState([])

  useEffect(() => {
    fetch("http://127.0.0.1:5000/tasks")
      .then(response => response.json())
      .then(data => setTodos(data.values))
  }, [])

  return (
    <>
      <h1>Pendentes:</h1>
      <div className='todo-list'>
        {todos.filter((todo) => todo.status === "pendente").map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              onEdit={() => { }}
              onDelete={() => { }}
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
              onEdit={() => { }}
              onDelete={() => { }}
            />
          )
        })}
      </div>
    </>
  )
}

export default App
