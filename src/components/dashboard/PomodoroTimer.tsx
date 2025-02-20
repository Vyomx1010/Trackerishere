import { useState, useEffect } from 'react';
import { Button } from '../Button';
import { Play, Pause, RotateCcw } from 'lucide-react';

const FOCUS_TIME = 25 * 60; // 25 minutes in seconds
const BREAK_TIME = 5 * 60; // 5 minutes in seconds

export function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(FOCUS_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let interval: number;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsBreak(!isBreak);
      setTimeLeft(isBreak ? FOCUS_TIME : BREAK_TIME);
      setIsRunning(false);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, isBreak]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsBreak(false);
    setTimeLeft(FOCUS_TIME);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-4xl font-bold">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      <p className="text-sm text-gray-500">
        {isBreak ? 'Break Time' : 'Focus Time'}
      </p>
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleTimer}
        >
          {isRunning ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={resetTimer}
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}