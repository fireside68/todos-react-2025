interface LoadingProps {
  darkMode: boolean;
}

export const Loading = ({ darkMode }: LoadingProps) => {
  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 min-h-screen shadow-lg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4" />
          <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
            Loading your tasks...
          </p>
        </div>
      </div>
    </div>
  );
};