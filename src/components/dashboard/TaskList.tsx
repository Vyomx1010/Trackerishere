import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { formatRelative } from '../../lib/utils';
import { Clock, CheckCircle2 } from 'lucide-react';
import { Button } from '../Button';

interface Task {
  id: string;
  title: string;
  description: string;
  due_date: string;
  priority: number;
  status: string;
  subject: { name: string; color: string };
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select(`
          *,
          subject:subject_id (
            name,
            color
          )
        `)
        .order('due_date', { ascending: true })
        .limit(5);

      if (error) throw error;
      setTasks(data || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-48 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: task.subject?.color }}
              />
              <h3 className="text-sm font-medium text-gray-900">{task.title}</h3>
            </div>
            <Button variant="outline" size="sm">
              {task.status === 'completed' ? (
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              ) : (
                <Clock className="h-4 w-4 text-gray-500" />
              )}
            </Button>
          </div>
          {task.description && (
            <p className="mt-1 text-sm text-gray-500">{task.description}</p>
          )}
          <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
            <span>{task.subject?.name}</span>
            <span>{formatRelative(task.due_date)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}