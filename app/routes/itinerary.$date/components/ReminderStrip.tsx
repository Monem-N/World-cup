import React from 'react';

interface ReminderStripProps {
  reminders: string[];
}

export default function ReminderStrip({ reminders }: ReminderStripProps) {
  if (!reminders || reminders.length === 0) {
    return null;
  }

  return (
    <div className="text-sm text-gray-700 mt-4">
      <h5 className="text-md font-semibold mb-1">Reminders</h5>
      <ul className="list-disc pl-5">
        {reminders.map((reminder, index) => (
          <li key={index}>{reminder}</li>
        ))}
      </ul>
    </div>
  );
}
