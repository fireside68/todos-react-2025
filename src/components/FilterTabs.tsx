import { FilterType, TodoStats } from '../types/todo';

interface FilterTabsProps {
  filter: FilterType;
  stats: TodoStats;
  onFilterChange: (filter: FilterType) => void;
  darkMode: boolean;
}

export const FilterTabs = ({ filter, stats, onFilterChange, darkMode }: FilterTabsProps) => {
  const tabs: Array<{ key: FilterType; label: string; count: number }> = [
    { key: 'all', label: 'All', count: stats.total },
    { key: 'active', label: 'Active', count: stats.active },
    { key: 'completed', label: 'Done', count: stats.completed },
  ];

  return (
    <div className={`flex border-b ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-100 bg-white'}`}>
      {tabs.map(({ key, label, count }) => (
        <button
          key={key}
          onClick={() => onFilterChange(key)}
          className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${filter === key
              ? 'border-blue-500 text-blue-600'
              : darkMode
                ? 'border-transparent text-gray-400 hover:text-gray-200'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
        >
          {label} ({count})
        </button>
      ))}
    </div>
  );
};