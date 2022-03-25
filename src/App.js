import { useState, useEffect } from "react";

//CSS
import "./App.scss";

//Components

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "hello",
      completed: false,
    },
  ]);
  const [todo, setTodo] = useState("");
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    const temp = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(temp);

    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  useEffect(() => {
    const json = JSON.stringify(todos);
    localStorage.setItem("todos", json);
  }, [todos]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    };
    setTodos([...todos].concat(newTodo));
    setTodo("");
  };
  const deleteTodo = (id) => {
    const updatedTodo = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodo);
  };
  const toggleComplete = (id) => {
    const updatedTodo = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodo);
  };
  const editTodo = (id) => {
    const updatedTodo = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
      }
      return todo;
    });
    setTodos(updatedTodo);
    setTodoEditing(null);
    setEditingText("");
  };
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => {
            setTodo(e.target.value);
          }}
          value={todo}
        />
        <button type="submit">Add todo</button>
      </form>
      {todos.map((todo) => (
        <div key={todo.id}>
          {todoEditing === todo.id ? (
            <input
              type="text"
              onChange={(e) => {
                setEditingText(e.target.value);
              }}
              value={editingText}
            />
          ) : (
            <div>{todo.text}</div>
          )}

          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          <input
            type="checkbox"
            onChange={() => toggleComplete(todo.id)}
            checked={todo.completed}
          />
          {todoEditing === todo.id ? (
            <button onClick={() => editTodo(todo.id)}>Submit Edit</button>
          ) : (
            <button onClick={() => setTodoEditing(todo.id)}>Edit todo</button>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
