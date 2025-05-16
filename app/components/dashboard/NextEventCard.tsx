import React from 'react';
import { Clock, Zap, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../ui/card';
import type { TripEvent } from '../../lib/types';

interface NextEventCardProps {
  nextEvent: (TripEvent & { date: string }) | null;
}

export default function NextEventCard({ nextEvent }: NextEventCardProps) {
  const { t } = useTranslation();

  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className="p-4">
        <CardTitle className="flex items-center gap-2 font-semibold">
          <Zap size={18} className="text-orange-500" aria-hidden="true" />
          {t('dashboard.next_up')}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {nextEvent ? nextEvent.date : t('dashboard.no_events')}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        {nextEvent ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-muted-foreground" aria-hidden="true" />
              <span className="font-medium">{nextEvent.time}</span>
            </div>
            <p className="text-lg font-semibold">{nextEvent.desc}</p>
            {nextEvent.details && nextEvent.details.length > 0 && (
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-muted-foreground">
                {nextEvent.details.map((detail: string, idx: number) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <p className="text-muted-foreground">{t('dashboard.no_upcoming_events')}</p>
        )}
      </CardContent>
      {nextEvent && (
        <CardFooter className="p-4">
          <Button variant="outline" size="sm">
            {t('dashboard.view_details')}
            <ArrowRight size={16} className="ml-2" aria-hidden="true" />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
