import { useState } from 'react';
import { Check, Edit3, Trash2, X, Calendar, Filter } from 'lucide-react';
import { Todo, FilterType } from '../types/todo';
import { filterTodos } from '../utils/todo';
import { formatDate } from '../utils/date';

interface TodoListProps {
  todos: Todo[];
  filter: FilterType;
  darkMode: boolean;
  onUpdateTodo: (id: string, updates: Partial<Todo>) => void;
  onDeleteTodo: (id: string) => void;
}

export const TodoList = ({
  todos,
  filter,
  darkMode,
  onUpdateTodo,
  onDeleteTodo
}: TodoListProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  const filteredTodos = filterTodos(todos, filter);

  const startEdit = (id: string, text: string) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = () => {
    if (!editText.trim() || !editingId) return;

    onUpdateTodo(editingId, { text: editText.trim() });
    setEditingId(null);
    setEditText('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      saveEdit();
    } else if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  if (filteredTodos.length === 0) {
    return (
      <div className={`p-8 text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
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
    );
  }

  return (
    <div className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-100'}`}>
      {filteredTodos.map(todo => (
        <div key={todo.id} className={`p-4 transition-colors ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50'}`}>
          {editingId === todo.id ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={handleKeyPress}
                className={`flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode
                    ? 'bg-gray-800 border-gray-600 text-gray-100'
                    : 'bg-white border-gray-300 text-gray-900'
                  }`}
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
                onClick={() => onUpdateTodo(todo.id, { completed: !todo.completed })}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${todo.completed
                    ? 'bg-green-500 border-green-500 text-white'
                    : darkMode
                      ? 'border-gray-500 hover:border-green-400'
                      : 'border-gray-300 hover:border-green-400'
                  }`}
              >
                {todo.completed && <Check size={14} />}
              </button>
              <div className="flex-1">
                <p className={`transition-all ${todo.completed
                    ? 'line-through text-gray-500'
                    : darkMode ? 'text-gray-100' : 'text-gray-900'
                  }`}>
                  {todo.text}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {formatDate(todo.created_at)}
                </p>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => startEdit(todo.id, todo.text)}
                  className={`p-2 rounded transition-colors ${darkMode
                      ? 'text-gray-400 hover:text-blue-400 hover:bg-gray-700'
                      : 'text-gray-400 hover:text-blue-500 hover:bg-blue-50'
                    }`}
                >
                  <Edit3 size={16} />
                </button>
                <button
                  onClick={() => onDeleteTodo(todo.id)}
                  className={`p-2 rounded transition-colors ${darkMode
                      ? 'text-gray-400 hover:text-red-400 hover:bg-gray-700'
                      : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                    }`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};