/*
  # Add test user data

  1. Test User
    - Email: test@example.com
    - Password: testpassword123

  2. Data Creation
    - Subjects (Math, Physics, Chemistry)
    - Tasks (mix of pending and completed)
    - Study sessions
    - Goals
    - Achievements
    - Streaks
*/

-- Insert test user (password: testpassword123)
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  'test@example.com',
  '$2a$10$AbCdEfGhIjKlMnOpQrStUvWxYzAbCdEfGhIjKlMnOpQr',
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  false,
  'authenticated'
) ON CONFLICT (id) DO NOTHING;

-- Insert subjects
INSERT INTO subjects (id, user_id, name, color) VALUES
  ('11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000000', 'Mathematics', '#2563EB'),
  ('22222222-2222-2222-2222-222222222222', '00000000-0000-0000-0000-000000000000', 'Physics', '#7C3AED'),
  ('33333333-3333-3333-3333-333333333333', '00000000-0000-0000-0000-000000000000', 'Chemistry', '#059669')
ON CONFLICT (id) DO NOTHING;

-- Insert tasks
INSERT INTO tasks (id, user_id, subject_id, title, description, priority, due_date, status) VALUES
  ('44444444-4444-4444-4444-444444444444', '00000000-0000-0000-0000-000000000000', '11111111-1111-1111-1111-111111111111', 'Complete Calculus Assignment', 'Chapter 3: Derivatives', 2, now() + interval '2 days', 'pending'),
  ('55555555-5555-5555-5555-555555555555', '00000000-0000-0000-0000-000000000000', '22222222-2222-2222-2222-222222222222', 'Physics Lab Report', 'Write up results from the pendulum experiment', 1, now() + interval '5 days', 'pending'),
  ('66666666-6666-6666-6666-666666666666', '00000000-0000-0000-0000-000000000000', '33333333-3333-3333-3333-333333333333', 'Review Organic Chemistry', 'Prepare for upcoming test', 3, now() + interval '1 day', 'completed')
ON CONFLICT (id) DO NOTHING;

-- Insert study sessions
INSERT INTO study_sessions (id, user_id, subject_id, start_time, end_time, duration) VALUES
  ('77777777-7777-7777-7777-777777777777', '00000000-0000-0000-0000-000000000000', '11111111-1111-1111-1111-111111111111', now() - interval '2 days', now() - interval '2 days' + interval '2 hours', interval '2 hours'),
  ('88888888-8888-8888-8888-888888888888', '00000000-0000-0000-0000-000000000000', '22222222-2222-2222-2222-222222222222', now() - interval '1 day', now() - interval '1 day' + interval '1.5 hours', interval '1.5 hours'),
  ('99999999-9999-9999-9999-999999999999', '00000000-0000-0000-0000-000000000000', '33333333-3333-3333-3333-333333333333', now() - interval '12 hours', now() - interval '12 hours' + interval '45 minutes', interval '45 minutes')
ON CONFLICT (id) DO NOTHING;

-- Insert goals
INSERT INTO goals (id, user_id, title, target_minutes, start_date, end_date, progress, status) VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '00000000-0000-0000-0000-000000000000', 'Master Calculus', 3000, now() - interval '10 days', now() + interval '20 days', 1200, 'in_progress'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '00000000-0000-0000-0000-000000000000', 'Complete Physics Course', 2400, now() - interval '5 days', now() + interval '25 days', 600, 'in_progress'),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', '00000000-0000-0000-0000-000000000000', 'Chemistry Lab Preparation', 1800, now() - interval '15 days', now() + interval '15 days', 1500, 'in_progress')
ON CONFLICT (id) DO NOTHING;

-- Insert achievements
INSERT INTO achievements (id, user_id, type, title, description, icon, unlocked_at) VALUES
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', '00000000-0000-0000-0000-000000000000', 'streak', 'Week Warrior', 'Maintained a 7-day study streak', 'streak', now() - interval '5 days'),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '00000000-0000-0000-0000-000000000000', 'milestone', 'Century Club', 'Completed 100 hours of studying', 'milestone', now() - interval '3 days'),
  ('ffffffff-ffff-ffff-ffff-ffffffffffff', '00000000-0000-0000-0000-000000000000', 'focus', 'Focus Master', 'Completed 10 Pomodoro sessions', 'focus', now() - interval '1 day')
ON CONFLICT (id) DO NOTHING;

-- Insert streaks
INSERT INTO streaks (id, user_id, date, total_minutes) VALUES
  ('11111111-2222-3333-4444-555555555555', '00000000-0000-0000-0000-000000000000', current_date - interval '2 days', 120),
  ('22222222-3333-4444-5555-666666666666', '00000000-0000-0000-0000-000000000000', current_date - interval '1 day', 90),
  ('33333333-4444-5555-6666-777777777777', '00000000-0000-0000-0000-000000000000', current_date, 60)
ON CONFLICT (id) DO NOTHING;