import { Todo, FilterType, TodoStats } from '../types/todo';

export const filterTodos = (todos: Todo[], filter: FilterType): Todo[] => {
  switch (filter) {
    case 'active':
      return todos.filter(todo => !todo.completed);
    case 'completed':
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
};

export const getTodoStats = (todos: Todo[]): TodoStats => ({
  total: todos.length,
  active: todos.filter(todo => !todo.completed).length,
  completed: todos.filter(todo => todo.completed).length,
});