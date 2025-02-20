import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function StudyChart() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudyData();
  }, []);

  async function fetchStudyData() {
    try {
      const { data, error } = await supabase
        .from('study_sessions')
        .select(`
          start_time,
          duration,
          subject:subject_id (name, color)
        `)
        .gte('start_time', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

      if (error) throw error;

      const days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return date.toISOString().split('T')[0];
      }).reverse();

      const subjectTotals = data?.reduce((acc, session) => {
        const day = session.start_time.split('T')[0];
        const subject = session.subject?.name || 'Uncategorized';
        const duration = session.duration ? parseInt(session.duration.minutes) || 0 : 0;

        if (!acc[subject]) {
          acc[subject] = {
            data: Object.fromEntries(days.map(d => [d, 0])),
            color: session.subject?.color || '#6366F1'
          };
        }
        acc[subject].data[day] = (acc[subject].data[day] || 0) + duration;
        return acc;
      }, {});

      setChartData({
        labels: days.map(d => new Date(d).toLocaleDateString('en-US', { weekday: 'short' })),
        datasets: Object.entries(subjectTotals || {}).map(([subject, { data, color }]) => ({
          label: subject,
          data: Object.values(data),
          backgroundColor: color,
        })),
      });
    } catch (error) {
      console.error('Error fetching study data:', error);
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
    <Bar
      data={chartData}
      options={{
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: true,
            text: 'Study Time by Subject',
          },
        },
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
            title: {
              display: true,
              text: 'Minutes',
            },
          },
        },
      }}
    />
  );
}