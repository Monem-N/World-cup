import { format } from 'date-fns';
import { CalendarIcon, MapPinIcon } from 'lucide-react';
import { Card, CardContent, CardHeader } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import type { DayProgram } from '~/lib/types';

interface ItineraryDayHeaderProps {
  day: DayProgram;
  className?: string;
}

export function ItineraryDayHeader({ day, className }: ItineraryDayHeaderProps) {
  const date = new Date(day.date);
  const formattedDate = format(date, 'EEEE, MMMM d, yyyy');
  
  return (
    <Card className={`w-full overflow-hidden ${className}`}>
      <CardHeader className="bg-gradient-to-r from-primary/90 to-secondary/90 text-primary-foreground">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            <h1 className="text-2xl font-bold">{formattedDate}</h1>
          </div>
          <h2 className="text-xl font-semibold">{day.title}</h2>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-muted-foreground mb-4">{day.summary}</p>
        
        {day.weather && (
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center bg-muted/30 rounded-full px-3 py-1">
              <img 
                src={`/images/weather/${day.weather.icon}.svg`} 
                alt={day.weather.condition} 
                className="h-6 w-6 mr-2" 
                onError={(e) => {
                  // Fallback if image doesn't exist
                  (e.target as HTMLImageElement).src = '/images/weather/default.svg';
                }}
              />
              <span>{day.weather.temperature}°C</span>
              <span className="mx-2">•</span>
              <span>{day.weather.condition}</span>
            </div>
          </div>
        )}
        
        {day.reminders && day.reminders.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-medium text-sm uppercase tracking-wide text-muted-foreground">Reminders</h3>
            <ul className="space-y-1">
              {day.reminders.map((reminder, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Badge variant="outline" className="bg-warning/10 text-warning border-warning">
                    Reminder
                  </Badge>
                  <span>{reminder}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
