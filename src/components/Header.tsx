import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from './Button';
import { useAuthStore } from '../store/authStore';

export function Header() {
  const navigate = useNavigate();
  const { user, signOut } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">StudyTracker</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {user ? (
              <>
                <Link to="/dashboard" className="text-base font-medium text-gray-500 hover:text-gray-900">
                  Dashboard
                </Link>
                <Link to="/goals" className="text-base font-medium text-gray-500 hover:text-gray-900">
                  Goals
                </Link>
                <Link to="/analytics" className="text-base font-medium text-gray-500 hover:text-gray-900">
                  Analytics
                </Link>
                <Link to="/achievements" className="text-base font-medium text-gray-500 hover:text-gray-900">
                  Achievements
                </Link>
                <Button variant="outline" onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="secondary">Sign in</Button>
                </Link>
                <Link to="/register">
                  <Button>Get Started</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/goals"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  >
                    Goals
                  </Link>
                  <Link
                    to="/analytics"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  >
                    Analytics
                  </Link>
                  <Link
                    to="/achievements"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  >
                    Achievements
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/register"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}