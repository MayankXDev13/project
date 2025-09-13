import {useEffect, useState } from "react";


type Todo = {
  id: string;
  text: string;
  completed: boolean;
};


function Box() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  // Load from localStorage
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Add Todo
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (task.trim() !== "") {
      const newTodo: Todo = {
        id: crypto.randomUUID(),
        text: task,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setTask("");
    }
  };

  // Delete Todo
  const handleDelete = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Toggle Complete
  const toggleComplete = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Clear All
  const clearAll = () => {
    setTodos([]);
  };
    

  return (
<div className="min-h-screen bg-background text-foreground flex justify-center items-center transition-colors duration-300">
      <div className="bg-card text-card-foreground w-[45%] p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">Todo List</h1>

        {/* Form */}
        <form className="flex gap-2" onSubmit={handleSubmit}>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter a task..."
            className="flex-1 px-3 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/80 transition-colors duration-200"
          >
            Add
          </button>
        </form>

        {/* Todo List */}
        <ul className="mt-4 space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center p-2 rounded-lg bg-muted text-muted-foreground"
            >
              <span
                onClick={() => toggleComplete(todo.id)}
                className={`cursor-pointer ${
                  todo.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {todo.text}
              </span>
              <button
                onClick={() => handleDelete(todo.id)}
                className="text-red-500 hover:text-red-700"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>

        {/* Clear All Button */}
        {todos.length > 0 && (
          <button
            onClick={clearAll}
            className="mt-4 w-full py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
          >
            Clear All
          </button>
        )}
      </div>
    </div>
  );
}

export default Box;
