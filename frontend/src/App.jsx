import { useState, useEffect } from "react";

const API = "http://localhost:5000/api/v1";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ---------------- AUTH ----------------

  const register = async () => {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${API}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      setMessage("Registration failed");
    }

    setLoading(false);
  };

  const login = async () => {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setMessage("Login successful");
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (err) {
      setMessage("Login error");
    }

    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setTasks([]);
  };

  // ---------------- TASKS ----------------

  const fetchTasks = async () => {
    if (!token) return;

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${API}/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        // 🔥 handles 401/403
        setMessage(data.message || "Unauthorized");

        if (res.status === 401 || res.status === 403) {
          logout();
        }

        return;
      }

      setTasks(data);
    } catch (err) {
      setMessage("Error fetching tasks");
    }

    setLoading(false);
  };

  const addTask = async () => {
    if (!title) return;

    try {
      const res = await fetch(`${API}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Failed to add task");
        return;
      }

      setTitle("");
      fetchTasks();
    } catch (err) {
      setMessage("Error adding task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`${API}/tasks/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchTasks();
    } catch (err) {
      setMessage("Error deleting task");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [token]);

  // ---------------- UI ----------------

  return (
    <div style={{ padding: "20px" }}>
      <h1>Task Manager</h1>

      {message && <p>{message}</p>}
      {loading && <p>Loading...</p>}

      {!token ? (
        <div>
          <h2>Register / Login</h2>

          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />

          <button onClick={register}>Register</button>
          <button onClick={login}>Login</button>
        </div>
      ) : (
        <div>
          <h2>Dashboard</h2>

          <button onClick={logout}>Logout</button>

          <br /><br />

          <input
            value={title}
            placeholder="Task title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <button onClick={addTask}>Add Task</button>

          <div style={{ marginTop: "20px" }}>
            {tasks.length === 0 ? (
              <p>No tasks found</p>
            ) : (
              tasks.map((task) => (
                <div key={task.id}>
                  {task.title}
                  <button onClick={() => deleteTask(task.id)}>
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;