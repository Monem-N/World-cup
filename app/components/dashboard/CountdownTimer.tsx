import { useEffect, useState } from "react";
import { Card } from "../ui/card";

interface CountdownTimerProps {
  targetDate: Date;
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetTime = targetDate.getTime();
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, [targetDate]); // Add targetDate to dependency array

  return (
    <Card className="p-6 md:p-8 lg:p-10">
      <h2 className="text-2xl font-bold mb-4 tracking-tight">Time Until Kickoff</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="flex flex-col">
          <p className="text-4xl font-bold">{timeLeft.days}</p>
          <p className="text-muted-foreground text-sm uppercase">Days</p>
        </div>
        <div className="flex flex-col">
          <p className="text-4xl font-bold">{timeLeft.hours}</p>
          <p className="text-muted-foreground text-sm uppercase">Hours</p>
        </div>
        <div className="flex flex-col">
          <p className="text-4xl font-bold">{timeLeft.minutes}</p>
          <p className="text-muted-foreground text-sm uppercase">Minutes</p>
        </div>
        <div className="flex flex-col">
          <p className="text-4xl font-bold">{timeLeft.seconds}</p>
          <p className="text-muted-foreground text-sm uppercase">Seconds</p>
        </div>
      </div>
    </Card>
  );
}
