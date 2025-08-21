import { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { useTodos } from './hooks/useTodos';
import { useDarkMode } from './hooks/useDarkMode';
import { getTodoStats } from './utils/todo';
import { FilterType } from './types/todo';

import { Loading } from './components/Loading';
import { Auth } from './components/Auth';
import { Header } from './components/Header';
import { AddTodo } from './components/AddTodo';
import { FilterTabs } from './components/FilterTabs';
import { TodoList } from './components/TodoList';

function App() {
  const { user, loading: authLoading, signInWithGoogle, signOut } = useAuth();
  const { todos, addTodo, updateTodo, deleteTodo, clearCompleted } = useTodos(user);
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [filter, setFilter] = useState<FilterType>('all');

  const stats = getTodoStats(todos);

  if (authLoading) {
    return <Loading darkMode={darkMode} />;
  }

  if (!user) {
    return (
      <Auth
        onSignIn={signInWithGoogle}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 min-h-screen shadow-lg">
        <Header
          user={user}
          stats={stats}
          darkMode={darkMode}
          onToggleDarkMode={toggleDarkMode}
          onSignOut={signOut}
        />

        <AddTodo
          onAddTodo={addTodo}
          darkMode={darkMode}
        />

        <FilterTabs
          filter={filter}
          stats={stats}
          onFilterChange={setFilter}
          darkMode={darkMode}
        />

        <div className={`flex-1 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
          <TodoList
            todos={todos}
            filter={filter}
            darkMode={darkMode}
            onUpdateTodo={updateTodo}
            onDeleteTodo={deleteTodo}
          />
        </div>

        {/* Footer */}
        {stats.completed > 0 && (
          <div className={`p-4 border-t ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-100 bg-gray-50'}`}>
            <button
              onClick={clearCompleted}
              className={`w-full py-2 text-sm transition-colors ${darkMode
                ? 'text-gray-400 hover:text-red-400'
                : 'text-gray-600 hover:text-red-600'
                }`}
            >
              Clear {stats.completed} completed task{stats.completed !== 1 ? 's' : ''}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;