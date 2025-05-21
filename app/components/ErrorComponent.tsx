import React from 'react';
import { AlertCircleIcon, RefreshCwIcon } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';

interface ErrorComponentProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorComponent({ message, onRetry }: ErrorComponentProps) {
  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl flex items-center justify-center min-h-[50vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="bg-destructive/10 text-destructive">
          <div className="flex items-center gap-2">
            <AlertCircleIcon className="h-5 w-5" />
            <CardTitle>Error</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-muted-foreground">{message}</p>
        </CardContent>
        {onRetry && (
          <CardFooter className="flex justify-end">
            <Button onClick={onRetry} variant="outline" className="gap-2">
              <RefreshCwIcon className="h-4 w-4" />
              Retry
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}