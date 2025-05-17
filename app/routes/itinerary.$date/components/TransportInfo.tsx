import React from 'react';
import type { TransportDetails } from '../../../../stores/itinerary.types';

interface TransportInfoProps {
  transport: TransportDetails;
}

export default function TransportInfo({ transport }: TransportInfoProps) {
  return (
    <div className="text-sm text-gray-700">
      <h5 className="text-md font-semibold mb-1">Transport Details</h5>
      {transport ? (
        <div className="grid grid-cols-2 gap-x-4">
          {transport.mode && <p><span className="font-medium">Mode:</span> {transport.mode}</p>}
          {transport.pickup_time && <p><span className="font-medium">Pickup Time:</span> {transport.pickup_time}</p>}
          {transport.pickup_location && <p><span className="font-medium">Pickup Location:</span> {transport.pickup_location}</p>}
          {transport.estimated_cost && <p><span className="font-medium">Estimated Cost:</span> ${transport.estimated_cost}</p>}
          {transport.shared_with && transport.shared_with.length > 0 && (
            <p className="col-span-2"><span className="font-medium">Shared With:</span> {transport.shared_with.join(', ')}</p>
          )}
        </div>
      ) : (
        <p>No transport details available.</p>
      )}
    </div>
  );
}
