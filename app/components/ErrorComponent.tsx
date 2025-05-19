import React from 'react';

interface ErrorComponentProps {
  message: string;
}

export default function ErrorComponent({ message }: ErrorComponentProps) {
  return (
    <div className="text-red-500">Error: {message}</div>
  );
}