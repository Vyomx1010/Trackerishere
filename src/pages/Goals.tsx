import { useState, useEffect } from 'react';
import { Target, Plus, Edit2, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Button } from '../components/Button';
import { formatDate, formatDuration } from '../lib/utils';

interface Goal {
  id: string;
  title: string;
  target_minutes: number;
  start_date: string;
  end_date: string;
  progress: number;
  status: string;
}

export function Goals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    target_minutes: 0,
    start_date: '',
    end_date: '',
  });

  useEffect(() => {
    fetchGoals();
  }, []);

  async function fetchGoals() {
    try {
      const { data, error } = await supabase
        .from('goals')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGoals(data || []);
    } catch (error) {
      console.error('Error fetching goals:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const { error } = await supabase.from('goals').insert([
        {
          ...formData,
          status: 'in_progress',
        },
      ]);

      if (error) throw error;
      setShowForm(false);
      setFormData({ title: '', target_minutes: 0, start_date: '', end_date: '' });
      fetchGoals();
    } catch (error) {
      console.error('Error creating goal:', error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Study Goals</h1>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Goal
          </Button>
        </div>

        {showForm && (
          <div className="mt-6 rounded-lg bg-white p-6 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Goal Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Target Study Time (minutes)
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={formData.target_minutes}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      target_minutes: parseInt(e.target.value),
                    })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Start Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.start_date}
                    onChange={(e) =>
                      setFormData({ ...formData, start_date: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    End Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.end_date}
                    onChange={(e) =>
                      setFormData({ ...formData, end_date: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Create Goal</Button>
              </div>
            </form>
          </div>
        )}

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {goals.map((goal) => (
            <div
              key={goal.id}
              className="rounded-lg bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Target className="h-5 w-5 text-indigo-600" />
                  <h3 className="text-lg font-medium text-gray-900">
                    {goal.title}
                  </h3>
                </div>
                <div className="flex space-x-2">
                  <button className="text-gray-400 hover:text-gray-500">
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button className="text-gray-400 hover:text-gray-500">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mt-4">
                <div className="mb-2 flex justify-between text-sm text-gray-500">
                  <span>Progress</span>
                  <span>{Math.round((goal.progress / goal.target_minutes) * 100)}%</span>
                </div>
                <div className="h-2 rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-indigo-600"
                    style={{
                      width: `${Math.min(
                        (goal.progress / goal.target_minutes) * 100,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>

              <dl className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Target</dt>
                  <dd className="text-sm text-gray-900">
                    {formatDuration(goal.target_minutes)}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Progress</dt>
                  <dd className="text-sm text-gray-900">
                    {formatDuration(goal.progress)}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Start Date</dt>
                  <dd className="text-sm text-gray-900">
                    {formatDate(goal.start_date)}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">End Date</dt>
                  <dd className="text-sm text-gray-900">
                    {formatDate(goal.end_date)}
                  </dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}