import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { BarChart2, Clock, Award, Target } from 'lucide-react';
import { StudyChart } from '../components/dashboard/StudyChart';
import { formatDuration } from '../lib/utils';

interface AnalyticsSummary {
  total_minutes: number;
  total_sessions: number;
  average_session_length: number;
  streak_days: number;
  completed_goals: number;
}

interface SubjectBreakdown {
  subject: {
    name: string;
    color: string;
  };
  total_minutes: number;
  session_count: number;
}

export function Analytics() {
  const [summary, setSummary] = useState<AnalyticsSummary>({
    total_minutes: 0,
    total_sessions: 0,
    average_session_length: 0,
    streak_days: 0,
    completed_goals: 0,
  });
  const [subjectBreakdown, setSubjectBreakdown] = useState<SubjectBreakdown[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  async function fetchAnalytics() {
    try {
      // Fetch summary statistics
      const { data: sessionsData, error: sessionsError } = await supabase
        .from('study_sessions')
        .select('duration');

      if (sessionsError) throw sessionsError;

      const totalMinutes = sessionsData?.reduce(
        (acc, session) => acc + (session.duration?.minutes || 0),
        0
      );

      // Fetch subject breakdown
      const { data: subjectsData, error: subjectsError } = await supabase
        .from('study_sessions')
        .select(`
          subject:subject_id (
            name,
            color
          ),
          duration
        `);

      if (subjectsError) throw subjectsError;

      // Process subject breakdown
      const breakdown = subjectsData?.reduce((acc: any, session) => {
        const subjectName = session.subject?.name || 'Uncategorized';
        if (!acc[subjectName]) {
          acc[subjectName] = {
            subject: session.subject || { name: 'Uncategorized', color: '#6B7280' },
            total_minutes: 0,
            session_count: 0,
          };
        }
        acc[subjectName].total_minutes += session.duration?.minutes || 0;
        acc[subjectName].session_count += 1;
        return acc;
      }, {});

      setSummary({
        total_minutes: totalMinutes || 0,
        total_sessions: sessionsData?.length || 0,
        average_session_length: totalMinutes
          ? Math.round(totalMinutes / sessionsData!.length)
          : 0,
        streak_days: 0, // You'll need to calculate this based on your streak logic
        completed_goals: 0, // You'll need to fetch this from your goals table
      });

      setSubjectBreakdown(Object.values(breakdown || {}));
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Study Analytics</h1>

        {/* Summary Cards */}
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-center">
              <Clock className="h-6 w-6 text-indigo-600" />
              <h3 className="ml-2 text-sm font-medium text-gray-500">
                Total Study Time
              </h3>
            </div>
            <p className="mt-2 text-3xl font-semibold text-gray-900">
              {formatDuration(summary.total_minutes)}
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-center">
              <BarChart2 className="h-6 w-6 text-indigo-600" />
              <h3 className="ml-2 text-sm font-medium text-gray-500">
                Study Sessions
              </h3>
            </div>
            <p className="mt-2 text-3xl font-semibold text-gray-900">
              {summary.total_sessions}
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-center">
              <Award className="h-6 w-6 text-indigo-600" />
              <h3 className="ml-2 text-sm font-medium text-gray-500">
                Current Streak
              </h3>
            </div>
            <p className="mt-2 text-3xl font-semibold text-gray-900">
              {summary.streak_days} days
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-center">
              <Target className="h-6 w-6 text-indigo-600" />
              <h3 className="ml-2 text-sm font-medium text-gray-500">
                Goals Completed
              </h3>
            </div>
            <p className="mt-2 text-3xl font-semibold text-gray-900">
              {summary.completed_goals}
            </p>
          </div>
        </div>

        {/* Study Time Chart */}
        <div className="mt-8 rounded-lg bg-white p-6 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900">Study Time Trends</h3>
          <div className="mt-4 h-80">
            <StudyChart />
          </div>
        </div>

        {/* Subject Breakdown */}
        <div className="mt-8 rounded-lg bg-white p-6 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900">Subject Breakdown</h3>
          <div className="mt-6 space-y-4">
            {subjectBreakdown.map((subject) => (
              <div key={subject.subject.name} className="flex items-center">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: subject.subject.color }}
                />
                <span className="ml-2 flex-1 text-sm font-medium text-gray-900">
                  {subject.subject.name}
                </span>
                <span className="text-sm text-gray-500">
                  {formatDuration(subject.total_minutes)}
                </span>
                <span className="ml-4 text-sm text-gray-500">
                  {subject.session_count} sessions
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}