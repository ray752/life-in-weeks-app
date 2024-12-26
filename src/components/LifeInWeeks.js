import React, { useState, useMemo } from 'react';

const LifeInWeeks = () => {
  const [birthDate, setBirthDate] = useState('');
  
  const calculations = useMemo(() => {
    if (!birthDate) return null;
    
    const birth = new Date(birthDate);
    const now = new Date();
    const totalWeeks = 90 * 52; // 90 years in weeks
    
    // Calculate weeks lived
    const msPerWeek = 1000 * 60 * 60 * 24 * 7;
    const weeksLived = Math.floor((now - birth) / msPerWeek);
    
    return {
      weeksLived: Math.max(0, Math.min(weeksLived, totalWeeks)),
      totalWeeks,
      yearsLived: (weeksLived / 52).toFixed(1),
      percentageLived: ((weeksLived / totalWeeks) * 100).toFixed(1)
    };
  }, [birthDate]);

  // Create grid of weeks
  const grid = useMemo(() => {
    if (!calculations) return [];
    
    const rows = [];
    for (let year = 0; year < 90; year++) {
      const row = [];
      for (let week = 0; week < 52; week++) {
        const weekNumber = year * 52 + week;
        row.push({
          weekNumber,
          isPast: weekNumber < calculations.weeksLived
        });
      }
      rows.push(row);
    }
    return rows;
  }, [calculations]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h1 className="text-2xl font-bold mb-6">Your Life in Weeks</h1>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Enter your birth date:
        </label>
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="px-3 py-2 border rounded-md w-full max-w-xs"
        />
      </div>
      
      {calculations && (
        <div className="mb-4 space-y-2">
          <p className="text-sm">
            You've lived approximately {calculations.weeksLived} weeks 
            ({calculations.yearsLived} years)
          </p>
          <p className="text-sm">
            That's {calculations.percentageLived}% of a 90-year life
          </p>
        </div>
      )}
      
      <div className="overflow-auto">
        <div className="grid gap-px" style={{ gridTemplateColumns: 'repeat(52, minmax(8px, 1fr))' }}>
          {grid.flat().map((week, index) => (
            <div
              key={index}
              className={`aspect-square ${
                week.isPast ? 'bg-blue-500' : 'bg-gray-200'
              }`}
              title={`Week ${week.weekNumber + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LifeInWeeks;