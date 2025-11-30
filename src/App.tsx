import "./App.css";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

function App() {
  return (
    <div className="min-h-screen flex items-start justify-center overflow-hidden pt-20">
      <Card className="w-[500px] bg-gray-50 shadow-xl">
        <HeaderPomodoro />
        <CardContent className="pt-0">
          <PomodoroTimer />
        </CardContent>
        <FooterPomodoro />
      </Card>
    </div>
  );
}

function PomodoroControls({
  onStart,
  onReset,
  isRunning,
}: {
  onStart: () => void;
  onReset: () => void;
  isRunning: boolean;
}) {
  return (
    <div className="flex items-center justify-center gap-3 mt-4">
      <Button
        onClick={onStart}
        variant="outline"
        size="lg"
        className="px-8 hover:bg-emerald-400 hover:text-white transition-all hover:scale-110"
      >
        Start
      </Button>
      <Button
        onClick={onReset}
        size="lg"
        variant="outline"
        className="px-8 hover:bg-rose-400 hover:text-white transition-all hover:scale-110"
      >
        Reset
      </Button>
    </div>
  );
}

function PomodoroTimer() {
  const [time, setTime] = useState(50 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTime((prev) => {
        if (prev <= 0) {
          setIsRunning(false);
          setTimeout(() => alert("Time ended!"), 100);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(50 * 60);
  };

  return (
    <div>
      <div className="flex items-center justify-center h-[200px]">
        <div className="text-9xl font-bold">{formatTime(time)}</div>
      </div>
      <PomodoroControls
        onStart={handleStart}
        onReset={handleReset}
        isRunning={isRunning}
      />
    </div>
  );
}

function HeaderPomodoro() {
  const HandleClick = () => {
    window.open("https://github.com/andre4383/PomodoroReact", "_blank");
  };
  return (
    <CardHeader className="pb-2">
      <CardTitle
        className="text-4xl font-bold hover:scale-110 transition-all cursor-pointer hover:text-emerald-500"
        style={{ fontFamily: "Raleway, sans-serif" }}
        onClick={HandleClick}
      >
        Simple_Pomodoro
      </CardTitle>
    </CardHeader>
  );
}

function FooterPomodoro() {
  return (
    <CardFooter className="flex justify-center items-center gap-2 text-sm text-gray-500 pt-4">
      <span>Made with</span>
      <span className="text-red-500">❤️</span>
      <span>by</span>
      <a
        href="https://github.com/andre4383"
        target="_blank"
        className="text-blue-600 hover:underline"
      >
        André Montenegro
      </a>
    </CardFooter>
  );
}

export default App;
