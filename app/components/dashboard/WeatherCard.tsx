import { Card } from "../ui/card";

interface WeatherCardProps {
  weather: {
    date: string;
    temperature: number;
    condition: string;
    icon: string;
  };
}

export function WeatherCard({ weather }: WeatherCardProps) {
  return (
    <Card className="p-6 md:p-8 lg:p-10">
      <h2 className="text-2xl font-bold mb-4 tracking-tight">Weather Forecast</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold">{new Date(weather.date).toLocaleDateString()}</p>
            <p className="text-muted-foreground">{weather.condition}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-medium">{weather.temperature}°C</span>
            <span className="text-muted-foreground">
              {/* Replace Font Awesome with a suitable icon from a library like Lucide React */}
              {/* Example: <CloudIcon className="h-5 w-5" /> */}
              Weather Icon Here
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}