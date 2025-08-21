import { LogOut, Sun, Moon, User } from 'lucide-react';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { TodoStats } from '../types/todo';

interface HeaderProps {
  user: SupabaseUser;
  stats: TodoStats;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onSignOut: () => void;
}

export const Header = ({ user, stats, darkMode, onToggleDarkMode, onSignOut }: HeaderProps) => {
  return (
    <>
      {/* Floating user controls in top right */}
      <div className="fixed top-4 right-4 z-10 flex items-center gap-2">
        <button
          onClick={onToggleDarkMode}
          className={`p-2 rounded-lg transition-colors ${darkMode
              ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        {user.user_metadata?.avatar_url ? (
          <img
            src={user.user_metadata.avatar_url}
            alt={user.user_metadata?.full_name || user.email || 'User'}
            className="w-10 h-10 rounded-full border-2 border-white shadow-lg"
            title={`Signed in as ${user.user_metadata?.full_name || user.email}`}
          />
        ) : (
          <div className={`w-10 h-10 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} flex items-center justify-center shadow-lg border-2 border-white`}>
            <User size={20} />
          </div>
        )}
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 pb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-xl font-bold">My Tasks</h1>
              <p className="text-sm text-blue-100">
                Welcome back, {user.user_metadata?.full_name?.split(' ')[0] || 'there'}!
              </p>
            </div>
          </div>
          <button
            onClick={onSignOut}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
            title="Sign out"
          >
            <LogOut size={20} />
          </button>
        </div>
        <div className="flex justify-between text-sm opacity-90">
          <span>{stats.active} active</span>
          <span>{stats.completed} completed</span>
          <span>{stats.total} total</span>
        </div>
      </div>
    </>
  );
};