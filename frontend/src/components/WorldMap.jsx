import React from 'react';

const locations = [
  { name: 'Bangalore', x: 66.5, y: 55 },
  { name: 'Hyderabad', x: 66, y: 51 },
  { name: 'Kolkata', x: 70, y: 48 },
  { name: 'Mumbai', x: 63, y: 51 },
  { name: 'New Delhi', x: 65, y: 44 },
  { name: 'Coimbatore', x: 65.5, y: 57 },
  { name: 'Singapore', x: 77, y: 60 },
  { name: 'London', x: 47.5, y: 28 },
  { name: 'Amsterdam', x: 49, y: 27 },
];

export const WorldMap = () => (
  <div className="relative w-full" data-testid="world-map">
    <svg viewBox="0 0 100 60" className="w-full h-auto opacity-[0.12]" preserveAspectRatio="xMidYMid meet">
      {/* Simplified world map continents as paths */}
      {/* North America */}
      <path d="M5,15 Q8,12 12,14 L15,12 Q18,10 22,12 L25,15 Q24,18 22,20 L20,22 Q18,25 15,28 L12,30 Q10,28 8,25 L6,22 Q4,18 5,15Z" fill="currentColor" />
      {/* Central America */}
      <path d="M15,28 Q16,30 17,32 L18,35 Q17,36 15,35 L14,33 Q13,31 14,29Z" fill="currentColor" />
      {/* South America */}
      <path d="M20,35 Q22,33 24,35 L26,38 Q27,42 26,46 L24,50 Q22,52 20,50 L18,46 Q17,42 18,38Z" fill="currentColor" />
      {/* Europe */}
      <path d="M44,14 Q46,12 48,13 L51,14 Q53,15 52,17 L50,20 Q48,22 46,21 L44,19 Q43,17 44,14Z" fill="currentColor" />
      {/* UK */}
      <path d="M44,16 Q44.5,15 45,16 L45,17.5 Q44.5,18 44,17Z" fill="currentColor" />
      {/* Africa */}
      <path d="M46,28 Q48,26 51,27 L54,30 Q56,34 55,38 L53,42 Q51,46 48,45 L46,42 Q44,38 44,34 L45,30Z" fill="currentColor" />
      {/* Middle East */}
      <path d="M54,26 Q56,24 58,25 L60,27 Q61,30 60,32 L58,33 Q56,32 55,30Z" fill="currentColor" />
      {/* Russia / North Asia */}
      <path d="M52,10 Q56,8 62,9 L70,10 Q76,11 80,12 L82,14 Q80,16 76,15 L70,14 Q64,14 58,15 L54,14 Q52,13 52,10Z" fill="currentColor" />
      {/* India */}
      <path d="M62,34 Q64,32 66,33 L68,36 Q69,40 68,44 L66,48 Q64,50 62,48 L61,44 Q60,40 61,36Z" fill="currentColor" />
      {/* Southeast Asia */}
      <path d="M72,32 Q74,30 76,31 L78,34 Q79,36 78,38 L76,40 Q74,38 73,36Z" fill="currentColor" />
      {/* China / East Asia */}
      <path d="M70,18 Q74,16 78,18 L82,22 Q83,26 80,28 L76,28 Q72,26 70,24Z" fill="currentColor" />
      {/* Japan */}
      <path d="M84,20 Q85,18 86,20 L86,24 Q85,25 84,23Z" fill="currentColor" />
      {/* Australia */}
      <path d="M78,46 Q82,44 86,46 L88,49 Q88,52 85,54 L82,54 Q78,52 77,49Z" fill="currentColor" />
      {/* Indonesia */}
      <path d="M74,42 Q76,41 78,42 L80,43 Q79,44 77,44 L75,43Z" fill="currentColor" />
    </svg>

    {/* Location dots with pulse */}
    <svg viewBox="0 0 100 60" className="absolute inset-0 w-full h-auto" preserveAspectRatio="xMidYMid meet">
      {locations.map((loc) => (
        <g key={loc.name}>
          <circle cx={loc.x} cy={loc.y} r="0.8" fill="var(--orange-core)" opacity="0.3">
            <animate attributeName="r" values="0.8;1.6;0.8" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0.1;0.3" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx={loc.x} cy={loc.y} r="0.4" fill="var(--orange-core)" />
        </g>
      ))}
    </svg>
  </div>
);
