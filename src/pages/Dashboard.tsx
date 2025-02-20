import { useState, useEffect } from 'react';
import { TaskList } from '../components/dashboard/TaskList';
import { ContributionGraph } from '../components/dashboard/ContributionGraph';
import { PomodoroTimer } from '../components/dashboard/PomodoroTimer';
import { StudyChart } from '../components/dashboard/StudyChart';
import { useAuthStore } from '../store/authStore';
import { Clock, Calendar, Award, BarChart2 } from 'lucide-react';

export function Dashboard() {
  const { user } = useAuthStore();
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          {greeting}, {user?.email?.split('@')[0]}!
        </h1>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Tasks Section */}
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-indigo-600" />
                <h2 className="text-lg font-medium text-gray-900">Upcoming Tasks</h2>
              </div>
            </div>
            <TaskList />
          </div>

          {/* Pomodoro Timer */}
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center space-x-2">
              <Clock className="h-5 w-5 text-indigo-600" />
              <h2 className="text-lg font-medium text-gray-900">Pomodoro Timer</h2>
            </div>
            <PomodoroTimer />
          </div>

          {/* Study Streak */}
          <div className="col-span-2">
            <div className="mb-4 flex items-center space-x-2">
              <Award className="h-5 w-5 text-indigo-600" />
              <h2 className="text-lg font-medium text-gray-900">Study Streak</h2>
            </div>
            <ContributionGraph />
          </div>

          {/* Study Analytics */}
          <div className="col-span-2 rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center space-x-2">
              <BarChart2 className="h-5 w-5 text-indigo-600" />
              <h2 className="text-lg font-medium text-gray-900">Study Analytics</h2>
            </div>
            <StudyChart />
          </div>
        </div>
      </div>
    </div>
  );
}