import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { Todo } from '../types/todo';

export const useTodos = (user: User | null) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);

  // Load todos when user changes
  useEffect(() => {
    if (user) {
      loadTodos();
    } else {
      setTodos([]);
    }
  }, [user]);

  const loadTodos = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTodos(data || []);
    } catch (error) {
      console.error('Error loading todos:', error);
      // Fallback to localStorage
      const localTodos = localStorage.getItem(`todos_${user.id}`);
      if (localTodos) {
        setTodos(JSON.parse(localTodos));
      }
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (text: string) => {
    if (!user || !text.trim()) return;

    const todoData = {
      text: text.trim(),
      completed: false,
      user_id: user.id,
    };

    try {
      const { data, error } = await supabase
        .from('todos')
        .insert(todoData)
        .select()
        .single();

      if (error) throw error;
      setTodos(prev => [data, ...prev]);
    } catch (error) {
      console.error('Error adding todo:', error);
      // Fallback to local state
      const localTodo: Todo = {
        ...todoData,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
      };
      setTodos(prev => [localTodo, ...prev]);
      localStorage.setItem(`todos_${user.id}`, JSON.stringify([localTodo, ...todos]));
    }
  };

  const updateTodo = async (id: string, updates: Partial<Todo>) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('todos')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setTodos(prev =>
        prev.map(todo =>
          todo.id === id ? { ...todo, ...updates } : todo
        )
      );
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const clearCompleted = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('user_id', user.id)
        .eq('completed', true);

      if (error) throw error;

      setTodos(prev => prev.filter(todo => !todo.completed));
    } catch (error) {
      console.error('Error clearing completed todos:', error);
    }
  };

  return {
    todos,
    loading,
    addTodo,
    updateTodo,
    deleteTodo,
    clearCompleted,
  };
};