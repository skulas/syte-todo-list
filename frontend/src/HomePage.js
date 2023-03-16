import { useState, useEffect } from "react";
import api from "./api"
import { useNavigate } from "react-router-dom";


const HomePage = ({ token, onLogout }) => {
  const [todoItems, setTodoItems] = useState([]);
  const [newTodoItem, setNewTodoItem] = useState("");

  useEffect(() => {
    const fetchTodoItems = async () => {
      try {
        const response = await api.get("/todo-items", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTodoItems(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTodoItems();
  }, [token]);

  const handleCreateTodoItem = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(
        "/todo-items",
        { name: newTodoItem },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTodoItems([...todoItems, response.data]);
      setNewTodoItem("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateTodoItem = async (updatedItem) => {
    try {
      const response = await api.patch(
        `/todo-items/${updatedItem.id}`,
        updatedItem,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(JSON.stringify(response.data))
      setTodoItems(
        todoItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTodoItem = async (itemId) => {
    try {
      await api.delete(`/todo-items/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodoItems(todoItems.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error(error);
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    // If user is not logged in, redirect to login page
    if (!token) {
      console.log("User not logged in, redirecting ...")
      navigate("/login");
    }
  }, [token, navigate]);

  if (!token) {
    return null;
  }

  return (
    <div>
      <form onSubmit={handleCreateTodoItem}>
        <input
          type="text"
          placeholder="New Todo Item"
          value={newTodoItem}
          onChange={(e) => setNewTodoItem(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todoItems.map((item) => (
          <li key={item.id}>
            <input
              type="checkbox"
              checked={item.done}
              onChange={(e) =>
                handleUpdateTodoItem({ ...item, done: e.target.checked })
              }
            />
            <span>{item.name}</span>
            <button onClick={() => handleDeleteTodoItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={() => onLogout()}>Logout</button>
    </div>
  );
};

export default HomePage;
