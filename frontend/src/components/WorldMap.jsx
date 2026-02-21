import React from 'react';

// Office locations as percentages of the map image (x%, y%)
const offices = [
  { name: 'Bangalore', x: 66, y: 56 },
  { name: 'Hyderabad', x: 65.5, y: 52 },
  { name: 'Kolkata', x: 68, y: 50 },
  { name: 'Mumbai', x: 63, y: 52 },
  { name: 'New Delhi', x: 65, y: 45 },
  { name: 'Coimbatore', x: 65.5, y: 58 },
  { name: 'Singapore', x: 76, y: 62 },
  { name: 'London', x: 47, y: 30 },
  { name: 'Amsterdam', x: 49, y: 28 },
];

export const WorldMap = () => (
  <div className="relative w-full" data-testid="world-map">
    <img
      src="/world-map.png"
      alt="Global presence map"
      className="w-full h-auto opacity-30"
      draggable={false}
    />
    {/* Pulsing office markers */}
    {offices.map((loc) => (
      <div
        key={loc.name}
        className="absolute"
        style={{ left: `${loc.x}%`, top: `${loc.y}%`, transform: 'translate(-50%, -50%)' }}
      >
        <span className="absolute inline-flex h-4 w-4 -top-2 -left-2 rounded-full opacity-30 animate-ping" style={{ backgroundColor: 'var(--orange-core)' }} />
        <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: 'var(--orange-core)' }} />
      </div>
    ))}
  </div>
);
