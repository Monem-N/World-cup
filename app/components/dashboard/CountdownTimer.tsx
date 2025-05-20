import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { cn } from '~/lib/utils';

interface CountdownTimerProps {
  targetDate: Date;
  className?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownTimer({ targetDate, className }: CountdownTimerProps) {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isBlinking, setIsBlinking] = useState(false);

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

        // Add blinking effect when seconds change
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 500);
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, [targetDate]);

  // Format numbers to always have two digits
  const formatNumber = (num: number): string => {
    return num < 10 ? `0${num}` : `${num}`;
  };

  // Time unit component
  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className={cn(
          "flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-lg bg-primary/10 text-2xl md:text-3xl font-bold transition-colors",
          isBlinking && "text-primary"
        )}>
          {formatNumber(value)}
        </div>
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-background px-2 text-xs font-medium text-muted-foreground">
          {label}
        </div>
      </div>
    </div>
  );

  // Separator component
  const Separator = () => (
    <div className="flex items-center justify-center h-16 md:h-20">
      <div className={cn(
        "text-xl md:text-2xl font-bold text-muted-foreground",
        isBlinking && "text-primary"
      )}>:</div>
    </div>
  );

  return (
    <div className={cn("flex justify-center items-center py-4 gap-2 md:gap-4", className)}>
      <TimeUnit value={timeLeft.days} label={t('countdown.days', 'Days')} />
      <Separator />
      <TimeUnit value={timeLeft.hours} label={t('countdown.hours', 'Hours')} />
      <Separator />
      <TimeUnit value={timeLeft.minutes} label={t('countdown.minutes', 'Min')} />
      <Separator />
      <TimeUnit value={timeLeft.seconds} label={t('countdown.seconds', 'Sec')} />
    </div>
  );
}
