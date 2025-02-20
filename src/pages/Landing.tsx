import { Link } from 'react-router-dom';
import { BookOpen, BarChart2, Target, Clock, Award, Calendar } from 'lucide-react';
import { Button } from '../components/Button';
import { Header } from '../components/Header';

const features = [
  {
    name: 'Task Management',
    description: 'Organize your study tasks with ease. Set priorities, deadlines, and track your progress.',
    icon: Calendar,
  },
  {
    name: 'Study Analytics',
    description: 'Visualize your study patterns and track improvements with detailed analytics.',
    icon: BarChart2,
  },
  {
    name: 'Goal Setting',
    description: 'Set and achieve your study goals with our comprehensive goal tracking system.',
    icon: Target,
  },
  {
    name: 'Pomodoro Timer',
    description: 'Stay focused with our built-in Pomodoro timer. Manage your study sessions effectively.',
    icon: Clock,
  },
  {
    name: 'Streak Tracking',
    description: 'Build consistent study habits by maintaining your daily study streak.',
    icon: Award,
  },
];

export function Landing() {
  return (
    <div className="bg-white">
      <Header />
      
      {/* Hero section */}
      <div className="relative isolate overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
            <div className="mt-24 sm:mt-32 lg:mt-16">
              <a href="#" className="inline-flex space-x-6">
                <span className="rounded-full bg-indigo-600/10 px-3 py-1 text-sm font-semibold leading-6 text-indigo-600 ring-1 ring-inset ring-indigo-600/10">
                  Latest updates
                </span>
              </a>
            </div>
            <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Track your study progress and achieve your goals
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              StudyTracker helps you build better study habits, maintain focus, and achieve academic success through powerful tracking and analytics tools.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link to="/register">
                <Button size="lg">Get started</Button>
              </Link>
              <Link to="/login" className="text-sm font-semibold leading-6 text-gray-900">
                Sign in <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
            <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                alt="App screenshot"
                width={2432}
                height={1442}
                className="w-[76rem] rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Feature section */}
      <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Study Smarter</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to excel in your studies
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our comprehensive suite of tools helps you stay organized, focused, and motivated throughout your academic journey.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* CTA section */}
      <div className="mt-32 sm:mt-56">
        <div className="relative isolate overflow-hidden bg-gray-900">
          <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Start tracking your study progress today.
                <br />
                Join thousands of successful students.
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
                Take control of your academic journey with StudyTracker. Our platform provides all the tools you need to succeed in your studies.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link to="/register">
                  <Button size="lg">Get started</Button>
                </Link>
                <Link to="/login" className="text-sm font-semibold leading-6 text-white">
                  Sign in <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
            aria-hidden="true"
          >
            <circle cx={512} cy={512} r={512} fill="url(#8d958450-c69f-4251-94bc-4e091a323369)" fillOpacity="0.7" />
            <defs>
              <radialGradient id="8d958450-c69f-4251-94bc-4e091a323369">
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#E935C1" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-32 bg-gray-900 sm:mt-56">
        <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <Link to="/" className="text-gray-400 hover:text-gray-500">
              <BookOpen className="h-6 w-6" />
            </Link>
          </div>
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-xs leading-5 text-gray-400">
              &copy; 2024 StudyTracker. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}