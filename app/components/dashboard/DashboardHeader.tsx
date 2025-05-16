import React from 'react';
import { Calendar, Users, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CountdownTimer } from './CountdownTimer';
import type { TripInformation } from '../../lib/types';

interface DashboardHeaderProps {
  overview: TripInformation;
  tripStartDate: string | undefined;
  daysLeft: number | null;
  t: any; // Add the translation function type
}

export default function DashboardHeader({ overview, tripStartDate, daysLeft, t }: DashboardHeaderProps) {

  return (
    <header className="mb-8 text-center md:text-left">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl lg:text-5xl">
            {t('dashboard.title')}
          </h1>
          <div className="flex flex-wrap items-center gap-2 text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar size={16} aria-hidden="true" />
              <span className="text-sm">{overview.dates}</span>
            </div>
            <span className="hidden md:inline">&bull;</span>
            <div className="flex items-center gap-1">
              <Users size={16} aria-hidden="true" />
              <span className="text-sm">{overview.travelers}</span>
            </div>
            <span className="hidden md:inline">&bull;</span>
            <div className="flex items-center gap-1">
              <MapPin size={16} aria-hidden="true" />
              <span className="text-sm">{overview.locations}</span>
            </div>
          </div>
        </div>

        {tripStartDate && daysLeft != null && daysLeft > 0 && (
          <div className="mt-4 rounded-md bg-orange-50 px-4 py-2 text-center md:mt-0">
            <p className="text-sm font-medium text-orange-700">
              {t('dashboard.countdown')}
            </p>
            <div className="text-2xl font-bold">
              <CountdownTimer targetDate={new Date(`${tripStartDate}, 2025`)} />
            </div>
            <p className="text-xs text-muted-foreground">
              {daysLeft} {t('dashboard.days_left')}
            </p>
          </div>
        )}
      </div>
    </header>
  );
}
