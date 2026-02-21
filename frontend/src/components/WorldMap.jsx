import React from 'react';

export const WorldMap = () => (
  <div className="relative w-full" data-testid="world-map">
    <img
      src="/world-map.png"
      alt="Ad Astra global presence across 50+ countries"
      className="w-full h-auto opacity-30"
      draggable={false}
    />
  </div>
);
