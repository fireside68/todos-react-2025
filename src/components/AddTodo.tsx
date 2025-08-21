import { useState } from 'react';
import { Plus } from 'lucide-react';

interface AddTodoProps {
  onAddTodo: (text: string) => void;
  darkMode: boolean;
}

export const AddTodo = ({ onAddTodo, darkMode }: AddTodoProps) => {
  const [newTodo, setNewTodo] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      onAddTodo(newTodo.trim());
      setNewTodo('');
    }
  };

  return (
    <div className={`p-4 border-b ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-100 bg-white'}`}>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task..."
          className={`flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${darkMode
              ? 'bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-400'
              : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
            }`}
        />
        <button
          type="submit"
          className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        >
          <Plus size={20} />
        </button>
      </form>
    </div>
  );
};