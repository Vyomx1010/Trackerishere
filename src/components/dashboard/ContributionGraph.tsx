import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { formatDate } from '../../lib/utils';
import { Tooltip } from '../Tooltip';

interface DayContribution {
  date: string;
  total_minutes: number;
}

const CONTRIBUTION_LEVELS = [
  { threshold: 0, color: 'bg-gray-100' },
  { threshold: 30, color: 'bg-green-200' },
  { threshold: 60, color: 'bg-green-300' },
  { threshold: 120, color: 'bg-green-400' },
  { threshold: 240, color: 'bg-green-500' },
];

function getContributionLevel(minutes: number) {
  const level = CONTRIBUTION_LEVELS.findIndex(
    (level, index) =>
      minutes >= level.threshold &&
      (index === CONTRIBUTION_LEVELS.length - 1 ||
        minutes < CONTRIBUTION_LEVELS[index + 1].threshold)
  );
  return CONTRIBUTION_LEVELS[Math.max(0, level)].color;
}

export function ContributionGraph() {
  const [contributions, setContributions] = useState<DayContribution[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [totalContributions, setTotalContributions] = useState(0);

  useEffect(() => {
    fetchContributions();
  }, []);

  async function fetchContributions() {
    try {
      // Get the date 365 days ago
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 365);

      const { data, error } = await supabase
        .from('streaks')
        .select('*')
        .gte('date', startDate.toISOString().split('T')[0])
        .order('date', { ascending: true });

      if (error) throw error;

      // Fill in missing dates with zero contributions
      const allDates = new Array(365).fill(0).map((_, index) => {
        const date = new Date();
        date.setDate(date.getDate() - (364 - index));
        return date.toISOString().split('T')[0];
      });

      const contributionsMap = new Map(
        data?.map((item) => [item.date, item.total_minutes]) || []
      );

      const filledContributions = allDates.map((date) => ({
        date,
        total_minutes: contributionsMap.get(date) || 0,
      }));

      setContributions(filledContributions);

      // Calculate streaks and total contributions
      let current = 0;
      let longest = 0;
      let total = 0;

      filledContributions.forEach((day, index) => {
        if (day.total_minutes > 0) {
          current++;
          longest = Math.max(longest, current);
          total += day.total_minutes;
        } else {
          current = 0;
        }
      });

      setCurrentStreak(current);
      setLongestStreak(longest);
      setTotalContributions(total);
    } catch (error) {
      console.error('Error fetching contributions:', error);
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

  // Group contributions by week
  const weeks = [];
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7));
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <div className="mb-6 grid grid-cols-3 gap-4">
        <div>
          <h4 className="text-sm font-medium text-gray-500">Current Streak</h4>
          <p className="text-2xl font-semibold text-gray-900">{currentStreak} days</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500">Longest Streak</h4>
          <p className="text-2xl font-semibold text-gray-900">{longestStreak} days</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500">Total Study Time</h4>
          <p className="text-2xl font-semibold text-gray-900">
            {Math.round(totalContributions / 60)} hours
          </p>
        </div>
      </div>

      <div className="flex">
        <div className="grid grid-cols-[repeat(53,1fr)] gap-1">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-rows-7 gap-1">
              {week.map((day, dayIndex) => (
                <Tooltip
                  key={day.date}
                  content={`${formatDate(day.date)}: ${day.total_minutes} minutes`}
                >
                  <div
                    className={`h-3 w-3 rounded-sm ${getContributionLevel(
                      day.total_minutes
                    )}`}
                  />
                </Tooltip>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end space-x-2 text-sm">
        <span className="text-gray-500">Less</span>
        {CONTRIBUTION_LEVELS.map((level) => (
          <div
            key={level.threshold}
            className={`h-3 w-3 rounded-sm ${level.color}`}
          />
        ))}
        <span className="text-gray-500">More</span>
      </div>
    </div>
  );
}