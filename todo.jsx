import React, { useState, useEffect } from 'react';
import { Plus, Check, X, Edit3, Trash2, Calendar, Filter } from 'lucide-react';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all'); // all, active, completed
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  // Initialize with sample data
  useEffect(() => {
    setTodos([
      { id: 1, text: 'Complete project proposal', completed: false, createdAt: new Date().toISOString() },
      { id: 2, text: 'Review code changes', completed: true, createdAt: new Date(Date.now() - 86400000).toISOString() },
      { id: 3, text: 'Schedule team meeting', completed: false, createdAt: new Date(Date.now() - 172800000).toISOString() },
    ]);
  }, []);

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo = {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      };
      setTodos([todo, ...todos]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const startEdit = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = () => {
    if (editText.trim()) {
      setTodos(todos.map(todo =>
        todo.id === editingId ? { ...todo, text: editText.trim() } : todo
      ));
    }
    setEditingId(null);
    setEditText('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active': return !todo.completed;
      case 'completed': return todo.completed;
      default: return true;
    }
  });

  const stats = {
    total: todos.length,
    active: todos.filter(t => !t.completed).length,
    completed: todos.filter(t => t.completed).length
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = today - date;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 pb-8">
        <h1 className="text-2xl font-bold mb-2">My Tasks</h1>
        <div className="flex justify-between text-sm opacity-90">
          <span>{stats.active} active</span>
          <span>{stats.completed} completed</span>
          <span>{stats.total} total</span>
        </div>
      </div>

      {/* Add New Todo */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={addTodo}
            className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex border-b border-gray-100">
        {[
          { key: 'all', label: 'All', count: stats.total },
          { key: 'active', label: 'Active', count: stats.active },
          { key: 'completed', label: 'Done', count: stats.completed }
        ].map(({ key, label, count }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${filter === key
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
          >
            {label} ({count})
          </button>
        ))}
      </div>

      {/* Todo List */}
      <div className="flex-1">
        {filteredTodos.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <div className="mb-4">
              {filter === 'all' && <Calendar size={48} className="mx-auto mb-2 opacity-50" />}
              {filter === 'active' && <Filter size={48} className="mx-auto mb-2 opacity-50" />}
              {filter === 'completed' && <Check size={48} className="mx-auto mb-2 opacity-50" />}
            </div>
            <p className="text-lg mb-1">
              {filter === 'all' && 'No tasks yet'}
              {filter === 'active' && 'No active tasks'}
              {filter === 'completed' && 'No completed tasks'}
            </p>
            <p className="text-sm">
              {filter === 'all' && 'Add your first task above'}
              {filter === 'active' && 'All caught up! 🎉'}
              {filter === 'completed' && 'Complete some tasks to see them here'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredTodos.map(todo => (
              <div key={todo.id} className="p-4 hover:bg-gray-50 transition-colors">
                {editingId === todo.id ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') saveEdit();
                        if (e.key === 'Escape') cancelEdit();
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      autoFocus
                    />
                    <button
                      onClick={saveEdit}
                      className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                    >
                      <Check size={16} />
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleTodo(todo.id)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${todo.completed
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'border-gray-300 hover:border-green-400'
                        }`}
                    >
                      {todo.completed && <Check size={14} />}
                    </button>
                    <div className="flex-1">
                      <p className={`${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'} transition-all`}>
                        {todo.text}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {formatDate(todo.createdAt)}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => startEdit(todo.id, todo.text)}
                        className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded transition-colors"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Actions */}
      {stats.completed > 0 && (
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <button
            onClick={clearCompleted}
            className="w-full py-2 text-sm text-gray-600 hover:text-red-600 transition-colors"
          >
            Clear {stats.completed} completed task{stats.completed !== 1 ? 's' : ''}
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoApp;