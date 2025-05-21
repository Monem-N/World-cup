import React from 'react';
import { Skeleton } from '~/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '~/components/ui/card';

export default function SkeletonLoader() {
  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-9 w-[120px]" />
        <Skeleton className="h-9 w-[200px] hidden md:block" />
        <Skeleton className="h-9 w-[120px]" />
      </div>

      {/* Day Header Skeleton */}
      <Card className="w-full overflow-hidden mb-6">
        <CardHeader className="bg-muted">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-8 w-[250px]" />
            <Skeleton className="h-6 w-[200px]" />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <Skeleton className="h-4 w-full mb-4" />
          <Skeleton className="h-4 w-3/4 mb-4" />

          <div className="flex items-center gap-2 mb-4">
            <Skeleton className="h-8 w-[180px] rounded-full" />
          </div>

          <Skeleton className="h-5 w-[100px] mb-2" />
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <Skeleton className="h-6 w-[80px]" />
              <Skeleton className="h-6 w-[200px]" />
            </div>
            <div className="flex items-start gap-2">
              <Skeleton className="h-6 w-[80px]" />
              <Skeleton className="h-6 w-[250px]" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs Skeleton */}
      <div className="mb-6">
        <div className="grid grid-cols-4 gap-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      {/* Timeline Skeleton */}
      <div className="space-y-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex items-start gap-4">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="flex-1">
              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Skeleton className="h-5 w-[80px]" />
                      </div>
                      <Skeleton className="h-6 w-[200px] mb-2" />
                      <Skeleton className="h-4 w-[150px]" />
                    </div>
                    <Skeleton className="h-5 w-[80px]" />
                  </div>

                  <div className="mt-3">
                    <Skeleton className="h-4 w-[180px]" />
                  </div>

                  <div className="mt-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4 mt-1" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}