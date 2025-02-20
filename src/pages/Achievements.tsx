import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Award, Star, Clock, Target, BookOpen, Zap } from 'lucide-react';
import { formatDate } from '../lib/utils';

interface Achievement {
  id: string;
  type: string;
  title: string;
  description: string;
  icon: string;
  unlocked_at: string | null;
}

const ICONS = {
  streak: Award,
  milestone: Star,
  time: Clock,
  goal: Target,
  subject: BookOpen,
  focus: Zap,
};

export function Achievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAchievements();
  }, []);

  async function fetchAchievements() {
    try {
      const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .order('unlocked_at', { ascending: false });

      if (error) throw error;
      setAchievements(data || []);
    } catch (error) {
      console.error('Error fetching achievements:', error);
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

  const IconComponent = (iconName: string) => {
    return ICONS[iconName as keyof typeof ICONS] || Award;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Achievements</h1>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement) => {
            const Icon = IconComponent(achievement.icon);
            return (
              <div
                key={achievement.id}
                className={`relative rounded-lg bg-white p-6 shadow-sm ${
                  achievement.unlocked_at
                    ? 'border-2 border-indigo-600'
                    : 'opacity-50'
                }`}
              >
                {achievement.unlocked_at && (
                  <div className="absolute -right-2 -top-2 rounded-full bg-indigo-600 p-1">
                    <Star className="h-4 w-4 text-white" />
                  </div>
                )}

                <div className="flex items-center space-x-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100">
                    <Icon className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-gray-500">{achievement.type}</p>
                  </div>
                </div>

                <p className="mt-4 text-sm text-gray-600">
                  {achievement.description}
                </p>

                {achievement.unlocked_at && (
                  <p className="mt-4 text-sm text-gray-500">
                    Unlocked on {formatDate(achievement.unlocked_at)}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}