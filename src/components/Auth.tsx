import { Check, Sun, Moon } from 'lucide-react';

interface AuthProps {
  onSignIn: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

export const Auth = ({ onSignIn, darkMode, onToggleDarkMode }: AuthProps) => {
  const missingCredentials = !import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY;

  return (
    <div className={`max-w-md mx-auto ${darkMode ? 'bg-gray-900' : 'bg-white'} min-h-screen`}>
      {/* Floating Google logo and dark mode toggle in top right */}
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
        <div className={`w-10 h-10 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} flex items-center justify-center`}>
          <GoogleIcon />
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 text-center">
        <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check size={40} />
        </div>
        <h1 className="text-3xl font-bold mb-2">My Tasks</h1>
        <p className="text-blue-100">Your personal task manager</p>
      </div>

      {/* Content */}
      <div className="p-8">
        <h2 className={`text-2xl font-semibold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
          Welcome!
        </h2>
        <p className={`mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Sign in with Google to start managing your tasks.
        </p>

        {/* Show setup warning only if credentials aren't updated */}
        {missingCredentials && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800 mb-2">
              <strong>Setup Required:</strong>
            </p>
            <p className="text-sm text-yellow-700">
              Create a <code>.env</code> file with your Supabase credentials. See <code>.env.example</code> for the format.
            </p>
          </div>
        )}

        <button
          onClick={onSignIn}
          disabled={missingCredentials}
          className={`w-full flex items-center justify-center gap-3 px-6 py-4 border rounded-lg transition-colors ${missingCredentials
            ? 'opacity-50 cursor-not-allowed'
            : darkMode
              ? 'border-gray-600 hover:bg-gray-800 text-gray-100'
              : 'border-gray-300 hover:bg-gray-50 text-gray-900'
            }`}
        >
          <GoogleIcon />
          Continue with Google
        </button>
      </div>
    </div>
  );
};