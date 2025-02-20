import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { formatDate } from '../../lib/utils';

interface StreakDay {
  date: string;
  total_minutes: number;
}

export function StreakCalendar() {
  const [streaks, setStreaks] = useState<StreakDay[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStreaks();
  }, []);

  async function fetchStreaks() {
    try {
      const { data, error } = await supabase
        .from('streaks')
        .select('*')
        .order('date', { ascending: false })
        .limit(30);

      if (error) throw error;
      setStreaks(data || []);
    } catch (error) {
      console.error('Error fetching streaks:', error);
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
    <div className="grid grid-cols-7 gap-1">
      {streaks.map((day) => (
        <div
          key={day.date}
          className={`h-8 rounded ${
            day.total_minutes > 0
              ? 'bg-green-500'
              : 'bg-gray-100'
          }`}
          title={`${formatDate(day.date)}: ${day.total_minutes} minutes`}
        />
      ))}
    </div>
  );
}