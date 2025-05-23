import { useState, useEffect } from 'react';
import { Hourglass } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownSection() {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Calculate target date (FIFA Club World Cup 2025™ start date)
      const targetDate = new Date('June 15, 2025 00:00:00');
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft(); // Calculate immediately

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mb-16">
      <div className="relative">
        {/* Animated Background */}
        <div className="absolute inset-0 countdown-bg rounded-4xl blur-xl animate-pulse" />

        {/* Main Container */}
        <div className="relative bg-black/50 backdrop-blur-2xl rounded-4xl p-12 border border-white/20 shadow-2xl overflow-hidden">
          {/* Floating Particles Effect */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 countdown-particle rounded-full animate-float"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${10 + (i % 2) * 80}%`,
                  animationDelay: `${i * 0.8}s`,
                  animationDuration: `${4 + i * 0.5}s`
                }}
              />
            ))}
          </div>

          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="relative inline-block mb-6">
                <Hourglass className="w-16 h-16 countdown-icon mx-auto animate-bounce" />
                <div className="absolute -inset-4 countdown-icon-glow rounded-full blur-lg animate-pulse" />
              </div>
              <h2 className="countdown-title text-5xl font-black mb-4">
                Countdown to Kickoff
              </h2>
              <p className="text-2xl text-white/80 font-light">The excitement is building up!</p>
            </div>

            {/* Enhanced Countdown Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { value: timeLeft.days, label: t('countdown.days', 'Days'), colorClass: 'countdown-gold' },
                { value: timeLeft.hours, label: t('countdown.hours', 'Hours'), colorClass: 'countdown-red' },
                { value: timeLeft.minutes, label: t('countdown.minutes', 'Minutes'), colorClass: 'countdown-gold' },
                { value: timeLeft.seconds, label: t('countdown.seconds', 'Seconds'), colorClass: 'countdown-red' }
              ].map((item, index) => (
                <div key={index} className="group relative">
                  <div className={`absolute -inset-1 countdown-glow-${item.colorClass} rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-300`} />
                  <div className="relative bg-black/60 backdrop-blur-xl rounded-3xl p-6 border border-white/20 text-center group-hover:scale-105 transition-all duration-300">
                    <div className={`text-5xl md:text-6xl font-black countdown-number-${item.colorClass} mb-2 leading-none`}>
                      {item.value.toString().padStart(2, '0')}
                    </div>
                    <div className="text-white/80 font-semibold text-lg tracking-wider uppercase">
                      {item.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="mt-12 max-w-2xl mx-auto">
              <div className="flex justify-between text-white/60 text-sm mb-2">
                <span>Tournament Approaching</span>
                <span>{Math.max(0, Math.min(100, ((365 - timeLeft.days) / 365) * 100)).toFixed(1)}%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full countdown-progress transition-all duration-1000 shadow-lg"
                  style={{ width: `${Math.max(0, Math.min(100, ((365 - timeLeft.days) / 365) * 100))}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
