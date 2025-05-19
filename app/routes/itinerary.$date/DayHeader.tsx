import React from 'react';
import WeatherInfo from './components/WeatherInfo';
import ReminderStrip from './components/ReminderStrip';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../components/ui/card";

interface DayHeaderProps {
  data: any; // Replace 'any' with the actual type for day data
}

export default function DayHeader({ data }: DayHeaderProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{data?.title}</CardTitle>
        <CardDescription>{data?.summary}</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Render weather and reminders here */}
        {data?.weather && <WeatherInfo data={data.weather} />}
        {data?.reminders && <ReminderStrip reminders={data.reminders} />}
      </CardContent>
    </Card>
  );
}
