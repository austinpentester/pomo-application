import React, {useState} from "react";
import './TodoList.css';

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [filter, setFilter] = useState('All');
    const [editingId, setEditingId] = useState(null);
    const [editingText, setEditingText] = useState('');

    const addTask = () =>{
        if(newTask.trim()){
            setTasks([...tasks, {
                id: Date.now(),
                text: newTask.trim(),
                completed: false
            }]);
            setNewTask('');
        }
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
      };
    
      const toggleTask = (id) => {
        setTasks(tasks.map(task =>
          task.id === id ? { ...task, completed: !task.completed } : task
        ));
      };
    
      const startEdit = (id, text) => {
        setEditingId(id);
        setEditingText(text);
      };
    
      const saveEdit = () => {
        setTasks(tasks.map(task =>
          task.id === editingId ? { ...task, text: editingText } : task
        ));
        setEditingId(null);
        setEditingText('');
      };
    
      const cancelEdit = () => {
        setEditingId(null);
        setEditingText('');
      };
    
      const filteredTasks = tasks.filter(task => {
        if (filter === 'Active') return !task.completed;
        if (filter === 'Completed') return task.completed;
        return true;
      });
    
      const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
          addTask();
        }
      };
    
      const handleEditKeyPress = (e) => {
        if (e.key === 'Enter') {
          saveEdit();
        } else if (e.key === 'Escape') {
          cancelEdit();
        }
      };
    
      return (
        <div className="todo-container">
          <h1 className="todo-title">Todo List</h1>
          
          <div className="todo-input-section">
            <input
              type="text"
              className="todo-input"
              placeholder="Add a new task..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button className="add-btn" onClick={addTask}>
              Add Task
            </button>
          </div>
    
          <div className="filter-section">
            {['All', 'Active', 'Completed'].map(filterType => (
              <button
                key={filterType}
                className={`filter-btn ${filter === filterType ? 'active' : ''}`}
                onClick={() => setFilter(filterType)}
              >
                {filterType}
              </button>
            ))}
          </div>
    
          <div className="tasks-list">
            {filteredTasks.length === 0 ? (
              <div className="empty-state">
                {filter === 'All' ? 'No tasks yet. Add one above!' : 
                 filter === 'Active' ? 'No active tasks!' : 
                 'No completed tasks!'}
              </div>
            ) : (
              filteredTasks.map(task => (
                <div key={task.id} className="task-item">
                  <input
                    type="checkbox"
                    className="task-checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                  />
                  
                  {editingId === task.id ? (
                    <input
                      type="text"
                      className="task-edit-input"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      onKeyDown={handleEditKeyPress}
                      autoFocus
                    />
                  ) : (
                    <span className={`task-text ${task.completed ? 'completed' : ''}`}>
                      {task.text}
                    </span>
                  )}
    
                  <div className="task-actions">
                    {editingId === task.id ? (
                      <>
                        <button className="action-btn save-btn" onClick={saveEdit}>
                          Save
                        </button>
                        <button className="action-btn cancel-btn" onClick={cancelEdit}>
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="action-btn edit-btn"
                          onClick={() => startEdit(task.id, task.text)}
                        >
                          Edit
                        </button>
                        <button
                          className="action-btn delete-btn"
                          onClick={() => deleteTask(task.id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      );
    };
    
    export default TodoList;